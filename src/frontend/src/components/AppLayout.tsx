import React, { useState } from 'react';
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
	Container,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Link, Outlet, Route } from 'react-router-dom';

interface AppLayoutProps {}

const drawerWidth = 240;

export const AppLayout = ({}: AppLayoutProps) => {
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<Typography variant='h6' noWrap component='div'>
						Spain gas prices dashboard
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
						<ListItem button key={'Home'}>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<Link to='/'>
								<ListItemText primary={'Home'} />
							</Link>
						</ListItem>
						<ListItem button key={'Map'}>
							<ListItemIcon>
								<MapIcon />
							</ListItemIcon>
							<Link to='/map'>
								<ListItemText primary={'Map'} />
							</Link>
						</ListItem>
						<ListItem button key={'Analytics'}>
							<ListItemIcon>
								<TimelineIcon />
							</ListItemIcon>
							<ListItemText primary={'Analytics'} />
						</ListItem>
					</List>
				</Box>
			</Drawer>
			<Container maxWidth='xl'>
				<Box component='main'>
					<Toolbar />
					<Outlet />
				</Box>
			</Container>
		</Box>
	);
};
