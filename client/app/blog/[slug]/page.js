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

export async function generateStaticParams() {
  const res =  await fetch(getStrapiURL(`/api/articles`))
  const resData = await res.json()
  const slugs = resData.data.map(item => item.attributes.slug)
  return slugs.map(slug => ({
     params: { slug: slug }
  }))
}

async function getContent(params) {
  try {
    const res = await fetch(getStrapiURL(`/${config.blog.API_ARTICLE_PAGE_CONTENT_QUERY}${params.slug}`))
    const resData = await res.json()

    return {
      pageTitle: resData.data[0]?.attributes.title ?? '',
      meta: resData.data[0]?.attributes.seo ?? {},
      article: resData.data[0]?.attributes ?? {},
      blocks: resData.data[0]?.attributes.blocks ?? {},
      category: resData.data[0]?.attributes.category.data[0]?.attributes ?? {},
      author: resData.data[0]?.attributes.author.data?.attributes ?? {},
    }

  } catch (error) {
    console.error('Error:', error);
    notFound()
  }
}

export async function generateMetadata({ params }) {
  const pageUrl = `/blog/${params.slug}`
  const { meta, pageTitle, author } = await getContent(params)
  
  if(!meta || Object.keys(meta).length === 0) return null;

  const ogImages = await generateOpenGraphImages(meta.imageBlock?.image?.data?.attributes?.formats)

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

export default async function BlogSlug ({ params }) {
  const { article, blocks, category, author } = await getContent(params)
  
  return (
    <>
    <ArticleHeading article={article} category={category} author={author} />
    <div className={styles.wrapper}>
      <article id={'post'} className={styles.article}>
        <Blocks blocks={blocks} />
      </article>
      <TOC blocks={blocks} title={article.title} />
    </div>
    <ArticleFooter author={author} />
    <BlogSection 
      title={config.blog.LATEST_ARTICLES_TITLE}
      selectTheme="secondary"
      filter="latest" 
      />
  </>
  )
}