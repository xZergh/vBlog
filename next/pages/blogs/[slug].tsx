import { Col, Row } from 'react-bootstrap';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import PageLayout from '../../components/PageLayout';
import BlogHeader from '../../components/BlogHeader';
import BlogContent from '../../components/BlogContent';
import { getAllBlogs, getBlogBySlug } from '../../lib/api';
import { getCompressedImageUrl } from '../../lib/utils';
import type { Blog } from '../../lib/api';

const BlogDetail = ({
  blog,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export const getStaticProps: GetStaticProps<
  { blog: Blog },
  { slug: string }
> = async ({ params }) => {
  const slug = params?.slug ?? '';
  const blog = await getBlogBySlug(slug);

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
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const blogs = await getAllBlogs();
  const paths = blogs
    .filter(blog => Boolean(blog.slug))
    .map(blog => ({
      params: { slug: blog.slug },
    }));

  return {
    paths,
    fallback: false,
  };
};

export default BlogDetail;
