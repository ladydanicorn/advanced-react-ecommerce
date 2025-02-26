import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getCarts, getProductById } from '../../api/fakestoreAPI';

const OrderHistory = () => {
  const [userCarts, setUserCarts] = useState([]);
  const [selectedCart, setSelectedCart] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  
  // Get user info from session storage
  const user = JSON.parse(sessionStorage.getItem('user')) || {};
  
  // Fetch all carts using React Query
  const { data: carts, isLoading, error } = useQuery(
    'carts',
    getCarts,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
  
  // Filter carts for the current user
  useEffect(() => {
    if (carts && user.id) {
      const userOrderCarts = carts.filter(cart => cart.userId === user.id);
      setUserCarts(userOrderCarts);
    }
  }, [carts, user.id]);
  
  // Fetch product details when a cart is selected
  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!selectedCart) return;
      
      try {
        const productPromises = selectedCart.products.map(async (item) => {
          const product = await getProductById(item.productId);
          return {
            ...product,
            quantity: item.quantity
          };
        });
        
        const products = await Promise.all(productPromises);
        setCartProducts(products);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };
    
    fetchCartProducts();
  }, [selectedCart]);
  
  const handleCartSelect = (cart) => {
    setSelectedCart(cart);
  };
  
  const calculateCartTotal = (cart) => {
    if (!cart || !cartProducts.length) return 0;
    
    return cartProducts.reduce(
      (total, product) => total + (product.price * product.quantity),
      0
    );
  };
  
  if (isLoading) return <div>Loading order history...</div>;
  if (error) return <div>Error loading orders: {error.message}</div>;
  
  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      
      {userCarts.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="order-history">
          <div className="order-list">
            <h3>Your Orders</h3>
            <ul>
              {userCarts.map(cart => (
                <li 
                  key={cart.id}
                  className={selectedCart && selectedCart.id === cart.id ? 'selected' : ''}
                  onClick={() => handleCartSelect(cart)}
                >
                  <div>Order #{cart.id}</div>
                  <div>Date: {new Date(cart.date).toLocaleDateString()}</div>
                  <div>Items: {cart.products.reduce((sum, item) => sum + item.quantity, 0)}</div>
                </li>
              ))}
            </ul>
          </div>
          
          {selectedCart && (
            <div className="order-details">
              <h3>Order Details</h3>
              <div className="order-meta">
                <p>Order #{selectedCart.id}</p>
                <p>Date: {new Date(selectedCart.date).toLocaleDateString()}</p>
              </div>
              
              {cartProducts.length > 0 ? (
                <>
                  <div className="order-items">
                    <h4>Items</h4>
                    <ul>
                      {cartProducts.map(product => (
                        <li key={product.id} className="order-item">
                          <div className="order-item-image">
                            <img src={product.image} alt={product.title} width="50" height="50" />
                          </div>
                          <div className="order-item-details">
                            <h5>{product.title}</h5>
                            <p>Quantity: {product.quantity}</p>
                            <p>Price: ${product.price.toFixed(2)}</p>
                            <p>Total: ${(product.price * product.quantity).toFixed(2)}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="order-total">
                    <h4>Order Total: ${calculateCartTotal(selectedCart).toFixed(2)}</h4>
                  </div>
                </>
              ) : (
                <p>Loading order items...</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;