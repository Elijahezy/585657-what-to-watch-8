import { Comment, Film, User } from './types';
import { AuthorizationStatus } from '../const';

export type State = {
  activeGenre: string,
  films: Film[],
  limit: number,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  comments: Comment[],
  user: User,
};
