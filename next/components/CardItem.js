import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { getCompressedImageUrl } from '../lib/utils';

const CardItem = ({ title, subtitle, link, coverImage, date, author }) => {
  return (
    <Card className={`fj-card`}>
      <div className='card-body-wrapper'>
        <Card.Header className='d-flex flex-row'>
          <img
            src={getCompressedImageUrl(author.avatar, 50, 50, 'crop')}
            className='rounded-circle me-3'
            alt='avatar'
          />
          <div>
            <Card.Title className='font-weight-bold mb-1'>
              {author.name}
            </Card.Title>
            <Card.Text className='card-date'>{date}</Card.Text>
          </div>
        </Card.Header>
        <div className='view overlay card-image-container'>
          <Card.Img
            src={getCompressedImageUrl(coverImage, 320, 240, 'crop')}
            alt='Card image cap'
            className='card-image'
            style={{
              maxWidth: '100%',
              margin: '1rem 0',
            }}
          />
        </div>
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

export default CardItem;
