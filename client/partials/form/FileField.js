import styles from '@/styles/components/form.module.css'
import { createID } from '@/utils/index'

const FileField = ({ name, description, showLabels, required }) => {

  const uid = createID(name)

  return (
    <>
    <label htmlFor={uid} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{description}</label>
    <input
    type='file'
    id={uid}
    name={uid}
    required={required ? true : null}
    accept=".jpg, .jpeg, .png, .webp, .pdf"
    className={styles.input}
    />
    </>
  )
}

export default FileField;