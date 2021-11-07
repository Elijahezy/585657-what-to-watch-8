import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import { Route } from 'react-router';
import {AppRoute, AuthorizationStatus} from '../../const';
import { Film } from '../../mocks/types';
import MainPage from '../main/main';
import Error from '../error/error';
import FilmPage from '../films/film-card';
import Login from '../login/login';
import Review from '../review/review';
import MyList from '../mylist/mylist';
import PrivateRoute from '../private-route/private-route';

type AppFilmsAmount = {
  films: Film[],
    promoFilmInfo: {
    title: string;
    genre: string;
    releaseDate: number;
  };
}


function App({films, promoFilmInfo }: AppFilmsAmount): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage promoFilmInfo={promoFilmInfo} />
        </Route>
        <Route exact path={AppRoute.Films}>
          <FilmPage films={films}/>
        </Route>
        <Route exact path={AppRoute.Login}>
          <Login />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList films={films}/>}
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Review}>
          <Review films={films}/>
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
