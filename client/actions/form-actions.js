'use server'
import { redirect } from 'next/navigation'
import config from '@/utils/config'
import { getStrapiURL } from "utils/api"

// Form Embed submission handler
export async function formSubmit(state, formData) {
    let fields = {};
    const excludePatterns = ['$ACTION_', 'honeypot'];
    
    for (let [name, value] of formData.entries()) {
        if (name === 'honeypot' && value) {
            console.error('Honeypot field is filled. Possible bot detected.');
            return { error: 'Honeypot field should be empty.', message: 'Form submission failed' };
        }
    
        if (excludePatterns.some(pattern => name.startsWith(pattern))) {
            continue;
        }
    
        fields[name] = value;
    }

     // Identify textarea fields
     const textareaFields = Object.entries(fields)
     .filter(([key, value]) => key.startsWith('textarea_'))
     .map(([key, value]) => ({ key, value }))

    // Format textarea fields
    textareaFields.forEach(field => {
        fields[field.key] = field.value.replace(/\r\n/g, ' ');
    });

    // Make the fetch request
    let formID = null;
    
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    };

    try {
        const response = await fetch(getStrapiURL(`/${config.forms.path}${state.id}`), { headers });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.data && data.data.length > 0) {
            formID = data.data[0].formID;
        } else {
            console.error('No data found');
            return { 
                ...state,
                message: 'Form submission failed due to our end. Please give it another attempt.' 
            };
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return { 
            ...state,
            error: error.message, 
            message: state.messages.errorMessage ?? 'We could not submit the form. Please try again later.' 
        };
    }

    const data = {
        data: {
            form: formID,
            details: fields,
        }
    };

    try {
        await fetch(getStrapiURL(`/${config.endpoints.contacts}`), {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
    
        if (state.redirect && state.link) {
            redirect(state.link);
        }
    
        return {
            ...state,
            message: state.messages.successMessage ?? 'Form submitted successfully.',
            submitSuccess: true,
        };
    } catch (error) {
        const errorMessage = error.message || 'Unknown error. Blame your internet.';
        console.log('Error:', errorMessage);
    
        return { 
            error: errorMessage, 
            message: state.messages.errorMessage ?? 'Form submission failed. Did you check all required fields?' 
        };
    }
}


// Subscription Form submission handler
export async function subcribeFormSubmit(state, formData) {
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
        return { 
            ...state,
            message: 'Form submission failed. Email is a required field.',
        };
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    };

    const data = {
        api_key: process.env.CONVERTKIT_API_KEY,
        email: email
    }

    try {
        await fetch(`https://api.convertkit.com/v3/forms/${state.id}/subscribe`), {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        };

        if (state.redirect && state.link) {
            redirect(state.link);
        }

        return {
            ...state,
            message: state.messages.successMessage ?? 'Subscription successful! Please check your email to confirm your subscription.',
            submitSuccess: true,
        };
    } catch (error) {
        const errorMessage = error.message || 'Unknown error. Blame your internet.';
        console.log('Error:', errorMessage);
        return { 
            ...state,
            error: errorMessage, 
            message: state.messages.errorMessage ?? 'Email failed to submit. Please try again in a few moments', 
        };
    }
}