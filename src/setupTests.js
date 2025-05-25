import '@testing-library/jest-dom';

// Mock axios to prevent ES module issues and include all needed methods
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
    create: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({ data: {} })),
      post: jest.fn(() => Promise.resolve({ data: {} })),
      put: jest.fn(() => Promise.resolve({ data: {} })),
      delete: jest.fn(() => Promise.resolve({ data: {} })),
    })),
  },
}));

// Only mock react-i18next globally since it's used everywhere
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
}));

// Mock components that are imported globally
jest.mock('./components/auth/Login', () => () => <div data-testid="login-component">Login Component</div>);
jest.mock('./components/auth/Register', () => () => <div data-testid="register-component">Register Component</div>);
jest.mock('./components/user/Profile', () => () => <div data-testid="profile-component">Profile Component</div>);
jest.mock('./components/products/ProductList', () => () => <div data-testid="product-list-component">ProductList Component</div>);
jest.mock('./components/products/ProductDetail', () => () => <div data-testid="product-detail-component">ProductDetail Component</div>);
jest.mock('./components/common/Navbar', () => () => <div data-testid="navbar-component">Navbar Component</div>);
jest.mock('./components/orders/OrderHistory', () => () => <div data-testid="order-history-component">OrderHistory Component</div>);