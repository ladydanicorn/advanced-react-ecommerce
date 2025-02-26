import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Reusable Buttons
 * @param {Object} props 
 * @param {string} props.type 
 * @param {string} props.variant 
 * @param {boolean} props.fullWidth 
 * @param {boolean} props.disabled 
 * @param {Function} props.onClick 
 * @param {React.ReactNode} props.children 
 * @returns {JSX.Element} 
 */
const Button = ({
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
  children,
  ...rest
}) => {
  const { t } = useTranslation();
  
  const getButtonClass = () => {
    const baseClass = 'button';
    
    let variantClass = '';
    switch (variant) {
      case 'secondary':
        variantClass = 'button-secondary';
        break;
      case 'danger':
        variantClass = 'button-danger';
        break;
      case 'success':
        variantClass = 'button-success';
        break;
      default:
        variantClass = 'button-primary';
    }
    
    const widthClass = fullWidth ? 'button-full-width' : '';
    
    return `${baseClass} ${variantClass} ${widthClass}`.trim();
  };
  
  return (
    <button
      type={type}
      className={getButtonClass()}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;