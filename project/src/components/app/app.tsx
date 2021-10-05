import MainPage from '../main/main';
import MainPageContent from '../main/main-content';

type MockData = {
  name: string,
  previewImage: string,
  genre: string,
  released: number,
}

type AppFilmsAmount = {
  filmsAmount: number;
  filmsData: MockData[],
}


function App({filmsAmount, filmsData}: AppFilmsAmount): JSX.Element {
  return (
    <>
      <MainPage /><MainPageContent filmsAmount={filmsAmount} filmsData={filmsData}/>
    </>
  );
}

export default App;
