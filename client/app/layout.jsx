import { poppins, hind_guntur } from "@/app/fonts"
import "@/styles/globals.css"
import { fetchGlobalData, fetchGlobalSEOData, getStrapiURL } from "@/utils/api"
import { generateOpenGraphImages} from "@/utils/helpers"
import config from '@/utils/config'
import Header from "@/components/navigation/Header"
import Footer from "@/components/navigation/Footer"
import MobileFooter from "components/navigation/MobileFooter"
import Analytics from "@/components/utils/Analytics"
import { Suspense } from "react"

export const fetchCache = 'default-cache'

export default async function RootLayout({ children }) {
  let navigation, footer, blogNavigation, servicePaths, blogPaths

  try {
    const global = await fetchGlobalData()

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    };

    const [servicePathsRes, blogPathsRes] = await Promise.all([
      fetch(getStrapiURL(`/${config.endpoints.services}`, { headers})),
      fetch(getStrapiURL(`/${config.global.blogNavigationDetails}`, { headers}))
    ])
    
    const [servicePathsData, blogPathsData] = await Promise.all([
      servicePathsRes.json(),
      blogPathsRes.json()
    ])

    navigation = global.navigation.data ?? {}
    footer = global.footer.data ?? {}
    blogNavigation = global.blogNavigation.data ?? {}

    servicePaths = servicePathsData ?? {}
    blogPaths = blogPathsData ?? {}
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
        <main>
          {children}
        </main>
        <Footer footer={footer} />
        <MobileFooter 
            navigation={navigation} 
            blogPaths={blogPaths} 
            socialShare={blogNavigation.social}
        />
       <Suspense>
          <Analytics />
       </Suspense>
      </body>
    </html>
  )
}

export async function generateMetadata() {
  let baseSEO

  try {
    const global = await fetchGlobalSEOData()
    baseSEO = global.data
  } catch (error) {
    console.error('Error:', error)
  }
  
  if(!baseSEO || Object.keys(baseSEO).length === 0) return null;

  const ogImages = generateOpenGraphImages(baseSEO.imageBlock?.image?.formats)
  
  return {
    metadataBase: baseSEO.URL ? new URL(`${baseSEO.URL}`) : null,
    robots: {
      index:  !baseSEO.preventIndexing,
      follow: !baseSEO.preventIndexing,
      googleBot: {
        index: !baseSEO.preventIndexing,
        follow: !baseSEO.preventIndexing
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
      icon: '/icons/favicon.ico',
      apple: '/icons/apple-touch-icon.png',
    },
    manifiest: '/icons/site.webmanifest',
  }
}