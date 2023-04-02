import {ThunkActionResult} from '../types/action';
import {loadComments, loadFilms, loadUser, requireAuthorization, requireLogout, redirectToRoute, loadPromoFilm, loadFavoriteFilms} from './action';
import {saveToken, dropToken, Token} from '../services/token';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {Comment, CommentPost, ServerFilm} from '../types/types';
import {AuthData} from '../types/auth-data';
import { adaptToClient, adaptUserDataToClient } from '../utils';
import { Dispatch, SetStateAction } from 'react';
import {toast} from 'react-toastify';

const POST_REVIEW_FAIL_MESSAGE = 'Не удалось отправить отзыв';

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

export const fetchPromoAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<ServerFilm>(APIRoute.Promo);
    const adaptedData = adaptToClient(data);
    dispatch(loadPromoFilm(adaptedData));
  };

export const fetchFavoriteFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<ServerFilm[]>(APIRoute.Favorite);
    if (!data) {
      return;
    }
    const adaptedData = data.map((film) => adaptToClient(film));
    dispatch(loadFavoriteFilms(adaptedData));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then((response) => {
        if (response.status !== 200) {
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

export const commentPostAction = ({id, rating, comment}: CommentPost, setFormStatus: Dispatch<SetStateAction<boolean>>, setSubmitButtonStatus: Dispatch<SetStateAction<boolean>>): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.post(`${APIRoute.Comments}/${id}`, {rating, comment});
      dispatch(redirectToRoute(`/films/${id}`));
      setFormStatus(false);
      setSubmitButtonStatus(false);
    } catch {
      toast.info(POST_REVIEW_FAIL_MESSAGE);
      setFormStatus(false);
      setSubmitButtonStatus(false);
    }
  };

export const favoriteFilmPostAction = (id: number, setFilm?: Dispatch<SetStateAction<boolean>>): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.get<ServerFilm[]>(APIRoute.Favorite);
    if (!data) {
      return;
    }
    if (data.find((film) => film.id === id)) {
      if (setFilm) {
        setFilm(false);
      }
      return await api.post(`${APIRoute.Favorite}/${id}/0`);
    }
    if (setFilm) {
      setFilm(true);
    }
    return await api.post(`${APIRoute.Favorite}/${id}/1`);
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(loadUser({id: 0, email: '', name: '', avatarUrl: '', token: ''}));
    dispatch(requireLogout());
  };

