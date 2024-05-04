'use client'
import styles from "@/styles/components/header.module.css";
import CustomLink from "@/partials/util/CustomLink";
import Blocks from "@/components/Blocks";
import ArticleNavigation from "@/partials/article/ArticleNavigation";
import ServicesNavigation from "@/partials/services/ServicesNavigation";
import { usePathname, useParams } from 'next/navigation'

const NavLinks = ({ mainNavigation, blogNavigation }) =>  {
    const pathname = usePathname();
    const params = useParams()
  
    return (
      <nav className={styles.navigation}>
        <div className={styles.wrapper}>
          {pathname.includes('/blog/') && params.slug ? (
            <ArticleNavigation {...blogNavigation} />
          ) : (
            mainNavigation.blocks && (
              <>
                <div className={styles.menu}>
                  <Blocks blocks={mainNavigation.blocks} />
                </div>
                {mainNavigation.button ? (
                  <CustomLink 
                    link={mainNavigation.button} 
                    className={`${styles.calendar} button button--${mainNavigation.button.selectTheme}`} 
                  />
                ) : null }
              </>
            )
          )}
        </div>
      </nav>
    )
  }
  
  export default NavLinks;