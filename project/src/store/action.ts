import { ActionTypes} from '../types/action';
import { Film } from '../mocks/types';

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
