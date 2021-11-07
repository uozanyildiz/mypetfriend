import React, { useCallback, useEffect, useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';

import axios from 'axios';
import MapResult from '../components/map/MapResult';
import NoContentFound from '../components/NoContentFound';
import Loading from '../components/Loading';
import SliderMap from '../components/map/SliderMap';
import Layout from './Layout';
import { Helmet } from 'react-helmet';

const MapPage = () => {
	const url = process.env.REACT_APP_API_URL;
	//TODO: Fix this
	//const apiKey = 'AIzaSyCOGeOt9ndyafhFdPeQ6KZr5FLqJKl_0hQ';

	const [isPermissionGiven, setIsPermissionGiven] = useState(null);
	const [userLatitude, setUserLatitude] = useState(0);
	const [userLongitude, setUserLongitude] = useState(0);

	const [vetLocations, setVetLocations] = useState([]);
	const [petshopLocations, setPetshopLocations] = useState([]);

	const [vetNextPageToken, setVetNextPageToken] = useState('');
	const [petNextPageToken, setPetNextPageToken] = useState('');

	const [radius, setRadius] = useState(1000);

	const getUserLocation = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setUserLatitude(position.coords.latitude);
				setUserLongitude(position.coords.longitude);
				setIsPermissionGiven(true);
			},
			(err) => {
				//User denied geolocation.
				if (err.message === 1) setIsPermissionGiven(false);
			}
		);
	};

	const fetchVets = useCallback(async () => {
		const response = await axios.get(
			`${url}/places/veterinary_care/${userLatitude},${userLongitude}/${radius}`
		);
		const data = await response.data;
		if (data.next_page_token) {
			setVetNextPageToken(data.next_page_token);
		}
		const parsedVetLocations = parseLocations(data);
		setVetLocations(parsedVetLocations);
	}, [url, userLatitude, userLongitude, radius]);

	const fetchPetshops = useCallback(async () => {
		const response = await axios.get(
			`${url}/places/pet_store/${userLatitude},${userLongitude}/${radius}`
		);
		const data = await response.data;
		if (data.next_page_token) {
			setPetNextPageToken(data.next_page_token);
		}
		const parsedPetshops = parseLocations(data);
		setPetshopLocations(parsedPetshops);
	}, [radius, url, userLatitude, userLongitude]);

	const parseLocations = (responseData) => {
		const results = responseData.results.map((data) => {
			return {
				address: data.formatted_address,
				name: data.name,
				placeId: data.place_id,
				rating: data.rating,
				totalRating: data.user_ratings_total,
				locationUrl: encodeURI(
					`https://www.google.com/maps/search/?api=1&query=${data.formatted_address}&query_place_id=${data.place_id}`
				),
			};
		});
		return results;
	};

	const radiusHandler = (radius) => {
		setRadius(radius);
	};

	useEffect(() => {
		getUserLocation();
	}, []);

	useEffect(() => {
		if (userLatitude > 0 && userLongitude > 0) {
			fetchVets();
			fetchPetshops();
		}
	}, [radius, userLatitude, userLongitude, fetchVets, fetchPetshops]);

	const vetAccordion = (
		<Accordion>
			{vetLocations.map((vet, index) => (
				<MapResult resultType='vet' key={index} index={index} {...vet} />
			))}
		</Accordion>
	);

	const petshopAccordion = (
		<Accordion>
			{petshopLocations.map((petshop, index) => (
				<MapResult
					resultType='petshop'
					key={index}
					index={index}
					{...petshop}
				/>
			))}
		</Accordion>
	);

	const getNextPage = async (token) => {
		const { data } = await axios.get(`${url}/places/nextPage/${token}`);

		return data;
	};

	const petLoaderButton = () => {
		getNextPage(petNextPageToken).then((data) => {
			const parsedNextPlaces = parseLocations(data);
			setPetshopLocations((prev) => {
				return prev.concat(parsedNextPlaces);
			});
			if (data.next_page_token) {
				setPetNextPageToken(data.next_page_token);
			} else {
				setPetNextPageToken('');
			}
		});
	};

	const vetLoaderButton = () => {
		getNextPage(vetNextPageToken).then((data) => {
			const parsedNextPlaces = parseLocations(data);
			setVetLocations((prev) => {
				return prev.concat(parsedNextPlaces);
			});
			if (data.next_page_token) {
				setVetNextPageToken(data.next_page_token);
			} else {
				setVetNextPageToken('');
			}
		});
	};

	//Handle loading, permission and nothing found states

	if (isPermissionGiven === null)
		return (
			<Layout>
				<Loading message='Lokasyon izni alınıyor..' />
			</Layout>
		);

	if (!isPermissionGiven)
		return (
			<NoContentFound
				message='Lokasyon izni doğrulanamadı, lütfen lokasyon izni verip tekrar deneyiniz.'
				button={false}
			/>
		);

	//If no petshop or vets are found, show no content found page
	if (vetLocations.length === 0 && petshopLocations.length === 0)
		return (
			<NoContentFound
				message='Yakınınızda şu anda açık olan herhangi bir veteriner veya petshop bulunamadı, lütfen tekrar deneyiniz.'
				button={false}
			/>
		);

	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<title>{process.env.REACT_APP_WEBSITE_NAME} - Harita</title>
			</Helmet>
			<Layout>
				<h2 className='mt-4 mb-3 text-center'>
					{' '}
					En yakın veteriner ve petshoplar
				</h2>
				{userLatitude > 0 && userLongitude > 0 && (
					<SliderMap
						latitude={userLatitude}
						longitude={userLongitude}
						radiusHandler={radiusHandler}
					/>
				)}
				<Accordion>
					{vetLocations.length > 0 && (
						<>
							<Accordion.Toggle
								className='w-100 btn-secondary'
								as={Button}
								eventKey='1'
							>
								<h4>Veterinerler ({vetLocations.length})</h4>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey='1'>
								<Card>
									<Card.Body>{vetAccordion}</Card.Body>
									{vetNextPageToken.length > 0 ? (
										<Card.Footer className='d-flex'>
											<Button
												onClick={vetLoaderButton}
												className='text-center mx-auto'
											>
												Daha fazla yükle..
											</Button>
										</Card.Footer>
									) : (
										<></>
									)}
								</Card>
							</Accordion.Collapse>
						</>
					)}
					{petshopLocations.length > 0 && (
						<>
							<Accordion.Toggle
								className='w-100 mt-4 btn-secondary'
								as={Button}
								eventKey='2'
							>
								<h4>Petshoplar ({petshopLocations.length})</h4>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey='2'>
								<Card>
									<Card.Body>{petshopAccordion}</Card.Body>
									{petNextPageToken.length > 0 ? (
										<Card.Footer className='d-flex'>
											<Button
												onClick={petLoaderButton}
												className='text-center mx-auto'
											>
												Daha fazla yükle..
											</Button>
										</Card.Footer>
									) : (
										<></>
									)}
								</Card>
							</Accordion.Collapse>
						</>
					)}
				</Accordion>
			</Layout>
		</>
	);
};

export default MapPage;
