import {Film} from '../../mocks/types';
import {useState} from 'react';
import {
  useParams,
  Link } from 'react-router-dom';

type ReviewProps = {
  filmsData: Film[],
}

const RATING_STARS = 10;

function Review({filmsData}:ReviewProps): JSX.Element {

  const { id } = useParams<{ id: string }>();

  const [currentFilm] = useState(() => filmsData.find((film) => film.id === parseFloat(id)));

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);


  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={currentFilm?.backgroundImage} alt={currentFilm?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <a href="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{currentFilm?.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}/review`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

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

        <div className="film-card__poster film-card__poster--small">
          <img src={currentFilm?.posterImage} alt={currentFilm?.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {
                new Array(RATING_STARS).fill('').map((value, index) => <><input className="rating__input" id={`star-${index}`} type="radio" name="rating" value={rating} onChange={(e) => setRating(parseFloat(e.target.value))}/><label className="rating__label" htmlFor={`star-${index}`}>Rating {index}</label></>)
              }
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            >
            </textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>);
}

export default Review;

