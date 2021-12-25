import React from 'react';
import { Box, Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import PriceBox from '../components/PriceBox';
import { useGetPriceEvolutionQuery } from '../services/analytics';
import { useGeolocation } from '../hooks';

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

const HomePage = () => {
	const { data, error, isLoading } = useGetPriceEvolutionQuery(null);

	useGeolocation(); //Here it is Just to ask for permissions

	const adapter = (item) => {
		const dataparsed: Array<any> = data.reduce((acc: any, curr: any) => {
			if (curr[item])
				acc.push({
					x: new Date(curr.date),
					y: parseFloat(curr[item].toFixed(3)),
				});
			return acc;
		}, []);
		return [{ label: item, data: dataparsed }];
	};

	return (
		<Container maxWidth='xl'>
			<h1>
				Gas prices on{' '}
				{Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(new Date())}
			</h1>
			<Box>
				<h2>Diesel</h2>
				<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
					{data &&
						Object.keys(data[0])
							.filter((f) => f.includes('diesel'))
							.sort()
							.map((k) => (
								<PriceBox
									key={k}
									title={carburantsNamesMap[k]}
									data={adapter(k)}
								></PriceBox>
							))}
				</Box>
				<h2>Gasoline</h2>
				<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
					{data &&
						Object.keys(data[0])
							.filter((f) => f.includes('gasoline'))
							.sort()
							.map((k) => (
								<PriceBox
									key={k}
									title={carburantsNamesMap[k]}
									data={adapter(k)}
								></PriceBox>
							))}
				</Box>
				<h2>Other</h2>
				<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
					{data &&
						Object.keys(data[0])
							.filter(
								(f) =>
									!f.includes('gasoline') &&
									!f.includes('diesel') &&
									f !== 'date'
							)
							.sort()
							.map((k) => (
								<PriceBox
									key={k}
									title={carburantsNamesMap[k]}
									data={adapter(k)}
								></PriceBox>
							))}
				</Box>
			</Box>
			<Paper variant='outlined' square>
				<Container></Container>
			</Paper>
			{/* <Paper variant='outlined' square>
					<Container>
						<h1>Gas stations</h1>
					</Container>
				</Paper> */}
		</Container>
	);
};

export default HomePage;
