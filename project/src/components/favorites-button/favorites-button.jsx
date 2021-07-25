import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeFavoritesStatus } from '../../store/api-actions.js';
import { getAuthorizationStatus } from '../../store/user/selectors.js';

function FavoritesButton(props) {
  const {
    details,
    isFavorite,
    id,
    onFavoritesChange,
  } = props;

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
  onFavoritesChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoritesChange:
  (id, changedStatus) => dispatch(changeFavoritesStatus(id, changedStatus)),
});

export {FavoritesButton};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesButton);
