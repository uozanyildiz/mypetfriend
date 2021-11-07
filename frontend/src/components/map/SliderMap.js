import React, { useCallback, useRef, useState } from 'react';
import {
	GoogleMap,
	useJsApiLoader,
	Circle,
	Marker,
} from '@react-google-maps/api';
import './SliderMap.css';
import { Overlay, Tooltip } from 'react-bootstrap';
import Loading from '../Loading';

const rangeValues = [1000, 3000, 5000, 10000, 30000];
//Had to use some magic values, because zoom scale values are a little bit tricky (https://gis.stackexchange.com/questions/7430/what-ratio-scales-do-google-maps-zoom-levels-correspond-to)
const zoomValues = [13.8, 12.3, 11.5, 10.5, 9];

const SliderMap = ({ latitude, longitude, radiusHandler }) => {
	const defaultCenter = {
		lat: latitude,
		lng: longitude,
	};

	const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
	// eslint-disable-next-line no-unused-vars
	const [map, setMap] = useState(null);
	const [radius, setRadius] = useState(rangeValues[0]);
	const [zoom, setZoom] = useState(zoomValues[0]);
	const overlayTarget = useRef(null);
	const kilometerText = `${radius / 1000} km`;

	const { isLoaded } = useJsApiLoader({
		id: 'map-with-slider',
		googleMapsApiKey: apiKey,
		language: 'tr',
	});

	const onLoad = useCallback(
		(map) => {
			const bounds = new window.google.maps.LatLngBounds();
			const newBounds = new window.google.maps.LatLng(latitude, longitude);
			bounds.extend(newBounds);
			//This offset is required for first initialization of map, otherwise it'll zoom in too much
			const boundOffsets = 0.006;
			bounds.extend({
				lat: latitude + boundOffsets,
				lng: longitude + boundOffsets,
			});
			bounds.extend({
				lat: latitude - boundOffsets,
				lng: longitude - boundOffsets,
			});
			map.fitBounds(bounds);
			setMap(map);
		},
		[latitude, longitude]
	);

	const onUnmount = useCallback((map) => {
		setMap(null);
	}, []);

	const sliderHandler = (e) => {
		const value = parseInt(e.target.value) - 1;
		const radius = rangeValues[value];
		setRadius(rangeValues[value]);
		setZoom(zoomValues[value]);
		radiusHandler(radius);
	};

	return isLoaded ? (
		<div className='mb-2'>
			<GoogleMap
				mapContainerStyle={{
					width: '100%',
					height: '30vh',
				}}
				center={defaultCenter}
				zoom={zoom}
				onZoomChanged={() => {}}
				onLoad={onLoad}
				onUnmount={onUnmount}
			>
				<Marker position={defaultCenter} />
				<Circle
					center={defaultCenter}
					options={{
						strokeColor: '#FFFFFF',
						strokeOpacity: 0.4,
						strokeWeight: 1,
						fillColor: '#95a5a9',
						fillOpacity: 0.45,
						clickable: false,
						draggable: false,
						editable: false,
						visible: true,
						radius: radius,
						zIndex: 1,
					}}
				></Circle>
			</GoogleMap>
			<Overlay show={true} target={overlayTarget} placement='top'>
				{(props) => (
					<Tooltip id='range-info' {...props}>
						<span>{kilometerText}</span>
					</Tooltip>
				)}
			</Overlay>
			<input
				ref={overlayTarget}
				type='range'
				defaultValue='1'
				min='1'
				step='1'
				max='5'
				className='slider'
				onChange={sliderHandler}
			/>
		</div>
	) : (
		<Loading />
	);
};

export default SliderMap;
