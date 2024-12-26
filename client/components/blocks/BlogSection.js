'use client'
import { useState, useEffect } from "react";
import styles from "@/styles/components/articles.module.css";
import BlogItem from "@/partials/blocks/BlogItem";
import Link from "next/link";
import { getStrapiURL } from "@/utils/index";
import config from '@/utils/config'

export default function BlogSection({ title, description, selectTheme, blogs, filter}) {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(getStrapiURL(`/${config.blocks.CONTENT_BLOG_SECTION_LATEST_QUERY}`));
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (filter === 'latest') {
      fetchData();
    }
  }, [filter]);

  const blogItems = filter === "latest" ? items : blogs;

  return (
    <section className={selectTheme == 'primary' ? styles.bgPrimary : styles.bgSecondary}>
      {title || description ? (
        <header className={styles.header}>
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </header>
      ) : null}
      {blogItems?.length ? (
        <div className={styles.wrapper}>
          {blogItems.map((item, i) => {
            return (
              <BlogItem
                key={i}
                image={item.image}
                title={item.title}
                description={item.description}
                category={item.category[0]}
                publishedAt={item.publishedAt}
                slug={item.slug}
              />
            );
          })}
        </div>
      ) : null}
      <footer className={styles.linkWrapper}>
      <Link className={styles.archiveLink} href={`/${config.blog.BLOG_PATH}`}>
          {config.blocks.CONTENT_BLOG_SECTION_BLOG_ARCHIVE_LEAD}
       </Link>
      </footer>
    </section>
  );
};
