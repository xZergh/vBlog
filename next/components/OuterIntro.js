import { Row, Col, Image } from 'react-bootstrap';

const OuterInto = () => {
  return (
    <Row>
      <Col md='8'>
        <div className='d-flex mb-4 admin-intro'>
          <Image
            roundedCircle
            width={64}
            height={64}
            className='me-3'
            src="https://avatars.githubusercontent.com/u/108293518?s=400&u=87f5065f584cd8c05cebca07e1534cbfab1e8a2a&v=4"
            alt='Generic placeholder'
          />
          <div>
            <h5 className='font-weight-bold mb-0'>Hello Friends,</h5>
            <p className='welcome-text'>
              keep on doing the same thing over and over again and expecting different results. 
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default OuterInto;
