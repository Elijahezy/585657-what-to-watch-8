import { Film } from '../mocks/types';

export type State = {
  activeGenre: string,
  films: Film[],
  limit: number
};
