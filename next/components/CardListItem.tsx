import { Card } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { formatDateShort } from '../lib/dateUtils';
import type { BlogAuthor } from '../lib/api';

type CardLink = {
  href: string;
  as: string;
};

type CardListItemProps = {
  title?: string;
  subtitle?: string;
  author?: BlogAuthor;
  link?: CardLink;
  date?: string;
};

const CardListItem = ({
  title,
  subtitle,
  author,
  link,
  date,
}: CardListItemProps) => {
  return (
    <Card className='fj-card fj-card-list'>
      <div className='card-body-wrapper'>
        <Card.Header className='d-flex flex-row'>
          <Image
            src={author?.avatar || '/file.svg'}
            className='rounded-circle me-3'
            height={50}
            width={50}
            alt='avatar'
            unoptimized
          />
          <div>
            <Card.Title className='font-weight-bold mb-1'>
              {author?.name}
            </Card.Title>
            <Card.Text className='card-date'>
              {date ? formatDateShort(date) : ''}
            </Card.Text>
          </div>
        </Card.Header>
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

export default CardListItem;
