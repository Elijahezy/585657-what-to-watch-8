import {Film} from '../../types/types';
import {useParams} from 'react-router';
import {State} from '../../types/state';
import {useSelector} from 'react-redux';
import {memo} from "react";
import { formatFilmDuration } from '../../utils';

function Details(): JSX.Element {

  const { id } = useParams<{ id: string }>();
  const films = useSelector<State, Film[]>((state) => state.DATA.films);

  const currentFilm = films.find((film) => film.id === parseFloat(id));
  const filmDuration = formatFilmDuration(currentFilm?.runTime);

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{currentFilm?.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {currentFilm?.starring.join(' \n ')}
          </span>
        </p>
      </div>
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{filmDuration}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{currentFilm?.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{currentFilm?.released}</span>
        </p>
      </div>
    </div>
  );
}


export default memo(Details);
