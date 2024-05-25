import Image from 'next/image'
import Quotation from '@/public/images/quotation.svg'
import styles from '@/styles/components/quote.module.css'

const Quote = ({ title }) => {
    return (
		<blockquote className={styles.quoteWrapper}>
      <Image src={Quotation} className={styles.quotationMark} alt="Quotation mark"  width={20} height={15} sizes="20px" priority quality={100} />
			  <span className={styles.quote}>
          {title}
        </span>
      <Image src={Quotation} className={styles.quotationMark} alt="Quotation mark"   width={20} height={15}  sizes="20px" priority quality={100} />
		</blockquote>
    )
}

export default Quote;