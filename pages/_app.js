import '../styles/globals.css';
import ResponsiveOptimizer from '../components/MobileOptimizer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ResponsiveOptimizer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 