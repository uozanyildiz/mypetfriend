import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { DateTime } from 'luxon';
const CategoryCard = (props) => {
  const { id, title, description, image, lastUpdated } = props;
  const lastUpdatedTimeFormatted = DateTime.fromISO(lastUpdated)
    .setLocale('tr')
    .toRelative();
  return (
    <Card>
      <Card.Img variant='top' src={image} className='mx-auto' />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <LinkContainer to={`/categories/${id}`}>
          <Button variant='primary'>Yazıları gör</Button>
        </LinkContainer>
      </Card.Body>
      <Card.Footer>
        <Card.Text>Son yazı tarihi: {lastUpdatedTimeFormatted}</Card.Text>
      </Card.Footer>
    </Card>
  );
};

export default CategoryCard;
