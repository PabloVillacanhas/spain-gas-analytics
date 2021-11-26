import {
	Container,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import React from 'react';

interface Props {}

export const Analytics = (props: Props) => {
	return (
		<Container maxWidth='xl'>
			<h1>Analytics</h1>
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
		</Container>
	);
};
