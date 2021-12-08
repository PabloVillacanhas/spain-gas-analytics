import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MapboxLayer } from '@deck.gl/mapbox';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import CircularProgress from '@mui/material/CircularProgress';
import { MapFilterGasStations, MapFilterParams } from './MapFilterGasStations';
import { carburantsNamesMap } from '../constants';
import { useGeolocation } from '../hooks';

const MAPBOX_TOKEN =
	'pk.eyJ1IjoicGFibG91dmUiLCJhIjoiY2thZ2swZ3FyMDdhbzMwbzBhcjJyMGN1NSJ9.seD7xemUdt9UPOyqiFuJcA';

const INITIAL_VIEW_STATE = {
	altitude: 1.5,
	bearing: 0,
	height: 936,
	latitude: 39.997882266594274,
	longitude: -4.459719935562588,
	maxPitch: 60,
	maxZoom: 20,
	minPitch: 0,
	minZoom: 0,
	normalize: undefined,
	pitch: 0,
	width: 1033,
	zoom: 5.67760421641584,
};

interface MainMapProps {}

const MainMap = () => {
	// DeckGL and mapbox will both draw into this WebGL context
	const [glContext, setGLContext] = useState();
	const deckRef: React.MutableRefObject<any> = useRef(undefined);
	const mapRef: React.MutableRefObject<any> = useRef(undefined);

	// const { geolocationPosition } = useGeolocation();

	const [results, setResults] = useState<React.SetStateAction<any>>(undefined);
	const [filter, setFilter] = useState<MapFilterParams>({
		gasType: 'diesel_a',
		sellType: [],
		serviceType: [],
	});
	const [layerProps, setLayerProps] = useState({
		id: 'geojson-layer',
		pointRadiusMaxPixels: 5,
		data: {
			type: 'FeatureCollection',
			features: [],
		},
		pickable: true,
		stroked: false,
		filled: true,
		pointType: 'circle',
		pointRadiusMinPixels: 3,
	});
	const [analitycs, setAnalitycs] = useState<any>(undefined);

	useEffect(() => {
		fetch('http://localhost:5000/api/v1/gas_stations')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				data = data.map((item) => {
					return {
						feature: {
							...item.coordinates,
							properties: {
								sale_type: item.sale_type,
								service_type: item.service_type,
								name: item.name,
								prices: item.last_price[0] || [],
							},
						},
					};
				});
				setResults(data);
			});
	}, []);

	const onMapLoad = useCallback(() => {
		if (mapRef.current && deckRef.current) {
			const map = mapRef.current.getMap();
			const deck = deckRef.current.deck;
			// You must initialize an empty deck.gl layer to prevent flashing
			map.addLayer(
				// This id has to match the id of the deck.gl layer
				new MapboxLayer({ id: 'my-scatterplot', deck })
				// Optionally define id from Mapbox layer stack under which to add deck layer
				// 'before-layer-id'
			);
		}
	}, []);

	const getPointColor = (price, gasType) => {
		const price_diff = price - analitycs[`main_${gasType}`];

		if (
			price_diff > -analitycs[`std_deviation_${gasType}`] &&
			price_diff < analitycs[`std_deviation_${gasType}`]
		)
			return [223, 125, 20];
		else if (
			price_diff <= -analitycs[`std_deviation_${gasType}`] &&
			price_diff > -analitycs[`std_deviation_${gasType}`] * 2
		)
			return [107, 208, 4];
		else if (
			price_diff <= -analitycs[`std_deviation_${gasType}`] * 2 &&
			price_diff > -analitycs[`std_deviation_${gasType}`] * 3
		)
			return [71, 208, 3];
		else if (price_diff <= -analitycs[`std_deviation_${gasType}`] * 3)
			return [0, 0, 255];
		else if (
			price_diff >= analitycs[`std_deviation_${gasType}`] &&
			price_diff < analitycs[`std_deviation_${gasType}`] * 2
		)
			return [255, 72, 0];
		else if (
			price_diff >= analitycs[`std_deviation_${gasType}`] * 2 &&
			price_diff < analitycs[`std_deviation_${gasType}`] * 3
		)
			return [255, 0, 0];
		else if (price_diff >= analitycs[`std_deviation_${gasType}`] * 3)
			return [0, 0, 0];
	};

	function getStandardDeviation(array) {
		const n = array.length;
		const mean = array.reduce((a, b) => a + b) / n;
		return Math.sqrt(
			array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
		);
	}

	useEffect(() => {
		if (analitycs && filter) {
			const newLayerProps = {
				data: {
					type: 'FeatureCollection',
					features: results
						.filter((p) => matchsFilters(p))
						.map((p) => p.feature),
				},
				getFillColor: (d) =>
					filter &&
					getPointColor(d.properties.prices[filter.gasType], filter.gasType),
				getLineColor: (d) =>
					filter &&
					getPointColor(d.properties.prices[filter.gasType], filter.gasType),
			};
			setLayerProps({ ...layerProps, ...newLayerProps });
		}
	}, [analitycs, filter]);

	const matchsFilters = useCallback(
		(feature) => {
			const by_gasType = feature.feature.properties.prices[filter.gasType];
			const by_serviceType = filter.serviceType.some((type) => {
				return (
					feature.feature.properties.service_type?.includes(`(${type})`) ||
					(type === 'NA' && !feature.feature.properties.service_type)
				);
			});
			const by_sellType = filter.sellType.some(
				(type) => feature.feature.properties.sale_type === type
			);
			return by_gasType && by_serviceType && by_sellType;
		},
		[filter]
	);

	useEffect(() => {
		if (results && filter) {
			let newAnalitycs = {};
			Object.keys(carburantsNamesMap).forEach((type) => {
				const main =
					results.reduce((acc, curr) => {
						if (matchsFilters(curr))
							return (acc += curr.feature.properties.prices[type]);
						else return acc;
					}, 0) / results.filter((f) => matchsFilters(f)).length;
				const stdDeviation = getStandardDeviation(
					results
						.filter((f) => matchsFilters(f))
						.map((f) => f.feature.properties.prices[type])
				);
				newAnalitycs[`main_${type}`] = main;
				newAnalitycs[`std_deviation_${type}`] = stdDeviation;
			});
			console.log(`analitycs`, analitycs);
			setAnalitycs({ ...analitycs, ...newAnalitycs });
		}
	}, [results, filter]);

	return (
		<div
			style={{
				overflow: 'hidden',
				height: '100%',
				position: 'relative',
			}}
		>
			{!results && (
				<div
					style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 1 }}
				>
					<CircularProgress />
				</div>
			)}
			<DeckGL
				ref={deckRef}
				layers={[new GeoJsonLayer(layerProps)]}
				// initialViewState={{
				// 	...INITIAL_VIEW_STATE,
				// 	...(geolocationPosition
				// 		? {
				// 				longitude: geolocationPosition.coords.longitude,
				// 				latitude: geolocationPosition.coords.latitude,
				// 				zoom: 12,
				// 		  }
				// 		: {}),
				// }}
				initialViewState={INITIAL_VIEW_STATE}
				controller={true}
				onWebGLInitialized={setGLContext}
				glOptions={{
					/* To render vector tile polygons correctly */
					stencil: true,
				}}
				getTooltip={({ object }) => {
					if (object) {
						return {
							html: `<div>${object.properties.name}</div><div>${JSON.stringify(
								object.properties.prices.diesel_a
							)}€</div>`,
							style: {
								fontSize: '0.8em',
							},
						};
					}
				}}
			>
				{glContext && (
					<StaticMap
						ref={mapRef}
						gl={glContext}
						mapStyle='mapbox://styles/mapbox/streets-v11'
						mapboxApiAccessToken={MAPBOX_TOKEN}
						onLoad={onMapLoad}
					/>
				)}
				<MapFilterGasStations
					onFilterChange={(filter: MapFilterParams) => setFilter(filter)}
				></MapFilterGasStations>
			</DeckGL>
		</div>
	);
};

export default MainMap;
