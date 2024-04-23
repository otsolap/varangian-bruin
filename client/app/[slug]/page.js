import { getStrapiURL, fetchBannerData } from "@/utils/index"
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
      blocks: resData.data[0]?.attributes.blocks ?? {},
      showServicesBanner: resData.data[0]?.attributes.showServicesBanner ?? false,
      showSubscribeForm: resData.data[0]?.attributes.showSubscribeForm ?? false,
    }
  } catch (error) {
    console.error('Error:', error);
    notFound()
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