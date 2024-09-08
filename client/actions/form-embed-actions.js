'use server'
import config from '@/utils/config'
import { getStrapiURL } from "utils"

// Form Embed submission handler
export async function formSubmit(state, formData) {
    let fields = {};
    const excludePatterns = ['$ACTION_'];
    
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

    console.log(fields);

     // Identify textarea fields
     const textareaFields = Object.entries(fields)
     .filter(([key, value]) => key.startsWith('textarea_'))
     .map(([key, value]) => ({ key, value }))

    // Format textarea fields
    textareaFields.forEach(field => {
        fields[field.key] = field.value.replace(/\r\n/g, ' ');
    });

    // Tähän vielä sähköpostin validointi

    const headers = {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json'
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
            return { error: 'No data found', message: 'Form submission failed' };
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return { error: error.message, message: 'Form submission failed' };
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
        return {
            ...state,
            message: 'Form submitted successfully.',
        };
    } catch (error) {
        const errorMessage = error.message || 'Unknown error. Blame your internet.';
        console.log('Error:', errorMessage);
        return { error: errorMessage, message: 'Form submission failed' };
    }
}