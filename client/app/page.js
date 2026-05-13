import { getStrapiURL, fetchBannerData } from "@/utils/api"
import config from '@/utils/config'
import Blocks from "@/components/Blocks"
import Banner from "@/components/blocks/Banner"
import SubscribeForm from "components/blocks/SubscribeForm"
import { notFound } from 'next/navigation'

export default async function Page () {
  const { blocks, showServicesBanner, showSubscribeForm } = await getContent()
  const banners = await fetchBannerData()
  const { servicesBanner, subscribeForm } = banners

  return (
    <>
    <Blocks blocks={blocks} />
    {showServicesBanner && <Banner {...servicesBanner} />}
    {showSubscribeForm && <SubscribeForm {...subscribeForm} />}
    </>
  )
}

async function getContent() {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
  };

  try {
    const apiResponse = await fetch(getStrapiURL(`/${config.endpoints.home}?${config.blocks.dynamicZone}&${config.blocks.seo}`), { headers });
    const fetchedData = await apiResponse.json();

    return {
      pageTitle: fetchedData.title ?? '',
      meta: fetchedData.seo ?? {},
      blocks: fetchedData.data.blocks ?? {},
      showServicesBanner: fetchedData.data.showServicesBanner ?? false,
      showSubscribeForm: fetchedData.data.showSubscribeForm ?? false,
    }
  } catch (error) {
    console.error('Error:', error)
    notFound()
  }
}

export async function generateMetadata(props) {
  const params = await props.params;
  const pageUrl = `/`
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