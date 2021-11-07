import React from 'react';
import { Button, Col, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from './Header';

const LoadingError = () => {
  const history = useHistory();
  const goBackHandler = () => {
    history.goBack();
  };

  return (
    <>
      <Header />
      <Container className='mt-4'>
        <Col className='d-flex justify-content-center align-items-center flex-column'>
          <h4>
            İçerik yüklenirken bir hata oluştu, bir önceki sayfaya geri dönmek
            ister misiniz?
          </h4>
          <Button variant='primary' onClick={goBackHandler}>
            Geri dön
          </Button>
        </Col>
      </Container>
    </>
  );
};

export default LoadingError;
