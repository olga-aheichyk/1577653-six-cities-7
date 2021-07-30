import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { changeFavoritesStatus } from '../../store/api-actions.js';

function FavoritesButton(props) {
  const {
    details,
    isFavorite,
    id,
  } = props;

  const dispatch = useDispatch();
  const onFavoritesChange = (offerId, status) => dispatch(changeFavoritesStatus(offerId, status));

  const changedStatus = Number(!isFavorite);

  return (
    <button
      onClick={() => onFavoritesChange(id, changedStatus)}
      className={`${details.commonClassName}__bookmark-button ${isFavorite ? `${details.commonClassName}__bookmark-button--active` : ''} button`}
      type="button"
    >
      <svg
        className={`${details.commonClassName}__bookmark-icon`}
        width={details.svgWidth}
        height={details.svgHeight}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'Add to bookmarks'}</span>
    </button>);
}

FavoritesButton.propTypes = {
  details: PropTypes.shape({
    commonClassName: PropTypes.string.isRequired,
    svgWidth: PropTypes.number.isRequired,
    svgHeight: PropTypes.number.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
};

export default FavoritesButton;
