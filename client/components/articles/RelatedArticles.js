'use client'
import { useState, useEffect } from "react";
import styles from "@/styles/components/articleAndServices.module.css";
import BlogItem from "@/partials/blocks/BlogItem";
import Link from "next/link";
import { getStrapiURL } from "@/utils/index";
import config from '@/utils/config'

export default function RelatedArticles ({ title, description, selectTheme, currentPostID, categoryTitle, currentCategory}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getStrapiURL(`/${config.blog.RELATED_ARTICLES_FILTER_QUERY}${currentCategory}${config.blog.RELATED_ARTICLES_CONTENT_QUERY}`));
        const resData = await res.json();
        // Filter out the article with the currentPostID
        const filteredArticles = resData.data[0].attributes.articles.data.filter(article => article.id !== currentPostID);
        setItems(filteredArticles);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [currentPostID, currentCategory]);

  return (
    <section className={selectTheme == 'primary' ? styles.bgPrimary : styles.bgSecondary}>
      {title || description ? (
        <header className={styles.header}>
          {title && <h2>{title} {categoryTitle}</h2>}
          {description && <p>{description}</p>}
        </header>
      ) : null}
      {items.length ? (
        <div className={styles.wrapper}>
          {items.map((item, i) => {
            return (
                <BlogItem
                key={i}
                image={item.attributes.image}
                title={item.attributes.title}
                description={item.attributes.description}
                category={item.attributes.category.data?.attributes}
                publishedAt={item.attributes.publishedAt}
                slug={item.attributes.slug}
                />
            );
          })}
        </div>
      ) : null}
      <footer className={styles.linkWrapper}>
      <Link className={styles.archiveLink} href={`/${config.blog.CATEGORY_PATH}/${currentCategory}`}>
          {config.blog.RELATED_ARTICLES_LINK_TITLE}
       </Link>
      </footer>
    </section>
  );
};
