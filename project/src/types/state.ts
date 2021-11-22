import { Comment, Film, User } from './types';
import { AuthorizationStatus } from '../const';
import {RootState} from '../store/root-reducer';

export type UserData = {
  authorizationStatus: AuthorizationStatus,
  user: User,
  isDataLoaded: boolean,
};

export type FilmsData = {
  films: Film[],
  comments: Comment[],
  promo: Film,
  favoriteFilms: Film[],
}

export type FilmsProcess = {
  limit: number,
  activeGenre: string,
}

export type State = RootState;
