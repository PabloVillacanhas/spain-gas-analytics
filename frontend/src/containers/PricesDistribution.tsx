import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AxisBandOptions, AxisOptions, Chart, UserSerie } from 'react-charts';
import PriceChart, {
	Datum,
	PriceEvolutionData,
} from '../components/PriceChart';

interface Props {}

type TDatum = { x: string; y: number };

export const PricesDistribution = (props: Props) => {
	const [results, setResults] = useState<Array<Map<string, number>>>();

	useEffect(() => {
		fetch(`http://${HOST_API}/api/v1/analytics/prices`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setResults(data);
			});
	}, []);

	const adapter = (results): UserSerie<TDatum>[] => {
		let pricesAggregated: Map<string, number> = new Map();
		results
			?.map((p) => p['diesel_a'])
			.filter((r) => Boolean(r))
			.forEach(
				(curr: number) => {
					console.log(curr);
					const key = curr.toFixed(2);
					const value = pricesAggregated.get(key) || 0;
					pricesAggregated.set(key, value + 1);
				},
				[Infinity, -1]
			);
		console.log('pricesAggregated :>> ', pricesAggregated);
		const data: UserSerie<TDatum>[] = [
			{
				label: 'num',
				data: Array.from(pricesAggregated.entries())
					.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
					.map(([key, val]) => ({
						x: key,
						y: val,
					})),
			},
		];
		console.log('data :>> ', data);
		return data;
	};

	const primaryAxis = React.useMemo<AxisBandOptions<TDatum>>(
		() => ({
			getValue: (datum) => datum.x,
		}),
		[]
	);

	const secondaryAxes = React.useMemo<AxisBandOptions<TDatum>[]>(
		() => [
			{
				getValue: (datum) => datum.y,
			},
		],
		[]
	);

	return (
		<Container maxWidth='xl'>
			<h1>Prices distribution</h1>
			{results && (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						padding: '12px',
						height: '400px',
					}}
				>
					<div
						style={{
							flex: '0 0 auto',
							padding: '10px',
						}}
					>
						<h3>{'Prices distribution'}</h3>
					</div>
					<div
						style={{
							flex: 2,
							maxHeight: '400px',
							margin: '10px',
							overflow: 'hidden',
						}}
					>
						<Chart
							options={{
								data: adapter(results),
								primaryAxis,
								secondaryAxes,
							}}
						/>
					</div>
				</div>
			)}
		</Container>
	);
};
