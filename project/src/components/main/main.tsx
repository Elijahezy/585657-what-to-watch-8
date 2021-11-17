/* eslint-disable no-console */
import React, { useState } from 'react';
import MainPageContent from './main-content';
import FilmPreview from './film-preview';
import Logo from '../logo/logo';
import SignIn from '../sign/signin';
import { useSelector } from 'react-redux';
import { State } from '../../types/state';
import { User } from '../../types/types';
import SignOut from '../sign/signout';
import {useEffect} from 'react';

type MainScreenProps = {
  promoFilmInfo: {
    title: string;
    genre: string;
    releaseDate: number;
  };
};

function MainPage({promoFilmInfo}: MainScreenProps): JSX.Element {
  const user = useSelector<State, User>((state) => state.user);
  const [userStatus, setUserStatus] = useState(<SignIn />);


  useEffect(() => {
    if (user.id === undefined) {
      return setUserStatus(<SignIn />);
    }
    return setUserStatus(<SignOut />);
  }, [user]);

  console.log(user.id);

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          {<Logo/>}

          {userStatus}
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
