import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import placeCardProp from './place-card.prop.js';
import { calculateWidthForRating } from '../utils.js';


function PlaceCard(props) {
  const {
    offer,
    onPlaceCardHover,
    onPlaceCardAwayHover } = props;

  const {
    isFavorite,
    isPremium,
    id,
    previewImage,
    price,
    rating,
    title,
    type,
  } = offer;

  const [activeCardId, setActiveCardId] = useState(null);

  const placeCardHoverHandler = (evt) => {
    setActiveCardId(evt.currentTarget.id);
    onPlaceCardHover(evt.currentTarget.id);
  };

  return (
    <article
      onMouseEnter={placeCardHoverHandler}
      onMouseLeave={onPlaceCardAwayHover}
      className="cities__place-card place-card"
      // className="favorites__card place-card"
      // className="near-places__card place-card"
      id={id}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)}

      <div
        className="cities__image-wrapper place-card__image-wrapper"
        // className="favorites__image-wrapper place-card__image-wrapper"
        // className="near-places__image-wrapper place-card__image-wrapper"
      >
        <Link to={`/offer/${activeCardId}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            // favorites: width="150" height="110"
            alt="Place"
          />
        </Link>
      </div>

      <div className="place-card__info">{/* className="favorites__card-info place-card__info" */}
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button
            className={classNames('place-card__bookmark-button', {'place-card__bookmark-button--active' : isFavorite}, 'button')}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'Add to bookmarks'}</span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${calculateWidthForRating(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <a href="/#">{title}</a>
        </h2>

        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

PlaceCard.defaultProps = {
  onPlaceCardHover: () => {},
  onPlaceCardAwayHover: () => {},
};

PlaceCard.propTypes = {
  offer: placeCardProp,
  onPlaceCardHover: PropTypes.func.isRequired,
  onPlaceCardAwayHover: PropTypes.func.isRequired,
};

export default PlaceCard;
