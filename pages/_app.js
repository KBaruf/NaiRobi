import '../styles/globals.css';
import { ProductsProvider } from '../context/products_context';
import { FilterProvider } from '../context/filter_context';
import { CartProvider } from '../context/cart_context';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
function MyApp({ Component, pageProps }) {
  return (
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
  );
}

export default MyApp;
