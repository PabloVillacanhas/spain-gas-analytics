import React, { useEffect, useState } from 'react';
import {
	Container,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Link,
	Box,
} from '@mui/material';
import { Link as RouterLink, Route, Routes } from 'react-router-dom';
import { PricesEvolution } from './PricesEvolution';
import { PricesComparision } from './PricesComparision';
import PricesComparisionImg from '../assets/img/prices_comparision.png';
import PricesEvolutionImg from '../assets/img/prices_evolution.png';
import PricesDistributionImg from '../assets/img/prices_distribution.png';
import { PricesDistribution } from './PricesDistribution';
import { AnalyticsCard } from '../components/AnalyticsCard';

export const AnalyticsMenu = (p) => {
	return (
		<Container maxWidth='xl'>
			<h1>Analytics</h1>
			<Box sx={{ display: 'flex' }}>
				<Link
					to='/analytics/prices_evolution'
					component={RouterLink}
					sx={{ margin: '2em', flex: '1em' }}
				>
					<AnalyticsCard
						title='Prices evolution'
						description='See prices evolution through the time'
						imgSrc={PricesEvolutionImg}
					></AnalyticsCard>
				</Link>
				<Link
					to='/analytics/prices_comparision'
					component={RouterLink}
					sx={{ margin: '2em', flex: '1em' }}
				>
					<AnalyticsCard
						title='Prices comparision'
						description='See prices of carburants compared with each other in the sanme
						chart'
						imgSrc={PricesComparisionImg}
					></AnalyticsCard>
				</Link>
				<Link
					to='/analytics/prices_distribution'
					component={RouterLink}
					sx={{ margin: '2em', flex: '1em' }}
				>
					<AnalyticsCard
						title='Prices distribution'
						description='See the distribution of prices'
						imgSrc={PricesDistributionImg}
					></AnalyticsCard>
				</Link>
			</Box>
		</Container>
	);
};

export const Analytics = (props: {}) => {
	return (
		<Container maxWidth='xl'>
			<Routes>
				<Route path='/' element={<AnalyticsMenu />} />
				<Route path='prices_evolution' element={<PricesEvolution />} />
				<Route path='prices_comparision' element={<PricesComparision />} />
				<Route path='prices_distribution' element={<PricesDistribution />} />
			</Routes>
		</Container>
	);
};
