import cartReducer, {
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItemQuantity,
} from './cartSlice';

describe('cartSlice', () => {
  const sampleItem = {
    id: 1,
    title: 'Test Product',
    price: 10,
    image: 'image.jpg',
  };

  it('should return the initial state', () => {
    const state = cartReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
    });
  });

  it('should handle addToCart (new item)', () => {
    const state = cartReducer(undefined, addToCart(sampleItem));
    expect(state.items).toHaveLength(1);
    expect(state.totalQuantity).toBe(1);
    expect(state.totalAmount).toBe(10);
  });

  it('should handle addToCart (existing item)', () => {
    const initialState = {
      items: [
        {
          ...sampleItem,
          quantity: 1,
          totalPrice: 10,
        },
      ],
      totalQuantity: 1,
      totalAmount: 10,
    };
    const state = cartReducer(initialState, addToCart(sampleItem));
    expect(state.items[0].quantity).toBe(2);
    expect(state.items[0].totalPrice).toBe(20);
    expect(state.totalQuantity).toBe(2);
    expect(state.totalAmount).toBe(20);
  });

  it('should handle removeFromCart (decrease quantity)', () => {
    const initialState = {
      items: [
        {
          ...sampleItem,
          quantity: 2,
          totalPrice: 20,
        },
      ],
      totalQuantity: 2,
      totalAmount: 20,
    };
    const state = cartReducer(initialState, removeFromCart(sampleItem.id));
    expect(state.items[0].quantity).toBe(1);
    expect(state.totalQuantity).toBe(1);
    expect(state.totalAmount).toBe(10);
  });

  it('should handle removeFromCart (remove item)', () => {
    const initialState = {
      items: [
        {
          ...sampleItem,
          quantity: 1,
          totalPrice: 10,
        },
      ],
      totalQuantity: 1,
      totalAmount: 10,
    };
    const state = cartReducer(initialState, removeFromCart(sampleItem.id));
    expect(state.items).toHaveLength(0);
    expect(state.totalQuantity).toBe(0);
    expect(state.totalAmount).toBe(0);
  });

  it('should handle clearCart', () => {
    const initialState = {
      items: [
        {
          ...sampleItem,
          quantity: 2,
          totalPrice: 20,
        },
      ],
      totalQuantity: 2,
      totalAmount: 20,
    };
    const state = cartReducer(initialState, clearCart());
    expect(state.items).toHaveLength(0);
    expect(state.totalQuantity).toBe(0);
    expect(state.totalAmount).toBe(0);
  });

  it('should handle updateCartItemQuantity', () => {
    const initialState = {
      items: [
        {
          ...sampleItem,
          quantity: 1,
          totalPrice: 10,
        },
      ],
      totalQuantity: 1,
      totalAmount: 10,
    };
    const state = cartReducer(initialState, updateCartItemQuantity({ id: 1, quantity: 3 }));
    expect(state.items[0].quantity).toBe(3);
    expect(state.items[0].totalPrice).toBe(30);
    expect(state.totalQuantity).toBe(3);
    expect(state.totalAmount).toBe(30);
  });
});
