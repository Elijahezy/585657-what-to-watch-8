import FilmSmallCard from '../films/film-small-card';
import {Film} from '../../mocks/types';
import Genres from '../genres/genres';
import { DEFAULT_GENRE, MAX_NUMBER_GENRES } from '../../const';
import {films} from '../../mocks/films';
import {State} from '../../types/state';
import { Dispatch } from 'redux';
import { Actions } from '../../types/action';
import { resetLimit } from '../../store/action';
import { connect, ConnectedProps } from 'react-redux';
// import { SHOWN_COUNT_FILMS } from '../../const';
import { useEffect } from 'react';

const getGenres = (): string[] => {
  const genres = [DEFAULT_GENRE, ...new Set(films.map((film) => film.genre))];

  if (genres.length > MAX_NUMBER_GENRES) {
    genres.length = MAX_NUMBER_GENRES;
  }

  return genres;
};

const getFilteredFilms = (genre: string): Film[] =>
  genre === DEFAULT_GENRE
    ? films
    : films.filter((film) => film.genre === genre);

const mapStateToProps = ({ activeGenre, limit }: State) => ({
  activeGenre,
  limit,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onResetLimit() {
    dispatch(resetLimit());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MainPageContent({activeGenre, limit, onResetLimit}: PropsFromRedux): JSX.Element {

  const filteredFilms = getFilteredFilms(activeGenre);

  const renderedFilms = filteredFilms.slice(0, limit);
  // const isShowMoreVisible =
  //   filteredFilms.length > SHOWN_COUNT_FILMS &&
  //   filteredFilms.length !== renderedFilms.length;

  useEffect(() => {
    onResetLimit();
  }, [onResetLimit]);


  return (
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog
        </h2>

        <ul className="catalog__genres-list">
          <Genres genres={getGenres()}/>
        </ul>

        <div className="catalog__films-list">
          {
            renderedFilms.map((film) => <FilmSmallCard key={film.id} filmsSmallCard={ film }/>)
          }
        </div>

        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
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
