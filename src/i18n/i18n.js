import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "home": "Home",
      "products": "Products",
      "categories": "Categories",
      "cart": "Cart",
      "profile": "Profile",
      "orders": "Orders",
      "login": "Login",
      "register": "Register",
      "logout": "Logout",
      "logoutSuccess": "You have been successfully logged out",
      
      // Product listings
      "allProducts": "All Products",
      "allProductsDescription": "Explore our wide range of products",
      "categoryDescription": "Browse our selection of {category} products",
      "productsFound": "products found",
      "noProductsFound": "No products found matching your filters.",
      "searchProducts": "Search products...",
      "priceRange": "Price Range",
      "sortBy": "Sort By",
      "sortOptions": {
        "default": "Default",
        "priceLowToHigh": "Price: Low to High",
        "priceHighToLow": "Price: High to Low",
        "nameAtoZ": "Name: A to Z",
        "nameZtoA": "Name: Z to A"
      },
      
      // Product details
      "backToProducts": "Back to Products",
      "category": "Category",
      "description": "Description",
      "addToCart": "Add to Cart",
      "addedToCart": "added to cart!",
      "loadingProduct": "Loading product details...",
      "errorLoadingProduct": "Error loading product",
      "productNotFound": "Product not found",
      "viewDetails": "View Details",
      
      // Home page
      "welcomeToStore": "Welcome to FakeStore",
      "storeTagline": "Find the best products at the best prices",
      "shopNow": "Shop Now",
      "featuredProducts": "Featured Products",
      "viewAllProducts": "View All Products",
      "shopByCategory": "Shop by Category",
      
      // Cart
      "yourShoppingCart": "Your Shopping Cart",
      "emptyCart": "Your cart is empty. Start shopping to add items to your cart!",
      "totalItems": "Total Items",
      "totalAmount": "Total Amount",
      "price": "Price",
      "total": "Total",
      "remove": "Remove",
      "clearCart": "Clear Cart",
      "checkout": "Checkout",
      "orderSuccess": "Thank you for your purchase! Your order has been placed.",
      "youMightAlsoLike": "You might also like",
      "itemAddedToCart": "Item added to cart",
      
      // Auth forms
      "username": "Username",
      "email": "Email",
      "password": "Password",
      "enterUsername": "Enter your username",
      "enterPassword": "Enter your password",
      "loginSuccess": "Login successful!",
      "loginFailed": "Login failed. Please try again.",
      "registerSuccess": "Registration successful!",
      "registerFailed": "Registration failed. Please try again.",
      "updateProfile": "Update Profile",
      "profileUpdated": "Profile updated successfully!",
      "profileUpdateFailed": "Profile update failed. Please try again.",
      "deleteAccount": "Delete Account",
      "accountDeleted": "Account deleted successfully!",
      "accountDeletionFailed": "Account deletion failed. Please try again.",
      "createAccount": "Create Account",
      "loginDescription": "Sign in to your account to access your profile and orders",
      "registerDescription": "Create a new account to start shopping",
      "dontHaveAccount": "Don't have an account?",
      "registerHere": "Register here",
      "alreadyHaveAccount": "Already have an account?",
      "loginHere": "Login here",
      "deleteAccountConfirmation": "Are you sure you want to delete your account? This action cannot be undone.",
      "pleaseLogin": "Please login to view your profile",
      "updating": "Updating...",
      "deleting": "Deleting...",
      "deleteAccountWarning": "This action cannot be undone. All your data will be permanently deleted.",
      "leaveEmptyPassword": "Leave empty to keep current password",
      
      // User profile
      "yourProfile": "Your Profile",
      "profileDescription": "Manage your account details",
      
      // Order history
      "orderHistory": "Order History",
      "orderHistoryDescription": "View your past orders and their details",
      "noOrders": "You haven't placed any orders yet.",
      "yourOrders": "Your Orders",
      "orderDetails": "Order Details",
      "order": "Order",
      "date": "Date",
      "items": "Items",
      "loadingOrders": "Loading order history...",
      "orderItemsLoading": "Loading order items..."
    }
  },
  es: {
    translation: {
      // Navigation
      "home": "Inicio",
      "products": "Productos",
      "categories": "Categorías",
      "cart": "Carrito",
      "profile": "Perfil",
      "orders": "Pedidos",
      "login": "Iniciar Sesión",
      "register": "Registrarse",
      "logout": "Cerrar Sesión",
      "logoutSuccess": "Has cerrado sesión correctamente",
      
      // Product listings
      "allProducts": "Todos los Productos",
      "allProductsDescription": "Explora nuestra amplia gama de productos",
      "categoryDescription": "Explora nuestra selección de productos de {category}",
      "productsFound": "productos encontrados",
      "noProductsFound": "No se encontraron productos que coincidan con tus filtros.",
      "searchProducts": "Buscar productos...",
      "priceRange": "Rango de Precio",
      "sortBy": "Ordenar Por",
      "sortOptions": {
        "default": "Predeterminado",
        "priceLowToHigh": "Precio: De Menor a Mayor",
        "priceHighToLow": "Precio: De Mayor a Menor",
        "nameAtoZ": "Nombre: A a Z",
        "nameZtoA": "Nombre: Z a A"
      },
      
      // Product details
      "backToProducts": "Volver a Productos",
      "category": "Categoría",
      "description": "Descripción",
      "addToCart": "Añadir al Carrito",
      "addedToCart": "añadido al carrito!",
      "loadingProduct": "Cargando detalles del producto...",
      "errorLoadingProduct": "Error al cargar el producto",
      "productNotFound": "Producto no encontrado",
      "viewDetails": "Ver Detalles",
      
      // Home page
      "welcomeToStore": "Bienvenido a FakeStore",
      "storeTagline": "Encuentra los mejores productos a los mejores precios",
      "shopNow": "Comprar Ahora",
      "featuredProducts": "Productos Destacados",
      "viewAllProducts": "Ver Todos los Productos",
      "shopByCategory": "Comprar por Categoría",
      
      // Cart
      "yourShoppingCart": "Tu Carrito de Compras",
      "emptyCart": "Tu carrito está vacío. ¡Comienza a comprar para añadir productos a tu carrito!",
      "totalItems": "Total de Productos",
      "totalAmount": "Importe Total",
      "price": "Precio",
      "total": "Total",
      "remove": "Eliminar",
      "clearCart": "Vaciar Carrito",
      "checkout": "Finalizar Compra",
      "orderSuccess": "¡Gracias por tu compra! Tu pedido ha sido realizado.",
      "youMightAlsoLike": "También te podría gustar",
      "itemAddedToCart": "Producto añadido al carrito",
      
      // Auth forms
      "username": "Nombre de Usuario",
      "email": "Correo Electrónico",
      "password": "Contraseña",
      "enterUsername": "Introduce tu nombre de usuario",
      "enterPassword": "Introduce tu contraseña",
      "loginSuccess": "¡Inicio de sesión exitoso!",
      "loginFailed": "Error al iniciar sesión. Inténtalo de nuevo.",
      "registerSuccess": "¡Registro exitoso!",
      "registerFailed": "Error al registrarse. Inténtalo de nuevo.",
      "updateProfile": "Actualizar Perfil",
      "profileUpdated": "¡Perfil actualizado con éxito!",
      "profileUpdateFailed": "Error al actualizar el perfil. Inténtalo de nuevo.",
      "deleteAccount": "Eliminar Cuenta",
      "accountDeleted": "¡Cuenta eliminada con éxito!",
      "accountDeletionFailed": "Error al eliminar la cuenta. Inténtalo de nuevo.",
      "createAccount": "Crear Cuenta",
      "loginDescription": "Inicia sesión en tu cuenta para acceder a tu perfil y pedidos",
      "registerDescription": "Crea una nueva cuenta para comenzar a comprar",
      "dontHaveAccount": "¿No tienes una cuenta?",
      "registerHere": "Regístrate aquí",
      "alreadyHaveAccount": "¿Ya tienes una cuenta?",
      "loginHere": "Inicia sesión aquí",
      "deleteAccountConfirmation": "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.",
      "pleaseLogin": "Por favor inicia sesión para ver tu perfil",
      "updating": "Actualizando...",
      "deleting": "Eliminando...",
      "deleteAccountWarning": "Esta acción no se puede deshacer. Todos tus datos serán eliminados permanentemente.",
      "leaveEmptyPassword": "Dejar vacío para mantener la contraseña actual",
      
      // User profile
      "yourProfile": "Tu Perfil",
      "profileDescription": "Gestiona los detalles de tu cuenta",
      
      // Order history
      "orderHistory": "Historial de Pedidos",
      "orderHistoryDescription": "Ver tus pedidos anteriores y sus detalles",
      "noOrders": "Aún no has realizado ningún pedido.",
      "yourOrders": "Tus Pedidos",
      "orderDetails": "Detalles del Pedido",
      "order": "Pedido",
      "date": "Fecha",
      "items": "Artículos",
      "loadingOrders": "Cargando historial de pedidos...",
      "orderItemsLoading": "Cargando artículos del pedido..."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;