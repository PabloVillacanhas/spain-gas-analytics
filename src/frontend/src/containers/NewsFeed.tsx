import React, { useCallback, useEffect, useState } from 'react';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Container,
	Typography,
} from '@mui/material';
import ExpansionNewsIcon from '../assets/img/expansion40x40.jpeg';
import EuropaPress from '../assets/img/ep40x40.jpeg';
import NoImage from '../assets/img/noimage.png';
import RssScapperService from '../services/rssFeed';
import type { FeedItem } from '../services/rssFeed';

interface Props {}

export const NewsFeed = (props: Props) => {
	const rssScapperService = React.useRef(RssScapperService.instance);
	const [items, setItems] = useState<Array<FeedItem>>();

	useEffect(() => {
		rssScapperService.current.getRssItems().then((items) => {
			setItems(
				items.sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
				)
			);
		});
	}, []);

	const getAvatar = useCallback((source) => {
		switch (source) {
			case 'europapress.es':
				return EuropaPress;
			case 'expansion.com':
				return ExpansionNewsIcon;
			default:
				return NoImage;
		}
	}, []);

	return (
		<Container maxWidth='xl'>
			<h1>RSS Feed</h1>
			<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
				{items?.map((item) => (
					<Card sx={{ maxWidth: 345, margin: '2em', height: 'fit-content' }}>
						<CardHeader
							avatar={<Avatar src={getAvatar(item.source)} />}
							title={item.source}
							subheader={new Intl.DateTimeFormat('en-GB', {
								dateStyle: 'full',
							}).format(new Date(item.date))}
						/>
						<CardActionArea>
							<CardMedia
								component='img'
								height='140'
								image={item.image || NoImage}
							/>
							<CardContent>
								<Typography gutterBottom variant='h5' component='div'>
									{item.title}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									{item.description}
								</Typography>
							</CardContent>
						</CardActionArea>
						<CardActions>
							<Button
								size='small'
								color='primary'
								href={item.link}
								target='_blank'
							>
								Read more
							</Button>
						</CardActions>
					</Card>
				))}
			</Box>
		</Container>
	);
};

export default NewsFeed;
