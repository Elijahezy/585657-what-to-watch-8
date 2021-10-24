import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import { Route } from 'react-router';
import {AppRoute, AuthorizationStatus} from '../../const';
import { Films } from '../../mocks/types';
import MainPage from '../main/main';
import Error from '../error/error';
import FilmPage from '../films/film-details';
import Login from '../login/login';
import Player from '../player/player';
import Review from '../review/review';
import MyList from '../mylist/mylist';
import PrivateRoute from '../private-route/private-route';

type AppFilmsAmount = {
  filmsData: Films[],
}


function App({filmsData}: AppFilmsAmount): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage filmsData={filmsData} />
        </Route>
        <Route exact path={AppRoute.Film}>
          <FilmPage filmsData={filmsData}/>
        </Route>
        <Route exact path={AppRoute.Login}>
          <Login />
        </Route>
        <Route exact path={AppRoute.Player}>
          <Player filmsData={filmsData}/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList filmsData={filmsData}/>}
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Review}>
          <Review filmsData={filmsData}/>
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
