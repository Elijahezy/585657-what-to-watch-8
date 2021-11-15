import { Film } from '../mocks/types';
import { AuthorizationStatus } from '../const';

export type State = {
  activeGenre: string,
  films: Film[],
  limit: number,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};
