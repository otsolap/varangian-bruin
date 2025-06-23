import NextImage from "partials/util/NextImage"
import styles from '@/styles/components/articleAuthor.module.css'
import ContactDetails from '@/partials/util/ContactDetails'

const ArticleAuthor = ({ author }) => {
  return (
    author ? (
      <section className={styles.section}>
        <div className={styles.column}>
            <figure className={styles.imageContainer}>
                <NextImage 
                  image={author.image} 
                  alt={author.name || 'Author Image'}
                  height={500}
                  width={668}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.image}
                   />
            </figure>
        </div>
        <div className={styles.column}>
            <article className={styles.wrapper}>
                {author.title && <h3>{author.title}</h3>}
                {author.description && <p>{author.description}</p>}
                {author.socialMedia && (
                  <div className={styles.buttonWrapper}>
                      <ContactDetails list={author.socialMedia} />
                  </div>
            )}
            </article>
        </div>
      </section>
    ): null
  )
}

export default ArticleAuthor