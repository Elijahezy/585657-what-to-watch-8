import { ActionTypes} from '../types/action';
import { Comment, Film, User } from '../types/types';
import { AuthorizationStatus } from '../const';
import { AppRoute } from '../const';

export const changeActiveGenre = (genre: string) => ({
  type: ActionTypes.ChangeActiveGenre,
  payload: genre,
} as const);

export const getFilms = (films: Film[]) => ({
  type: ActionTypes.GetFilms,
  payload: films,
} as const);

export const incrementLimit = (offset: number) => ({
  type: ActionTypes.IncrementLimit,
  payload: offset,
} as const);

export const resetLimit = () => ({
  type: ActionTypes.ResetLimit,
} as const);

export const loadFilms = (films: Film[]) => ({
  type: ActionTypes.LoadFilms,
  payload: {
    films,
  },
} as const);

export const loadComments = (comments: Comment[]) => ({
  type: ActionTypes.LoadComments,
  payload: {
    comments,
  },
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionTypes.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionTypes.RequireLogout,
} as const);

export const loadUser = (user: User) => ({
  type: ActionTypes.LoadUser,
  payload: {
    user,
  },
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionTypes.RedirectToRoute,
  payload: url,
} as const);

