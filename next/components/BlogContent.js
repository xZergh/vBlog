import { PortableText } from '@portabletext/react';
import { getCompressedImageUrl } from '../lib/utils';
import HighlightCode from './HighlightCode';
import ImageErrorBoundary from './ImageErrorBoundary';
import ErrorBoundary from './ErrorBoundary';

const portableTextComponents = {
  types: {
    image: ({ value: { asset, alt } }) => (
      <ImageErrorBoundary>
        <div className='blog-image'>
          <img
            src={getCompressedImageUrl(asset?.url, 600, 300, 'crop')}
            alt={alt || ''}
            style={{
              maxWidth: '100%',
              margin: '1rem 0',
            }}
            onError={e => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div
            className='bg-light border rounded p-3 text-center text-muted'
            style={{ display: 'none' }}
          >
            <p>Image could not be loaded</p>
            <small>{alt || 'No description available'}</small>
          </div>
          <div className='image-alt'>{alt || ''}</div>
        </div>
      </ImageErrorBoundary>
    ),
    code: ({ value: { language, code, filename } }) => {
      return (
        <ErrorBoundary level='component'>
          <div>
            <HighlightCode language={language} filename={filename}>
              {code}
            </HighlightCode>
            <div className='code-filename'>{filename}</div>
          </div>
        </ErrorBoundary>
      );
    },
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code
        style={{
          background: '#f0f0f0',
          padding: '0.2rem 0.4rem',
          borderRadius: '3px',
        }}
      >
        {children}
      </code>
    ),
  },
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: '4px solid #ccc',
          paddingLeft: '1rem',
          margin: '1rem 0',
        }}
      >
        {children}
      </blockquote>
    ),
  },
};

const BlogContent = ({ blog }) => {
  if (!blog || !blog.content) {
    return (
      <div className='alert alert-warning'>
        <h4>Content Not Available</h4>
        <p>This blog post's content could not be loaded.</p>
      </div>
    );
  }

  return (
    <ErrorBoundary level='component'>
      <div className='blog-detail-content'>
        <PortableText
          value={blog.content}
          components={portableTextComponents}
        />
      </div>
    </ErrorBoundary>
  );
};

export default BlogContent;
