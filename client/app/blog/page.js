import Hero from "@/components/blocks/Hero"
import { ArchiveSection } from "@/components/articles/ArchiveSection"
import { getStrapiURL, generateOpenGraphImages } from "@/utils/index"
import config from '@/utils/config'
import { notFound } from 'next/navigation'

async function getContent() {
  try {
    const urls = [
      getStrapiURL(`/${config.blog.API_ARCHIVE_PAGE_QUERY}`),
      getStrapiURL(`/${config.blog.API_ARTICLES_QUERY}`),
      getStrapiURL(`/${config.blog.API_CATEGORY_PATH_QUERY}`),
    ];

    const [archivePageResponse, articlesResponse, categoriesResponse] = await Promise.all(urls.map(url => fetch(url)));

    const archivePageData = await archivePageResponse.json();
    const articlesData = await articlesResponse.json();
    const categoriesData = await categoriesResponse.json();

    return {
      meta: archivePageData.data.attributes.seo ?? {},
      hero: archivePageData.data.attributes.hero ?? {},
      items: articlesData.data ?? {},
      categories: categoriesData.data ?? {},   
    }

  } catch (error) {
    console.error('Error:', error);
    notFound()
  }
}

export async function generateMetadata({ params }) {
  const pageUrl = `/${params.slug}`
  const { meta } = await getContent(params)
  
  if(!meta || Object.keys(meta).length === 0) return null;

  const ogImages = await generateOpenGraphImages(meta.imageBlock?.image?.data?.attributes?.formats)

  return {
    robots: {
      index:  !meta.preventIndexing,
      follow: !meta.preventIndexing,
      googleBot: {
        index: !meta.preventIndexing,
        follow: !meta.preventIndexing
      }
    },
    title: meta.title,
    description: meta.description,
    keywords: [meta.keywords],
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: pageUrl,
      images: ogImages,
    },
    alternates: {
      canonical: pageUrl
    }
  }
}

export default async function Page () {
  const { hero, items, categories } = await getContent()

  return (
    <>
      <Hero {...hero} />
      <ArchiveSection items={items} categories={categories} />
    </>
  )
}