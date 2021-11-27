import React from 'react';
import { AxisOptions, Chart } from 'react-charts';

type Datum = { x: Date; y: number };

export type PriceEvolutionData = Array<{
	label: string;
	data: Array<Datum>;
}>;

interface PriceChartProps {
	data: Array<{ label: string; data: Array<Datum> }>;
	title: string;
}

const PriceChart = (props: PriceChartProps) => {
	const primaryAxis = React.useMemo(
		(): AxisOptions<Datum> => ({
			getValue: (datum) => datum.x,
			scaleType: 'localTime',
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
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				padding: '12px',
				height: '400px',
			}}
		>
			<div
				style={{
					flex: '0 0 auto',
					padding: '10px',
				}}
			>
				<h3>{props.title}</h3>
			</div>
			<div
				style={{
					flex: 2,
					maxHeight: '400px',
					margin: '10px',
					overflow: 'hidden',
				}}
			>
				<Chart
					options={{
						data: props.data,
						primaryAxis,
						secondaryAxes,
					}}
				/>
			</div>
		</div>
	);
};

export default PriceChart;
