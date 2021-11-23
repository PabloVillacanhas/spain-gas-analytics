import * as React from 'react';
import { Box } from '@mui/system';
import { AxisOptions, Chart, ChartOptions, UserSerie } from 'react-charts';
import { green, red } from '@mui/material/colors';
import { useCallback } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

type Datum = { x: Date; y: number };

export type AnalitycData = Array<{
	label: string;
	data: Array<Datum>;
}>;

interface PriceDataChartProps {
	data: Array<{ label: string; data: Array<Datum> }>;
}

const PriceDataChart = (props: PriceDataChartProps) => {
	const primaryAxis = React.useMemo(
		(): AxisOptions<Datum> => ({
			getValue: (datum) => datum.x,
		}),
		[]
	);

	const secondaryAxes = React.useMemo(
		(): AxisOptions<Datum>[] => [
			{
				getValue: (datum) => datum.y,
			},
		],
		[]
	);

	return (
		<Chart
			options={{
				data: props.data,
				primaryAxis,
				secondaryAxes,
			}}
		/>
	);
};

interface PriceDataCardProps {
	title: string;
	data: AnalitycData;
}

export default function PriceDataCard(props: PriceDataCardProps) {
	const [diffDays, setDiffDays] = React.useState(1);

	const priceDiff = useCallback(() => {
		return parseFloat(
			(props.data[0].data[0].y - props.data[0].data[diffDays].y).toFixed(3)
		);
	}, [props.data, diffDays]);

	return (
		<Box
			sx={{
				bgcolor: 'background.paper',
				boxShadow: 1,
				borderRadius: 1,
				p: 2,
				m: 2,
				minWidth: 250,
			}}
		>
			<Box sx={{ color: 'text.secondary' }}>{props.title}</Box>
			<Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
				{props.data[0].data[0].y}
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'baseline' }}>
				<Box
					sx={{
						color: priceDiff() <= 0 ? green[600] : red[600],
						fontWeight: 'medium',
						mx: 0.5,
					}}
				>
					{priceDiff() <= 0 ? (
						<ArrowDownwardIcon sx={{ color: green[600] }} />
					) : (
						<ArrowUpwardIcon sx={{ color: red[600] }} />
					)}{' '}
					{priceDiff()}
				</Box>
				<Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}>
					vs. yesterday
				</Box>
			</Box>
		</Box>
	);
}
