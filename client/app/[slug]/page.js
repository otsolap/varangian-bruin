import { getStrapiURL, fetchBannerData, generateOpenGraphImages } from "@/utils/index"
import config from '@/utils/config'
import Blocks from "@/components/Blocks"
import { notFound } from 'next/navigation'
import Banner from "@/components/blocks/Banner"
import SubscribeForm from "components/blocks/SubscribeForm";

export async function generateStaticParams() {
  const res =  await fetch(getStrapiURL(`/${config.pages.API_PAGES_QUERY}`))
  const resData = await res.json()
  const slugs = resData.data.map(item => item.attributes.slug)
  
  return slugs.map(slug => ({
    params: { slug: slug }
  }))
  
}

async function getContent(params) {
  try {
    const res = await fetch(getStrapiURL(`/${config.pages.API_PAGES_QUERY}?${config.pages.API_PAGES_CONTENT_QUERY}&filters[slug][$eq]=${params.slug}`))
    const resData = await res.json()

    return {
      pageTitle: resData.data[0]?.attributes.title ?? '',
      meta: resData.data[0]?.attributes.seo ?? {},
      blocks: resData.data[0]?.attributes.blocks ?? {},
      showServicesBanner: resData.data[0]?.attributes.showServicesBanner ?? false,
      showSubscribeForm: resData.data[0]?.attributes.showSubscribeForm ?? false,
    }
  } catch (error) {
    console.error('Error:', error);
    notFound()
  }
}

export async function generateMetadata({ params }) {
  const pageUrl = `/${params.slug}`
  const { meta, pageTitle } = await getContent(params)
  
  if(!meta || Object.keys(meta).length === 0) return null;

  const ogImages = await generateOpenGraphImages(meta.imageBlock?.image?.data?.attributes?.formats)

  return {
    robots: {
      index:  meta.preventIndexing,
      follow: meta.preventIndexing,
      googleBot: {
        index: meta.preventIndexing,
        follow: meta.preventIndexing
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

export default async function PageSlug({ params }) {
  const { blocks, showServicesBanner, showSubscribeForm } = await getContent(params)
  const banners = await fetchBannerData();
  const { servicesBanner, subscribeForm } = banners;

  return (
    <>
    <Blocks blocks={blocks} />
    {showServicesBanner && <Banner {...servicesBanner} />}
    {showSubscribeForm && <SubscribeForm {...subscribeForm} />}
    </>
  )
}