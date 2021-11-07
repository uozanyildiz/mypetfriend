import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import MapPage from './pages/MapPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';
import CategoryPage from './pages/CategoryPage';
import { Helmet } from 'react-helmet';

import { Route, Redirect, Switch } from 'react-router-dom';
import ResultsPage from './pages/ResultsPage';
function App() {
	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<title>{process.env.REACT_APP_WEBSITE_NAME}</title>
			</Helmet>
			<Switch>
				<Route path='/' exact>
					<Redirect to='/homepage' />
				</Route>
				<Route path='/homepage' exact>
					<HomePage />
				</Route>
				<Route path='/categories' exact>
					<CategoriesPage />
				</Route>
				<Route path='/map' exact>
					<MapPage />
				</Route>
				<Route path='/article/:id'>
					<ArticlePage />
				</Route>
				<Route path='/categories/:id'>
					<CategoryPage />
				</Route>
				<Route path='/search'>
					<ResultsPage />
				</Route>
				<Route exact>
					<NotFoundPage />
				</Route>
			</Switch>
		</>
	);
}

export default App;
