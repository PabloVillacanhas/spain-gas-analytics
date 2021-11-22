import { Box, Container } from '@mui/material';
import Paper from '@mui/material/Paper';

interface HomePageProps {}

const HomePage = () => {
	return (
		<Container>
			<h1>
				Gas prices on{' '}
				{Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(new Date())}
			</h1>
			<Container>
				<Paper variant='outlined' square>
					<Container>
						<h1>Prices</h1>
						<h2>Diesel A</h2>
						<h2>Diesel B</h2>
						<h2>Gasoline</h2>
					</Container>
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
