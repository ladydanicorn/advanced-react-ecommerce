import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getProducts } from '../../api/fakestoreAPI';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { categoryName } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortOrder, setSortOrder] = useState('default');

  // Fetch products using React Query
  const { data: products, isLoading, error } = useQuery(
    ['products', categoryName], 
    () => getProducts(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Filter products by category and search term using useMemo
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter(product => {
      // Category filter
      if (categoryName && product.category !== categoryName) {
        return false;
      }

      // Search term filter
      if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Price range filter
      if (product.price < priceRange.min || product.price > priceRange.max) {
        return false;
      }

      return true;
    });
  }, [products, categoryName, searchTerm, priceRange]);

  // Sort products using useMemo
  const sortedProducts = useMemo(() => {
    if (!filteredProducts) return [];

    const productsToSort = [...filteredProducts];

    switch (sortOrder) {
      case 'price-asc':
        return productsToSort.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return productsToSort.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return productsToSort.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return productsToSort.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return productsToSort;
    }
  }, [filteredProducts, sortOrder]);

  // Handle search input change using useCallback
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Handle price range changes using useCallback
  const handlePriceChange = useCallback((e, type) => {
    const value = parseFloat(e.target.value);
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  }, []);

  // Handle sort order change using useCallback
  const handleSortChange = useCallback((e) => {
    setSortOrder(e.target.value);
  }, []);

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div className="product-list-container">
      <div className="product-filters">
        <h2>{categoryName ? `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}` : 'All Products'}</h2>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="price-filter">
          <label>
            Price Range:
            <input
              type="number"
              min="0"
              max={priceRange.max}
              value={priceRange.min}
              onChange={(e) => handlePriceChange(e, 'min')}
            />
            {' - '}
            <input
              type="number"
              min={priceRange.min}
              value={priceRange.max}
              onChange={(e) => handlePriceChange(e, 'max')}
            />
          </label>
        </div>
        
        <div className="sort-options">
          <label>
            Sort By:
            <select value={sortOrder} onChange={handleSortChange}>
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </label>
        </div>
      </div>
      
      <div className="products-count">
        <p>{sortedProducts.length} products found</p>
      </div>
      
      <div className="products-grid">
        {sortedProducts.length > 0 ? (
          sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found matching your filters.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;