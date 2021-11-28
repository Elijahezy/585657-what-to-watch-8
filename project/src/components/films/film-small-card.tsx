import {Film} from '../../types/types';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

const TIME = 1000;

const VIDEO_STYLES = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function FilmSmallCard({filmsSmallCard}: {filmsSmallCard: Film}): JSX.Element {
  const history = useHistory();
  const {id, name, posterImage, previewImage, previewVideoLink} = filmsSmallCard;

  const timer = useRef<NodeJS.Timeout | null>(null);

  const [ isHovered, setHovered ] = useState(false);
  const [ isDelayedHovered, setDelayedHovered ] = useState(false);

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    clearTimer();
    if (!isHovered) {
      if (isDelayedHovered) {
        setDelayedHovered(false);
      }
      return;
    }
    timer.current = setTimeout(() => {
      if (!isHovered) {
        if (isDelayedHovered) {
          setDelayedHovered(false);
        }
        return;
      }
      setDelayedHovered(true);
    }, TIME);
    return clearTimer;
  }, [isDelayedHovered, isHovered]);

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)} onClick={() => history.push(`/films/${id}`)}
    >
      {
        isDelayedHovered ?
          <div style={VIDEO_STYLES}>
            <video src={previewVideoLink} autoPlay muted poster={previewImage} width="280" height="175" style={{objectFit: 'cover'}} />
          </div> :
          <div className="small-film-card__image">
            <img src={posterImage} alt={name} width="280" height="175" />
          </div>
      }
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}

export default FilmSmallCard;
