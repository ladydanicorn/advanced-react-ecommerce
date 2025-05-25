import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { configureStore } from '@reduxjs/toolkit';

// Import after mocking (now handled in setupTests.js)
import App from './App';

test('App renders with mocked router and Redux', () => {
  // Create a minimal test store
  const testStore = configureStore({
    reducer: {
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