'use client'
import React, { useState } from "react"
import BlogItem from "partials/blocks/BlogItem"
import TaxonomyLinks from "partials/navigation/TaxonomyLinks"
import Pagination from "partials/navigation/Pagination"
import { paginate } from "@/utils/helpers"
import styles from "@/styles/pages/blogs-archive.module.css";

export const ArchiveSection = ({ items, categories }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 12

  const onPageChange = (page) => {
    setCurrentPage(page)
    const header = document.getElementById("blog-archive-header")
    if (header) {
      header.scrollIntoView({ behavior: "smooth" })
    }
  }

  const paginatedPosts = paginate(items, currentPage, pageSize)

  return (
      <section>
        <div className={styles.container}>
          {categories && 
            <header className={styles.header}>
              <TaxonomyLinks categories={categories} />
            </header>
          }
          {paginatedPosts.length > 0 ? (
            paginatedPosts.map((item, i) => (
                <BlogItem
                  key={i}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  slug={item.slug}
                  author={item.author}
                  category={item.category[0]}
                  publishedAt={item.publishedAt}
                />
              ))
            ) : (
              <p>No items found</p>
            )}
            <div className={styles.wrapper}>
              <Pagination
                items={items.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
                />
            </div>
        </div>
    </section>
  )
}

