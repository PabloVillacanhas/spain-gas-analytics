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
	Link,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';

interface AppLayoutProps {}

const drawerWidth = 240;

export const AppLayout = ({}: AppLayoutProps) => {
	const location = useLocation();

	console.log(`location`, location);

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
						<Link to='/' component={RouterLink}>
							<ListItem
								button
								key={'Home'}
								selected={location.pathname === '/'}
							>
								<ListItemIcon>
									<HomeIcon />
								</ListItemIcon>

								<ListItemText primary={'Home'} />
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

								<ListItemText primary={'Map'} />
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
								<ListItemText primary={'Analytics'} />
							</ListItem>
						</Link>
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
