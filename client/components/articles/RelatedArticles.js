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
        const res = await fetch(getStrapiURL(`/${config.blog.relatedArticlesCategoryFilter}${currentCategory}${config.blog.relatedArticlesIDFilter}${documentId}${config.blog.relatedArticlesContent}`));
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
                     key={item.id || `related-blog-item-${i}`}
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
        <Link className={styles.archiveLink} href={`/${config.categories.path}/${currentCategory}`}>
            Read more from the category
        </Link>
        </footer>
        </section>
    ) : null
  );
};
