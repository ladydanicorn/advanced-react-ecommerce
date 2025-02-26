import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCategories } from '../../api/fakestoreAPI';
import useCart from '../../hooks/useCart';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  // Check authentication status on mount and when location changes
  useEffect(() => {
    checkAuthStatus();
    
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [location.pathname]); // Re-check when route changes

  // Function to check if user is logged in
  const checkAuthStatus = () => {
    const token = sessionStorage.getItem('token');
    console.log('Token in sessionStorage:', token);
    
    const user = sessionStorage.getItem('user');
    console.log('User in sessionStorage:', user);
    
    setIsLoggedIn(!!token);
    console.log('Is user logged in?', !!token);
  };

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    // Update state
    setIsLoggedIn(false);
    
    // Navigate to home
    navigate('/');
    
    // Show logout confirmation
    alert(t('logoutSuccess'));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">{t('home')}</Link>
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger"></span>
        </button>
      </div>

      <div className={`navbar-menu ${isMobileMenuOpen ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <Link to="/products" className="navbar-item">{t('products')}</Link>
          
          <div 
            className="navbar-item has-dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="navbar-link">{t('categories')}</div>
            
            {isDropdownOpen && (
              <div className="navbar-dropdown">
                {categories.map(category => (
                  <Link 
                    key={category} 
                    to={`/category/${category}`}
                    className="navbar-item"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="navbar-end">
          <Link to="/cart" className="navbar-item cart-link">
            {t('cart')} ({totalItems})
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="navbar-item profile-link">{t('profile')}</Link>
              <Link to="/order-history" className="navbar-item">{t('orders')}</Link>
              <button onClick={handleLogout} className="navbar-item logout-button">{t('logout')}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-item">{t('login')}</Link>
              <Link to="/register" className="navbar-item">{t('register')}</Link>
            </>
          )}
          
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;