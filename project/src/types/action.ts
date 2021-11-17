import { changeActiveGenre, getFilms, incrementLimit, loadFilms, resetLimit, requireAuthorization, requireLogout, loadComments, loadUser,   redirectToRoute } from '../store/action';
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
  RedirectToRoute = 'game/redirectToRoute',
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
  | ReturnType<typeof redirectToRoute>;


export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
