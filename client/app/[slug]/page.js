import { getDataDependencies } from "@/utils/api"
import { getStrapiURL} from "@/utils/index"
import config from '@/utils/config'
import Blocks from "@/components/Blocks"
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const res =  await fetch(getStrapiURL(`/${config.global.API_PAGES_QUERY}`))
  const resData = await res.json()
  const slugs = resData.data.map(item => item.attributes.slug)
  
  return slugs.map(slug => ({
  params: { slug: slug }
  }))
  
}

async function getContent(params) {
  try {
    const res = await fetch(getStrapiURL(`/${config.global.API_PAGES_QUERY}?${config.global.API_PAGES_CONTENT_QUERY}&filters[slug][$eq]=${params.slug}`))
    const resData = await res.json()
    const blocks = resData.data[0].attributes.blocks
    const data = blocks ? await getDataDependencies(blocks) : {}
    if (!data) notFound()
    return data
  } catch (error) {
    console.error('Error:', error);
    notFound()
  }
}

export default async function PageSlug({ params }) {
  const { blocks } = await getContent(params)
  
  return (
    <Blocks blocks={blocks} />
  )
}