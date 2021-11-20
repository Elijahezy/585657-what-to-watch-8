import {ThunkActionResult} from '../types/action';
import {loadComments, loadFilms, loadUser, requireAuthorization, requireLogout, redirectToRoute} from './action';
import {saveToken, dropToken, Token} from '../services/token';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {Comment, CommentPost, ServerFilm} from '../types/types';
import {AuthData} from '../types/auth-data';
import { adaptToClient, adaptUserDataToClient } from '../utils';

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<ServerFilm[]>(APIRoute.Films);
    const adaptedData = data.map((film) => adaptToClient(film));
    dispatch(loadFilms(adaptedData));
  };

export const fetchCommentsAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    dispatch(loadComments(data));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then((response) => {
        if (response.statusText !== 'OK') {
          return;
        }
        const data = adaptUserDataToClient(response.data);
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        dispatch(loadUser(data));
      });
  };

export const loginAction = ({email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const commentPostAction = ({id, rating, comment}: CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.post(`${APIRoute.Comments}/${id}`, {rating, comment});
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(loadUser({id: 0, email: '', name: '', avatarUrl: '', token: ''}));
    dispatch(requireLogout());
  };
