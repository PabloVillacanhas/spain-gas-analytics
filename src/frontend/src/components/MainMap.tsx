import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MapboxLayer } from '@deck.gl/mapbox';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { debuglog } from 'util';

interface Props {}

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

const MainMap = () => {
	// DeckGL and mapbox will both draw into this WebGL context
	const [glContext, setGLContext] = useState();
	const deckRef: React.MutableRefObject<any> = useRef(undefined);
	const mapRef: React.MutableRefObject<any> = useRef(undefined);

	const [results, setResults] = useState<React.SetStateAction<any>>(undefined);
	const [layers, setLayers] = useState(undefined);
	const [analitycs, setAnalitycs] =
		useState<React.SetStateAction<any>>(undefined);

	useEffect(() => {
		fetch('http://localhost:5000/api/v1/gas_stations')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				// console.log(data.filter((item) => !item.coordinates.geometry));
				data = data.map((item) => {
					return {
						feature: {
							...item.coordinates,
							properties: {
								...item.coordinates.properties,
								name: item.name,
								prices: item.last_price[0] || [],
							},
						},
					};
				});
				console.log(`object`, data);
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

	const getPointColor = (percent) => {
		const color1 = {
			r: 21,
			g: 121,
			b: 9,
		};
		const color2 = {
			r: 255,
			g: 0,
			b: 0,
		};
		const resultRed = color1.r + percent * (color2.r - color1.r);
		const resultGreen = color1.g + percent * (color2.g - color1.g);
		const resultBlue = color1.b + percent * (color2.b - color1.b);
		return [160, 0, 180, 200];
	};

	function getStandardDeviation(array) {
		const n = array.length;
		const mean = array.reduce((a, b) => a + b) / n;
		console.log(
			Math.sqrt(
				array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
			)
		);
		return Math.sqrt(
			array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
		);
	}

	useEffect(() => {
		if (results) {
			const layer = new GeoJsonLayer({
				id: 'geojson-layer',
				data: {
					type: 'FeatureCollection',
					features: results.map((p) => p.feature),
				},
				pickable: true,
				stroked: false,
				filled: true,
				pointType: 'circle',
				getFillColor: (d) => getPointColor(d),
				pointRadiusMinPixels: 3,
				pointRadiusMaxPixels: 5,
			});
			setLayers(layer);
			console.log(
				`getStandardDeviation(results.map(f => f.feature.properties.prices.diesel_a))`,
				getStandardDeviation(
					results
						.filter((f) => f.feature.properties.prices.diesel_a)
						.map((f) => f.feature.properties.prices.diesel_a)
				)
			);
			// setAnalitycs({
			// 	diesel_a:
			// 		results.reduce((acc, curr) => {
			// 			if (curr.feature.properties.prices.diesel_a)
			// 				return (acc += curr.feature.properties.prices.diesel_a);
			// 			else return acc;
			// 		}, 0) /
			// 		results.filter((f) => f.feature.properties.prices.diesel_a).length,
			// 	standard_diesel_a_deviation: getStandardDeviation(
			// 		results.map((f) => f.feature.properties.prices.diesel_a)
			// 	),
			// });
		}
	}, [results]);

	return (
		<DeckGL
			ref={deckRef}
			layers={layers ? [layers] : []}
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
						html: `<h2>${object.properties.name}</h2><div>${JSON.stringify(
							object.properties.prices
						)}</div>`,
						style: {
							backgroundColor: '#f00',
							fontSize: '0.8em',
						},
					};
				}
			}}
		>
			<div style={{ backgroundColor: 'fff	' }}>{!results && 'Loading'}</div>
			<div style={{ backgroundColor: 'fff	' }}>
				{analitycs && JSON.stringify(analitycs)}
			</div>
			{glContext && (
				<StaticMap
					ref={mapRef}
					gl={glContext}
					mapStyle='mapbox://styles/	mapbox/dark-v9'
					mapboxApiAccessToken={MAPBOX_TOKEN}
					onLoad={onMapLoad}
				/>
			)}
		</DeckGL>
	);
};

export default MainMap;
