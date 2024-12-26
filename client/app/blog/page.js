import Hero from "@/components/blocks/Hero"
import { ArchiveSection } from "@/components/articles/ArchiveSection"
import { getStrapiURL, generateOpenGraphImages } from "@/utils/index"
import config from '@/utils/config'
import { notFound } from 'next/navigation'

export default async function Page () {
  const { hero, items, categories } = await getContent()

  return (
    <>
      <Hero {...hero} />
      <ArchiveSection items={items} categories={categories} />
    </>
  )
}

async function getContent() {
  try {
    const urls = [
      getStrapiURL(`/${config.blog.API_ARCHIVE_PAGE_QUERY}`),
      getStrapiURL(`/${config.blog.API_ARTICLES_QUERY}`),
      getStrapiURL(`/${config.blog.API_CATEGORY_PATH_QUERY}`),
    ];

    const [archivePageResponse, articlesResponse, categoriesResponse] = await Promise.all(
      urls.map(url => fetch(url))
    );

    const [archivePageData, articlesData, categoriesData] = await Promise.all([
      archivePageResponse.json(),
      articlesResponse.json(),
      categoriesResponse.json()
    ]);

    return {
      meta: archivePageData.data.seo ?? {},
      hero: archivePageData.data.hero ?? {},
      items: articlesData.data ?? {},
      categories: categoriesData.data ?? {},   
    }

  } catch (error) {
    console.error('Error:', error);
    notFound()
  }
}

export async function generateMetadata(props) {
  const params = await props.params;
  const pageUrl = `/${params.slug}`
  const { meta } = await getContent(params)

  if(!meta || Object.keys(meta).length === 0) return null;

  const ogImages = await generateOpenGraphImages(meta.imageBlock?.image?.formats)

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