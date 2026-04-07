
import React from 'react';
import { Alert } from 'react-bootstrap';
import ErrorBoundary from './ErrorBoundary';

const ImageErrorFallback = ({ onRetry }) => (
  <div className="bg-light border rounded p-3 text-center">
    <div className="text-muted mb-2">
      <i className="bi bi-image" style={{ fontSize: '2rem' }}></i>
    </div>
    <p className="text-muted mb-2">Image failed to load</p>
    <button 
      className="btn btn-sm btn-outline-secondary" 
      onClick={onRetry}
    >
      Retry
    </button>
  </div>
);

const ImageErrorBoundary = ({ children }) => (
  <ErrorBoundary 
    level="component" 
    fallback={ImageErrorFallback}
  >
    {children}
  </ErrorBoundary>
);

export default ImageErrorBoundary;
