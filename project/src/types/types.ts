export type Film = {
  id: number,
  name: string,
  videoLink?: string,
  description: string,
  genre: string,
  previewImage?: string,
  posterImage?: string,
  backgroundImage?: string,
  backgroundColor?: string,
  previewVideoLink?: string,
  rating: number,
  scoresCount?: number,
  director: string,
  starring: string[],
  runTime?: number,
  released: number,
  isFavorite?: boolean,
};

export type CommentPost = {
  id: string,
  rating: number,
  comment: string,
}

export type Comment = {
  id: number,
  user: {
    id: number,
    name: string,
  }
  rating: number,
  comment: string,
  date: string,
}

export type User = {
  id: number,
  email: string,
  name: string,
  avatarUrl?: string,
  token: string,
}

export type ServerUser = {
  'id': number,
  'email': string,
  'name': string,
  'avatar_url'?: string,
  'token': string,
}

export type ServerFilm = {
  'id': number,
  'name': string,
  'poster_image'?: string,
  'preview_image'?: string,
  'background_image'?: string,
  'background_color'?: string,
  'video_link'?: string,
  'preview_video_link'?: string,
  'description': string,
  'rating': number,
  'scores_count'?: number,
  'director': string,
  'starring': string[],
  'run_time'?: number,
  'genre': string,
  'released': 2014,
  'is_favorite'?: boolean,
}

