import React, { useEffect, useState } from 'react';
import {
	Container,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Link,
} from '@mui/material';
import { Link as RouterLink, Route, Routes } from 'react-router-dom';
import { PricesEvolution } from '../components/PricesEvolution';
import { PricesComparision } from '../components/PricesComparision';

import PricesComparisionImg from '../assets/img/prices_comparision.png';
import PricesEvolutionImg from '../assets/img/prices_evolution.png';

export const AnalyticsMenu = (p) => {
	return (
		<Container maxWidth='xl'>
			<h1>Analytics</h1>
			<Link to='/analytics/prices_evolution' component={RouterLink}>
				<Card sx={{ maxWidth: 345 }}>
					<CardActionArea>
						<CardMedia
							component='img'
							height='140'
							alt='random chart'
							src={PricesEvolutionImg}
						/>
						<CardContent>
							<Typography gutterBottom variant='h5' component='div'>
								Prices evolution
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								See prices evolution through the time
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Link>
			<Link to='/analytics/prices_comparision' component={RouterLink}>
				<Card sx={{ maxWidth: 345 }}>
					<CardActionArea>
						<CardMedia
							component='img'
							height='140'
							alt='random chart'
							src={PricesComparisionImg}
						/>
						<CardContent>
							<Typography gutterBottom variant='h5' component='div'>
								Prices comparision
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								See prices of carburants compared with each other in the sanme
								chart
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Link>
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
			</Routes>
		</Container>
	);
};
