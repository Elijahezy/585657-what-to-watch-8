import {AuthorizationStatus, DEFAULT_GENRE, MAX_NUMBER_GENRES} from './const';
import {Film, ServerFilm, ServerUser, User} from './types/types';
import dayjs from 'dayjs';
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

const formatFilmDuration = (period: number): string => dayjs
  .duration(period, 'minutes')
  .format('HH[h] mm[m]');

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

export const promoFilm = {
  id: 0,
  name: '',
  videoLink: '',
  description: '',
  genre: '',
  previewImage: '',
  posterImage: '',
  backgroundImage: '',
  backgroundColor: '',
  previewVideoLink: '',
  rating: 0,
  scoresCount: 0,
  director: '',
  starring: [],
  runTime: 0,
  released: 0,
  isFavorite: false,
};
