import config from '@/utils/config'
import { getStrapiURL } from "@/utils/index"
import { notFound } from 'next/navigation'
import Blocks from "@/components/Blocks"
import ArticleHeading from "@/components/articles/ArticleHeading";
import ArticleFooter from "@/components/articles/ArticleFooter";
import BlogSection from 'components/blocks/BlogSection';
import TOC from "@/partials/article/TOC";
import styles from '@/styles/pages/blog.module.css'
import { generateOpenGraphImages } from "@/utils/index"
import RelatedArticles from 'components/articles/RelatedArticles';

export default async function BlogSlug(props) {
  const params = await props.params;
  const { article, revisionNotice, blocks, category, author, currentPostID } = await getContent(params)

  return (
    <>
    <ArticleHeading article={article} category={category} author={author} revisionDate={revisionNotice} />
    <div className={styles.wrapper}>
      <article id={'post'} className={styles.article}>
        <Blocks blocks={blocks} />
      </article>
      <TOC blocks={blocks} title={article.title} />
    </div>
    <ArticleFooter author={author} />
    <RelatedArticles
      title={config.blog.RELATED_ARTICLES_TITLE}
      categoryTitle={category.title}
      currentCategory={category.slug}
      currentPostID={currentPostID}
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
  const res =  await fetch(getStrapiURL(`/api/articles`))
  const resData = await res.json()
  const slugs = resData.data.map(item => item.slug)
  return slugs.map(slug => ({
     params: { slug: slug }
  }))
}

async function getContent(params) {
  try {
    const res = await fetch(getStrapiURL(`/${config.blog.API_ARTICLE_PAGE_CONTENT_QUERY}${params.slug}`), { cache: 'force-cache' });
    const resData = await res.json();

    return {
      pageTitle: resData.data[0]?.title ?? '',
      currentPostID: resData.data[0]?.id ?? null,
      meta: resData.data[0]?.seo ?? {},
      revisionNotice: (() => {
        const updatedAt = resData.data[0]?.updatedAt;
        if (!updatedAt) return null;
      
        const updatedDate = new Date(updatedAt);
        const currentDate = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);
      
        return updatedDate < oneMonthAgo ? updatedAt : null;
      })(),
      article: resData.data[0] ?? {},
      blocks: resData.data[0]?.blocks ?? {},
      category: resData.data[0]?.category[0] ?? {},
      author: resData.data[0]?.author ?? {},
    }

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

  const ogImages = await generateOpenGraphImages(meta.imageBlock?.image?.data?.formats)

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