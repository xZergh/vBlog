import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';
import ThemeProvider from '../providers/ThemeProvider';
import ErrorBoundary from '../components/ErrorBoundary';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary level='page'>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
