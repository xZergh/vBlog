import { Alert, Button, Card } from 'react-bootstrap';
import ErrorBoundary from './ErrorBoundary';

type BlogErrorFallbackProps = {
  onRetry: () => void;
  errorId: string | null;
};

const BlogErrorFallback = ({ onRetry, errorId }: BlogErrorFallbackProps) => (
  <Card className='mb-4'>
    <Card.Body>
      <Alert variant='warning' className='mb-3'>
        <Alert.Heading className='h6'>Blog Post Error</Alert.Heading>
        <p className='mb-2'>
          This blog post couldn&apos;t be loaded properly. This might be due to:
        </p>
        <ul className='mb-3'>
          <li>Network connectivity issues</li>
          <li>Content formatting problems</li>
          <li>Missing or corrupted data</li>
        </ul>
        <div className='d-flex gap-2'>
          <Button variant='outline-warning' size='sm' onClick={onRetry}>
            Retry Loading
          </Button>
          <Button
            variant='outline-secondary'
            size='sm'
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
      </Alert>

      {process.env.NODE_ENV === 'development' && (
        <small className='text-muted'>Error ID: {errorId}</small>
      )}
    </Card.Body>
  </Card>
);

type BlogErrorBoundaryProps = {
  children: React.ReactNode;
};

const BlogErrorBoundary = ({ children }: BlogErrorBoundaryProps) => (
  <ErrorBoundary level='component' fallback={BlogErrorFallback}>
    {children}
  </ErrorBoundary>
);

export default BlogErrorBoundary;
