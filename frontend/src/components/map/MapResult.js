import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faStore } from '@fortawesome/free-solid-svg-icons';
import { Accordion, Button, Card, Col, Row } from 'react-bootstrap';
import Rating from '../Rating';
const MapResult = (props) => {
  const { address, locationUrl, name, rating, totalRating, index, resultType } =
    props;
  const icon = resultType === 'vet' ? faHospital : faStore;
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
        <Col className=''>
          <Row className='align-items-center mb-1'>
            <FontAwesomeIcon size='2x' icon={icon} className='mr-2' /> {name}
          </Row>
          <Row>
            <Rating rating={rating} totalRating={totalRating} />
          </Row>
        </Col>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={index.toString()}>
        <Card.Body>
          <div className='mb-2'>Adres: {address}</div>
          <a href={locationUrl} target='_blank' rel='noreferrer'>
            <Button>Haritalarda aç</Button>
          </a>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default MapResult;
