import React from 'react';
import useCart from '../../hooks/useCart';

const Cart = () => {
  const { cart, totalItems, totalAmount, removeItem, updateItemQuantity, emptyCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        <p>Your cart is empty. Start shopping to add items to your cart!</p>
      </div>
    );
  }

  const handleCheckout = () => {
    alert('Thank you for your purchase! Your order has been placed.');
    emptyCart();
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-summary">
        <p>Total Items: {totalItems}</p>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      </div>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img src={item.image} alt={item.title} width="50" height="50" />
            </div>
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Total: ${item.totalPrice.toFixed(2)}</p>
            </div>
            <div className="cart-item-actions">
              <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-actions">
        <button onClick={emptyCart}>Clear Cart</button>
        <button onClick={handleCheckout} className="checkout-button">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;