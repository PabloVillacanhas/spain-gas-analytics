import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { AppLayout } from './components/AppLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainMap from './components/MainMap';
import HomePage from './pages/HomePage';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
	palette: {
		background: {
			paper: '#fff',
		},
		text: {
			primary: '#173A5E',
			secondary: '#46505A',
		},
		action: {
			active: '#001E3C',
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<AppLayout />}>
						<Route index element={<HomePage />}></Route>
						<Route path='map' element={<MainMap />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
