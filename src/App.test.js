import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import configureStore from './store';

// Mock react-router-dom
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

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key) => key,
      i18n: {
        changeLanguage: jest.fn(),
        language: 'en'
      }
    };
  }
}));

// Mock components
jest.mock('./components/auth/Login', () => () => <div data-testid="login-component">Login Component</div>);
jest.mock('./components/auth/Register', () => () => <div data-testid="register-component">Register Component</div>);
jest.mock('./components/user/Profile', () => () => <div data-testid="profile-component">Profile Component</div>);
jest.mock('./components/products/ProductList', () => () => <div data-testid="product-list-component">ProductList Component</div>);
jest.mock('./components/products/ProductDetail', () => () => <div data-testid="product-detail-component">ProductDetail Component</div>);
jest.mock('./components/cart/Cart', () => () => <div data-testid="cart-component">Cart Component</div>);
jest.mock('./components/common/Navbar', () => () => <div data-testid="navbar-component">Navbar Component</div>);
jest.mock('./components/orders/OrderHistory', () => () => <div data-testid="order-history-component">OrderHistory Component</div>);

import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    const queryClient = new QueryClient();
    const store = configureStore();
    
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    );
    
    // Check if navbar is rendered
    expect(screen.getByTestId('navbar-component')).toBeInTheDocument();
    expect(screen.getByText('Navbar Component')).toBeInTheDocument();
    
    // Check if router structure is present
    expect(screen.getByTestId('browser-router')).toBeInTheDocument();
    expect(screen.getByTestId('routes')).toBeInTheDocument();
  });
});