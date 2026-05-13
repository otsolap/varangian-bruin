'use client'
import CustomLink from "@/partials/util/CustomLink";
import styles from "@/styles/components/header.module.css";
import { usePathname, useParams } from 'next/navigation'
import config from '@/utils/config'

const MobileHeaderCallToAction = ({ primary, blog }) => {
    const pathname = usePathname();
    const params = useParams()
  
    const button = pathname.includes(`/${config.blog.path}/`) && params.slug ? blog : primary;

    return (
        button.button && <CustomLink link={button.button} className={`${styles.callToAction} mobile-only button button--${button.button.selectTheme}`} />
    )
}

export default MobileHeaderCallToAction;