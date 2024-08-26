import React from 'react'
import { createID } from '@/utils/index'

const DateField = ({ title, showLabels, required }) => {

  const uid = createID(title)

  return (
    <>
    <label htmlFor={uid} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{title}</label>
    <input
    type='date'
    id={uid}
    name={uid}
    required={required ? true : null}
    className={styles.input}
    />
    </>

  )
}

export default DateField;