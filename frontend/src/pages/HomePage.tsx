import {
	Box,
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

	const { geolocationPosition } = useGeolocation(); //Here it is Just to ask for permissions

	const { payment, preferredCarburant } = useSelector(
		(state: RootState) => state.priceCalculator
	);
	const dispatch = useDispatch();

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
						<h2>Price calculator</h2>
						<TextField
							id='payment'
							label='Payment (€)'
							type='number'
							value={payment}
							onChange={(e) => {
								dispatch(changePayment(+e.target.value));
							}}
						/>
						<FormControl>
							<InputLabel id='gasttype-select-label'>Gas type</InputLabel>
							<Select
								labelId='gasttype-select-label'
								id='gasttype-select'
								value={preferredCarburant}
								label='gasType'
								name='gasType'
								onChange={(e) =>
									dispatch(changePreferredCarburant(e.target.value))
								}
							>
								{Object.keys(carburantsNamesMap).map((c) => (
									<MenuItem value={c}>{carburantsNamesMap[c]}</MenuItem>
								))}
							</Select>
						</FormControl>
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
					<PublicOffIcon sx={{ color: red[500] }}></PublicOffIcon> Please enable
					the geolocation to see the list of the cheapest gas stations in your
					zone
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
