import React from 'react';
import { Row, Spinner } from 'react-bootstrap';

const Loading = ({ message = 'Yükleniyor...' }) => {
  return (
    <>
      <Row className='justify-content-center'>
        <Spinner
          animation='border'
          variant='prime'
          size='lg'
          className='mr-2'
        />
        <h3>{message}</h3>
      </Row>
    </>
  );
};

export default Loading;
