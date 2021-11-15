import {AuthorizationStatus, DEFAULT_GENRE, MAX_NUMBER_GENRES} from './const';
import {Film, ServerFilm} from './mocks/types';

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
  const adaptedFilm = Object.assign(
    {},
    serverFilm,
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
    },
  );
  return adaptedFilm;
};
