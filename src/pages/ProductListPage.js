import React from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import { useTranslation } from 'react-i18next';

const ProductListPage = () => {
  const { categoryName } = useParams();
  const { t } = useTranslation();
  
  return (
    <div className="product-list-page">
      <div className="page-header">
        <h1>
          {categoryName 
            ? `${categoryName.charAt(0).toUpperCase()}${categoryName.slice(1)}`
            : t('allProducts')}
        </h1>
        <p className="description">
          {categoryName
            ? t('categoryDescription', { category: categoryName })
            : t('allProductsDescription')}
        </p>
      </div>
      
      <ProductList />
    </div>
  );
};

export default ProductListPage;