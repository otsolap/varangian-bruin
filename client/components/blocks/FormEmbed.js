'use client'
import { useActionState } from "react";
import Inputs from '@/components/Inputs'
import styles from '@/styles/components/form.module.css'
import NextImage from "@/partials/util/NextImage";
import { formSubmit } from '@/actions/form-actions';
import { SubmitButton } from "@/partials/form/SubmitButton";

const FormEmbed = ({ form }) => {
  const { formID, title, description, showLabels, inputs, image, successMessage, errorMessage, redirect, link } = form

  const INITIAL_STATE = {
    id: formID,
    redirect: redirect,
    link: link,
    messages: {
      successMessage: successMessage,
      errorMessage: errorMessage,
    },
    buttonText: {
      submit: 'Submit',
      loading: 'Submitting...',
    },
    submitSuccess: false,
    message: '',
  }

  const [formState, formAction] = useActionState(
    formSubmit,
    INITIAL_STATE
  )

  return (
    <section className={styles.formEmbed}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {inputs.length ? (
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
                  <Inputs 
                    inputs={inputs} 
                    showLabels={showLabels}
                  />
                </div>
                <footer className={styles.footer}>
                  {formState.submitSuccess === true ? null : <SubmitButton text={formState.buttonText} />}
                  <p aria-live="polite">{formState.message}</p>
                </footer>
              </form>
            </article>
          ) : null}
          {image && (
            <figure className={styles.imageContainer}>
                <NextImage 
                  className={styles.image} 
                  image={image} 
                  height={500}
                  width={668}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </figure>
          )}
        </div>
      </div>
    </section>
  )
}

export default FormEmbed