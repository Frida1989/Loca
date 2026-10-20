import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found__content">
        <p className="not-found__eyebrow">YOU TOOK A DIFFERENT TURN</p>

        <h1 className="not-found__code">404.</h1>

        <h2 className="not-found__title">Looks like we're a little lost.</h2>

        <p className="not-found__description">
          This place doesn't exist, but there's plenty more to discover.
        </p>

        <Link to="/" className="not-found__button">
          Back to exploring
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
