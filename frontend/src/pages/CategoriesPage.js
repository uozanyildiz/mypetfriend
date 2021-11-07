import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import { CardColumns } from 'react-bootstrap';
import Loading from '../components/Loading';
import NoContentFound from '../components/NoContentFound';
import Layout from './Layout';
import { Helmet } from 'react-helmet';
const CategoriesPage = () => {
	const [cards, setCards] = useState([]);
	const [categoryCount, setCategoryCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const url = process.env.REACT_APP_API_URL;

	const fetchCategories = async () => {
		setIsLoading(true);
		const response = await axios.get(url + '/categories');
		const data = await response.data;
		const categories = data.map((category) => {
			return {
				id: category.id,
				title: category.title,
				description: category.description,
				image: url + category.image.url,
				lastUpdated: category.updated_at,
			};
		});
		const categoryCards = categories.map((category) => (
			<CategoryCard key={category.id} {...category} />
		));
		setCards(categoryCards);
		setCategoryCount(categoryCards.length);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<title>{process.env.REACT_APP_WEBSITE_NAME} - Kategoriler</title>
			</Helmet>
			<Layout>
				{isLoading && <Loading />}
				{!isLoading && categoryCount === 0 && <NoContentFound />}
				{!isLoading && categoryCount !== 0 && (
					<>
						<Row className='justify-content-md-center align-items-center'>
							<h2 className='text-center'>Kategoriler</h2>
							<h6 className='text-center text-muted ml-2'>
								({categoryCount} kategori)
							</h6>
						</Row>
						<CardColumns className='mt-4'>{cards}</CardColumns>
					</>
				)}
			</Layout>
		</>
	);
};

export default CategoriesPage;
