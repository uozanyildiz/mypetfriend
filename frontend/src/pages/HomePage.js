import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ArticleCard from '../components/ArticleCard';
import { CardColumns, Container } from 'react-bootstrap';
import { DateTime } from 'luxon';
import axios from 'axios';
import Loading from '../components/Loading';
import NoContentFound from '../components/NoContentFound';
import Layout from './Layout';
const HomePage = () => {
	const [cardList, setCardList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const url = process.env.REACT_APP_API_URL;

	const fetchArticles = async () => {
		setIsLoading(true);
		const response = await axios.get(`${url}/articles`);
		const data = response.data;
		const articles = data.map((article) => {
			//Getting epoch time from articles for sorting by descending
			const date = DateTime.fromISO(article.published_at).ts;
			const image = url + article.image.url;
			return {
				id: article.id,
				title: article.title,
				description: article.description,
				image: image,
				date: date,
			};
		});
		const cardList = articles
			//Article sorting function by descending
			.sort((a, b) => b.date - a.date)
			.map((article) => <ArticleCard key={article.id} {...article} />);
		setCardList(cardList);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchArticles();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Layout>
				{isLoading && <Loading />}
				{!isLoading && cardList.length === 0 && <NoContentFound />}
				{!isLoading && cardList.length !== 0 && (
					<>
						<h2 className='text-center'>Son yazılar</h2>
						<CardColumns className='mt-4'>{cardList}</CardColumns>
					</>
				)}
			</Layout>
		</>
	);
};

export default HomePage;
