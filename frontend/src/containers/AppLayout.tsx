import React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Drawer from '../components/Drawer';

export const AppLayout = () => {
	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar
				// position='fixed'
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<Typography variant='h6' noWrap component='div'>
						Spain gas prices dashboard
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component='main'
				sx={{
					flex: 1,
					display: 'flex',
					position: 'absolute',
					paddingTop: '64px',
					width: '100%',
					height: '100%',
				}}
			>
				<Drawer></Drawer>
				<Outlet />
			</Box>
		</Box>
	);
};
