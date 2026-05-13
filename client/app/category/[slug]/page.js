import Hero from "@/components/blocks/Hero"
import { ArchiveSection } from "@/components/articles/ArchiveSection"
import { getStrapiURL } from "@/utils/api"
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
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    };

    const res =  await fetch(getStrapiURL(`/${config.endpoints.categories}`), { headers})
    const resData = await res.json()
    const slugs = resData.data.map(item => item.slug)
    return slugs.map(slug => ({
       params: { slug: slug }
    }))
  }

async function getContent(params) {
    try {
      const urls = [
        getStrapiURL(`/${config.endpoints.categories}?${config.categories.content}&${config.blocks.filterBySlug}=${params.slug}`),
        getStrapiURL(`/${config.endpoints.categories}`),
      ];
  
      const [categoryResponse, allCategories] = await Promise.all(
        urls.map(url => fetch(url))
      );

      const [archivePageData, categoriesData] = await Promise.all([
        categoryResponse.json(),
        allCategories.json()
      ]);

      const matchingCategory = archivePageData.data.find(
        (category) => category.slug === params.slug
      )

  
      return {
        hero: matchingCategory?.hero ?? {},
        items: matchingCategory?.articles ?? {},
        categories: categoriesData.data ?? {},   
      }
  
    } catch (error) {
      console.error('Error:', error);
      notFound()
    }
  }