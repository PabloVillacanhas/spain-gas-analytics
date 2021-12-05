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
import { PricesDistribution } from './PricesDistribution';

export const AnalyticsMenu = (p) => {
	return (
		<Container maxWidth='xl'>
			<h1>Analytics</h1>
			<Box sx={{ display: 'flex' }}>
				<Link
					to='/analytics/prices_evolution'
					component={RouterLink}
					sx={{ margin: '2em' }}
				>
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
				<Link
					to='/analytics/prices_comparision'
					component={RouterLink}
					sx={{ margin: '2em' }}
				>
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
				<Link
					to='/analytics/prices_distribution'
					component={RouterLink}
					sx={{ margin: '2em' }}
				>
					<Card sx={{ maxWidth: 345 }}>
						<CardActionArea>
							<CardMedia
								component='img'
								height='140'
								alt='random chart'
								// src={PricesDistributionImg}
							/>
							<CardContent>
								<Typography gutterBottom variant='h5' component='div'>
									Prices distribution
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									See the distribution of prices
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
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
