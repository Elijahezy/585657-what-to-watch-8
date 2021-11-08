import { Film } from '../../mocks/types';
import {
  useParams,
  Link } from 'react-router-dom';
import {useState} from 'react';
import Overview from '../tabs/overview';
import Details from '../tabs/details';
import Reviews from '../tabs/reviews';
import FilmSmallCard from './film-small-card';

type FilmPageProps = {
  films: Film[]
}

const SIMILAR_FILMS_MAX = 4;

function FilmPage({films}:FilmPageProps): JSX.Element {

  const { id } = useParams<{ id: string }>();

  const [currentFilm] = useState(() => films.find((film) => film.id === parseFloat(id)));

  const [activeTab, setActiveTab] = useState(<Overview currentFilm={currentFilm}/>);

  function getTab(tab:string) {
    switch(tab) {
      case 'Overview':
        setActiveTab(<Overview currentFilm={currentFilm}/>);
        break;
      case 'Details':
        setActiveTab(<Details currentFilm={currentFilm}/>);
        break;
      case 'Reviews':
        setActiveTab(<Reviews/>);
    }
  }

  const [similarFilms] = useState(() => films.filter((film) => film.genre === currentFilm?.genre && film.id !== currentFilm?.id).slice(0, SIMILAR_FILMS_MAX));

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentFilm?.backgroundImage} alt={currentFilm?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <a href="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link" href="/">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm?.genre}</span>
                <span className="film-card__year">{currentFilm?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <Link to={'/'}>Play</Link>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={currentFilm?.previewImage} alt={currentFilm?.name} width="218" height="327" />
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
