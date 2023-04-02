import {Film} from '../../types/types';
import {FormEvent, useMemo, useState} from 'react';
import {
  useParams,
  Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { useDispatch } from 'react-redux';
import { ThunkAppDispatch } from '../../types/action';
import { commentPostAction } from '../../store/api-actions';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {State} from '../../types/state';
import {User} from '../../types/types';
import SignIn from '../sign/signin';
import SignOut from '../sign/signout';
import ReviewStar from './review-rating-star';
import uniqid from 'uniqid';

type ReviewProps = {
  films: Film[],
}

const RATING_STARS = 10;
const MAX_COMMENT_LENGTH = 400;
const MIN_COMMENT_LENGTH = 50;

function Review({films}:ReviewProps): JSX.Element {

  const { id } = useParams<{ id: string }>();

  const [ currentFilm ] = useState(() => films.find((film) => film.id === parseFloat(id)));

  const [ comment, setComment ] = useState('');
  const [ rating, setRating ] = useState(0);
  const [ submitButtonStatus, setSubmitButtonStatus] = useState(true);
  const [ formStatus, setFormStatus] = useState(false);

  const dispatch = useDispatch<ThunkAppDispatch>();

  const [ userStatus, setUserStatus ] = useState(<SignOut />);
  const user = useSelector<State, User>((state) => state.USER.user);

  useEffect(() => {
    if (user.id === undefined || user.id === 0) {
      return setUserStatus(<SignIn />);
    }
    return setUserStatus(<SignOut />);
  }, [user]);

  useEffect(() => {
    if (comment.length > MAX_COMMENT_LENGTH || comment.length < MIN_COMMENT_LENGTH || rating === 0) {
      return setSubmitButtonStatus(true);
    }
    return setSubmitButtonStatus(false);
  }, [rating, comment]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (rating !== 0 && comment !== '') {
      setFormStatus(true);
      setSubmitButtonStatus(true);
      dispatch(commentPostAction({id, rating, comment}, setFormStatus, setSubmitButtonStatus));
    }
  };

  const memoizedRatingStars = useMemo(() => (
    new Array(RATING_STARS)
      .fill('')
      .map((value, index) => <ReviewStar key={uniqid()} index={index} setRating={setRating}/>)
      .reverse()
  ), []);


  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={currentFilm?.backgroundImage} alt={currentFilm?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          {<Logo />}

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

          {userStatus}
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={currentFilm?.posterImage} alt={currentFilm?.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form className="add-review__form" onSubmit={handleSubmit}>
          <div className="rating">
            <div className="rating__stars">
              {
                memoizedRatingStars
              }
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={formStatus}
            >
            </textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={submitButtonStatus}>Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>);
}

export default Review;

