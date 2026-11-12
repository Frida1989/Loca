import { Link, Outlet } from "react-router-dom";
import LocaLogo from "../Components/LocaLogo.jsx";

function Layout() {
  return (
    <div className="site-layout">
      {/* NAVBAR */}
      <header className="site-header">
        <nav className="site-nav" aria-label="Main navigation">
          <LocaLogo />

          <div className="site-nav__links">
            <a href="/#stays" className="site-nav__link">
              Explore Stays
            </a>
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
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo">
              loca.
            </Link>

            <p className="site-footer__description">
              Local stays, thoughtfully chosen.
            </p>

            <p className="site-footer__location">Stockholm, Sweden</p>
          </div>

          <div className="site-footer__links">
            <h3>Explore</h3>
            <a href="/#stays">Explore Stays</a>
            <Link to="/about">Our Story</Link>
          </div>

          <div className="site-footer__contact">
            <p className="site-footer__label">CONNECT</p>

            <h3>Questions about your stay?</h3>

            <p>Have a question or need a hand? Send us an email.</p>

            <a href="mailto:farideh.pakdaman@yh.nackademin.se">Email us ↗</a>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Loca. All rights reserved.</p>
          <p>Made with ♥ by Frida Pakdaman</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
