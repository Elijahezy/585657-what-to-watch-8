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
  Comments = '/comments',
  Promo = '/promo',
  Favorite = '/favorite'
}

export enum Rating {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome',
}

export const DEFAULT_GENRE = 'All genres';
export const SHOWN_COUNT_FILMS = 8;
export const MAX_NUMBER_GENRES = 10;

export const promoFilm = {
  id: 0,
  name: '',
  videoLink: '',
  description: '',
  genre: '',
  previewImage: '',
  posterImage: '',
  backgroundImage: '',
  backgroundColor: '',
  previewVideoLink: '',
  rating: 0,
  scoresCount: 0,
  director: '',
  starring: [],
  runTime: 0,
  released: 0,
  isFavorite: false,
};
