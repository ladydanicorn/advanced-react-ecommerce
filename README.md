# Advanced React E-Commerce Application
A modern, feature-rich e-commerce web application built with React, Redux Toolkit, and FakeStoreAPI.

### User CRUD Functionality ✅

#### User Management
- **Create User:** 
  - Implemented registration component in `Register.js`
  - Utilizes FakeStoreAPI for user creation
  - Provides form validation and error handling

- **Login Component:** 
  - Created `Login.js` with authentication logic
  - Stores authentication token in session storage
  - Implements protected routes using authentication status

- **Profile Management:**
  - Developed `Profile.js` allowing users to:
    - Update profile information
    - View current account details
    - Delete account with confirmation

- **Session Management:**
  - Persistent authentication using session storage
  - Token-based authentication
  - Automatic redirection for protected routes

### Product Catalog Features ✅

#### Product Exploration
- **Home Page:** 
  - Displays featured products
  - Category navigation
  - Responsive design

- **Product Listing:**
  - Comprehensive product display
  - Advanced filtering options
  - Sorting capabilities (price, name)
  - Category-based browsing

- **Product Details:**
  - Detailed product information
  - Add to cart functionality
  - Quantity selection

### Shopping Cart Implementation ✅

- **Cart Management:**
  - Add/remove products
  - Update product quantities
  - Calculate total price
  - Persist cart state using Redux and session storage

- **Checkout Simulation:**
  - Clear cart functionality
  - Order confirmation alert
  - Recommended products feature

### State Management ✅

- **Redux Toolkit:**
  - Centralized state management
  - Cart slice for managing cart state
  - Persistent cart storage

### Performance Optimization ✅

- **Hooks Optimization:**
  - `useMemo` for memoizing expensive computations
  - `useCallback` for optimizing function references
  - Efficient re-rendering strategies

### Internationalization ✅

- **Language Support:**
  - English and Spanish translations
  - Implemented with react-i18next
  - Language switcher component

### Accessibility and Testing ✅

- **Accessibility Features:**
  - Semantic HTML
  - ARIA attributes
  - Keyboard navigation support

- **Testing:**
  - Unit tests for components
  - Integration tests
  - Mocked API responses
  - Jest and React Testing Library

## Technical Achievements

- Utilized FakeStoreAPI for realistic data simulation
- Implemented protected routing
- Created reusable components
- Responsive mobile-first design
- Comprehensive error handling

## Technologies Used

- React
- Redux Toolkit
- React Router
- React Query
- i18next
- Jest & React Testing Library
- Fake Store API

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
```bash
git clone https://github.com/ladydanicorn/advanced-react-ecommerce.git
cd advanced-react-ecommerce
npm install
npm start
```

## Running Tests
```bash
npm test
```

## License
MIT License

