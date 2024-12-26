import { getStrapiURL, fetchBannerData } from "@/utils/index"
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

// TODO: SEO component here.

async function getContent() {
  try {
    const [seoPathRes, blocksPathRes] = await Promise.all([
      fetch(getStrapiURL(`/${config.global.API_HOME_QUERY}?${config.blocks.API_SEO_BLOCK_QUERY}`)),
      fetch(getStrapiURL(`/${config.global.API_HOME_QUERY}?${config.blocks.API_DYNAMIC_ZONE_BLOCKS}`))
    ]);

    const [seoPathData, blocksPathData] = await Promise.all([
      seoPathRes.json(),
      blocksPathRes.json()
    ]);

    return {
      showServicesBanner: blocksPathData.data.showServicesBanner ?? false,
      showSubscribeForm: blocksPathData.data.showSubscribeForm ?? false,
      blocks: blocksPathData.data.blocks ?? {},
    }
  } catch (error) {
    console.error('Error:', error)
    notFound()
  }
}