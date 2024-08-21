'use client'
import React, { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons"
import useToggle from "@/hooks/useToggle"
import { useAccordionEffect } from "@/utils/accordion-effect"
import MarkdownBlock from "@/partials/util/MarkdownBlock"
import CustomLink from "@/partials/util/CustomLink"
import NextImage from "@/partials/util/NextImage";
import styles from '@/styles/components/footer.module.css'

const FooterColumn = ({ id, open, title, description, image, links }) => {
  const contentRef = useRef(null)
  const [active, setActive] = useToggle(open)

  useAccordionEffect(contentRef, active);

  const toggleAccordion = () => {
    setActive(!active)
  }

  return (
    <div key={id} className={styles.column}>
      <div className={styles.toggle} onClick={toggleAccordion}>
        <div className={styles.wrapper}>
          <div className={active ? `${styles.open}` : `${styles.closed}`}>
            <div className={styles.flexBox}>
            {title && <h4 className={styles.heading}>{title}</h4>}
              <FontAwesomeIcon
                className={styles.icon}
                aria-label="Alatunnisteen lisätieto"
                icon={active ? faAngleUp : faAngleDown}
              />
            </div>
          </div>
          <div
            ref={contentRef}
            className={
              active
                ? `${styles.content} ${styles.contentDivider}`
                : `${styles.content}`
            }
          >
            {image && <NextImage image={image} className={styles.image} />}
            {description && <MarkdownBlock markdown={description} />}
            {links ? (
            <div className={styles.linkWrapper}>
              {links.map((link, id) => (
               <CustomLink key={id} className={styles.link} link={link} />
              ))}
            </div>
            ): null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterColumn
