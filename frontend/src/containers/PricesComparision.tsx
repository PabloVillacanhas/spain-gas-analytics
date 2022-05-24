import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PriceChart, {
	Datum,
	PriceEvolutionData,
} from '../components/PriceChart';

interface Props {}

export const PricesComparision = (props: Props) => {
	const [analytics, setAnalytics] = useState([]);

	useEffect(() => {
		fetch(`http://${HOST_API}/api/v1/analytics/prices_evolution`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setAnalytics(data);
			});
	}, []);

	const adapter = (typesToCompare) => {
		let data: PriceEvolutionData = [];
		typesToCompare.forEach((type: string) => {
			const datums: Array<Datum> = analytics.map(
				(a) =>
					({
						x: new Date(a['date']),
						y: parseFloat(parseFloat(a[type]).toFixed(3)),
					} as unknown as Datum)
			);
			data.push({ label: type, data: datums });
		});
		return data;
	};

	return (
		<Container maxWidth='xl'>
			<h1>Prices comparision</h1>
			{analytics.length > 0 && (
				<PriceChart
					title={'Prices comparision'}
					data={adapter(['diesel_a', 'diesel_prem', 'diesel_b'])}
				></PriceChart>
			)}
		</Container>
	);
};
