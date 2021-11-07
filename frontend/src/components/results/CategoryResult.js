import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const CategoryResult = (props) => {
	const { title, id, count } = props;
	return (
		<Row className='ml-1'>
			<Link to={`/categories/${id}`}>
				<span>{title} </span>
			</Link>
			<span className='ml-1 text-muted'>- Toplam yazı sayısı: {count}</span>
		</Row>
	);
};

export default CategoryResult;
