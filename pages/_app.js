import '../styles/globals.css';
import { ProductsProvider } from '../context/products_context';
import { FilterProvider } from '../context/filter_context';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
function MyApp({ Component, pageProps }) {
  return (
    <ProductsProvider>
      <FilterProvider>
        <Navbar />
        <Sidebar />
        <Component {...pageProps} />
        <Footer />
      </FilterProvider>
    </ProductsProvider>
  );
}

export default MyApp;
