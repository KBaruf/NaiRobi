import '../styles/globals.css';
import { ProductsProvider } from '../context/products_context';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
function MyApp({ Component, pageProps }) {
  return (
    <ProductsProvider>
      <Navbar />
      <Sidebar />
      <Component {...pageProps} />
      <Footer />
    </ProductsProvider>
  );
}

export default MyApp;
