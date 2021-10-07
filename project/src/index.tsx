import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const FILM_NAMES = [
  'Midnight Special',
  'Mindhunter',
  'Orlando',
];

const FILM_ULRS = [
  'img/midnight-special.jpg',
  'img/mindhunter.jpg',
  'img/orlando.jpg',
];

const FILM_GENRES = [
  'Comedies',
  'Crime',
  'Documentary',
];

const FILM_RELEASES = [
  2014,
  1998,
  2005,
];

type FilmItem = {
  name: string,
  previewImage: string,
  genre: string,
  released: number,
}

function generateFilmaCardsData(): FilmItem {
  return {
    name: FILM_NAMES[Math.floor(Math.random() * FILM_NAMES.length)],
    previewImage: FILM_ULRS[Math.floor(Math.random() * FILM_ULRS.length)],
    genre: FILM_GENRES[Math.floor(Math.random() * FILM_GENRES.length)],
    released: FILM_RELEASES[Math.floor(Math.random() * FILM_RELEASES.length)],
  };
}

const Setting = {
  FILMS: 20,
};

const temporaryData = {
  FILM_CARDS: new Array(Setting.FILMS).fill('').map(generateFilmaCardsData),
};


ReactDOM.render(
  <React.StrictMode>
    <App filmsData={temporaryData.FILM_CARDS}/>
  </React.StrictMode>,
  document.getElementById('root'));
