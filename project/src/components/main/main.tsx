import React from 'react';
import MainPageContent from './main-content';
import FilmPreview from './film-preview';

type MainScreenProps = {
  promoFilmInfo: {
    title: string;
    genre: string;
    releaseDate: number;
  };
};

function MainPage({promoFilmInfo}: MainScreenProps): JSX.Element {


  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link" href="/">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link" href="/">Sign out</a>
            </li>
          </ul>
        </header>

        {
          <FilmPreview promoFilmInfo={promoFilmInfo}/>
        }
      </section>
      {
        <MainPageContent />
      }
    </React.Fragment>
  );
}

export default MainPage;
