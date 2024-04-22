import { getDataDependencies } from "@/utils/api"
import Blocks from "@/components/Blocks"
import { getStrapiURL } from "@/utils/index"
import config from '@/utils/config'
import { notFound } from 'next/navigation'

export default async function Page () {
  const { blocks } = await getContent()

  return (
    <Blocks blocks={blocks} />
  )
}



async function getContent() {
  try {
    const res = await fetch(getStrapiURL(`/${config.global.API_HOME_CONTENT_QUERY}`));
    const resData= await res.json();
    const blocks = resData.data.attributes.blocks
    const data = blocks ? await getDataDependencies(blocks) : {}
    if(!data) notFound()
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}