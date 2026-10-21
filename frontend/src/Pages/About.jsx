import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about">
      {/* PAGE INTRO */}
      <header className="about__intro">
        <p className="about__eyebrow">OUR STORY</p>
        <h1 className="about__title">
          A city feels different when you live in it.
        </h1>
      </header>

      {/* SECTION 01: OUR IDEA */}
      <section className="about__section about__idea">
        <p className="about__number">01 / OUR IDEA</p>
        <h2 className="about__heading">
          A little less tourist.
          <span>A little more local.</span>
        </h2>
        <p className="about__text">
          Loca started with a simple thought. The best part of travelling is
          often what you never planned. A quiet street, a familiar café, a place
          that feels like yours for a few days.
        </p>
        <p className="about__text">
          We wanted to make finding that kind of stay a little easier.
        </p>
      </section>

      {/* SECTION 02: THE EXPERIENCE */}
      <section className="about__section about__experience">
        <p className="about__number">02 / THE EXPERIENCE</p>
        <h2 className="about__heading">
          Find a place.
          <span>Get a feel for the city.</span>
        </h2>
        <p className="about__text">
          From a small room in Stockholm to a cosy apartment in Amsterdam, Loca
          brings together spaces with their own character.
        </p>
        <p className="about__text">
          Choose somewhere that feels right, settle in and discover what makes a
          city special beyond its famous sights.
        </p>
      </section>

      {/* SECTION 03: HOW IT WORKS */}
      <section className="about__section about__how">
        <p className="about__number">03 / HOW IT WORKS</p>
        <h2 className="about__heading">
          Your next stay, in a few simple steps.
        </h2>
        <ol className="about__steps">
          <li className="about__step">
            <span className="about__step-number">01</span>
            <h3>Explore</h3>
            <p>Browse local stays and find a place that catches your eye.</p>
          </li>
          <li className="about__step">
            <span className="about__step-number">02</span>
            <h3>Choose</h3>
            <p>
              Select your room, enter your details and pick your travel dates.
            </p>
          </li>
          <li className="about__step">
            <span className="about__step-number">03</span>
            <h3>Book</h3>
            <p>Confirm your booking and receive your confirmation on screen.</p>
          </li>
        </ol>
      </section>

      {/* FINAL CTA */}
      <section className="about__cta">
        <h2>Somewhere new. Something familiar.</h2>
        <Link to="/#stays" className="about__button">
          Explore stays
        </Link>
      </section>
    </main>
  );
}

export default About;
