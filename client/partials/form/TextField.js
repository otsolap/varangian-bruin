import styles from '@/styles/components/form.module.css'
import { createID } from '@/utils/helpers'

const TextField = ({ name, placeholder, showLabels, width, required }) => {
  const uid = createID(name)

  return (
    <>
      <div className={`${styles.inputBlock} ${styles[`width-${width}`]}`}>
        <label htmlFor={uid} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{name}</label>
        <input
        id={uid}
        name={uid}
        type='text'
        placeholder={placeholder ? placeholder : name}
        required={required ? true : null}
        className={styles.input}
        />
      </div>
    </>
  )
}

export default TextField;