import { changeActiveGenre, getFilms, incrementLimit, loadFilms, resetLimit, requireAuthorization, requireLogout, loadComments, loadUser,   redirectToRoute, loadPromoFilm, loadFavoriteFilms, upLoadFavoriteFilm, deleteFavoriteFilm } from '../store/action';
import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import {
  AxiosInstance
} from 'axios';
import {State} from '../types/state';

export enum ActionTypes {
  ChangeActiveGenre = 'films/changeGenre',
  GetFilms = 'films/getFilms',
  IncrementLimit = 'films/incrementLimit',
  ResetLimit = 'films/resetLimit',
  LoadFilms = 'data/loadFilms',
  LoadComments = 'data/loadComments',
  LoadUser = 'user/loadUser',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'redirect/redirectToRoute',
  LoadPromoFilm = 'data/loadPromoFilm',
  LoadFavoriteFilms = 'data/loadFavoriteFilms',
  UpLoadFavoriteFilm = 'data/upLoadFavoriteFilm',
  DeleteFavoriteFilm = 'data/deleteFavoriteFilm',
}

export type Actions =
  | ReturnType<typeof changeActiveGenre>
  | ReturnType<typeof getFilms>
  | ReturnType<typeof incrementLimit>
  | ReturnType<typeof resetLimit>
  | ReturnType<typeof loadFilms>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof loadComments>
  | ReturnType<typeof loadUser>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof loadPromoFilm>
  | ReturnType<typeof loadFavoriteFilms>
  | ReturnType<typeof upLoadFavoriteFilm>
  | ReturnType<typeof deleteFavoriteFilm>;


export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
