import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';

const Layout = (props) => {
  return (
    <>
      <Header />
      <Container className='mt-4 mb-5'>{props.children}</Container>
    </>
  );
};

export default Layout;
