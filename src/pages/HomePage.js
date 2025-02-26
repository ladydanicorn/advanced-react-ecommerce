import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getProducts } from '../api/fakestoreAPI';
import ProductCard from '../components/products/ProductCard';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  
  // Fetch products
  const { data: products, isLoading, error } = useQuery(
    'products', 
    getProducts,
    {
      staleTime: 5 * 60 * 1000, 
    }
  );
  
  // Select a few products as featured products
  useEffect(() => {
    if (products && products.length > 0) {
      // Get 4 random products for feature
      const randomProducts = [...products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      
      setFeaturedProducts(randomProducts);
    }
  }, [products]);
  
  if (isLoading) return <div>Loading featured products...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;
  
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>{t('welcomeToStore')}</h1>
          <p>{t('storeTagline')}</p>
          <Link to="/products" className="cta-button">
            {t('shopNow')}
          </Link>
        </div>
      </section>
      
      <section className="featured-products">
        <h2>{t('featuredProducts')}</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="view-all">
          <Link to="/products">{t('viewAllProducts')}</Link>
        </div>
      </section>
      
      <section className="categories-section">
        <h2>{t('shopByCategory')}</h2>
        <div className="categories-grid">
          <Link to="/category/electronics" className="category-card">
            <div className="category-name">Electronics</div>
          </Link>
          <Link to="/category/jewelery" className="category-card">
            <div className="category-name">Jewelry</div>
          </Link>
          <Link to="/category/men's clothing" className="category-card">
            <div className="category-name">Men's Clothing</div>
          </Link>
          <Link to="/category/women's clothing" className="category-card">
            <div className="category-name">Women's Clothing</div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;