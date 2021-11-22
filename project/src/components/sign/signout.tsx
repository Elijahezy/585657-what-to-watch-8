import { useDispatch, useSelector} from 'react-redux';
import { logoutAction } from '../../store/api-actions';
import { State } from '../../types/state';
import { User } from '../../types/types';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

function SignOut (): JSX.Element {

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const user = useSelector<State, User>((state) => state.USER.user);


  return (
    <ul className="user-block">
      <li className="user-block__item" >
        <div className="user-block__avatar" >
          <Link to={AppRoute.MyList}>
            <img src={user.avatarUrl} alt="User avatar" width="63" height="63" />
          </Link>
        </div>
      </li>
      <li className="user-block__item" onClick={handleLogout}>
        <a className="user-block__link" href="/">Sign out</a>
      </li>
    </ul>
  );
}

export default SignOut;
