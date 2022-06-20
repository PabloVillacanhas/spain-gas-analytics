import {
	Box,
	CircularProgress,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import PriceBox from '../components/PriceBox';
import { useGetPriceEvolutionQuery } from '../services/analytics';
import { useGeolocation } from '../hooks';
import { PriceTableEnhanced } from '../components/PriceTable';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import { red } from '@mui/material/colors';
import {
	changePayment,
	changePreferredCarburant,
} from '../store/priceCalculatorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import PriceCalculator from '../components/PriceCalculator';
import PriceChart from '../components/PriceChart';

const carburantsNamesMap = {
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
	const { data } = useGetPriceEvolutionQuery(null);

	const { geolocationPosition, error } = useGeolocation(); //Here it is Just to ask for permissions

	const { preferredCarburant } = useSelector(
		(state: RootState) => state.priceCalculator
	);

	const adapter = (item) => {
		const dataparsed: Array<any> = data.reduce((acc: any, curr: any) => {
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
			{geolocationPosition ? (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<Box
						sx={{
							flex: 3,
						}}
					>
						<PriceTableEnhanced
							location={geolocationPosition?.coords}
						></PriceTableEnhanced>
					</Box>
					<Box
						sx={{
							flex: 1,
							padding: '1em',
						}}
					>
						<PriceCalculator data={data} />
						<h2>Price evolution</h2>
						<PriceChart
							key={preferredCarburant}
							data={adapter(preferredCarburant)}
						></PriceChart>
					</Box>
				</Box>
			) : (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					{error ? (
						<>
							<PublicOffIcon sx={{ color: red[500] }}></PublicOffIcon> Please
							enable the geolocation to see the list of the cheapest gas
							stations in your zone
						</>
					) : (
						<>
							<CircularProgress sx={{ marginRight: '0.75rem' }} /> Loading gas
							stations nearby
						</>
					)}
				</Box>
			)}
			<Box>
				<h2>Diesel</h2>
				<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
					{data &&
						Object.keys(data[0])
							.filter((f) => f.includes('diesel'))
							.sort()
							.map((k) => (
								<PriceBox
									key={k}
									title={carburantsNamesMap[k]}
									data={adapter(k)}
								></PriceBox>
							))}
				</Box>
				<h2>Gasoline</h2>
				<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
					{data &&
						Object.keys(data[0])
							.filter((f) => f.includes('gasoline'))
							.sort()
							.map((k) => (
								<PriceBox
									key={k}
									title={carburantsNamesMap[k]}
									data={adapter(k)}
								></PriceBox>
							))}
				</Box>
				<h2>Other</h2>
				<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
					{data &&
						Object.keys(data[0])
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
									title={carburantsNamesMap[k]}
									data={adapter(k)}
								></PriceBox>
							))}
				</Box>
			</Box>
			<Paper variant='outlined' square>
				<Container></Container>
			</Paper>
		</Container>
	);
};

export default HomePage;
