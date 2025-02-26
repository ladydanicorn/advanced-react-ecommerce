import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, clearCart, updateCartItemQuantity } from '../store/cartSlice';

/**
 * Custom hook to interact with the cart state
 * @returns {Object} Cart state and methods to interact with it
 */
export function useCart() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  
  const addItem = (product) => {
    dispatch(addToCart(product));
  };
  
  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };
  
  const updateItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      // If quantity is 0 or negative, remove the item
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateCartItemQuantity({ id: productId, quantity }));
    }
  };
  
  const emptyCart = () => {
    dispatch(clearCart());
  };
  
  return {
    cart: cartState.items,
    totalItems: cartState.totalQuantity,
    totalAmount: cartState.totalAmount,
    addItem,
    removeItem,
    updateItemQuantity,
    emptyCart
  };
}

export default useCart;