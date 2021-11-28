import { Container } from '@mui/material';
import React from 'react';
import PriceChart from '../components/PriceChart';
import { useGetPriceEvolutionQuery } from '../services/analytics';

interface Props {}

const carburantsNamesMap = {
	biodiesel: 'Biodiesel',
	bioethanol: 'Bioethanol',
	compressed_natgas: 'Compressed natgas',
	diesel_a: 'Diesel A',
	diesel_b: 'Diesel B',
	diesel_prem: 'Diesel premium',
	gasoline_95e5: 'Gasoline 95e5',
	gasoline_95e5prem: 'Gasoline 95e5 premium',
	gasoline_95e10: 'Gasoline 95e10',
	gasoline_98e5: 'Gasoline 98e5',
	gasoline_98e10: 'Gasoline 98e10',
	liq_gas_from_oil: 'Liquid gas from oil',
	liq_natgas: 'Liq natgas from oil',
};

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
		return [{ label: type, data: dataparsed }];
	};

	return (
		<Container maxWidth='xl'>
			<h1>Prices evolution</h1>
			{data &&
				Object.keys(carburantsNamesMap).map((c) => (
					<PriceChart
						title={carburantsNamesMap[c]}
						data={adapter(c)}
					></PriceChart>
				))}
		</Container>
	);
};
