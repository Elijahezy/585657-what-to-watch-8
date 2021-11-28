import { ActionTypes} from '../types/action';
import { Comment, Film, User } from '../types/types';
import { AuthorizationStatus } from '../const';

import {createAction} from '@reduxjs/toolkit';

export const changeActiveGenre = createAction(
  ActionTypes.ChangeActiveGenre,
  (genre: string) => ({
    payload: genre,
  }),
);

export const getFilms = createAction(
  ActionTypes.GetFilms,
  (films: Film[]) => ({
    payload: films,
  }),
);

export const incrementLimit = createAction(
  ActionTypes.IncrementLimit,
  (offset: number) => ({
    payload: offset,
  }),
);

export const resetLimit = createAction(ActionTypes.ResetLimit);

export const loadFilms = createAction(
  ActionTypes.LoadFilms,
  (films: Film[]) => ({
    payload: {films},
  }),
);

export const loadComments = createAction(
  ActionTypes.LoadComments,
  (comments: Comment[]) => ({
    payload: {comments},
  }),
);

export const requireAuthorization = createAction(
  ActionTypes.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }),
);

export const requireLogout = createAction(ActionTypes.RequireLogout);

export const loadUser = createAction(
  ActionTypes.LoadUser,
  (user: User) => ({
    payload: {user},
  }),
);

export const redirectToRoute = createAction(
  ActionTypes.RedirectToRoute,
  (url: string) => ({
    payload: url,
  }),
);

export const loadPromoFilm = createAction(
  ActionTypes.LoadPromoFilm,
  (promo: Film) => ({
    payload: promo,
  }),
);

export const loadFavoriteFilms = createAction(
  ActionTypes.LoadFavoriteFilms,
  (favoriteFilms: Film[]) => ({
    payload: favoriteFilms,
  }),
);

export const upLoadFavoriteFilm = createAction(
  ActionTypes.UpLoadFavoriteFilm,
  (favoriteFilm: Film) => ({
    payload: favoriteFilm,
  }),
);

export const deleteFavoriteFilm = createAction(
  ActionTypes.DeleteFavoriteFilm,
  (favoriteFilm: Film) => ({
    payload: favoriteFilm,
  }),
);
