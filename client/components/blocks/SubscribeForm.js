'use client'
import { useActionState } from "react";
import styles from '@/styles/components/form.module.css'
import EmailField from 'partials/form/EmailField';
import { subcribeFormSubmit } from '@/actions/form-actions';
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
  
  const [formState, formAction] = useActionState(
    subcribeFormSubmit,
    INITIAL_STATE
  )

  return (
    <section className={styles.formEmbed}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
            <article className={styles.content}>
              <form 
                  id={formID}
                  className={styles.form} 
                  action={formAction}
                >
              <header className={styles.header}>
                  {title && <h2 className={styles.title}>{title}</h2>}
                  {description && <p>{description}</p>}
              </header>
                <div className={styles.inputWrapper}>
                      <input type="hidden" value="" name="honeypot" />
                      <EmailField 
                        placeholder={email.placeholder} 
                        required={email.required} 
                        width={email.width} 
                      />
                    <footer className={styles.footer}>
                      {formState.submitSuccess === true ? null : <SubmitButton text={formState.buttonText} />}
                      <p aria-live="polite">{formState.message}</p>
                    </footer>
                </div>
              </form>
            </article>
        </div>
        </div>
    </section>
  )
}

export default SubscribeForm