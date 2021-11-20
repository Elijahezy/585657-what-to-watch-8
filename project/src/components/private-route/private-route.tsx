import {Route, Redirect} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {History} from 'history';
import {useSelector} from 'react-redux';

type RenderFuncProps = {
  history: History<unknown>;
}

type PrivateRouteProps = RouteProps & {
  render: (props: RenderFuncProps) => JSX.Element;
}
const mapStateToProps = ({USER}: State) => ({
  authorizationStatus: USER.authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
  const {exact, path, render} = props;

  const status = useSelector<State, string>((state) => state.USER.authorizationStatus);
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => (
        status === AuthorizationStatus.Auth
          ? render(routeProps)
          : <Redirect to={AppRoute.Login} />
      )}
    />
  );
}

export {PrivateRoute};
export default connector(PrivateRoute);
