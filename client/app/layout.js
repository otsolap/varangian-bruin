// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
// Fonts
import { poppins, hind_guntur } from "@/utils/fonts";
// Styles
import "@/styles/globals.css"

export default function RootLayout({ children }) {
    return (
      <>
        <html lang="en">
        <body>
          {/* Layout UI */}
          <main>{children}</main>
        </body>
      </html>
      </>

    )
  }