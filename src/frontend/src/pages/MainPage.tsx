import React from 'react';
import {
	Box,
	CssBaseline,
	AppBar,
	Toolbar,
	Typography,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import MainMap from '../components/MainMap';

interface Props {}

const drawerWidth = 240;

export const MainPage = (props: Props) => {
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<Typography variant='h6' noWrap component='div'>
						Clipped drawer
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant='permanent'
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: 'auto' }}>
					<List>
						<ListItem button key={'Map'}>
							<ListItemIcon>
								<MapIcon />
							</ListItemIcon>
							<ListItemText primary={'Map'} />
						</ListItem>
					</List>
				</Box>
			</Drawer>
			<Box component='main'>
				<MainMap></MainMap>
			</Box>
		</Box>
	);
};
