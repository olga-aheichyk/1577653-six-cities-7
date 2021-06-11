import React, {useState} from 'react';
import PlaceCard from '../place-card/place-card.jsx';
import appProp from '../app/app.prop.js';

function PlaceCardsList(props) {
  const {offers} = props;
  const [activeCard, setActiveCard] = useState(offers.find((offer) => offer.id === 111));

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          onMouseOver={(evt) => setActiveCard(activeCard.id = evt.currentTarget)}
          key={offer.id}
          offer={offer}
        />
      ))}
    </div>
  );
}

PlaceCardsList.propTypes = {
  offers: appProp,
};

export default PlaceCardsList;
