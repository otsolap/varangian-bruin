import styles from '@/styles/components/form.module.css'
import { createID } from '@/utils/helpers'

const SelectField = ({ name, placeholder, options, width, required, showLabels}) => {

  const uid = createID(name)

  return (
    <>
       <div className={`${styles.inputBlock} ${styles[`width-${width}`]}`}>
      <label htmlFor={uid} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{name}</label>
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