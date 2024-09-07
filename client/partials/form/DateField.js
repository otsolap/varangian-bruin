import React from 'react'
import { createID } from '@/utils/index'

const DateField = ({ title, showLabels, required }) => {

  const uid = createID(title)

  return (
    <>
    <div className={styles.inputBlock}>
      <label htmlFor={uid} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{title}</label>
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