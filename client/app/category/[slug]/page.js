import Hero from "@/components/blocks/Hero"
import { ArchiveSection } from "@/components/articles/ArchiveSection"
import { getStrapiURL } from "@/utils/index"
import config from '@/utils/config'
import { notFound } from 'next/navigation'

export default async function categorySlug(props) {
  const params = await props.params;
  const { hero, items, categories } = await getContent(params)

  return (
    <>
      <Hero {...hero} />
      <ArchiveSection items={items} categories={categories} />
    </>
  )
}

export async function generateStaticParams() {
    const res =  await fetch(getStrapiURL(`/${config.blog.API_CATEGORY_PATH_QUERY}`))
    const resData = await res.json()
    const slugs = resData.data.map(item => item.slug)
    return slugs.map(slug => ({
       params: { slug: slug }
    }))
  }

async function getContent(params) {
    try {
      const urls = [
        getStrapiURL(`/${config.blog.API_CATEGORIES_CONTENT_QUERY}&filters[slug][$eq]=${params.slug}`),
        getStrapiURL(`/${config.blog.API_CATEGORY_PATH_QUERY}`),
      ];
  
      const [categoryResponse, allCategories] = await Promise.all(
        urls.map(url => fetch(url, { cache: 'force-cache' }))
      );

      const archivePageData = await categoryResponse.json();
      const categoriesData = await allCategories.json();

      const matchingCategory = archivePageData.data.find(
        (category) => category.slug === params.slug
      )
  
      return {
        hero: matchingCategory.hero ?? {},
        items: matchingCategory.articles.data ?? {},
        categories: categoriesData.data ?? {},   
      }
  
    } catch (error) {
      console.error('Error:', error);
      notFound()
    }
  }