import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import configureStore from './store';

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