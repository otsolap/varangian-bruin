'use client'
import { useFormState } from "react-dom";
import styles from '@/styles/components/form.module.css'
import EmailField from 'partials/form/EmailField';
import { formSubcribeSubmit } from '@/actions/susbcription-form-actions';
import { SubmitButton } from "@/partials/form/SubmitButton";

const SubscribeForm = ({ title, description, email, formID, redirect, link, successMessage, errorMessage,  }) => {
  const INITIAL_STATE = {
    id: formID,
    redirect: redirect,
    link: link,
    messages: {
      successMessage: successMessage,
      errorMessage: errorMessage,
    },
    buttonText: {
      submit: 'Subscribe',
      loading: 'Loading...',
    },
    submitSuccess: false,
    message: '',
  }
  
  const [formState, formAction] = useFormState(
    formSubcribeSubmit,
    INITIAL_STATE
  )

  if (!formID) return null
  
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {formID ? (
          <article className={styles.content}>
            <form 
              id={formID ? formID : null}
              className={styles.form} 
              action={formAction}
              >
            <header className={styles.header}>
                {title && <h2 className={styles.title}>{title}</h2>}
                {description && <p>{description}</p>}
             </header>
              <div className={styles.inputWrapper}>
                  <div className={styles.inputBlock}>
                    <input type="hidden" value="" name="honeypot" />
                    <EmailField 
                        placeholder={email.placeholder}
                        required={email.required}
                        />
                      <footer className={styles.footer}>
                        {formState.submitSuccess === true ? null : <SubmitButton text={formState.buttonText} />}
                        <p aria-live="polite">{formState.message}</p>
                      </footer>
                  </div>
              </div>
            </form>
          </article>
        ) : null}
      </div>
    </section>
  )
}

export default SubscribeForm