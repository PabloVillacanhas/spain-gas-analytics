import { Container } from '@mui/material';
import React from 'react';
import PriceChart from '../components/PriceChart';
import { carburantsNamesMap } from '../constants';
import { useGetPriceEvolutionQuery } from '../services/analytics';

interface Props {}

export const PricesEvolution = (props: Props) => {
	const { data, error, isLoading } = useGetPriceEvolutionQuery(null);

	const adapter = (type) => {
		const dataparsed: Array<any> = data.reduce((acc: any, curr: any) => {
			if (curr[type])
				acc.push({
					x: new Date(curr.date),
					y: parseFloat(parseFloat(curr[type]).toFixed(3)),
				});
			return acc;
		}, []);
		return [{ label: carburantsNamesMap[type], data: dataparsed }];
	};

	return (
		<Container maxWidth='xl'>
			<h1>Prices evolution</h1>
			{data &&
				Object.keys(carburantsNamesMap).map((c) => (
					<PriceChart
						key={c}
						title={carburantsNamesMap[c]}
						data={adapter(c)}
					></PriceChart>
				))}
		</Container>
	);
};
