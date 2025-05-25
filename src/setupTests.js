import '@testing-library/jest-dom';

// Mock react-router-dom globally to avoid CI resolution issues
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: ({ children }) => <div data-testid="route">{children}</div>,
  Navigate: () => <div data-testid="navigate">Navigate</div>,
  Link: ({ children, to, ...props }) => <a href={to} data-testid="link" {...props}>{children}</a>,
  useNavigate: () => jest.fn(),
  useParams: () => ({}),
  useLocation: () => ({ pathname: '/' }),
}));

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

// Mock react-i18next globally since it's used everywhere
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
}));

// Mock custom hooks
jest.mock('./hooks/useCart', () => ({
  __esModule: true,
  default: () => ({
    addItem: jest.fn(),
    removeItem: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
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