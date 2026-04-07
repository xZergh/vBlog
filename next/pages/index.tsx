import { Button, Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import FilterMenu from '../components/FilterMenu';
import PageLayout from '../components/PageLayout';
import BlogErrorBoundary from '../components/BlogErrorBoundary';
import ErrorBoundary from '../components/ErrorBoundary';
import { useGetBlogsPages } from '../actions/pagination';
import { getAllBlogs } from '../lib/api';
import type { Blog } from '../lib/api';

type FilterState = {
  view: { list: boolean };
  date: { asc: boolean };
};

export default function HomePage({
  blogs: initialData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [filter, setFilter] = useState<FilterState>({
    view: { list: false },
    date: { asc: false },
  });

  const {
    renderBlogs,
    loadMore,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    error,
  } = useGetBlogsPages({
    initialData,
    filter,
    pageSize: 6,
    autoload: true,
  });

  if (error) {
    return (
      <PageLayout>
        <Container>
          <Row>
            <Col md='12' className='text-center'>
              <div className='alert alert-danger'>
                <h4>Error Loading Blogs</h4>
                <p>
                  We encountered an error while loading the blog posts:{' '}
                  {error.message}
                </p>
                <Button
                  variant='primary'
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
      <ErrorBoundary level='component'>
        <FilterMenu
          filter={filter}
          onChange={(option, value) => {
            setFilter(prevFilter => ({ ...prevFilter, [option]: value }));
          }}
        />
      </ErrorBoundary>

      <hr />

      <div className='page-wrapper'>
        <BlogErrorBoundary>
          <Row className='mb-5'>{renderBlogs()}</Row>
        </BlogErrorBoundary>
      </div>

      {!isEmpty && !isReachingEnd && (
        <Row className='mt-4'>
          <Col md='12' className='text-center'>
            <Button
              onClick={loadMore}
              disabled={isLoadingMore}
              variant='primary'
              size='lg'
            >
              {isLoadingMore ? 'Loading...' : 'Load More Blogs'}
            </Button>
          </Col>
        </Row>
      )}

      {isReachingEnd && !isEmpty && (
        <Row className='mt-4'>
          <Col md='12' className='text-center'>
            <p className='text-muted'>
              You&apos;ve reached the end of the blogs!
            </p>
          </Col>
        </Row>
      )}
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps<{ blogs: Blog[] }> = async () => {
  try {
    const blogs = await getAllBlogs('desc');
    return {
      props: {
        blogs: blogs || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        blogs: [],
      },
      revalidate: 60,
    };
  }
};
