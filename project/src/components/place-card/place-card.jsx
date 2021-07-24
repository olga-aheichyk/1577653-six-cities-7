import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import placeCardProp from './place-card.prop.js';
import { calculateWidthForRating } from '../utils.js';
import FavoritesButton from '../favorites-button/favorites-button.jsx';
import { FavoritesButtonVariantDetails, FavoritesButtonVariant } from '../../consts.js';


function PlaceCard(props) {
  const {
    details,
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
      className={`${details.articleClassName} place-card`}
      id={id}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)}

      <div
        className={`${details.imgWrapperClassName} place-card__image-wrapper`}
      >
        <Link to={`/offer/${activeCardId}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={details.imgWidth}
            height={details.imgHeight}
            alt="Place"
          />
        </Link>
      </div>

      <div className={`${details.infoExtraClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <FavoritesButton
            details={FavoritesButtonVariantDetails[FavoritesButtonVariant.PLACE_CARD]}
            isFavorite={isFavorite}
            id={id}
          />
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
  details: PropTypes.shape({
    articleClassName: PropTypes.string.isRequired,
    imgWrapperClassName: PropTypes.string.isRequired,
    imgWidth: PropTypes.number.isRequired,
    imgHeight: PropTypes.number.isRequired,
    infoExtraClass: PropTypes.string.isRequired,
  }).isRequired,
  offer: placeCardProp,
  onPlaceCardHover: PropTypes.func.isRequired,
  onPlaceCardAwayHover: PropTypes.func.isRequired,
};

export default PlaceCard;
