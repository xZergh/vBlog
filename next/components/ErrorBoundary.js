
import React from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    });
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback, level = 'page' } = this.props;
      
      // If a custom fallback component is provided, use it
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

      // Default fallback UI based on error level
      if (level === 'component') {
        return (
          <Alert variant="warning" className="m-3">
            <Alert.Heading>Something went wrong</Alert.Heading>
            <p>This component encountered an error and couldn't be displayed.</p>
            <Button variant="outline-warning" size="sm" onClick={this.handleRetry}>
              Try Again
            </Button>
          </Alert>
        );
      }

      // Page-level error fallback
      return (
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className="text-center">
                <h1 className="display-4 text-danger mb-4">Oops!</h1>
                <h2 className="h4 mb-3">Something went wrong</h2>
                <p className="text-muted mb-4">
                  We're sorry, but something unexpected happened. Please try refreshing the page.
                </p>
                
                <div className="d-flex gap-2 justify-content-center mb-4">
                  <Button variant="primary" onClick={this.handleRetry}>
                    Try Again
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => window.location.href = '/'}
                  >
                    Go Home
                  </Button>
                </div>

                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <Alert variant="danger" className="text-start mt-4">
                    <Alert.Heading>Development Error Details:</Alert.Heading>
                    <details>
                      <summary>Error Message</summary>
                      <pre className="mt-2">{this.state.error.toString()}</pre>
                    </details>
                    {this.state.errorInfo && (
                      <details className="mt-2">
                        <summary>Component Stack</summary>
                        <pre className="mt-2">{this.state.errorInfo.componentStack}</pre>
                      </details>
                    )}
                  </Alert>
                )}

                <small className="text-muted">
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
