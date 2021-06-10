import React from 'react';
import { Link } from 'react-router-dom';
import placeCardProp from './place-card.prop';

const calculateWidthForRating = function(rating) {
  return (rating / 5 * 100);
};

function PlaceCard(props) {
  const {offer} = props;
  const {
    isFavorite,
    //isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
  } = offer;

  return (
    <article className="cities__place-card place-card">
      <div className="place-card__mark">
        <span>Premium</span>
      </div>

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to="/offer/:id">
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place"
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
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
            <span style={{ width: `${calculateWidthForRating(rating)} %`}}></span>
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

PlaceCard.propTypes = {
  offer: placeCardProp,
};

export default PlaceCard;
