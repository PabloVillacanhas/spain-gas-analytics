import {
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
} from '@mui/material';
import React from 'react';

interface Props {
	imgSrc: string;
	title: string;
	description: string;
}

export const AnalyticsCard = (props: Props) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<CardMedia
					component='img'
					height='140'
					alt='random chart'
					src={props.imgSrc}
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='div'>
						{props.title}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{props.description}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
