'use server'
import config from '@/utils/config'
import { getStrapiURL } from "utils"

// Subscription Form submission handler
export async function formSubcribeSubmit(state, formData) {
    let email = '';
    
    for (let [name, value] of formData.entries()) {
        if (name === 'honeypot' && value) {
            console.error('Honeypot field is filled. Possible bot detected.');
            return { error: 'Honeypot field should be empty.', message: 'Form submission failed' };
        }
    
        if (name === 'email') {
            email = value;
        }
    }
    
    // Check if email is empty
    if (!email) {
        return { error: 'Email is required.', message: 'Form submission failed' };
    }

    const headers = {
        'Content-Type': 'application/json',
        ...(process.env.NODE_ENV === 'production' && {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
        })
    };

    const data = {
        email: email
    }

    try {
        await fetch(getStrapiURL(`/${config.forms.SUBSCRIPTION_PATH}`), {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (state.redirect && state.link) {
            redirect(state.link);
        }

        return {
            ...state,
            message: state.messages.successMessage ?? 'Subscription successful! Please check your email to confirm your subscription.',
            submitSuccess: true,
        };
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return { 
            error: error.message, 
            message: state.messages.errorMessage ?? 'Email failed to submit. Please try again in a few moments' 
        };
    }
}