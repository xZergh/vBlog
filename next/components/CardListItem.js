import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { formatDateShort } from '../lib/dateUtils';

const CardListItem = ({ title, subtitle, author, link, date }) => {
  return (
    <Card className={`fj-card fj-card-list`}>
      <div className='card-body-wrapper'>
        <Card.Header className='d-flex flex-row'>
          <img
            src={author?.avatar}
            className='rounded-circle me-3'
            height='50px'
            width='50px'
            alt='avatar'
          />
          <div>
            <Card.Title className='font-weight-bold mb-1'>
              {author?.name}
            </Card.Title>
            <Card.Text className='card-date'>{formatDateShort(date)}</Card.Text>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title className='card-main-title'>{title}</Card.Title>
          <Card.Text>{subtitle}</Card.Text>
        </Card.Body>
      </div>

      {link && (
        <Link className='card-button' {...link}>
          Read More
        </Link>
      )}
    </Card>
  );
};

export default CardListItem;
