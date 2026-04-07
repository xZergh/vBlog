import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';
import ThemeProvider from '../providers/ThemeProvider';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary level="page">
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default MyApp;