import { getStrapiURL, generateOpenGraphImages  } from "@/utils/index"
import config from '@/utils/config'
import Blocks from "@/components/Blocks"
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const res =  await fetch(getStrapiURL(`/api/services`))
  const resData = await res.json()
  const slugs = resData.data.map(item => item.attributes.slug)
  return slugs.map(slug => ({
     params: { slug: slug }
  }))
}

async function getContent(params) {
  try {
    const res = await fetch(getStrapiURL(`/${config.services.API_SERVICES_CONTENT_QUERY}${params.slug}`))
    const resData = await res.json()

    return {
      pageTitle: resData.data[0]?.attributes.title ?? '',
      meta: resData.data[0]?.attributes.seo ?? {},
      blocks: resData.data[0]?.attributes.blocks ?? {},
    }
  } catch (error) {
    console.error('Error:', error);
    notFound()
  }
}

export async function generateMetadata({ params }) {
  const pageUrl = `/services/${params.slug}`
  const { meta, pageTitle } = await getContent(params)
  
  if(!meta || Object.keys(meta).length === 0) return null;

  const ogImages = await generateOpenGraphImages(meta.imageBlock?.image?.data?.attributes?.formats)

  return {
    title: meta.title ?? pageTitle,
    description: meta.description,
    keywords: [meta.keywords],
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


export default async function ServicesSlug({ params }) {
  const { blocks } = await getContent(params)
  
  return (
    <Blocks blocks={blocks} />
  )
}