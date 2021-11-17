import { Comment as CommentType } from '../../types/types';

function Comment(singleComment:CommentType): JSX.Element {
  const {user, rating, comment, date} = singleComment;
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={date}>{date}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default Comment;
