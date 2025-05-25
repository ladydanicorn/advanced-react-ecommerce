import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { configureStore } from '@reduxjs/toolkit';

// Mock react-router-dom before importing App - robust approach for local and CI
jest.mock('react-router-dom', () => {
  try {
    const actual = jest.requireActual('react-router-dom');
    return {
      ...actual,
      BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
      Routes: ({ children }) => <div data-testid="routes">{children}</div>,
      Route: ({ children }) => <div data-testid="route">{children}</div>,
      Navigate: () => <div data-testid="navigate">Navigate</div>,
      Link: ({ children, to, ...props }) => <a href={to} data-testid="link" {...props}>{children}</a>,
      useNavigate: () => jest.fn(),
      useParams: () => ({}),
      useLocation: () => ({ pathname: '/' }),
    };
  } catch (error) {
    // Fallback for CI environments where requireActual might fail
    return {
      BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
      Routes: ({ children }) => <div data-testid="routes">{children}</div>,
      Route: ({ children }) => <div data-testid="route">{children}</div>,
      Navigate: () => <div data-testid="navigate">Navigate</div>,
      Link: ({ children, to, ...props }) => <a href={to} data-testid="link" {...props}>{children}</a>,
      useNavigate: () => jest.fn(),
      useParams: () => ({}),
      useLocation: () => ({ pathname: '/' }),
    };
  }
});

// Import after mocking
import App from './App';

test('App renders with mocked router and Redux', () => {
  // Create a minimal test store
  const testStore = configureStore({
    reducer: {
      // Add a minimal reducer to prevent store errors
      test: (state = {}, action) => state,
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  render(
    <Provider store={testStore}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  );

  expect(screen.getByTestId('navbar-component')).toBeInTheDocument();
  expect(screen.getByTestId('browser-router')).toBeInTheDocument();
  expect(screen.getByTestId('routes')).toBeInTheDocument();
});