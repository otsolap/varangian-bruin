import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"
import { poppins, hind_guntur } from "@/app/fonts"
import "@/styles/globals.css"
import { fetchGlobalData, fetchGlobalSEOData, generateOpenGraphImages, getStrapiURL } from "@/utils/index"
import config from '@/utils/config'
import Header from "components/navigation/Header"
import Footer from "@/components/navigation/Footer"
import MobileFooter from "components/navigation/MobileFooter"

export default async function RootLayout({ children }) {
  let navigation, footer, blogNavigation, servicePaths, blogPaths

  try {
    const global = await fetchGlobalData()
    const [servicePathsRes, blogPathsRes] = await Promise.all([
      fetch(getStrapiURL(`/${config.services.API_SERVICES_NAV_QUERY}`)),
      fetch(getStrapiURL(`/${config.blog.API_BLOG_NAV_QUERY}`))
    ])
    
    const [servicePathsData, blogPathsData] = await Promise.all([
      servicePathsRes.json(),
      blogPathsRes.json()
    ])

    navigation = global.navigation.data.attributes
    footer = global.footer.data
    blogNavigation = global.blogNavigation.data.attributes
    servicePaths = servicePathsData
    blogPaths = blogPathsData

  } catch (error) {
    console.error('Error:', error);
  }
  
  return (
    <html lang="en" className={`${hind_guntur.variable} ${poppins.variable}`}>
      <body>
        <Header 
          navigation={navigation} 
          blogNavigation={blogNavigation} 
          servicePaths={servicePaths}
          blogPaths={blogPaths}
        />
        <main className={'container'}>
          {children}
        </main>
        <Footer footer={footer} />
        <MobileFooter navigation={navigation} />
        <div id="modal-root"></div>
      </body>
    </html>
  )
}

export async function generateMetadata() {
  let baseSEO

  try {
    const global = await fetchGlobalSEOData()
    baseSEO = global.data.attributes
  } catch (error) {
    console.error('Error:', error)
  }
  
  if(!baseSEO || Object.keys(baseSEO).length === 0) return null;

  const ogImages = generateOpenGraphImages(baseSEO.imageBlock?.image?.data?.attributes?.formats)
  
  return {
    metadataBase: baseSEO.URL ? new URL(`${baseSEO.URL}`) : null,
    robots: {
      index:  baseSEO.preventIndexing,
      follow: baseSEO.preventIndexing,
      googleBot: {
        index: baseSEO.preventIndexing,
        follow: baseSEO.preventIndexing
      }
    },
    title: {
      template: `%s — ${baseSEO.title}`,
      default: baseSEO.title
    },
    description: baseSEO.description,
    keywords: [baseSEO.keywords],
    twitter: {
      site: baseSEO.XTwitter,
      creator: baseSEO.XTwitter,
    },
    openGraph: {
      title: {
        default: baseSEO.title,
        template: `%s — ${baseSEO.title}`
      },
      description: baseSEO.description,
      images: ogImages,
    },
    icons: {
      icon: '../public/icons/favicon.ico',
      apple: '../public/icons/apple-touch-icon.png',
    },
    manifiest: '../public/icons/site.webmanifest',
  }
}