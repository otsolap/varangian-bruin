import { useState, useEffect } from "react";
import styles from "@/styles/components/blogAnchor.module.css";
import Link from "next/link";
import { getStrapiURL } from "@/utils/api";
import config from '@/utils/config'

const BlogAnchors = ({ blogAnchors }) => {
  const [items, setItems] = useState([]);
  let { blogs, filter } = blogAnchors

  useEffect(() => {
    if (filter === 'latest') {
      fetchData();
    }
  }, [filter]);

  const fetchData = async () => {
    try {
      const res = await fetch(getStrapiURL(`/${config.blocks.blogsLatestArticles}`));
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const blogItems = filter === "latest" ? items.data : blogs;

  return (
    blogItems?.length ? (
      <div className={styles.wrapper}>
        {blogItems.map((item, i) => {
          return (
            <Link 
              className={styles.link} 
              key={item.id || `blog-item-${i}`}
              href={`/${config.blog.path}/${item.slug}`}
              >
              {item.title}
            </Link>
          );
        })}
      </div>
    ) : null
  );
};

export default BlogAnchors