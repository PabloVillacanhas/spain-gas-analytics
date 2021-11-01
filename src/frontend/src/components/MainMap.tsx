import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MapboxLayer } from '@deck.gl/mapbox';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';

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

	useEffect(() => {
		fetch('http://localhost:5000/api/v1/gas_stations')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data.filter((item) => !item.coordinates.geometry));
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

	useEffect(() => {
		if (results) {
			const layer = new GeoJsonLayer({
				id: 'geojson-layer',
				data: {
					type: 'FeatureCollection',
					features: results.map((p) => p.coordinates),
				},
				pickable: true,
				stroked: false,
				filled: true,
				pointType: 'circle',
				getFillColor: [160, 0, 180, 200],
				pointRadiusMinPixels: 3,
				pointRadiusMaxPixels: 5,
			});
			setLayers(layer);
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
		>
			<div>{!results && 'Loading'}</div>
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
