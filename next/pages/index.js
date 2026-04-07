
import { Row, Col, Button, Container } from 'react-bootstrap';
import FilterMenu from '../components/FilterMenu';
import PageLayout from '../components/PageLayout';
import BlogErrorBoundary from '../components/BlogErrorBoundary';
import ErrorBoundary from '../components/ErrorBoundary';
import React, { useState } from 'react';
import { useGetBlogsPages } from '../actions/pagination';
import { getAllBlogs } from '../lib/api';

export default function HomePage({ blogs: initialData }) {
  const [filter, setFilter] = useState({ 
    view: { list: false },
    date: { asc: false }
  });
  
  const {
    renderBlogs,
    loadMore,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    error
  } = useGetBlogsPages({ 
    initialData, 
    filter, 
    pageSize: 6,
    autoload: true,
  });

  const toggleView = () => {
    setFilter(prev => ({
      ...prev,
      view: { list: !prev.view.list }
    }));
  };

  if (error) {
    return (
      <PageLayout>
        <Container>
          <Row>
            <Col md="12" className="text-center">
              <div className="alert alert-danger">
                <h4>Error Loading Blogs</h4>
                <p>We encountered an error while loading the blog posts: {error.message}</p>
                <Button 
                  variant="primary" 
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <ErrorBoundary level="component">
        <FilterMenu
          filter={filter}
          onChange={(option, value) => {
            setFilter(prevFilter => ({ ...prevFilter, [option]: value }));
          }}
        />
      </ErrorBoundary>
      
      <hr />
      
      <div className={`page-wrapper`}>
        <BlogErrorBoundary>
          <Row className='mb-5'>
            {renderBlogs()}
          </Row>
        </BlogErrorBoundary>
      </div>

      {/* Load More Button */}
      {!isEmpty && !isReachingEnd && (
        <Row className="mt-4">
          <Col md="12" className="text-center">
            <Button 
              onClick={loadMore} 
              disabled={isLoadingMore}
              variant="primary"
              size="lg"
            >
              {isLoadingMore ? 'Loading...' : 'Load More Blogs'}
            </Button>
          </Col>
        </Row>
      )}

      {/* End of results message */}
      {isReachingEnd && !isEmpty && (
        <Row className="mt-4">
          <Col md="12" className="text-center">
            <p className="text-muted">You've reached the end of the blogs!</p>
          </Col>
        </Row>
      )}
    </PageLayout>
  );
}

export async function getStaticProps() {
  try {
    const blogs = await getAllBlogs('desc');
    
    return {
      props: {
        blogs: blogs || []
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        blogs: []
      },
      revalidate: 60
    };
  }
}
