import { useState, useEffect } from "react";
import styles from "@/styles/components/blogAnchor.module.css";
import Link from "next/link";
import { getStrapiURL } from "@/utils/api";
import config from '@/utils/config'

const BlogAnchors = ({ blogAnchors }) => {
  const [items, setItems] = useState([]);
  let { blogs, filter } = blogAnchors

  const fetchData = async () => {
    try {
      const res = await fetch(getStrapiURL(`/${config.blocks.API_CONTENT_BLOG_SECTION_LATEST_QUERY}`));
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
    blogItems?.data?.length ? (
      <div className={styles.wrapper}>
        {blogItems.data.map((item, i) => {
          return (
            <Link className={styles.link} key={i} href={`/${config.blog.BLOG_PATH}/${item.slug}`}>
              {item.title}
            </Link>
          );
        })}
      </div>
    ) : null
  );
};

export default BlogAnchors