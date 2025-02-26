import React from 'react';
import OrderHistory from '../components/orders/OrderHistory';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

const OrderHistoryPage = () => {
  const { t } = useTranslation();
  const isAuthenticated = sessionStorage.getItem('token') !== null;
  
  // Redirect to login if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="order-history-page">
      <div className="page-header">
        <h1>{t('orderHistory')}</h1>
        <p>{t('orderHistoryDescription')}</p>
      </div>
      
      <div className="order-history-container">
        <OrderHistory />
      </div>
    </div>
  );
};

export default OrderHistoryPage;