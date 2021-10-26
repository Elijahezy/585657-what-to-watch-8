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
