import {combineReducers} from 'redux';
import { filmsData } from './films-data/films-data';
import { filmsProcess } from './films-process/films-process';
import { userData } from './user-data/user-data';


export enum GlobalReducer {
  data = 'DATA',
  films = 'FILMS',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [GlobalReducer.data]: filmsData,
  [GlobalReducer.films]: filmsProcess,
  [GlobalReducer.user]: userData,
});

export type RootState = ReturnType<typeof rootReducer>;
