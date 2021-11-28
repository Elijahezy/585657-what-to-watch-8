import {createReducer} from '@reduxjs/toolkit';
import {FilmsData} from '../../types/state';
import { promoFilm } from '../../const';
import {loadComments, loadFavoriteFilms, loadFilms, loadPromoFilm} from '../action';

const initialState: FilmsData = {
  films: [],
  comments: [],
  promo: promoFilm,
  favoriteFilms: [],
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
    })
    .addCase(loadPromoFilm, (state, action) => {
      const promo = action.payload;

      state.promo = promo;
    })
    .addCase(loadFavoriteFilms, (state, action) => {
      const favoriteFilms = action.payload;

      state.favoriteFilms = favoriteFilms;
    });
});

export {filmsData};
