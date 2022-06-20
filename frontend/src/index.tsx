import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { AppLayout } from './containers/AppLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainMap from './components/MainMap';
import HomePage from './pages/HomePage';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Analytics } from './containers/Analytics';
import { Provider } from 'react-redux';
import { store } from './store';
import NewsFeed from './containers/NewsFeed';

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
	components: {
		MuiLink: {
			styleOverrides: {
				root: {
					textDecoration: 'none',
					color: '#173A5E',
				},
			},
		},
		MuiFormControl: {
			styleOverrides: {
				root: {
					flex: '1 1 auto',
					margin: '1em',
				},
			},
		},
		MuiDrawer: {
			styleOverrides: {
				paperAnchorLeft: {
					width: '160px',
					overflow: 'visible',
				},
			},
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<AppLayout />}>
							<Route index element={<HomePage />}></Route>
							<Route path='map' element={<MainMap />}></Route>
							<Route path='analytics/*' element={<Analytics />}></Route>
							<Route path='news' element={<NewsFeed />}></Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
