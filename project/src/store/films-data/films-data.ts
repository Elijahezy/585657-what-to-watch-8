import {createReducer} from '@reduxjs/toolkit';
import {FilmsData} from '../../types/state';
import {loadComments, loadFilms} from '../action';

const initialState: FilmsData = {
  films: [],
  comments: [],
};

const filmsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      const {films} = action.payload;

      state.films = films;
    })
    .addCase(loadComments, (state, action) => {
      const {comments} = action.payload;

      state.comments = comments;
    });
});

export {filmsData};
