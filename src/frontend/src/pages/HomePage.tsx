import { Box, Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import PriceBox, { AnalitycData } from '../components/PriceBox';

interface HomePageProps {}

const namesMap = {
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
	const [analitycs, setAnalitycs] = useState<any>(undefined);

	useEffect(() => {
		fetch('http://localhost:5000/api/v1/analytics/prices_evolution')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setAnalitycs(data);
			});
	}, []);

	const adapter = (item) => {
		const dataparsed: Array<any> = analitycs.reduce((acc: any, curr: any) => {
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
			<Container maxWidth='xl'>
				<Paper variant='outlined' square>
					<Container>
						<h1>Prices</h1>
						<h2>Diesel</h2>
						<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
							{analitycs &&
								Object.keys(analitycs[0])
									.filter((f) => f.includes('diesel'))
									.sort()
									.map((k) => (
										<PriceBox
											key={k}
											title={namesMap[k]}
											data={adapter(k)}
										></PriceBox>
									))}
						</Box>
						<h2>Gasoline</h2>
						<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
							{analitycs &&
								Object.keys(analitycs[0])
									.filter((f) => f.includes('gasoline'))
									.sort()
									.map((k) => (
										<PriceBox
											key={k}
											title={namesMap[k]}
											data={adapter(k)}
										></PriceBox>
									))}
						</Box>
						<h2>Other</h2>
						<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
							{analitycs &&
								Object.keys(analitycs[0])
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
											title={namesMap[k]}
											data={adapter(k)}
										></PriceBox>
									))}
						</Box>
					</Container>
				</Paper>
				<Paper variant='outlined' square>
					<Container></Container>
				</Paper>
				<Paper variant='outlined' square>
					<Container>
						<h1>Gas stations</h1>
					</Container>
				</Paper>
			</Container>
		</Container>
	);
};

export default HomePage;
