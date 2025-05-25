import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

// Mock react-router-dom before importing App using requireActual for better compatibility
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
    Routes: ({ children }) => <div data-testid="routes">{children}</div>,
    Route: ({ children }) => <div data-testid="route">{children}</div>,
    Navigate: () => <div data-testid="navigate">Navigate</div>,
    Link: ({ children, to }) => <a href={to} data-testid="link">{children}</a>,
    useNavigate: () => jest.fn(),
    useParams: () => ({}),
    useLocation: () => ({ pathname: '/' }),
  };
});

// Import after mocking
import App from './App';
import * as storeModule from './store'; // Import everything to see what's available

test('App renders with mocked router and Redux', () => {
  // Try different ways to get the store
  const store = storeModule.store || storeModule.default || storeModule.default();
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  );

  expect(screen.getByTestId('navbar-component')).toBeInTheDocument();
  expect(screen.getByTestId('browser-router')).toBeInTheDocument();
  expect(screen.getByTestId('routes')).toBeInTheDocument();
});