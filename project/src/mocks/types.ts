export type Film = {
  id: number,
  name: string,
  videoLink: string,
  description: string,
  genre: string,
  previewImage: string,
  posterImage: string,
  backgroundImage: string,
  backgroundColor: string,
  previewVideoLink: string,
  rating: number,
  scoresCount: number,
  director: string,
  starring: string[],
  runTime: number,
  released: number,
  isFavorite: boolean,
};