import React from 'react';
import Cart from '../components/cart/Cart';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { getProducts } from '../api/fakestoreAPI';
import ProductCard from '../components/products/ProductCard';
import useCart from '../hooks/useCart';

const CartPage = () => {
  const { t } = useTranslation();
  const { cart } = useCart();
  
  // Fetch products for recommended items
  const { data: products } = useQuery(
    'products', 
    getProducts,
    {
      staleTime: 5 * 60 * 1000, 
    }
  );
  
  const getRecommendedProducts = () => {
    if (!products || products.length === 0) return [];
    
    const cartProductIds = cart.map(item => item.id);
    const availableProducts = products.filter(product => !cartProductIds.includes(product.id));
    
    return availableProducts
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  };
  
  const recommendedProducts = getRecommendedProducts();
  
  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>{t('yourShoppingCart')}</h1>
      </div>
      
      <Cart />
      
      {/* Recommended products section */}
      {recommendedProducts.length > 0 && (
        <div className="recommended-products">
          <h2>{t('youMightAlsoLike')}</h2>
          <div className="products-grid">
            {recommendedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;