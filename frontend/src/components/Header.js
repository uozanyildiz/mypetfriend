import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
const Header = () => {
	const [searchText, setSearchText] = useState('');
	const history = useHistory();

	const searchTextChangeHandler = (e) => {
		setSearchText(e.target.value);
	};

	const searchButtonHandler = (e) => {
		e.preventDefault();
		if (searchText.trim().length === 0) return;

		history.push(`/search?query=${searchText}`);
	};

	const appName = process.env.REACT_APP_WEBSITE_NAME;

	return (
		<Navbar bg='light' expand='lg'>
			<Navbar.Brand>{appName}</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<LinkContainer to='/homepage'>
						<Nav.Link>Anasayfa</Nav.Link>
					</LinkContainer>
					<LinkContainer to='/categories'>
						<Nav.Link>Kategoriler</Nav.Link>
					</LinkContainer>
				</Nav>
				<Nav className='ml-auto mr-4'>
					<LinkContainer to='/map'>
						<Nav.Link>En yakın veterinerler & Petshoplar</Nav.Link>
					</LinkContainer>
				</Nav>
				<Form inline onSubmit={searchButtonHandler}>
					<FormControl
						type='text'
						placeholder='Yazı ara..'
						className='mr-sm-2'
						value={searchText}
						onChange={searchTextChangeHandler}
					/>
					<Button onClick={searchButtonHandler} variant='outline-success'>
						Ara
					</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
