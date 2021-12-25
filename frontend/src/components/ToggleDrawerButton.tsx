import React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Props {
	openDrawer: boolean;
	onClick: () => void;
}

const openedMixin = (theme: Theme): CSSObject => ({
	[theme.breakpoints.up('md')]: {
		left: `calc(${
			(
				theme.components?.MuiDrawer?.styleOverrides
					?.paperAnchorLeft as CSSObject
			).width
		} - 13px)`,
	},
});

const closedMixin = (theme: Theme): CSSObject => ({
	[theme.breakpoints.up('md')]: {
		left: `calc(${theme.spacing(9)} - 13px)`,
	},
});

const ToggleDrawerButton = (props: Props & { className?: string }) => {
	return (
		<div className={props.className} onClick={(_) => props.onClick()}>
			{props.openDrawer ? <KeyboardArrowLeftIcon /> : <ChevronRightIcon />}
		</div>
	);
};

const StyledToggleDrawerButton = styled(ToggleDrawerButton)(
	({ theme, openDrawer, onClick }) => ({
		[theme.breakpoints.down('md')]: {
			visibility: 'hidden',
		},
		borderRadius: '100%',
		border: '1px solid gray',
		position: 'absolute',
		top: '80px',
		left: '60px',
		width: 'min-content',
		zIndex: 10001,
		backgroundColor: 'white',
		display: 'flex',
		transition: theme.transitions.create('left', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		...(openDrawer && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!openDrawer && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
		'&:hover': {
			background: theme.palette.background,
			cursor: 'pointer',
		},
	})
);

export default StyledToggleDrawerButton;
