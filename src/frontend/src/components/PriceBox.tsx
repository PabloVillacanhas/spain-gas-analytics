import * as React from 'react';
import { Box } from '@mui/system';
import { AxisOptions, Chart, ChartOptions, UserSerie } from 'react-charts';

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
	console.log('data :>> ', props.data[0]);
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
			<Box
				sx={{
					color: 'success.dark',
					display: 'inline',
					fontWeight: 'medium',
					mx: 0.5,
				}}
			>
				{(props.data[0].data[0].y - props.data[0].data[1].y).toFixed(3)}
			</Box>
			<Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}>
				vs. yesterday
			</Box>
		</Box>
	);
}
