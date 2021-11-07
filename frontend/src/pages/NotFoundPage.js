import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Layout from './Layout';
const NotFoundPage = () => {
	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<title>{process.env.REACT_APP_WEBSITE_NAME} - 404</title>
			</Helmet>
			<Layout>
				<h2 className='text-center mt-5'>
					Sayfa bulunamadı, <Link to='/homepage'>anasayfaya</Link> dönmek ister
					misiniz?
				</h2>
			</Layout>
		</>
	);
};

export default NotFoundPage;
