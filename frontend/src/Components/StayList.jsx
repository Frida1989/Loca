function StayList({ stays = [], onSelectStay }) {
  return (
    <ul className="stay-list">
      {stays.map((stay) => (
        <li className="stay-list-item" key={stay.id}>
          <article className="stay-card">
            <img
              src={stay.image_url}
              alt={stay.name}
              className="stay-card__image"
            />

            <div className="stay-card__content">
              <p className="stay-card__city">{stay.city}</p>

              <h3 className="stay-card__title">{stay.name}</h3>

              <p className="stay-card__description">{stay.description}</p>

              <p className="stay-card__room-type">{stay.room_type} room</p>

              <button
                type="button"
                className="stay-card__button"
                onClick={() => onSelectStay(stay)}
              >
                Select & Book
              </button>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default StayList;
