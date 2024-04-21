import { getDataDependencies } from "@/utils/api"
import Blocks from "@/components/Blocks"
import { getStrapiURL } from "@/utils/index"
import config from '@/utils/config'
import { notFound } from 'next/navigation'
import axios from 'axios'

export default async function Page () {
  const { blocks } = await fetchData()

  return (
    <Blocks blocks={blocks} />
  )
}

async function fetchData() {
  try {
    const heroResponse = await axios.get(getStrapiURL(`/${config.global.API_HOME_CONTENT_QUERY}`));
    const blocks = heroResponse.data.data.attributes.blocks
    const data = blocks ? await getDataDependencies(blocks) : {}
    if(!data) notFound()
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}