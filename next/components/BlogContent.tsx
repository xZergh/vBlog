import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { getCompressedImageUrl } from '../lib/utils';
import HighlightCode from './HighlightCode';
import ImageErrorBoundary from './ImageErrorBoundary';
import ErrorBoundary from './ErrorBoundary';
import type { Blog } from '../lib/api';

const portableTextComponents = {
  types: {
    image: ({
      value,
    }: {
      value: { asset?: { url?: string }; alt?: string };
    }) => {
      const { asset, alt } = value;
      return (
        <ImageErrorBoundary>
          <div className='blog-image'>
            <Image
              src={
                getCompressedImageUrl(asset?.url, 600, 300, 'crop') ||
                '/file.svg'
              }
              alt={alt || ''}
              width={600}
              height={300}
              style={{
                maxWidth: '100%',
                margin: '1rem 0',
              }}
              unoptimized
              onError={e => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                const fallback =
                  target.nextElementSibling as HTMLElement | null;
                if (fallback) {
                  fallback.style.display = 'block';
                }
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
      );
    },
    code: ({
      value,
    }: {
      value: { language?: string; code?: string; filename?: string };
    }) => {
      const { language, code = '', filename } = value;
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
};

type BlogContentProps = {
  blog: Blog | null;
};

const BlogContent = ({ blog }: BlogContentProps) => {
  if (!blog || !blog.content) {
    return (
      <div className='alert alert-warning'>
        <h4>Content Not Available</h4>
        <p>This blog post&apos;s content could not be loaded.</p>
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
