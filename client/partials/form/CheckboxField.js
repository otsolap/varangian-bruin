import styles from '@/styles/components/form.module.css'
import { createID } from '@/utils/index'

const CheckboxField = ({ name, options, width, showLabels }) => {
  const uid = createID(name)

  return (
    <>
    <div className={`${styles.inputBlock} ${styles[`width-${width}`]}`}>
      <fieldset className={styles.fieldset}>
          <legend className={`${styles.legend} ${showLabels ? '' : 'sr-only'}`}>{name}</legend>
          {options 
          ? options.map((option, index) => (
            <label className={styles.label} key={index} htmlFor={uid + index}>
                  <input 
                  className={styles.choice} 
                  type="checkbox" 
                  id={uid + index} 
                  name={uid} 
                  value={option.value} 
                  />
                  {option.value}
              </label>
          )) : null}
      </fieldset>
    </div>
    </>
  )
}

export default CheckboxField;