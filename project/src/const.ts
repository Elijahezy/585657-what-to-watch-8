export enum AppRoute {
  Main = '/',
  Login = '/login',
  Error = '/error',
  MyList = '/mylist',
  Player = '/player/:id',
  Review = '/films/:id/review',
  Films = '/films/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
}

export const DEFAULT_GENRE = 'All genres';
export const SHOWN_COUNT_FILMS = 4;
export const MAX_NUMBER_GENRES = 10;
