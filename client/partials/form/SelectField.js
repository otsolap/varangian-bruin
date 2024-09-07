import styles from '@/styles/components/form.module.css'
import { createID } from '@/utils/index'

const SelectField = ({ title, placeholder, options, required, showLabels}) => {

  const uid = createID(title)

  return (
    <>
    <div>
      <label htmlFor={uid} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{title}</label>
      <select className={styles.select} id={uid} name={uid} required={required ? true : null} >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options 
          ? options.map((option, index) => (
            <option className={styles.option} key={index} value={option.value} >
                  {option.value}
              </option>
          )) : null}
      </select>
    </div>
    </>

  )
}

export default SelectField;