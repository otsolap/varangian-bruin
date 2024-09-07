import styles from '@/styles/components/form.module.css'

const TextAreaField = ({ name, placeholder, showLabels, rows = 4, cols = 30, }) => {
  return (
    <>
    <div>
        <label htmlFor={name} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{name}</label>
        <textarea 
          id={name} 
          name={`textarea_${name}`} 
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