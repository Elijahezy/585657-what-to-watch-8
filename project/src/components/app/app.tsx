import { Switch, Router as BrowserRouter } from 'react-router';
import { Route } from 'react-router';
import {AppRoute, AuthorizationStatus} from '../../const';
import { Film } from '../../types/types';
import MainPage from '../main/main';
import Error from '../error/error';
import FilmPage from '../films/film-card';
import Login from '../login/login';
import Review from '../review/review';
import MyList from '../mylist/mylist';
import PrivateRoute from '../private-route/private-route';
import Player from '../player/player';
import LoadingScreen from '../loading-screen/loading-screen';
import {isCheckedAuth} from '../../utils';
import {State} from '../../types/state';
import {useSelector} from 'react-redux';
import browserHistory from '../../browser-history';

const Setting = {
  PromoFilmInfo: {
    title: 'The Grand Budapest Hotel',
    genre: 'Drama',
    releaseDate: 2014,
  },
};


function App(): JSX.Element {

  const isDataLoaded = useSelector<State, boolean>((state) => state.isDataLoaded);
  const films = useSelector<State, Film[]>((state) => state.films);
  const authorizationStatus = useSelector<State, AuthorizationStatus>((state) => state.authorizationStatus);


  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage promoFilmInfo={Setting.PromoFilmInfo} />
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
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Review}>
          <Review films={films}/>
        </Route>
        <Route exact path={AppRoute.Player}>
          <Player films={films}/>
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
