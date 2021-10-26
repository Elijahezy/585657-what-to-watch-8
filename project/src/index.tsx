import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { filmsData } from './mocks/films';

ReactDOM.render(
  <React.StrictMode>
    <App
      filmsData={filmsData}
    />
  </React.StrictMode>,
  document.getElementById('root'));
