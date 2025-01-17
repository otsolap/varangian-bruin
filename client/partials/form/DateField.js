import React from 'react'
import { createID } from '@/utils/index'
import styles from '@/styles/components/form.module.css'

const DateField = ({ name, showLabels, width, required }) => {

  const uid = createID(name)

  return (
    <>
     <div className={`${styles.inputBlock} ${styles[`width-${width}`]}`}>
      <label htmlFor={uid} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{name}</label>
      <input
      type='date'
      id={uid}
      name={uid}
      required={required ? true : null}
      className={styles.input}
      />
    </div>
    </>
  )
}

export default DateField;