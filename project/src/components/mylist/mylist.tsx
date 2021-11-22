import { useSelector } from 'react-redux';
import { State } from '../../types/state';
import { Film, User } from '../../types/types';
import FilmSmallCard from '../films/film-small-card';
import Logo from '../logo/logo';
import { useState } from 'react';
import SignOut from '../sign/signout';
import SignIn from '../sign/signin';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthAction, fetchFavoriteFilmsAction } from '../../store/api-actions';


function MyList(): JSX.Element {

  const [userStatus, setUserStatus] = useState(<SignOut />);

  const dispatch = useDispatch();

  dispatch(fetchFavoriteFilmsAction());
  const user = useSelector<State, User>((state) => state.USER.user);
  const myListFilms = useSelector<State, Film[]>((state) => state.DATA.favoriteFilms);

  useEffect(() => {
    if (user.id === undefined || user.id === 0) {
      dispatch(checkAuthAction());
      return setUserStatus(<SignIn />);
    }
    return setUserStatus(<SignOut />);
  }, [dispatch, user.id]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        {<Logo />}

        <h1 className="page-title user-page__title">My list</h1>

        {userStatus}

      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {
            myListFilms.map((film) => <FilmSmallCard key={film.id} filmsSmallCard={ film }/>)
          }
        </div>
      </section>

      <footer className="page-footer">
        {<Logo className={'logo__link--light'}/>}

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyList;
