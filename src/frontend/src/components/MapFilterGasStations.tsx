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
	serviceType: string;
	// open: boolean;
}

interface Props {
	onFilterChange: (filter: MapFilterParams) => any;
}

export const MapFilterGasStations = ({ onFilterChange }: Props) => {
	const [filter, setFilter] = useState<MapFilterParams>({
		gasType: '',
		sellType: [],
		serviceType: '',
		// open: true,
	});

	const handleChange = (event: SelectChangeEvent) => {
		const newFilter = { ...filter, [event.target.name]: event.target.value };
		setFilter(newFilter);
		onFilterChange(newFilter);
	};

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
					renderValue={(selected) =>
						(selected as unknown as string[]).join(', ') as any
					}
					MenuProps={MenuProps}
				>
					{['Atendido', 'Autoservicio', 'Desatendido'].map((t: string) => (
						<MenuItem key={t} value={t}>
							<Checkbox checked={filter.sellType.indexOf(t) > -1} />
							<ListItemText primary={t} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel id='sellType-select-label'>Service type</InputLabel>
				<Select
					labelId='serviceType-select-label'
					id='serviceType'
					value={filter.serviceType}
					label='serviceType'
					name='serviceType'
					onChange={handleChange}
				>
					{['Venta al publico', 'Venta a cooperativistas'].map((i) => (
						<MenuItem key={i} value={i}>
							{i}
						</MenuItem>
					))}
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
