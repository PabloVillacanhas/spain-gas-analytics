import React from 'react';
import {
	Container,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Link,
} from '@mui/material';
import { Link as RouterLink, Outlet, Route, Routes } from 'react-router-dom';
import { PricesEvolution } from './PricesEvolution';

interface Props {}

export const AnalyticsMenu = (p) => {
	return (
		<Container maxWidth='xl'>
			<h1>Analytics</h1>
			<Link to='/analytics/prices_evolution' component={RouterLink}>
				<Card sx={{ maxWidth: 345 }}>
					<CardActionArea>
						<CardMedia component='img' height='140' alt='random chart' />
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
		</Container>
	);
};

export const Analytics = (props: Props) => {
	console.log('rendering anal men');

	return (
		<Container maxWidth='xl'>
			<Routes>
				<Route path='/' element={<AnalyticsMenu />} />
				<Route path='prices_evolution' element={<PricesEvolution />} />
			</Routes>
		</Container>
	);
};
