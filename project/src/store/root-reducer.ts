import {combineReducers} from 'redux';
import { filmsData } from './films-data/films-data';
import { filmsProcess } from './films-process/films-process';
import { userData } from './user-data/user-data';


export enum NameSpace {
  data = 'DATA',
  films = 'FILMS',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: filmsData,
  [NameSpace.films]: filmsProcess,
  [NameSpace.user]: userData,
});

export type RootState = ReturnType<typeof rootReducer>;
