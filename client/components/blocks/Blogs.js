'use client'
import { useState, useEffect } from "react";
import styles from "@/styles/components/blogs.module.css";
import BlogItem from "@/partials/blocks/BlogItem";
import Link from "next/link";
import { getStrapiURL } from "@/utils/api";
import config from '@/utils/config'

export default function Blogs({ title, description, selectTheme, blogs, filter}) {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(getStrapiURL(`/${config.blocks.blogsLatestArticles}`));
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

  const blogItems = filter === "latest" ? items.data : blogs;

  if (!blogItems) return null;

  return (
    <section className={selectTheme == 'primary' ? styles.bgPrimary : styles.bgSecondary}>
      {title || description ? (
        <header className={styles.header}>
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </header>
      ) : null}
      <div className={styles.wrapper}>
        {blogItems.map((item, i) => {
          return (
            <BlogItem
              key={item.id || `blogs-section-item-${i}`}
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
      <footer className={styles.linkWrapper}>
      <Link className={styles.archiveLink} href={`/${config.blog.path}`}>
          {config.blocks.blogsArchivePageCTA}
       </Link>
      </footer>
    </section>
  );
};
