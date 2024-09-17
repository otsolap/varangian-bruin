'use client'
import { useFormStatus } from 'react-dom'
 
export function SubmitButton({ text}) {
  const { pending } = useFormStatus()

  return (
    <button 
        disabled={pending}
        type="submit" 
        className={`button ${pending ? 'button--disabled' : 'button--primary'}`}    
    >
      {pending ? text.submit : text.loading }
    </button>
  )
}