'use client'
import { useFormStatus } from 'react-dom'
 
export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button 
        disabled={pending}
        type="submit" 
        className={`button ${pending ? 'button--disabled' : 'button--primary'}`}    
    >
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}