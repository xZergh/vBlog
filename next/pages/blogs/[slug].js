import PageLayout from '../../components/PageLayout';
import BlogHeader from '../../components/BlogHeader';
import BlogContent from '../../components/BlogContent';
import { Row, Col } from 'react-bootstrap';
import { getBlogBySlug, getAllBlogs } from '../../lib/api';
import { getCompressedImageUrl } from '../../lib/utils';

const BlogDetail = ({ blog }) => {
  return (
    <PageLayout className='blog-detail-page'>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            date={blog.date}
            coverImage={getCompressedImageUrl(blog.coverImage, 600, 300, 'fit')}
            author={blog.author}
          />
          <hr />
          <BlogContent blog={blog} />
        </Col>
      </Row>
    </PageLayout>
  );
};

export async function getStaticProps({ params }) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: {
      blog,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const paths = blogs.map(blog => {
    return { params: { slug: blog.slug } };
  });
  return {
    paths: paths,
    fallback: false,
  };
}

export default BlogDetail;
