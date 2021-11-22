/* eslint-disable no-console */
import { Film } from '../../types/types';
import {
  useParams,
  Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import {Dispatch, SetStateAction, useState} from 'react';
import Overview from '../tabs/overview';
import Details from '../tabs/details';
import Reviews from '../tabs/reviews';
import FilmSmallCard from './film-small-card';
import { AppRoute } from '../../const';
import Logo from '../logo/logo';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../../types/state';
import {User} from '../../types/types';
import SignIn from '../sign/signin';
import SignOut from '../sign/signout';
import { favoriteFilmPostAction } from '../../store/api-actions';


const SIMILAR_FILMS_MAX = 4;

function FilmPage(): JSX.Element {

  const { id } = useParams<{ id: string }>();
  const user = useSelector<State, User>((state) => state.USER.user);
  const films = useSelector<State, Film[]>((state) => state.DATA.films);
  const favoriteFilms = useSelector<State, Film[]>((state) => state.DATA.favoriteFilms);

  const [currentFilm, setCurrentFilm] = useState<Film | undefined>(() => films.find((film) => film.id === parseFloat(id)));
  const [activeTab, setActiveTab] = useState(<Overview />);
  const [similarFilms] = useState(() => films.filter((film) => film.genre === currentFilm?.genre && film.id !== currentFilm?.id).slice(0, SIMILAR_FILMS_MAX));
  const [addReviewState, setAddReviewState] = useState(false);
  const [userStatus, setUserStatus] = useState(<SignIn />);

  const [isFilmFavorite, setFavoriteFilm] = useState(!!favoriteFilms.find((film) => film.id === currentFilm?.id));

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (films.length && id) {
      const curr = films.find((film) => film.id === parseFloat(id));
      if (!curr) {
        return history.push(AppRoute.Error);
      }
      setCurrentFilm(curr);
    }

  }, [films, history, id]);

  useEffect(() => {
    if (user.id === undefined || user.id === 0) {
      return setUserStatus(<SignIn />);
    }
    return setUserStatus(<SignOut />);
  }, [user]);

  useEffect(() => {
    if (user.id === undefined || user.id === 0) {
      return setAddReviewState(false);
    }
    return setAddReviewState(true);
  }, [user]);

  const getTab = (tab:string) => {
    if (!currentFilm) {
      return;
    }
    switch(tab) {
      case 'Overview':
        setActiveTab(<Overview />);
        break;
      case 'Details':
        setActiveTab(<Details />);
        break;
      case 'Reviews':
        setActiveTab(<Reviews/>);
    }
  };

  const submitFavoriteFilm = (filmId: number, setFilm?: Dispatch<SetStateAction<boolean>>) => {
    dispatch(favoriteFilmPostAction(filmId, setFilm));
  };

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentFilm?.backgroundImage} alt={currentFilm?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            {<Logo />}

            {userStatus}
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm?.genre}</span>
                <span className="film-card__year">{currentFilm?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => history.push(`/player/${id}`)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button" onClick={() => submitFavoriteFilm(parseFloat(id), setFavoriteFilm)}>
                  <svg viewBox="0 0 18 14" width="18" height="14">
                    <use xlinkHref={isFilmFavorite ? '#in-list' : '#add'}></use>
                  </svg>
                  <span>My list</span>
                </button>
                {addReviewState ?<Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link> : ''}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={currentFilm?.posterImage} alt={currentFilm?.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item">
                    <Link to={`/films/${id}`} className="film-nav__link" onClick={() => getTab('Overview')}>Overview</Link>
                  </li>
                  <li className="film-nav__item">
                    <Link to={`/films/${id}`} className="film-nav__link" onClick={() => getTab('Details')}>Details</Link>
                  </li>
                  <li className="film-nav__item">
                    <Link to={`/films/${id}`} className="film-nav__link" onClick={() => getTab('Reviews')}>Reviews</Link>
                  </li>
                </ul>
              </nav>

              {activeTab}
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <div className="catalog__films-list">
            {similarFilms.map((film) => <FilmSmallCard key={film.id + film.name} filmsSmallCard={film}/>)}
          </div>
        </section>
      </div>
    </>
  );
}

export default FilmPage;
