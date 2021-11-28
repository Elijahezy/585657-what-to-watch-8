/* eslint-disable no-console */
import React, { useState } from 'react';
import MainPageContent from './main-content';
import FilmPreview from './film-preview';
import Logo from '../logo/logo';
import SignIn from '../sign/signin';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../types/state';
import { User, Film } from '../../types/types';
import SignOut from '../sign/signout';
import {useEffect} from 'react';
import { checkAuthAction } from '../../store/api-actions';


function MainPage(): JSX.Element {


  const dispatch = useDispatch();

  const [ userStatus, setUserStatus ] = useState(<SignOut />);

  const user = useSelector<State, User>((state) => state.USER.user);
  const promoFilm = useSelector<State, Film>((state) => state.DATA.promo);
  const { backgroundImage, name } = promoFilm;

  useEffect(() => {
    if (user.id === undefined || user.id === 0) {
      dispatch(checkAuthAction());
      return setUserStatus(<SignIn />);
    }
    return setUserStatus(<SignOut />);
  }, [dispatch, user.id]);

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          {<Logo/>}

          {userStatus}
        </header>

        {
          <FilmPreview />
        }
      </section>
      {
        <MainPageContent />
      }
    </React.Fragment>
  );
}

export default MainPage;
