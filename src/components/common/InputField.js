import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Reusable Input Field component with label and error handling
 * @param {Object} props - Component props
 * @param {string} props.id - Input id (also used for connecting label)
 * @param {string} props.name - Input name attribute
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler function
 * @param {string} props.label - Input label text
 * @param {string} props.placeholder - Input placeholder text
 * @param {boolean} props.required - Whether input is required
 * @param {string} props.error - Error message to display
 * @param {boolean} props.fullWidth - Whether input should take full width
 * @returns {JSX.Element} InputField component
 */
const InputField = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  label,
  placeholder,
  required = false,
  error,
  fullWidth = false,
  ...rest
}) => {
  const { t } = useTranslation();
  
  // Generate a unique ID if none 
  const inputId = id || `input-${name}-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`input-field ${fullWidth ? 'input-field-full-width' : ''} ${error ? 'input-field-error' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label} {required && <span className="required-indicator">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input"
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
      
      {error && (
        <div id={`${inputId}-error`} className="input-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;