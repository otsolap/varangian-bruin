'use client'
import { useFormState } from "react-dom";
import styles from '@/styles/components/form.module.css'
import config from '@/utils/config'
import EmailField from 'partials/form/EmailField';
import { formSubcribeSubmit } from '@/actions/subscription-form-actions';


const FormEmbed = ({ title, description, email, formID, redirect, link, successMessage, errorMessage,  }) => {
    if (!formID) return null

    const INITIAL_STATE = {
        id: formID,
        redirect: redirect,
        link: link,
        successMessage: successMessage,
        errorMessage: errorMessage,
        submitSuccess: false,
        data: null,
        message: '',
    }

    const [formState, formAction] = useFormState(
        formSubcribeSubmit,
        INITIAL_STATE
    )


  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {formID ? (
          <article className={styles.content}>
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
              <div className={styles.inputWrapper}>
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
          </article>
        ) : null}
      </div>
    </section>
  )
}

export default FormEmbed