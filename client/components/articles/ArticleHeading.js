import NextImage from "partials/util/NextImage"
import Link from "next/link"
import styles from '@/styles/components/articleHeading.module.css'
import config from '@/utils/config'

const ArticleHeading = ({ article, category, author }) => {
  return (
    <header className={styles.header}>
        <div className={styles.lead}>
                {category && 
                    <Link href={`/${config.categories.path}/${category.slug}`}>
                        <h4 className={styles.category}>{category.title}</h4>
                    </Link>
                }
            {article.title && <h1 className={styles.title}>{article.title}</h1>}
            {article.description && <h3 className={styles.description}>{article.description}</h3>}
            {author &&
                    <article className={styles.author}>
                    {author.image &&
                    <figure className={styles.authorImageContainer}>
                        <NextImage 
                        height={80}
                        width={80}
                        sizes="80px"
                        image={author.image} 
                        className={styles.authorImage} 
                        />
                    </figure>
                    }
                    <div className={styles.column}>
                        {author.title && <h3 className={styles.authorTitle}>{author.title}</h3>}
                        {author.subtitle && <h4 className={styles.authorSubtitle}>{author.subtitle}</h4>}
                    </div>
                    </article>
            }
        </div>
        {article.image && 
            <figure className={styles.imageContainer}>
                <NextImage 
                image={article.image} 
                className={styles.image} 
                height={500}
                width={668}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </figure>
        }
  </header>
  )
}

export default ArticleHeading