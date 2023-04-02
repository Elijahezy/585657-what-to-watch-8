import {AuthorizationStatus, DEFAULT_GENRE, MAX_NUMBER_GENRES, Rating} from './const';
import {Film, ServerFilm, ServerUser, User} from './types/types';
// @ts-ignore
import dayjs from 'dayjs';
// @ts-ignore
import duration from 'dayjs/plugin/duration';

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;


export const getGenres = (films: Film[]): string[] => {
  const genres = [DEFAULT_GENRE, ...new Set(films.map((film) => film.genre))];

  if (genres.length > MAX_NUMBER_GENRES) {
    genres.length = MAX_NUMBER_GENRES;
  }

  return genres;
};

export const getFilteredFilms = (genre: string, films: Film[]): Film[] =>
  genre === DEFAULT_GENRE
    ? films
    : films.filter((film) => film.genre === genre);

export const adaptToClient = (serverFilm: ServerFilm):Film => {
  const adaptedFilm =
    {
      posterImage: serverFilm['poster_image'],
      videoLink: serverFilm['video_link'],
      previewImage: serverFilm['preview_image'],
      backgroundImage: serverFilm['background_image'],
      backgroundColor: serverFilm['background_color'],
      previewVideoLink: serverFilm['preview_video_link'],
      scoresCount: serverFilm['scores_count'],
      runTime: serverFilm['run_time'],
      isFavorite: serverFilm['is_favorite'],
      ...serverFilm};

  delete adaptedFilm['poster_image'];
  delete adaptedFilm['video_link'];
  delete adaptedFilm['preview_image'];
  delete adaptedFilm['background_image'];
  delete adaptedFilm['background_color'];
  delete adaptedFilm['preview_video_link'];
  delete adaptedFilm['scores_count'];
  delete adaptedFilm['run_time'];
  delete adaptedFilm['is_favorite'];

  return adaptedFilm;
};

export const adaptUserDataToClient = (serverUser: ServerUser):User => {
  const adaptedUser = Object.assign(
    {},
    serverUser,
    {
      avatarUrl: serverUser['avatar_url'],
    },
  );

  delete adaptedUser['avatar_url'];
  return adaptedUser;
};

dayjs.extend(duration);

const formatDate = (date: Date, format: string): string =>
  dayjs(date).format(format).toString();

const formatFilmDuration = (period: number | undefined): string => {
  if (period) {
    return dayjs
      .duration(period, 'minutes')
      .format('HH[h] mm[m]');
  }
  return '';
};

const formatTimeElapsed = (period: number): string =>
  dayjs
    .duration(period, 'seconds')
    .format('-HH:mm:ss')
    .replace('00:', '');

export {
  formatFilmDuration,
  formatTimeElapsed,
  formatDate
};


export const setFilmRating = (film: Film | undefined): string => {
  if (film) {
    if (film.rating <= 3) {
      return Rating.Bad;
    }
    if (film.rating <= 5 && film.rating > 3) {
      return Rating.Normal;
    }
    if (film.rating <= 8 && film.rating > 5) {
      return Rating.Good;
    }
    if (film.rating < 10 && film.rating > 8) {
      return Rating.VeryGood;
    }
    if (film.rating === 10) {
      return Rating.Awesome;
    }
  }
  return '';
};

