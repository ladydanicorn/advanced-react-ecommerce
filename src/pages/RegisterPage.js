import React from 'react';
import { Link } from 'react-router-dom';
import Register from '../components/auth/Register';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="auth-page register-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>{t('createAccount')}</h1>
          <p>{t('registerDescription')}</p>
        </div>
        
        <Register />
        
        <div className="auth-footer">
          <p>
            {t('alreadyHaveAccount')} <Link to="/login">{t('loginHere')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;