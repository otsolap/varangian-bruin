'use client'
import styles from "@/styles/components/header.module.css";
import CustomLink from "@/partials/util/CustomLink";
import Blocks from "@/components/Blocks";
import ArticleNavigation from "@/partials/article/ArticleNavigation";
import ServicesNavigation from "@/partials/services/ServicesNavigation";
import { usePathname, useParams } from 'next/navigation'
import config from '@/utils/config'


const NavLinks = ({ mainNavigation, blogNavigation, blogPaths, servicePaths }) =>  {
  const pathname = usePathname();
  const params = useParams()

  let title = null;

  if (params.slug) {
    const matchingPath = pathname.includes(`/${config.blog.path}/`) 
      ? blogPaths.data.find(path => path.slug === params.slug)
      : pathname.includes(`/${config.services.path}/`) 
      ? servicePaths.data.find(path => path.slug === params.slug)
      : null;

    title = matchingPath ? matchingPath.title : null;
  }

  return (
    <nav className={styles.navigation}>
      <div className={styles.wrapper}>
        {pathname.includes(`/${config.blog.path}/`) && params.slug ? (
          <ArticleNavigation title={title} navigation={blogNavigation} />
        ): pathname.includes(`/${config.services.path}/`) && params.slug ? (
          <ServicesNavigation title={title} />
        ) : (
          mainNavigation.blocks && (
            <>
              <div className={styles.menu}>
                <Blocks blocks={mainNavigation.blocks} />
              </div>
              {mainNavigation.button ? (
                <CustomLink 
                  link={mainNavigation.button} 
                  className={`${styles.callToAction} button button--${mainNavigation.button.selectTheme}`} 
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