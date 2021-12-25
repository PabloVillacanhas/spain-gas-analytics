import React, { useState } from 'react';
import { CSSObject } from '@emotion/styled/types/base';
import {
	Toolbar,
	Drawer as MuiDrawer,
	Box,
	Link,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Theme,
	styled,
	useTheme,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ToggleDrawerButton from './ToggleDrawerButton';

interface Props {}

const openedMixin = (theme: Theme): CSSObject => ({
	width: (
		theme.components?.MuiDrawer?.styleOverrides?.paperAnchorLeft as CSSObject
	).width,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
});

const DrawerStyled = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	flexShrink: 0,
	whiteSpace: 'nowrap',
	overflow: 'visible',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export const Drawer = (props: Props) => {
	const location = useLocation();
	const theme = useTheme();
	const [openDrawer, setOpenDrawer] = useState(
		window.innerWidth >= theme.breakpoints.values.md
	);

	return (
		<DrawerStyled variant='permanent' open={openDrawer}>
			<Toolbar />
			<ToggleDrawerButton
				onClick={() => setOpenDrawer(!openDrawer)}
				openDrawer={openDrawer}
			></ToggleDrawerButton>
			<Box>
				<List>
					<Link to='/' component={RouterLink}>
						<ListItem button key={'Home'} selected={location.pathname === '/'}>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>

							{openDrawer && <ListItemText primary={'Home'} />}
						</ListItem>
					</Link>
					<Link to='/map' component={RouterLink}>
						<ListItem
							button
							key={'Map'}
							selected={location.pathname === '/map'}
						>
							<ListItemIcon>
								<MapIcon />
							</ListItemIcon>

							{openDrawer && <ListItemText primary={'Map'} />}
						</ListItem>
					</Link>
					<Link to='/analytics' component={RouterLink}>
						<ListItem
							button
							key={'Analytics'}
							selected={location.pathname === '/analytics'}
						>
							<ListItemIcon>
								<TimelineIcon />
							</ListItemIcon>
							{openDrawer && <ListItemText primary={'Analytics'} />}
						</ListItem>
					</Link>
					<Link to='/news' component={RouterLink}>
						<ListItem
							button
							key={'News'}
							selected={location.pathname === '/news'}
						>
							<ListItemIcon>
								<MenuBookIcon />
							</ListItemIcon>
							{openDrawer && <ListItemText primary={'News'} />}
						</ListItem>
					</Link>
				</List>
			</Box>
		</DrawerStyled>
	);
};

export default Drawer;
