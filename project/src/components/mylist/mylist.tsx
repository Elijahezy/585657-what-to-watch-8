import { Film } from '../../types/types';
import FilmSmallCard from '../films/film-small-card';
import Logo from '../logo/logo';

type MyListProps = {
  films: Film[],
}

function MyList({films}:MyListProps): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        {<Logo />}

        <h1 className="page-title user-page__title">My list</h1>

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

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {
            films.map((film) => <FilmSmallCard key={film.id} filmsSmallCard={ film }/>)
          }
        </div>
      </section>

      <footer className="page-footer">
        {<Logo className={'logo__link--light'}/>}

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyList;
