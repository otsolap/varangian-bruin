'use server'
import { redirect } from 'next/navigation'
import config from '@/utils/config'
import { getStrapiURL } from "utils"

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

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    };

    // Make the fetch request
    let formID = null;

    try {
        const response = await fetch(getStrapiURL(`/${config.forms.FORMS_PATH}${state.id}`));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.data && data.data.length > 0) {
            formID = data.data[0].id;
        } else {
            console.error('No data found');
            return { 
                error: 'No data found', 
                message: state.messages.errorMessage ?? 'Form submission failed.' 
            };
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return { 
            error: error.message, 
            message: state.messages.errorMessage ?? 'Form submission failed.' 
        };
    }

    const data = {
        data: {
            form: formID,
            details: fields,
        }
    };

    try {
        await fetch(getStrapiURL(`/${config.forms.COLLECTIONS_PATH}`), {
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
            message: state.messages.errorMessage ?? 'Form submission failed.' 
        };
    }
}


// Subscription Form submission handler
export async function subcribeFormSubmit(state, formData) {
    let email = '';
    console.log('formData:', formData);
    
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
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    };

    const data = {
        api_key: process.env.NEXT_CONVERTKIT_API_KEY,
        email: email
    }

    console.log('Data:', data);
    console.log('Formatted data:', JSON.stringify(data));

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
        console.error('There was a problem with the fetch operation:', error);
        return { 
            error: error.message, 
            message: state.messages.errorMessage ?? 'Email failed to submit. Please try again in a few moments' 
        };
    }
}