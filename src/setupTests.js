import '@testing-library/jest-dom';

// Mock react-router-dom globally with manual mock
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => {
    const React = require('react');
    return React.createElement('div', { 'data-testid': 'browser-router' }, children);
  },
  Routes: ({ children }) => {
    const React = require('react');
    return React.createElement('div', { 'data-testid': 'routes' }, children);
  },
  Route: ({ children }) => {
    const React = require('react');
    return React.createElement('div', { 'data-testid': 'route' }, children);
  },
  Navigate: () => {
    const React = require('react');
    return React.createElement('div', { 'data-testid': 'navigate' }, 'Navigate');
  },
  Link: ({ children, to, ...props }) => {
    const React = require('react');
    return React.createElement('a', { 'data-testid': 'link', href: to, ...props }, children);
  },
  useNavigate: () => jest.fn(),
  useParams: () => ({}),
  useLocation: () => ({ pathname: '/' }),
}), { virtual: true });

// Mock other dependencies
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
}));

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

// Mock components
jest.mock('./components/common/Navbar', () => () => {
  const React = require('react');
  return React.createElement('div', { 'data-testid': 'navbar-component' }, 'Navbar Component');
});

// Don't mock useCart globally - let individual tests handle it