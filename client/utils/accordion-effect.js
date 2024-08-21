import { useEffect } from 'react';

export const useAccordionEffect = (contentRef, active) => {
  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px"
  }, [contentRef, active])
}