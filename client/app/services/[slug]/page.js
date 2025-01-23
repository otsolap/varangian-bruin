import { getStrapiURL  } from "@/utils/api"
import { generateOpenGraphImages  } from "@/utils/helpers"
import config from '@/utils/config'
import Blocks from "@/components/Blocks"
import { notFound } from 'next/navigation'

export default async function ServicesSlug(props) {
  const params = await props.params;
  const { blocks } = await getContent(params)

  return (
    <Blocks blocks={blocks} />
  )
}

export async function generateStaticParams() {
  const res =  await fetch(getStrapiURL(`/api/services`))
  const resData = await res.json()
  const slugs = resData.data.map(item => item.slug)
  return slugs.map(slug => ({
     params: { slug: slug }
  }))
}

async function getContent(params) {
  try {
    const res = await fetch(getStrapiURL(`/${config.services.API_SERVICES_CONTENT_QUERY}${params.slug}`));
    const resData = await res.json()

    if (!resData.data || resData.data.length === 0) notFound();

    return {
      pageTitle: resData.data[0]?.title ?? '',
      meta: resData.data[0]?.seo ?? {},
      blocks: resData.data[0]?.blocks ?? {},
    }
  } catch (error) {
    console.error('Error:', error);
    notFound()
  }
}

export async function generateMetadata(props) {
  const params = await props.params;
  const pageUrl = `/services/${params.slug}`
  const { meta, pageTitle } = await getContent(params)

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