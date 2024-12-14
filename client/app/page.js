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

async function getContent() {
  try {
    const res = await fetch(getStrapiURL(`/${config.global.API_HOME_CONTENT_QUERY}`))
    const resData= await res.json()

    return {
      showServicesBanner: resData.data.showServicesBanner ?? false,
      showSubscribeForm: resData.data.showSubscribeForm ?? false,
      blocks: resData.data.blocks ?? {},
    }
  } catch (error) {
    console.error('Error:', error)
    notFound()
  }
}