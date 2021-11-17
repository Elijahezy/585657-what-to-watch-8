type LogoProps = {
  className?: string,
}

function Logo({className}: LogoProps): JSX.Element {

  return (
    <div className="logo">
      <a className={`logo__link ${className}`} href="/">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>
  );
}

export default Logo;

