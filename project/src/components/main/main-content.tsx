import {Film} from '../../mocks/types';
import {State} from '../../types/state';
import {SHOWN_COUNT_FILMS} from '../../const';
import FilmSmallCard from '../films/film-small-card';
import Genres from '../genres/genres';
import ShowMore from '../show-more/show-more';
import LoadingScreen from '../loading-screen/loading-screen';
import {useSelector} from 'react-redux';
import {getFilteredFilms, getGenres} from '../../utils';

function MainPageContent(): JSX.Element {
  const activeGenre = useSelector<State, string>((state) => state.activeGenre);
  const limit = useSelector<State, number>((state) => state.limit);
  const films = useSelector<State, Film[]>((state) => state.films);
  const isDataLoaded = useSelector<State, boolean>((state) => state.isDataLoaded);

  const filteredFilms = getFilteredFilms(activeGenre, films);
  const renderedFilms = filteredFilms.slice(0, limit);

  const checkIfFilmsLoaded = () => {
    if (!isDataLoaded) {
      return (
        <LoadingScreen />
      );
    }
    return renderedFilms.map((film) => <FilmSmallCard key={film.id} filmsSmallCard={ film }/>);
  };

  const isShowMoreVisible =
    filteredFilms.length > SHOWN_COUNT_FILMS &&
    filteredFilms.length !== renderedFilms.length;

  return (
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog
        </h2>
        <ul className="catalog__genres-list">
          <Genres genres={getGenres(films)}/>
        </ul>

        <div className="catalog__films-list">
          {
            checkIfFilmsLoaded()
          }
        </div>

        {isShowMoreVisible && <ShowMore />}
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light" href="/">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MainPageContent;
