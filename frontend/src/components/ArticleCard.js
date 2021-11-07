import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import classes from './ArticleCard.module.css';
const ArticleCard = (props) => {
  const { id, title, image, description } = props;

  return (
    <Card>
      <Card.Img className={`mx-auto ${classes['card-img-top']}`} src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <LinkContainer to={`/article/${id}`}>
          <Button>Okumaya devam et..</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;
