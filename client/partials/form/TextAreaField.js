import styles from '@/styles/components/form.module.css'

const TextAreaField = ({ name, placeholder, showLabels }) => {
  return (
    <>
    <label htmlFor={name} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{name}</label>
    <textarea 
      id={name} 
      name={name} 
      placeholder={placeholder ? placeholder : name} 
      className={styles.input}
      >
    </textarea>
    </>

  )
}

export default  TextAreaField;