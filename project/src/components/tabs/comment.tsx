import { Comment as CommentType } from '../../types/types';
import { formatDate } from '../../utils';

function Comment(singleComment:CommentType): JSX.Element {
  const {user, rating, comment, date} = singleComment;

  const formattedDate = new Date(date);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={date}>{formatDate(formattedDate, 'MMMM D, YYYY')}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default Comment;
