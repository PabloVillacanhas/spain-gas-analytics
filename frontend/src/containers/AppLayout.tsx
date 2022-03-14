import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Drawer from '../components/Drawer';

export const AppLayout = () => {
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
			<Drawer></Drawer>
			<Box component='main' sx={{ width: '100%', height: '100vh' }}>
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
				<Outlet />
			</Box>
		</Box>
	);
};
