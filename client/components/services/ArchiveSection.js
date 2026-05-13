'use client'
import React, { useState } from "react"
import ServicesItem from "@/partials/blocks/ServicesItem"
import TaxonomyLinks from "@/partials/navigation/TaxonomyLinks"
import Pagination from "@/partials/navigation/Pagination"
import { paginate } from "@/utils/helpers"
import styles from "@/styles/components/services.module.css";

export const ArchiveSection = ({ items, service_types }) => {
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
      {service_types && 
        <header className={styles.header}>
          <TaxonomyLinks service_types={service_types} />
        </header>
      }
      <div className={styles.container}>
        {paginatedPosts.length > 0 ? (
            paginatedPosts.map((item, i) => (
              <ServicesItem
                key={item.id || `archive-blog-item-${i}`}
                image={item.image}
                title={item.title}
                price={item.price}
                currency={item.currency}
                serviceType={item.service_type[0]}
                slug={item.slug}
              />
            ))
          ) : (
            <p>No items found</p>
        )}
      </div>
      <div className={styles.wrapper}>
        <Pagination
          items={items.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  )
}
