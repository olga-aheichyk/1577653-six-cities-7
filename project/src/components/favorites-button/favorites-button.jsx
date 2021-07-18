import React from 'react';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import { connect } from 'react-redux';
import { changeFavoritesStatus } from '../../store/api-actions.js';


function FavoritesButton(props) {
  const {
    namesOfClasses,
    isFavorite,
    id,
    onFavoritesChange,
  } = props;

  const changedStatus = Number(!isFavorite);

  return (
    <button
      onClick={() => {
        onFavoritesChange(id, changedStatus);
      }}
      className={namesOfClasses.BUTTON}
      type="button"
    >
      <svg
        className={namesOfClasses.SVG}
        width={namesOfClasses.WIDTH}
        height={namesOfClasses.HEIGHT}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'Add to bookmarks'}</span>
    </button>);
}

FavoritesButton.propTypes = {
  namesOfClasses: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
  onFavoritesChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onFavoritesChange:
  (id, changedStatus) => dispatch(changeFavoritesStatus(id, changedStatus)),
});

export {FavoritesButton};
export default connect(null, mapDispatchToProps)(FavoritesButton);
