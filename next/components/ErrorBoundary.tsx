import React from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';

type FallbackProps = {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  onRetry: () => void;
  errorId: string | null;
};

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
  level?: 'page' | 'component';
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorId: string | null;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(_error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      errorId:
        Date.now().toString(36) + Math.random().toString(36).substring(2),
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    });
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback, level = 'page' } = this.props;

      if (Fallback) {
        return (
          <Fallback
            error={this.state.error}
            errorInfo={this.state.errorInfo}
            onRetry={this.handleRetry}
            errorId={this.state.errorId}
          />
        );
      }

      if (level === 'component') {
        return (
          <Alert variant='warning' className='m-3'>
            <Alert.Heading>Something went wrong</Alert.Heading>
            <p>
              This component encountered an error and couldn&apos;t be
              displayed.
            </p>
            <Button
              variant='outline-warning'
              size='sm'
              onClick={this.handleRetry}
            >
              Try Again
            </Button>
          </Alert>
        );
      }

      return (
        <Container className='mt-5'>
          <Row className='justify-content-center'>
            <Col md={8} lg={6}>
              <div className='text-center'>
                <h1 className='display-4 text-danger mb-4'>Oops!</h1>
                <h2 className='h4 mb-3'>Something went wrong</h2>
                <p className='text-muted mb-4'>
                  We&apos;re sorry, but something unexpected happened. Please
                  try refreshing the page.
                </p>

                <div className='d-flex gap-2 justify-content-center mb-4'>
                  <Button variant='primary' onClick={this.handleRetry}>
                    Try Again
                  </Button>
                  <Button
                    variant='outline-secondary'
                    onClick={() => {
                      window.location.href = '/';
                    }}
                  >
                    Go Home
                  </Button>
                </div>

                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <Alert variant='danger' className='text-start mt-4'>
                    <Alert.Heading>Development Error Details:</Alert.Heading>
                    <details>
                      <summary>Error Message</summary>
                      <pre className='mt-2'>{this.state.error.toString()}</pre>
                    </details>
                    {this.state.errorInfo && (
                      <details className='mt-2'>
                        <summary>Component Stack</summary>
                        <pre className='mt-2'>
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </details>
                    )}
                  </Alert>
                )}

                <small className='text-muted'>
                  Error ID: {this.state.errorId}
                </small>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
