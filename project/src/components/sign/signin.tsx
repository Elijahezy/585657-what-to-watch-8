import { AppRoute } from '../../const';

function SignIn(): JSX.Element {
  return (
    <ul className="user-block">
      <div className="user-block">
        <a href={AppRoute.Login} className="user-block__link">Sign in</a>
      </div>
    </ul>
  );
}

export default SignIn;
