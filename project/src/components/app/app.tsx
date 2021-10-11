import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import { Route } from 'react-router';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainPage from '../main/main';
import MainPageContent from '../main/main-content';
import Error from '../error/error';
import MoviePage from '../films/movie-page';
import Login from '../login/login';
import Player from '../player/player';
import Review from '../review/review';
import MyList from '../mylist/mylist';
import PrivateRoute from '../private-route/private-route';

export type FilmItem = {
  name: string,
  previewImage: string,
  genre: string,
  released: number,
}

type AppFilmsAmount = {
  filmsData: FilmItem[],
}


function App({filmsData}: AppFilmsAmount): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage /><MainPageContent filmsData={filmsData}/>
        </Route>
        <Route exact path={AppRoute.Film}>
          <MoviePage />
        </Route>
        <Route exact path={AppRoute.Login}>
          <Login />
        </Route>
        <Route exact path={AppRoute.Player}>
          <Player />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Review}>
          <Review />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
