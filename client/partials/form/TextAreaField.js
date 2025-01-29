import { createID } from '@/utils/helpers'
import styles from '@/styles/components/form.module.css'

const TextAreaField = ({ name, placeholder, showLabels, width, rows = 4, cols = 30, }) => {
  const uid = createID(name)

  return (
    <>
    <div className={`${styles.inputBlock} ${styles[`width-${width}`]}`}>
        <label htmlFor={uid} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{name}</label>
        <textarea 
          id={uid} 
          name={`textarea_${uid}`} 
          className={styles.textarea}
          placeholder={placeholder ? placeholder : name} 
          rows={rows}
          cols={cols}
          >
        </textarea>
     </div>

    </>

  )
}

export default  TextAreaField;