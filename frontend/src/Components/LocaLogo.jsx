import { Link } from "react-router-dom";

function LocaLogo() {
  return (
    <Link to="/" className="loca-logo" aria-label="Loca — Go to homepage">
      <span className="loca-logo__icon" aria-hidden="true">
        <span className="loca-logo__ring"></span>
        <span className="loca-logo__door"></span>
        <span className="loca-logo__dot"></span>
      </span>

      <span className="loca-logo__text">loca.</span>
    </Link>
  );
}

export default LocaLogo;
