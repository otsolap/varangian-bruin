'use server'
import config from '@/utils/config'
import { getStrapiURL } from "utils"

// Subscription Form submission handler
export async function formSubcribeSubmit(state, formData) {

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