import MainPage from '../main/main';
import MainPageContent from '../main/main-content';

export type FilmItem = {
  name: string,
  previewImage: string,
  genre: string,
  released: number,
}

type AppFilmsAmount = {
  filmsData: FilmItem[],
}


function App({filmsData}: AppFilmsAmount): JSX.Element {
  return (
    <>
      <MainPage /><MainPageContent filmsData={filmsData}/>
    </>
  );
}

export default App;
