import {Film} from '../../types/types';
import React from 'react';
import {useParams} from 'react-router';
import {State} from '../../types/state';
import {useSelector} from 'react-redux';
import { setFilmRating } from '../../utils';

function Overview(): JSX.Element {

  const { id } = useParams<{ id: string }>();
  const films = useSelector<State, Film[]>((state) => state.DATA.films);

  const currentFilm = films.find((film) => film.id === parseFloat(id));
  const rating = setFilmRating(currentFilm);

  return (
    <React.Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{currentFilm?.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{rating}</span>
          <span className="film-rating__count">{currentFilm?.scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        {currentFilm?.description}
        <p className="film-card__director"><strong>Director: {currentFilm?.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {currentFilm?.starring.join(', ')}</strong></p>
      </div>
    </React.Fragment>);
}

export default Overview;
