'use client'
import { useState, useEffect } from "react";
import styles from "@/styles/components/blogs.module.css";
import BlogItem from "@/partials/blocks/BlogItem";
import Link from "next/link";
import { getStrapiURL } from "@/utils/api";
import config from '@/utils/config'

export default function RelatedArticles ({ title, description, selectTheme, documentId, categoryTitle, currentCategory}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getStrapiURL(`/${config.blog.RELATED_ARTICLES_CATEGORY_FILTER_QUERY}${currentCategory}${config.blog.RELATED_ARTICLES_ID_FILTER_QUERY}${documentId}${config.blog.RELATED_ARTICLES_CONTENT_QUERY}`));
        const resData = await res.json();
        setItems(resData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [documentId, currentCategory]);

  return (
    items.data && items.data.length ? (
        <section className={selectTheme == 'primary' ? styles.bgPrimary : styles.bgSecondary}>
        {title || description ? (
            <header className={styles.header}>
            {title && <h2>{title} {categoryTitle}</h2>}
            {description && <p>{description}</p>}
            </header>
        ) : null}
        
            <div className={styles.wrapper}>
            {items.data.map((item, i) => {
                return (
                    <BlogItem
                    key={i}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    publishedAt={item.publishedAt}
                    slug={item.slug}
                    />
                );
            })}
            </div>
        <footer className={styles.linkWrapper}>
        <Link className={styles.archiveLink} href={`/${config.blog.CATEGORY_PATH}/${currentCategory}`}>
            {config.blog.RELATED_ARTICLES_LINK_TITLE}
        </Link>
        </footer>
        </section>
    ) : null
  );
};
