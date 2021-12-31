import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

type Item = {
	coordinates: { type: 'Feature'; geometry: string; properties: string };
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
	caracteristicas: string;
	labour_data: string;
	coordinates: string;
};

function createData(row: Item): Row {
	return {
		name: row.name,
		price: row.last_price[0].diesel_a,
		direction: row.direction,
		caracteristicas: row.sale_type,
		labour_data: row.labour_data,
		coordinates: row.coordinates.geometry.toString(),
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
	},
	{
		id: 'direction',
		numeric: true,
		disablePadding: false,
		label: 'Direction',
	},
	{
		id: 'caracteristicas',
		numeric: true,
		disablePadding: false,
		label: 'caracteristicas',
	},
	{
		id: 'labour_data',
		numeric: true,
		disablePadding: false,
		label: 'labour_data',
	},
	{
		id: 'coordinates',
		numeric: true,
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
	const createSortHandler =
		(property: keyof Row) => (event: React.MouseEvent<unknown>) => {
			props.onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={props.orderBy === headCell.id ? props.order : false}
					>
						<TableSortLabel
							active={props.orderBy === headCell.id}
							direction={props.orderBy === headCell.id ? props.order : 'asc'}
							onClick={createSortHandler(headCell.id)}
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
				))}
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
					setRows(data.items.map(createData));
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
								<TableCell align='right'>{row.direction}</TableCell>
								<TableCell align='right'>{row.caracteristicas}</TableCell>
								<TableCell align='right'>{row.labour_data}</TableCell>
								<TableCell align='right'>{row.coordinates}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
