import Image from 'next/image'
import Quotation from '@/public/images/quotation.svg'
import styles from '@/styles/components/quote.module.css'

const Quote = ({ title, author, source }) => {
    return (
      <section>
        <figure className={styles.quoteWrapper}>
          <blockquote className={styles.quoteBlock}>
            <Image src={Quotation} className={styles.quotationMark} alt="Quotation mark"  width={20} height={15} sizes="20px" priority quality={100} />
              <p className={styles.quote}>{title}</p>
            <Image src={Quotation} className={styles.quotationMark} alt="Quotation mark"   width={20} height={15}  sizes="20px" priority quality={100} />
          </blockquote>
            {(author || source) && (
              <figcaption className={styles.source}>
                    {author && author} {source && <cite className={styles.source}>- {source}</cite>}
              </figcaption>
            )}
        </figure>
    </section>
    )
}

export default Quote;