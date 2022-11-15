import '../styles/globals.css';
import { ProductsProvider } from '../context/products_context';
import { FilterProvider } from '../context/filter_context';
import { CartProvider } from '../context/cart_context';
import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <Navbar />
            <Sidebar />
            <Component {...pageProps} />
            <Footer />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </SessionProvider>
  );
}

export default MyApp;
