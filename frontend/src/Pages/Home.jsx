import { Link } from "react-router-dom";
import StayList from "../Components/StayList.jsx";
import BookingForm from "../Components/BookingForm.jsx";
import { useState } from "react";

function Home({ stays }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedStay, setSelectedStay] = useState(null);

  function handleSelectStay(stay) {
    setSelectedStay(stay);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setSelectedStay(null);
  }

  return (
    <main className="home">
      {/* HERO SECTION */}
      <section className="home__hero">
        <div className="home__header"></div>

        <div className="home__hero-content">
          <h1 className="home__title">
            Stay local.
            <span className="home__title-accent">Feel connected.</span>
          </h1>

          <h2 className="home__subtitle">Beyond the ordinary.</h2>

          <p className="home__description">
            Discover unique local homes, explore new neighborhoods, and
            experience cities through a different perspective.
          </p>

          <a href="#stays" className="home__cta">
            Explore local stays
          </a>
        </div>
      </section>

      {/* STAYS SECTION */}
      <section className="home__stays" id="stays">
        <header className="home__stays-header">
          <p className="home__section-description">
            A collection of welcoming spaces made for curious travelers.
          </p>
        </header>

        <StayList stays={stays} onSelectStay={handleSelectStay} />
      </section>

      {/* BOOKING MODAL */}
      {showForm && selectedStay && (
        <div className="booking-modal__backdrop" onClick={closeForm}>
          <div
            className="booking-modal__content"
            role="dialog"
            aria-modal="true"
            aria-label="Booking form"
            onClick={(e) => e.stopPropagation()}
          >
            <BookingForm selectedStay={selectedStay} closeForm={closeForm} />
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
