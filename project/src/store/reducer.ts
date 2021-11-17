
import { ActionTypes, Actions } from '../types/action';
import { State } from '../types/state';
import { DEFAULT_GENRE, SHOWN_COUNT_FILMS, AuthorizationStatus } from '../const';


export const initialState: State = {
  activeGenre: DEFAULT_GENRE,
  films: [],
  limit: SHOWN_COUNT_FILMS,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  comments: [],
  user: {
    id: 0,
    email: '',
    name: '',
    avatarUrl: '',
    token: '',
  },
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.ChangeActiveGenre:
      return { ...state, activeGenre: action.payload };
    case ActionTypes.GetFilms:
      return { ...state, films: action.payload };
    case ActionTypes.IncrementLimit:
      return { ...state, limit: state.limit + action.payload };
    case ActionTypes.ResetLimit:
      return { ...state, limit: initialState.limit };
    case ActionTypes.LoadFilms: {
      const {films} = action.payload;
      return { ...state, films};
    }
    case ActionTypes.LoadComments: {
      const {comments} = action.payload;
      return { ...state, comments};
    }
    case ActionTypes.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
        isDataLoaded: true,
      };
    case ActionTypes.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionTypes.LoadUser: {
      const {user} = action.payload;
      return { ...state, user};
    }
    default:
      return state;
  }
};

export { reducer };
