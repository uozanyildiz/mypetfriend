import React, { useEffect, useState } from 'react';

import { Badge, Row } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from 'luxon';
import ReactMarkdown from 'react-markdown';
import Loading from '../components/Loading';
import NoContentFound from '../components/NoContentFound';
import Layout from './Layout';
import { Helmet } from 'react-helmet';

const ArticlePage = () => {
	const [article, setArticle] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const params = useParams();
	const articleId = params.id;
	const url = process.env.REACT_APP_API_URL;

	const fetchArticle = async () => {
		setIsLoading(true);
		const response = await axios.get(`${url}/articles/${articleId}`);
		const data = await response.data;
		const article = {
			title: data.title,
			content: data.content,
			categoryName: data.category.title,
			categoryId: data.category.id,
			date: DateTime.fromISO(data.published_at).setLocale('tr').toRelative(),
		};
		setArticle(article);
		setIsLoading(false);
	};
	useEffect(() => {
		fetchArticle();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Layout>
				{isLoading && <Loading />}
				{!isLoading && !article && <NoContentFound />}
				{!isLoading && article && (
					<>
						<Helmet>
							<meta charSet='utf-8' />
							<title>{article.title}</title>
						</Helmet>
						<Row className='align-items-center'>
							<h2 className='mt-4 '>{article.title}</h2>
							<Row className='ml-auto'>
								<h4 className='mr-2'>
									<Link to={`/categories/${article.categoryId}`}>
										<Badge variant='primary'>{article.categoryName}</Badge>
									</Link>
								</h4>
								<h4 className='mr-2'>
									<Badge variant='secondary'>{article.date}</Badge>
								</h4>
							</Row>
						</Row>
						<ReactMarkdown
							className='mt-4'
							transformImageUri={(uri) => url + uri}
						>
							{article.content}
						</ReactMarkdown>
					</>
				)}
			</Layout>
		</>
	);
};

export default ArticlePage;
