// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
// Fonts
import { poppins, hind_guntur } from "@/utils/fonts";
// Styles
import "@/styles/globals.css"
import { fetchGlobalData } from "@/utils/index"
import Footer from "@/components/navigation/Footer";

export default async function RootLayout({ children }) {
  const global = await fetchGlobalData();
  const { navigation, footer } = global;


    return (
      <>
        <html lang="en">
        <body>
          {/* Layout UI */}
          <main className={'container'}>{children}</main>
          <Footer footer={footer} />
        </body>
      </html>
      </>

    )
  }