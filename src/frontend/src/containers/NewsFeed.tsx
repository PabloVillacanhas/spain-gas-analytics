import React, { useEffect, useState } from 'react';
import {
	Avatar,
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

interface Props {}

export const NewsFeed = (props: Props) => {
	const [rssUrl, setRssUrl] = useState(
		'https://e00-expansion.uecdn.es/rss/economia.xml'
	);
	const [items, setItems] = useState<
		| Array<{
				title: string;
				description: string;
				source: string;
				date: Date;
				link: string;
				image: string;
		  }>
		| undefined
	>(undefined);

	useEffect(() => {
		getRss();
	}, []);

	const getRss = async () => {
		const urlRegex =
			/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
		if (!urlRegex.test(rssUrl)) {
			return;
		}
		const res = await fetch(`https://e00-expansion.uecdn.es/rss/economia.xml`);
		const str = await res.text();
		const feed = new window.DOMParser().parseFromString(str, 'text/xml');
		const nodelist = feed.querySelectorAll('item');
		const feedItems = Array.from(nodelist).map((el: any) => ({
			source: 'expansion.com',
			link: el.querySelector('link').innerHTML,
			title: el
				.querySelector('title')
				.innerHTML.substring(
					9,
					el.querySelector('title').innerHTML.indexOf(']')
				),
			description: el
				.querySelector('description')
				.innerHTML.substring(
					9,
					el.querySelector('description').innerHTML.indexOf('.') + 1
				),
			date: el.querySelector('pubDate').innerHTML,
			image: el.querySelector('content').getAttribute('url'),
		}));
		const filtered = feedItems.filter((item) =>
			/[c|C]arburante|[G|g]asolina|[D|d]i[e|é]sel/.test(item.description)
		);
		setItems(filtered);
	};

	return (
		<Container maxWidth='xl'>
			<h1>RSS Feed</h1>
			{items?.map((item) => (
				<Card sx={{ maxWidth: 345 }}>
					<CardHeader
						avatar={<Avatar src={ExpansionNewsIcon} />}
						title={item.source}
						subheader={new Intl.DateTimeFormat('en-GB', {
							dateStyle: 'full',
						}).format(new Date(item.date))}
					/>
					<CardActionArea>
						<CardMedia component='img' height='140' image={item.image} />
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
		</Container>
	);
};

export default NewsFeed;
