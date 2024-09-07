import styles from '@/styles/components/form.module.css'

const EmailField = ({  placeholder, showLabels, required }) => {
  return (
    <>
    <div>
      <label htmlFor={'email'} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{'Email'}</label>
      <input
      type='text'
      id='email'
      name='email'
      className={styles.input}
      placeholder={placeholder ? placeholder : 'email'}
      required={required ? true : null}
      pattern='[^@\s]+@[^@\s]+\.[^@\s]+'
      />
    </div>
    </>
  )
}

export default EmailField;