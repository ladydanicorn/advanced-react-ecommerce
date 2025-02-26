import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getProductById } from '../../api/fakestoreAPI';
import useCart from '../../hooks/useCart';
import { useTranslation } from 'react-i18next';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { t } = useTranslation();
  
  // Fetch product details using React Query
  const { data: product, isLoading, error } = useQuery(
    ['product', id],
    () => getProductById(id),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  if (isLoading) return <div>Loading product details...</div>;
  if (error) return <div>Error loading product: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    // Add the product to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${product.title} ${t('addedToCart')}`;
    document.body.appendChild(notification);
    
    // Remove the notification after animation completes
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 2500);
  };

  return (
    <div className="product-detail-container">
      <div className="product-navigation">
        <Link to="/products">&larr; {t('backToProducts')}</Link>
      </div>
      
      <div className="product-detail">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-detail-image" 
          />
        </div>
        
        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>
          
          <div className="product-meta">
            <span className="product-category">
              {t('category')}: <Link to={`/category/${product.category}`}>{product.category}</Link>
            </span>
          </div>
          
          <div className="product-price">
            ${product.price.toFixed(2)}
          </div>
          
          <div className="product-description">
            <h3>{t('description')}</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="product-actions">
            <div className="quantity-control">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            
            <button 
              className="add-to-cart-button"
              onClick={handleAddToCart}
            >
              {t('addToCart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;