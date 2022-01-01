import React, { useEffect, useState } from 'react';
import { Link as RouterLink, Route, Routes } from 'react-router-dom';
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Box,
	TableSortLabel,
	Link,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import haversine from 'haversine-distance';

type Item = {
	coordinates: {
		type: 'Feature';
		geometry: { coordinates: { lat: number; lng: number } };
		properties: string;
	};
	direction: 'CARRETERA N-550 KM. 71,2';
	id: 511;
	labour_data: 'L-V: 07:00-23:00; S-D: 08:00-23:00';
	last_price: [
		{
			date: string;
			diesel_a: number;
		}
	];
	name: 'CEPSA';
	sale_type: 'P';
	service_type: 'L-V: 07:00-23:00 (P); S-D: 08:00-23:00 (P)';
};

type Row = {
	name: string;
	price: number;
	direction: string;
	characteristics: string;
	distance: number;
	labour_data: string;
	coordinates: string;
};

function createData(row: Item, origin: GeolocationCoordinates): Row {
	return {
		name: row.name,
		price: row.last_price[0].diesel_a,
		direction: row.direction,
		characteristics: row.sale_type,
		labour_data: row.labour_data,
		distance: haversine(
			{
				lng: row.coordinates.geometry.coordinates[0],
				lat: row.coordinates.geometry.coordinates[1],
			},
			{ lng: origin.longitude, lat: origin.latitude }
		),
		coordinates: `${row.coordinates.geometry.coordinates[0]},${row.coordinates.geometry.coordinates[1]}`,
	};
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator<Key extends keyof Row>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

type Order = 'asc' | 'desc';

interface HeadCell {
	id: keyof Row;
	disablePadding: boolean;
	label: string;
	numeric: boolean;
	sortable?: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Name',
	},
	{
		id: 'price',
		numeric: true,
		disablePadding: false,
		label: 'Price',
		sortable: true,
	},
	{
		id: 'direction',
		numeric: false,
		disablePadding: false,
		label: 'Direction',
	},
	{
		id: 'distance',
		numeric: true,
		disablePadding: false,
		label: 'Distance',
		sortable: true,
	},
	{
		id: 'characteristics',
		numeric: false,
		disablePadding: false,
		label: 'Characteristics',
	},
	{
		id: 'labour_data',
		numeric: false,
		disablePadding: false,
		label: 'Labour data',
	},
	{
		id: 'coordinates',
		numeric: false,
		disablePadding: false,
		label: 'See on map',
	},
];

interface EnhancedTableProps {
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Row
	) => void;
	order: Order;
	orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const handleSort =
		(property: keyof Row) => (event: React.MouseEvent<unknown>) => {
			props.onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) =>
					headCell.sortable ? (
						<TableCell
							key={headCell.id}
							align={headCell.numeric ? 'right' : 'left'}
							padding={headCell.disablePadding ? 'none' : 'normal'}
							sortDirection={
								props.orderBy === headCell.id ? props.order : false
							}
						>
							<TableSortLabel
								active={props.orderBy === headCell.id}
								direction={props.orderBy === headCell.id ? props.order : 'asc'}
								onClick={handleSort(headCell.id)}
							>
								{headCell.label}
								{props.orderBy === headCell.id ? (
									<Box component='span' sx={visuallyHidden}>
										{props.order === 'desc'
											? 'sorted descending'
											: 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						</TableCell>
					) : (
						<TableCell
							key={headCell.id}
							align={headCell.numeric ? 'right' : 'left'}
							padding={headCell.disablePadding ? 'none' : 'normal'}
						>
							{headCell.label}
						</TableCell>
					)
				)}
			</TableRow>
		</TableHead>
	);
}

interface Props {
	location: GeolocationCoordinates;
}

export const PriceTableEnhanced = (props: Props) => {
	const [rows, setRows] = useState<Array<Row>>();
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof Row>('price');

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Row
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	useEffect(() => {
		props.location &&
			fetch(
				`http://localhost:5000/api/v1/gas_stations?near=${props.location.longitude},${props.location.latitude}`
			)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					setRows(data.items.map((datum) => createData(datum, props.location)));
				});
	}, [props.location]);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<EnhancedTableHead
					order={order}
					orderBy={orderBy}
					onRequestSort={handleRequestSort}
				/>
				<TableBody>
					{rows
						?.slice()
						.sort(getComparator(order, orderBy))
						.map((row, index) => (
							<TableRow
								key={index}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell align='left'>{row.name}</TableCell>
								<TableCell align='right'>{row.price}</TableCell>
								<TableCell align='left'>{row.direction}</TableCell>
								<TableCell align='right'>{`${(row.distance / 1000).toFixed(
									2
								)} km`}</TableCell>
								<TableCell align='left'>{row.characteristics}</TableCell>
								<TableCell align='left'>{row.labour_data}</TableCell>
								<TableCell align='left'>
									<Link
										to={`/map?location=${row.coordinates.split(',')[0]},${
											row.coordinates.split(',')[1]
										}`}
										component={RouterLink}
										sx={{ margin: '2em', flex: '1em' }}
									>
										See on map
									</Link>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
