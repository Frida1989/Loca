import StayList from "../Components/StayList.jsx";
import BookingForm from "../Components/BookingForm.jsx";
import { useState, useEffect, useRef } from "react";

function Home({ stays, loading, error }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedStay, setSelectedStay] = useState(null);

  const modalRef = useRef(null);

  // Scroll to stays when coming from the About page.
  useEffect(() => {
    if (window.location.hash === "#stays") {
      document.getElementById("stays")?.scrollIntoView();
    }
  }, []);

  function handleSelectStay(stay) {
    setSelectedStay(stay);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setSelectedStay(null);
  }

  // Close the modal with Escape and restore focus after closing.
  useEffect(() => {
    if (!showForm) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalRef.current?.querySelector("select")?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") closeForm();
      // Keep Tab focus inside the open booking dialog.
      if (event.key === "Tab" && modalRef.current) {
        const elements = modalRef.current.querySelectorAll(
          "button:not(:disabled), input:not(:disabled), select:not(:disabled), a[href]",
        );
        if (!elements.length) return;
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [showForm]);

  return (
    <main className="home">
      {/* HERO SECTION */}
      <section className="home__hero">
        <div className="home__hero-content">
          <h1 className="home__title">
            Book a stay.
            <span className="home__title-accent">Feel the city.</span>
          </h1>

          <h2 className="home__subtitle">LOCAL STAYS. NEW EXPERIENCES.</h2>

          <p className="home__description">
            Explore welcoming rooms and local stays. Choose your place, pick
            your dates and book your next city escape.
          </p>

          <a href="#stays" className="home__cta">
            Explore & Book Stays
          </a>
        </div>
      </section>

      {/* STAYS SECTION */}
      <section className="home__stays" id="stays">
        <header className="home__stays-header">
          <p className="home__section-description">
            Choose a place that feels right. Select & Book to reserve your stay.
          </p>
        </header>

        {loading && <p role="status">Loading stays...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && stays.length === 0 && (
          <p>No stays available yet.</p>
        )}
        {!loading && !error && (
          <StayList stays={stays} onSelectStay={handleSelectStay} />
        )}
      </section>

      {/* THE LOCA WAY */}
      <section className="home__story">
        <p className="home__story-eyebrow">THE LOCA WAY</p>

        <h2 className="home__story-title">
          A little less tourist.
          <br />A little more local.
        </h2>

        <p className="home__story-text">
          Discover places with personality, explore new neighborhoods, and
          experience cities beyond the ordinary.
        </p>
      </section>

      {/* BOOKING MODAL */}
      {showForm && selectedStay && (
        <div className="booking-modal__backdrop" onClick={closeForm}>
          <div
            className="booking-modal__content"
            role="dialog"
            tabIndex={-1}
            ref={modalRef}
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
