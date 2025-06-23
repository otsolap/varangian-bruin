'use client'
import NextImage from "@/partials/util/NextImage"
import styles from '@/styles/components/imageBlock.module.css'
import { useRef } from 'react'

const ImageBlock = ({ image, caption, openLarge }) => {
  const dialogRef = useRef(null)
  const handleImageClick = () => {
    if (openLarge && dialogRef.current) {
      dialogRef.current.showModal()
    }
  }

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close()
    }
  }

  return (
    image ? (
      <section className={styles.wrapper}>
        <figure 
          className={`${styles.imageBlock} ${openLarge ? styles.imageBlockClickable : ''}`}
          onClick={handleImageClick}
          style={openLarge ? { cursor: 'pointer' } : {}}
        >
          <NextImage image={image} className={styles.image} />
          {caption ? (
            <figcaption className={styles.caption}>{caption}</figcaption>
          ) : null}
        </figure>

        {openLarge && (
          <dialog 
            ref={dialogRef}
            className={styles.dialog}
            onClick={handleCloseDialog}
          >
            <figure className={styles.dialogImageBlock} onClick={(e) => e.stopPropagation()}>
              <NextImage image={image} className={styles.dialogImage} />
              {caption ? (
                <figcaption className={styles.dialogCaption}>{caption}</figcaption>
              ) : null}
            </figure>
            <button 
              onClick={handleCloseDialog}
              className={styles.dialogButton}
              aria-label="Close"
              >
              <span aria-hidden="true">&times;</span>
            </button>
          </dialog>
        )}
      </section>
    ) : null
  )
}

export default ImageBlock