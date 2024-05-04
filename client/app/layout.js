// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
// Fonts
import { poppins, hind_guntur } from "@/app/fonts";
// Styles
import "@/styles/globals.css"
import { fetchGlobalData } from "@/utils/index"
import Header from "components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import MobileFooter from "components/navigation/MobileFooter";

export default async function RootLayout({ children }) {
  const global = await fetchGlobalData();
  const navigation =  global.navigation.data.attributes;
  const footer = global.footer.data;
  const blogNavigation = global.blogNavigation.data.attributes;
  
  return (
        <html lang="en" className={`${hind_guntur.variable} ${poppins.variable}`}>
        <body>
          <Header navigation={navigation} blogNavigation={blogNavigation} />
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