import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {ActionTypes} from '../../types/action';
import { State } from '../../types/state';

export const redirect: Middleware<unknown, State> =
  (_store) =>
    (next) =>
      (action) => {

        if (action.type === ActionTypes.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
