import React from 'react';
import Profile from '../components/user/Profile';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const { t } = useTranslation();
  const isAuthenticated = sessionStorage.getItem('token') !== null;
  
  // Redirect to login if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>{t('yourProfile')}</h1>
        <p>{t('profileDescription')}</p>
      </div>
      
      <div className="profile-container">
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;