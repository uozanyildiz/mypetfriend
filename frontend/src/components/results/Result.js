import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Result = (props) => {
	const { type, title, id, dateOrCount } = props;
	const resultText =
		type === 'CATEGORY' ? 'Son yazı tarihi' : 'Toplam yazı sayısı';
	return (
		<Row className='ml-1'>
			<Link to={`/categories/${id}`}>
				<span>{title} </span>
			</Link>
			<span className='ml-1 text-muted'>
				{' '}
				- {resultText}: {dateOrCount}
			</span>
		</Row>
	);
};

export default Result;
