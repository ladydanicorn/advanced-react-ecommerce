import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/auth/Login';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="auth-page login-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>{t('login')}</h1>
          <p>{t('loginDescription')}</p>
        </div>
        
        <Login />
        
        <div className="auth-footer">
          <p>
            {t('dontHaveAccount')} <Link to="/register">{t('registerHere')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;