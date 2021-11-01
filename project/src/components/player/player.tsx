type PlayerProps = {
  src: string;
  poster: string;
}

function Player({src, poster}:PlayerProps): JSX.Element {
  return (
    <video src={src} className="player__video" poster={poster}></video>
  );
}

export default Player;
