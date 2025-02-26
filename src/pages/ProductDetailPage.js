import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/products/ProductDetail';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { getProductById } from '../api/fakestoreAPI';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  
  // Fetch product details
  const { data: product, isLoading, error } = useQuery(
    ['product', id],
    () => getProductById(id),
    {
      staleTime: 5 * 60 * 1000, 
    }
  );
  
  if (isLoading) return <div className="loading-container">{t('loadingProduct')}</div>;
  if (error) return <div className="error-container">{t('errorLoadingProduct')}: {error.message}</div>;
  if (!product) return <div className="error-container">{t('productNotFound')}</div>;
  
  return (
    <div className="product-detail-page">
      <ProductDetail />
    </div>
  );
};

export default ProductDetailPage;