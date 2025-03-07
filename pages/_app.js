import '../styles/globals.css';
import dynamic from 'next/dynamic';

// Import ResponsiveOptimizer with no SSR to avoid hydration issues
const ResponsiveOptimizer = dynamic(
  () => import('../components/MobileOptimizer'),
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ResponsiveOptimizer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 