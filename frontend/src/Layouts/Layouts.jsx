import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="site-layout">
      {/* NAVBAR */}
      <header className="site-header">
        <nav className="site-nav" aria-label="Main navigation">
          <Link to="/" className="site-nav__logo">
            loca.
          </Link>

          <div className="site-nav__links">
            <Link to="/about" className="site-nav__link">
              Our Story
            </Link>
          </div>
        </nav>
      </header>

      {/* PAGE CONTENT */}
      <div className="site-main">
        <Outlet />
      </div>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="site-footer__content">
          <Link to="/" className="site-footer__logo">
            loca.
          </Link>

          <p className="site-footer__tagline">Stay local. Feel connected.</p>

          <div className="site-footer__links">
            <Link to="/">Explore</Link>
            <Link to="/about">Our Story</Link>
            <a href="mailto:hello@example.com">Contact</a>
          </div>
        </div>

        <p className="site-footer__copyright">
          © {new Date().getFullYear()} Loca. A student project.
        </p>
      </footer>
    </div>
  );
}

export default Layout;
