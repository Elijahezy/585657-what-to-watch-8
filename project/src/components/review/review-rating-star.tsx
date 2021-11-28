import { Dispatch, SetStateAction } from 'react';

type ReviewStarProps = {
  index: number;
  setRating: Dispatch<SetStateAction<number>>;
}

function ReviewStar ({index, setRating}:ReviewStarProps): JSX.Element {
  return (
    <>
      <input
        className="rating__input"
        id={`star-${index + 1}`}
        type="radio"
        name="rating"
        value={index + 1}
        onChange={(e) => setRating(parseFloat(e.target.value))}
      />
      <label className="rating__label" htmlFor={`star-${index + 1}`}>Rating {index + 1}</label>
    </>
  );
}

export default ReviewStar;
