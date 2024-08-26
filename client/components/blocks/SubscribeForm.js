'use client'
import React, { useRef, useState } from 'react'
import styles from '@/styles/components/form.module.css'
import config from '@/utils/config'
import { getStrapiURL } from "utils"
import EmailField from 'partials/form/EmailField';


const FormEmbed = ({ title, description, email, formID }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null)

  if (!formID) {
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    // Form submission was likely by a bot
    if(e.target.honeypot.value !== "") return
  
    const headers = {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    }
  
    const data = {
      email: formRef.current.querySelector('input[name="email"]').value
    }
  
    fetch(getStrapiURL(`/${config.forms.SUBSCRIPTION_PATH}`), {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setSuccessMessage("Subscription successful! Please check your email to confirm your subscription.")
      })
      .catch((error) => {
        const errorMessage = error.message || 'Unknown error. Blame your internet.'
        console.log(errorMessage)
        setErrorMessage('Email failed to submit. Please try again in a few moments.')
      })
  }

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {formID ? (
          <div className={styles.content}>
            <form 
              id={formID ? formID : null}
              className={styles.form} 
              ref={formRef} 
              onSubmit={handleSubmit}
              >
            <header className={styles.header}>
                {title && <h2 className={styles.title}>{title}</h2>}
                {description && <p>{description}</p>}
             </header>
              <div className={`${styles.inputWrapper} ${styles.row}`}>
                  {successMessage ? (
                    <p>{successMessage}</p>
                  ) : (
                    <>
                    <input type="hidden" value="" name="honeypot" />
                    <EmailField 
                        formRef={formRef} 
                        placeholder={email.placeholder}
                        required={email.required}
                    />
                    <footer className={`${styles.footer} ${styles.paddingZero}`}>
                        <button type="submit" value="submit" className={`button button--primary`} >
                           Subscribe
                        </button>
                    </footer>
                    </>
                  )}
              </div>
              {errorMessage &&  <p><strong>{errorMessage}</strong></p>}
            </form>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default FormEmbed