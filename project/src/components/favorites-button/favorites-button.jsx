import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
//import classNames from 'classnames';
import { connect } from 'react-redux';
import { changeFavoritesStatus } from '../../store/api-actions.js';
import { AppRoute, AuthorizationStatus } from '../../consts.js';


function FavoritesButton(props) {
  const {
    namesOfClasses,
    isFavorite,
    id,
    authorizationStatus,
    onFavoritesChange,
  } = props;

  const changedStatus = Number(!isFavorite);
  const history = useHistory();

  return (
    <button
      onClick={() => {
        if (authorizationStatus === AuthorizationStatus.AUTH) {
          onFavoritesChange(id, changedStatus);
          return;
        }
        history.push(AppRoute.LOGIN);
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
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onFavoritesChange:
  (id, changedStatus) => dispatch(changeFavoritesStatus(id, changedStatus)),
});

export {FavoritesButton};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesButton);
