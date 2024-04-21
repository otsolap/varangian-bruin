import { getDataDependencies } from "@/utils/api"
import { getPageData, getAllPageSlugs, fetchServicesBannerData, fetchSubscribeFormData } from "@/utils/index"
import Blocks from "@/components/Blocks"
import axios from 'axios'
import { notFound } from 'next/navigation'

export default async function PageSlug({ params }) {
  const { slug } = params
  const { blocks} = await fetchData(slug)
  
  return (
    <Blocks blocks={blocks} />
  )
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs(); // Fetch all slugs
  console.log(slugs)

  return slugs.map(slugSegments => ({
    params: { slug: slugSegments }
  }));

}

async function fetchData(slug) {
  console.log('this is the slug', slug)
  const data = await getPageData(slug)
  const res = await axios.get(data.data)
  const json = res.data

  if (!json.data.length) {
    console.error(`No page data found for slug: ${data.slug}`)
    return { notFound: true }
  }

  const pageDataObj = json.data.find((d) => d.attributes.slug === data.slug)
  console.log('toimiiko tää', pageDataObj)

  // If no data object is found, throw an error
  if (!pageDataObj) {
    console.error(`No page data object found for slug: ${data.slug}`)
    return { notFound: true }
  }

  const blocks = pageDataObj.attributes.blocks
  const pageData = blocks ? await getDataDependencies(blocks) : {}

  if (!pageData) notFound()
  return pageData 
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const siteUrl = `/${slug}`

  return {
    slug: siteUrl,
  }
}