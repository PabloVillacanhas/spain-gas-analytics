import React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Drawer from '../components/Drawer';

export const AppLayout = () => {
	return (
		<Box sx={{ display: 'flex' }}>
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
			<Box component='main' sx={{ marginTop: '64px', flex: 1 }}>
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
