import React, { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { CardColumns, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import NoContentFound from '../components/NoContentFound';
import Layout from './Layout';
import { Helmet } from 'react-helmet';
const CategoryPage = () => {
	const params = useParams();
	const categoryId = params.id;
	const url = process.env.REACT_APP_API_URL;
	const [articleCount, setArticleCount] = useState(0);
	const [articleList, setArticleList] = useState([]);
	const [categoryTitle, setCategoryTitle] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const fetchCategory = async () => {
		setIsLoading(true);
		const response = await axios.get(`${url}/categories/${categoryId}`);
		const data = await response.data;

		const categoryTitle = data.title;
		const count = data.articles.length;

		setCategoryTitle(categoryTitle);
		setArticleCount(count);
		const articles = data.articles.map((article) => {
			const image = url + article.image.formats.thumbnail.url;
			return {
				id: article.id,
				title: article.title,
				description: article.description,
				image: image,
			};
		});
		const articleElements = articles.map((article) => (
			<ArticleCard key={article.id} {...article} />
		));
		setArticleList(articleElements);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchCategory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Layout>
				{isLoading && <Loading />}
				{!isLoading && articleList.length === 0 && <NoContentFound />}
				{!isLoading && articleList.length !== 0 && (
					<>
						<Helmet>
							<meta charSet='utf-8' />
							<title>{categoryTitle}</title>
						</Helmet>
						<Row className='justify-content-md-center align-items-center'>
							<h2 className='text-center'>{categoryTitle}</h2>
							<h6 className='text-center text-muted ml-2'>
								({articleCount} yazı)
							</h6>
						</Row>
						<CardColumns className='mt-4'>{articleList}</CardColumns>
					</>
				)}
			</Layout>
		</>
	);
};

export default CategoryPage;
