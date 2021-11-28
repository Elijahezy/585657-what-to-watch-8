import React, { useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { formatTimeElapsed } from '../../utils';
import Error from '../error/error';
import { Film } from '../../types/types';
import LoadingScreen from '../loading-screen/loading-screen';

type PlayerProps = {
  films: Film[],
}

function Player({films}: PlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [currentFilm] = useState(() => films.find((film) => film.id === parseFloat(id)));

  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ isVideoLoading, setIsVideoLoading ] = useState(true);
  const [ progress, setProgress ] = useState(0);
  const [ time, setTime ] = useState('00:00');


  if (!currentFilm) {
    return <Error />;
  }

  const handleWaiting = () => {
    setIsVideoLoading(true);
  };

  const handleLoadedData = () => {
    setIsVideoLoading(false);
  };

  const handlePlaying = () => {
    setIsVideoLoading(false);
  };

  const handleTimeUpdate = (evt: React.SyntheticEvent<HTMLVideoElement>) => {
    const { currentTarget } = evt;
    const percentage = currentTarget.currentTime * 100 / currentTarget.duration;
    const timeElapsed = formatTimeElapsed(currentTarget.duration - currentTarget.currentTime);

    setTime(timeElapsed);
    setProgress(percentage);
  };

  const handlePlayButtonClick = () => {
    if (videoRef && videoRef.current) {
      const player = videoRef.current;

      if (videoRef.current.paused) {
        player.play();
        setIsPlaying(true);
      } else {
        player.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleFullScreenClick = () => {
    if (videoRef && videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleExitClick = () => {
    history.push(`/films/${id}`);
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handlePauseClick = () => {
    setIsPlaying(false);
  };

  if (currentFilm) {
    const { videoLink, backgroundImage, name } = currentFilm;

    return (
      <div className="player">
        { isVideoLoading && <LoadingScreen />}
        {
          currentFilm &&
            <video
              ref={videoRef}
              src={videoLink}
              className="player__video"
              poster={backgroundImage}
              autoPlay
              onPlay={handlePlayClick}
              onPause={handlePauseClick}
              onTimeUpdate={handleTimeUpdate}
              onWaiting={handleWaiting}
              onPlaying={handlePlaying}
              onLoadedData={handleLoadedData}
            />
        }
        <button
          type="button"
          className="player__exit"
          onClick={handleExitClick}
        >
          Exit
        </button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={progress} max="100"/>
              <div className="player__toggler" style={{ left: `${progress}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{time}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={handlePlayButtonClick}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                { isPlaying ? <use xlinkHref="#pause"></use> : <use xlinkHref="#play-s"/>}
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">{name}</div>
            <button type="button" className="player__full-screen" onClick={handleFullScreenClick}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"/>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Error />;
}

export default Player;
