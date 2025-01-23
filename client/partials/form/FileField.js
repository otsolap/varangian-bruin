'use client'
import { useState } from 'react';
import styles from '@/styles/components/form.module.css';
import { createID } from '@/utils/helpers';

const FileField = ({ name, description, showLabels, width, required, multiple }) => {
  const uid = createID(name);
  const acceptedFileTypes = ['png', 'pdf', 'heif', 'hevc', 'webp', 'jpg', 'jpeg'];
  const maxFileSize = 30 * 1024 * 1024; 

  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > maxFileSize) {
      setError(`File size should not exceed 30MB. Selected fi-le size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      event.target.value = ''; // Clear the input
    } else {
      setError('');
    }
  };

  return (
    <>
       <div className={`${styles.inputBlock} ${styles[`width-${width}`]}`}>
        <label htmlFor={uid} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{description}</label>
        <input
          type='file'
          id={uid}
          name={uid}
          required={required ? true : null}
          accept={acceptedFileTypes.map(type => `.${type}`).join(', ')}
          className={styles.input}
          onChange={handleFileChange}
          multiple={multiple ? true : null}
        />
        {error && <span className={styles.error}>{error}</span>}
        <div>
          <p>
            Please note we only accept the following formats: {acceptedFileTypes.join(', ')}. 
            Max size for file should be 30MB.
          </p>
        </div>
      </div>
    </>
  );
};

export default FileField;