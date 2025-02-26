import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { useTranslation } from 'react-i18next';

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const { addItem } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    
    // Create and show the notification
    showAddToCartNotification(product.title);
  };
  
  // Function to show the add to cart notification
  const showAddToCartNotification = (productTitle) => {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${productTitle} ${t('addedToCart')}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 2500);
  };
  
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-details">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="view-details-button">
            {t('viewDetails')}
          </Link>
          <button 
            onClick={handleAddToCart}
            className="add-to-cart-button"
          >
            {t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;