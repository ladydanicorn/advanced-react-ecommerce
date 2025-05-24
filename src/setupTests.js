jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: ({ children }) => <div data-testid="route">{children}</div>,
  Navigate: () => <div data-testid="navigate">Navigate</div>,
  Link: ({ children, to }) => <a href={to} data-testid="link">{children}</a>,
  useNavigate: () => jest.fn(),
  useParams: () => ({}),
  useLocation: () => ({ pathname: '/' }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
}));

jest.mock('./components/auth/Login', () => () => <div data-testid="login-component">Login Component</div>);
jest.mock('./components/auth/Register', () => () => <div data-testid="register-component">Register Component</div>);
jest.mock('./components/user/Profile', () => () => <div data-testid="profile-component">Profile Component</div>);
jest.mock('./components/products/ProductList', () => () => <div data-testid="product-list-component">ProductList Component</div>);
jest.mock('./components/products/ProductDetail', () => () => <div data-testid="product-detail-component">ProductDetail Component</div>);
jest.mock('./components/cart/Cart', () => () => <div data-testid="cart-component">Cart Component</div>);
jest.mock('./components/common/Navbar', () => () => <div data-testid="navbar-component">Navbar Component</div>);
jest.mock('./components/orders/OrderHistory', () => () => <div data-testid="order-history-component">OrderHistory Component</div>);
