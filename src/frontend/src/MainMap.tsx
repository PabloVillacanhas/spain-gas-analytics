import React, { useCallback, useRef, useState } from 'react';
import { MapboxLayer } from '@deck.gl/mapbox';
import { MapController, StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';

interface Props {}

const MAPBOX_TOKEN =
	'pk.eyJ1IjoicGFibG91dmUiLCJhIjoiY2thZ2swZ3FyMDdhbzMwbzBhcjJyMGN1NSJ9.seD7xemUdt9UPOyqiFuJcA';

const INITIAL_VIEW_STATE = {
	longitude: -74.5,
	latitude: 40,
	zoom: 9,
};

const MainMap = () => {
	// DeckGL and mapbox will both draw into this WebGL context
	const [glContext, setGLContext] = useState();
	const deckRef: React.MutableRefObject<any> = useRef(undefined);
	const mapRef: React.MutableRefObject<any> = useRef(undefined);

	useEffect(() => {
		//fetch data
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

	return (
		<DeckGL
			ref={deckRef}
			// layers={layers}
			initialViewState={INITIAL_VIEW_STATE}
			controller={true}
			onWebGLInitialized={setGLContext}
			glOptions={{
				/* To render vector tile polygons correctly */
				stencil: true,
			}}
		>
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
