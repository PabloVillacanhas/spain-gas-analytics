import {
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { carburantsNamesMap } from '../constants';
import { RootState } from '../store';
import {
	changePayment,
	changePreferredCarburant,
} from '../store/priceCalculatorSlice';

type Props = {
	data: any;
};

const PriceCalculator = (props: Props) => {
	const { payment, preferredCarburant } = useSelector(
		(state: RootState) => state.priceCalculator
	);

	const dispatch = useDispatch();

	return (
		<>
			<h2>Price calculator</h2>
			<Box sx={{ display: 'flex', flexWrap: 'no-wrap' }}>
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
						onChange={(e) => dispatch(changePreferredCarburant(e.target.value))}
					>
						{Object.keys(carburantsNamesMap).map((c) => (
							<MenuItem key={c} value={c}>
								{carburantsNamesMap[c]}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<Box>
				You can save up to{' '}
				{(
					(Math.max(...props.data.map((e) => e[preferredCarburant])) -
						Math.min(...props.data.map((e) => e[preferredCarburant]))) *
					payment
				).toFixed(2)}{' '}
				euros.
			</Box>
		</>
	);
};

export default PriceCalculator;
