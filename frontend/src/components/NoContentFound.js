import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import Layout from '../pages/Layout';

const NoContentFound = ({
	message = 'Herhangi bir içerik bulamadık, bir önceki sayfaya geri dönmek ister misiniz?',
	button = true,
}) => {
	const history = useHistory();
	const goBackHandler = () => {
		history.goBack();
	};

	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<title>{process.env.REACT_APP_WEBSITE_NAME}</title>
			</Helmet>
			<Layout>
				<Col className='d-flex justify-content-center align-items-center flex-column text-center'>
					<h4>{message}</h4>
					{button && (
						<Button variant='primary' onClick={goBackHandler}>
							Geri dön
						</Button>
					)}
				</Col>
			</Layout>
		</>
	);
};

export default NoContentFound;
