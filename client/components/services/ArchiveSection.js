'use client'
import React, { useState } from "react"
import ServicesItem from "@/partials/blocks/ServicesItem"
import TaxonomyLinks from "@/partials/navigation/TaxonomyLinks"
import Pagination from "@/partials/navigation/Pagination"
import { paginate } from "@/utils/index"
import styles from "@/styles/components/articleAndServices.module.css";

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
    <>
      {service_types && 
        <header className={styles.header}>
          <TaxonomyLinks service_types={service_types} />
        </header>
      }
      <div className={styles.wrapper}>
        {paginatedPosts.map((item, i) => {
          return (
            <ServicesItem
              key={i}
              image={item.image}
              title={item.title}
              price={item.price}
              currency={item.currency}
              serviceType={item.service_types[0]}
              slug={item.slug}
            />
          )
        })}
        <Pagination
          items={items.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
    </>
  )
}
