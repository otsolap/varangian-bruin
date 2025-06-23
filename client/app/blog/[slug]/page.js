import config from '@/utils/config'
import { getStrapiURL } from "@/utils/api"
import { notFound } from 'next/navigation'
import Blocks from "@/components/Blocks"
import ArticleHeading from "@/components/articles/ArticleHeading";
import ArticleAuthor from "@/components/articles/ArticleAuthor";
import BlogSection from 'components/blocks/BlogSection';
import TOC from "@/partials/article/TOC";
import styles from '@/styles/pages/blog.module.css'
import { generateOpenGraphImages } from "@/utils/helpers";
import RelatedArticles from 'components/articles/RelatedArticles';

export default async function BlogSlug(props) {
  const params = await props.params;
  const { article, revisionNotice, blocks, category, author, documentId } = await getContent(params)

  return (
    <>
    <ArticleHeading article={article} category={category} author={author} />
    <div className={styles.wrapper}>
      <article id={'post'} className={styles.article}>
        {revisionNotice &&
            <aside className={styles.revision}>
                <p>This post was last updated in {revisionNotice}.</p>
            </aside>
        }
        <Blocks blocks={blocks} />
      </article>
      <TOC blocks={blocks} title={article.title} />
    </div>
    <ArticleAuthor author={author} />
    <RelatedArticles
      title={config.blog.RELATED_ARTICLES_TITLE}
      categoryTitle={category.title}
      currentCategory={category.slug}
      documentId={documentId}
      selectTheme="secondary"
    />
    <BlogSection 
      title={config.blog.LATEST_ARTICLES_TITLE}
      selectTheme="secondary"
      filter="latest" 
      />
  </>
  )
}

export async function generateStaticParams() {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
  };

  const res =  await fetch(getStrapiURL(`/api/articles`), { headers })
  const resData = await res.json()
  const slugs = resData.data.map(item => item.slug)
  return slugs.map(slug => ({
     params: { slug: slug }
  }))
}

async function getContent(params) {
  try {
    const res = await fetch(getStrapiURL(`/${config.blog.API_ARTICLE_PAGE_CONTENT_QUERY}${params.slug}`));
    const resData = await res.json();

    if (!resData.data || resData.data.length === 0) notFound();

    const {
        title,
        documentId,
        seo,
        updatedAt,
        blocks,
        category,
        author
    } = resData.data[0] ?? {};
    
    return {
        pageTitle: title ?? '',
        documentId: documentId ?? null,
        meta: seo ?? {},
        revisionNotice: (() => {
            if (!updatedAt) return null;
    
            const updatedDate = new Date(updatedAt);
            const currentDate = new Date();
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    
            if (updatedDate < oneMonthAgo) {
                const options = { year: 'numeric', month: 'long' };
                return updatedDate.toLocaleDateString(undefined, options);
            }
    
            return null;
        })(),
        article: resData.data[0] ?? {},
        blocks: blocks ?? {},
        category: category[0] ?? {},
        author: author ?? {},
    };
  } catch (error) {
    console.error('Error:', error);
    notFound()
  }
}

export async function generateMetadata(props) {
  const params = await props.params;
  const pageUrl = `/blog/${params.slug}`
  const { meta, pageTitle, author } = await getContent(params)

  if(!meta || Object.keys(meta).length === 0) return null;

  const ogImages = await generateOpenGraphImages(meta.imageBlock?.image?.formats)

  return {
    title: meta.title ?? pageTitle,
    description: meta.description,
    authors: [{ name: author.title }],
    keywords: [meta.keywords],
    type: 'article',
    publisher: 'Varangian Venture',
    openGraph: {
      title: meta.title ?? pageTitle,
      description: meta.description,
      url: pageUrl,
      images: ogImages,
    },
    alternates: {
      canonical: pageUrl
    }
  }
}