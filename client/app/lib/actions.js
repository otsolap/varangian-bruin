'use server'

export async function createContact(formData) {
    const rawFormData = Object.fromEntries(formData.entries())
    console.log(rawFormData)
}