import styles from '@/styles/components/form.module.css'
import { createID } from '@/utils/index'

const TextField = ({ name, placeholder, showLabels, required }) => {

  const uid = createID(name)

  return (
    <>
      <div>
        <label htmlFor={uid} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{name}</label>
        <input
        type='text'
        name={uid}
        id={uid}
        placeholder={placeholder ? placeholder : name}
        required={required ? true : null}
        className={styles.input}
        />
      </div>
    </>
  )
}

export default TextField;