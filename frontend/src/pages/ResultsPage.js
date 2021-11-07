import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import NoContentFound from '../components/NoContentFound';
import CategoryResult from '../components/results/CategoryResult';
import Loading from '../components/Loading';
import ArticleResult from '../components/results/ArticleResult';

import axios from 'axios';
import { DateTime } from 'luxon';
import Layout from './Layout';
import { Helmet } from 'react-helmet';

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const ResultsPage = () => {
	const [categories, setCategories] = useState([]);
	const [articles, setArticles] = useState([]);
	const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
	const [isArticlesLoading, setIsArticlesLoading] = useState(false);

	const totalResultCount = categories.length + articles.length;
	const url = process.env.REACT_APP_API_URL;
	const params = useQuery();
	const searchText = params.get('query');

	const searchCategories = async () => {
		setIsCategoriesLoading(true);
		const response = await axios.get(
			`${url}/categories?title_contains=${searchText}`
		);
		const data = await response.data;
		const categories = data.map((category) => {
			return {
				id: category.id,
				title: category.title,
				count: category.articles.length,
			};
		});
		setCategories(categories);
		setIsCategoriesLoading(false);
	};

	const searchArticles = async () => {
		setIsArticlesLoading(true);
		const response = await axios.get(
			`${url}/articles?title_contains=${searchText}`
		);
		const data = await response.data;
		const articles = data.map((article) => {
			const date = DateTime.fromISO(article.published_at)
				.setLocale('tr')
				.toRelative();
			return {
				id: article.id,
				title: article.title,
				date: date,
			};
		});
		setArticles(articles);
		setIsArticlesLoading(false);
	};

	const categoryResults = (
		<>
			<h4 className='mt-4 ml-1'>Kategoriler</h4>
			{categories.map((category) => (
				<CategoryResult key={category.id} {...category} />
			))}
		</>
	);

	const articleResults = (
		<>
			<h4 className='mt-4 ml-1'>Yazılar</h4>
			{articles.map((article) => (
				<ArticleResult key={article.id} {...article} />
			))}
		</>
	);

	useEffect(() => {
		searchCategories();
		searchArticles();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchText]);

	const showCategoryResults = !isCategoriesLoading && categories.length !== 0;
	const showArticleResults = !isArticlesLoading && articles.length !== 0;

	if (isArticlesLoading || isCategoriesLoading) return <Loading />;
	if (searchText.trim().length === 0) return <NoContentFound />;
	if (totalResultCount === 0) return <NoContentFound />;

	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<title>{process.env.REACT_APP_WEBSITE_NAME} - Arama Sonuçları</title>
			</Helmet>
			<Layout>
				<Row className='justify-content-md-center align-items-center'>
					<h2 className='text-center'>Arama sonuçları</h2>
					<h6 className='text-center text-muted ml-2'>
						({totalResultCount} sonuç)
					</h6>
				</Row>
				{showCategoryResults && categoryResults}
				{showArticleResults && articleResults}
			</Layout>
		</>
	);
};

export default ResultsPage;
