import React, { useState, useEffect } from 'react';
import {
	Box,
	Checkbox,
	FormControlLabel,
	FormGroup,
	ListItemText,
	MenuItem,
	OutlinedInput,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { carburantsNamesMap } from '../constants';

const MenuProps = {
	PaperProps: {
		style: {
			// maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

export interface MapFilterParams {
	gasType: string;
	sellType: string[];
	serviceType: string[];
	// open: boolean;
}

const serviceType = {
	P: 'Atendido',
	A: 'Autoservicio',
	D: 'Desatendido',
	NA: 'Sin datos',
};
const sellType = { P: 'Publica', R: 'Restringida' };

interface Props {
	onFilterChange: (filter: MapFilterParams) => any;
}

export const MapFilterGasStations = ({ onFilterChange }: Props) => {
	const [filter, setFilter] = useState<MapFilterParams>({
		gasType: 'diesel_a',
		sellType: Object.keys(sellType),
		serviceType: Object.keys(serviceType),
		// open: true,
	});

	const handleChange = React.useCallback(
		(event: SelectChangeEvent) => {
			const newFilter = { ...filter, [event.target.name]: event.target.value };
			setFilter(newFilter);
			onFilterChange(newFilter);
		},
		[filter]
	);

	useEffect(() => {
		onFilterChange(filter);
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				backgroundColor: 'rgb(255 255 255 / 65%)',
				maxWidth: '75%',
				margin: '0 auto',
				borderRadius: '4px',
			}}
		>
			<FormControl>
				<InputLabel id='gasttype-select-label'>Gas type</InputLabel>
				<Select
					labelId='gasttype-select-label'
					id='gasttype-select'
					value={filter.gasType}
					label='gasType'
					name='gasType'
					onChange={handleChange}
				>
					{Object.keys(carburantsNamesMap).map((c) => (
						<MenuItem value={c}>{carburantsNamesMap[c]}</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel id='sellType-label'>Sell type</InputLabel>
				<Select
					labelId='sellType-multiple-checkbox-label'
					id='sellType-multiple-checkbox'
					multiple
					label='sellType'
					name='sellType'
					value={filter.sellType as any}
					onChange={handleChange}
					input={<OutlinedInput label='Sell type' />}
					renderValue={(selected) => {
						if (selected.length === 4) return 'All';
						else
							return (selected as unknown as string[])
								.map((s) => sellType[s])
								.join(', ') as any;
					}}
					MenuProps={MenuProps}
				>
					{Array.from(Object.keys(sellType)).map((k) => {
						return (
							<MenuItem key={k} value={k}>
								<Checkbox checked={filter.sellType.includes(k)} />
								<ListItemText primary={sellType[k]} />
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel id='serviceType-label'>Service type</InputLabel>
				<Select
					labelId='serviceType-multiple-checkbox-label'
					id='serviceType-multiple-checkbox'
					multiple
					label='serviceType'
					name='serviceType'
					value={filter.serviceType as any}
					onChange={handleChange}
					input={<OutlinedInput label='Service type' />}
					renderValue={(selected) => {
						if (selected.length === 3) return 'All';
						else
							return (selected as unknown as string[])
								.map((s) => serviceType[s])
								.join(', ') as any;
					}}
					MenuProps={MenuProps}
				>
					{Array.from(Object.keys(serviceType)).map((k) => {
						return (
							<MenuItem key={k} value={k}>
								<Checkbox checked={filter.serviceType.includes(k)} />
								<ListItemText primary={serviceType[k]} />
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			{/* <FormGroup sx={{ zIndex: 1, justifyContent: 'center' }}>
				<FormControlLabel
					control={<Checkbox defaultChecked />}
					label='Currently open'
				/>
			</FormGroup> */}
		</Box>
	);
};
