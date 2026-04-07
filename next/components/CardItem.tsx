import { Card } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { getCompressedImageUrl } from '../lib/utils';
import type { BlogAuthor } from '../lib/api';

type CardLink = {
  href: string;
  as: string;
};

type CardItemProps = {
  title?: string;
  subtitle?: string;
  link?: CardLink;
  coverImage?: string;
  date?: string;
  author?: BlogAuthor;
};

const CardItem = ({
  title,
  subtitle,
  link,
  coverImage,
  date,
  author,
}: CardItemProps) => {
  return (
    <Card className='fj-card'>
      <div className='card-body-wrapper'>
        <Card.Header className='d-flex flex-row'>
          <Image
            src={
              getCompressedImageUrl(author?.avatar, 50, 50, 'crop') ||
              '/file.svg'
            }
            className='rounded-circle me-3'
            alt='avatar'
            width={50}
            height={50}
            unoptimized
          />
          <div>
            <Card.Title className='font-weight-bold mb-1'>
              {author?.name}
            </Card.Title>
            <Card.Text className='card-date'>{date}</Card.Text>
          </div>
        </Card.Header>
        <div className='view overlay card-image-container'>
          <Image
            src={
              getCompressedImageUrl(coverImage, 320, 240, 'crop') || '/file.svg'
            }
            alt='Card image cap'
            className='card-image'
            width={320}
            height={240}
            style={{
              maxWidth: '100%',
              margin: '1rem 0',
            }}
            unoptimized
          />
        </div>
        <Card.Body>
          <Card.Title className='card-main-title'>{title}</Card.Title>
          <Card.Text>{subtitle}</Card.Text>
        </Card.Body>
      </div>
      {link && (
        <Link className='card-button' href={link.href} as={link.as}>
          Read More
        </Link>
      )}
    </Card>
  );
};

export default CardItem;
