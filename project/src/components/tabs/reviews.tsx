import { fetchCommentsAction } from '../../store/api-actions';
import { useParams } from 'react-router';
import { State } from '../../types/state';
import { useSelector } from 'react-redux';
import { Comment as CommentType } from '../../types/types';
import { useDispatch } from 'react-redux';
import Comment from '../tabs/comment';
import { ThunkAppDispatch } from '../../types/action';
import { useEffect } from 'react';

function Reviews(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<ThunkAppDispatch>();

  useEffect(() => {
    dispatch(fetchCommentsAction(id));

  }, [dispatch, id]);


  const comments = useSelector<State, CommentType[]>((state) => state.comments);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.map((singleComment) => <Comment key={singleComment.id} {...singleComment}/>)}
      </div>
    </div>
  );
}


export default Reviews;
