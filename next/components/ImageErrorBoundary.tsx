import ErrorBoundary from './ErrorBoundary';

type ImageErrorFallbackProps = {
  onRetry: () => void;
};

const ImageErrorFallback = ({ onRetry }: ImageErrorFallbackProps) => (
  <div className='bg-light border rounded p-3 text-center'>
    <div className='text-muted mb-2'>
      <i className='bi bi-image' style={{ fontSize: '2rem' }}></i>
    </div>
    <p className='text-muted mb-2'>Image failed to load</p>
    <button className='btn btn-sm btn-outline-secondary' onClick={onRetry}>
      Retry
    </button>
  </div>
);

type ImageErrorBoundaryProps = {
  children: React.ReactNode;
};

const ImageErrorBoundary = ({ children }: ImageErrorBoundaryProps) => (
  <ErrorBoundary level='component' fallback={ImageErrorFallback}>
    {children}
  </ErrorBoundary>
);

export default ImageErrorBoundary;
