import * as React from 'react';
import { Box } from '@mui/system';
import { green, red, grey } from '@mui/material/colors';
import { useCallback } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { PriceEvolutionData } from './PriceChart';

interface PriceDataCardProps {
	title: string;
	data: PriceEvolutionData;
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
						color:
							priceDiff() < 0
								? green[600]
								: priceDiff() > 0
								? red[600]
								: grey[900],
						fontWeight: 'medium',
						mx: 0.5,
					}}
				>
					{priceDiff() < 0 ? (
						<ArrowDownwardIcon
							sx={{ color: green[600], position: 'relative', top: '5px' }}
						/>
					) : priceDiff() > 0 ? (
						<ArrowUpwardIcon
							sx={{ color: red[600], position: 'relative', top: '5px' }}
						/>
					) : (
						<HorizontalRuleIcon sx={{ position: 'relative', top: '5px' }} />
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
