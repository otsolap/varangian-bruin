'use client'
import styles from "@/styles/components/header.module.css";
import CustomLink from "@/partials/util/CustomLink";
import { useRouter } from 'next/navigation'

const MenuItem = ({ title, href,}) => {
  const router = useRouter();
  const link = {
    href,
    title
  };

  return (
    <CustomLink className={`${styles.link} ${
      router.asPath === href ? `${styles.active}` : ''
  }` }link={link} />
  );
};

export default MenuItem;