import { getStrapiURL } from "@/utils/index"
import config from '@/utils/config'
import Blocks from "@/components/Blocks"
import ArticleHeading from "@/components/articles/ArticleHeading";
import ArticleFooter from "@/components/articles/ArticleFooter";
import HeadingLinks from "@/partials/article/HeadingLinks";
import { notFound } from 'next/navigation'
import styles from '@/styles/pages/blog.module.css'

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
    const res = await fetch(getStrapiURL(`/${config.blog.API_ARTICLE_CONTENT_QUERY}&filters[slug][$eq]=${params.slug}`))
    const resData = await res.json()

    return {
      article: resData.data[0]?.attributes ?? {},
      category: resData.data[0]?.attributes.category.data[0]?.attributes ?? {},
      author: resData.data[0]?.attributes.author.data?.attributes ?? {},
    }

  } catch (error) {
    console.error('Error:', error);
    notFound()
  }
}

export default async function BlogSlug ({ params }) {
  const { article, category, author } = await getContent(params)
  
  return (
    <>
    <ArticleHeading article={article} category={category} author={author} />
    <div className={styles.wrapper}>
      <article id={'post'} className={styles.article}>
        <Blocks blocks={article.blocks} />
      </article>
      <HeadingLinks blocks={article.blocks} title={article.title} />
    </div>
    <ArticleFooter author={author} />
  </>
  )
}