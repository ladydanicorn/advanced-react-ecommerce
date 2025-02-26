import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (event) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
  };
  
  return (
    <div className="language-switcher">
      <select 
        value={i18n.language} 
        onChange={changeLanguage}
        aria-label="Select language"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;