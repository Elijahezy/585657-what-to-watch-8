import {createReducer} from '@reduxjs/toolkit';
import {FilmsProcess} from '../../types/state';
import {changeActiveGenre, incrementLimit, resetLimit} from '../action';
import { DEFAULT_GENRE, SHOWN_COUNT_FILMS} from '../../const';

const initialState: FilmsProcess = {
  activeGenre: DEFAULT_GENRE,
  limit: SHOWN_COUNT_FILMS,
};

const filmsProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveGenre, (state, action) => {
      const activeGenre = action.payload;

      state.activeGenre = activeGenre;
    })
    .addCase(incrementLimit, (state, action) => {
      state.limit += action.payload;
    })
    .addCase(resetLimit, (state) => {
      state.limit = initialState.limit;
    });
});

export {filmsProcess};
