import React,  { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postComment } from '../../store/api-actions.js';
import ErrorNotification from '../error-notification/error-notification.jsx';

const RatingStar = new Map([
  [5, 'perfect'],
  [4, 'good'],
  [3, 'not bad'],
  [2, 'badly'],
  [1, 'terribly'],
]);

const CommentCharactersCount = {
  MIN: 50,
  MAX: 300,
};

function CommentPostForm({id, onCommentPost}) {
  const [state, setState] = useState({
    rating: 0,
    comment: '',
  });

  const [formState, changeFormState] = useState({
    formDisabled: false,
    textareaValid: false,
    ratingValid: false,
  });

  const [postCommentError, setPostCommentError] = useState(false);

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        changeFormState({...formState, formDisabled: true});
        if (formState.formDisabled) {
          return;
        }

        onCommentPost(id, state)
          .then((response) => {
            if (response.payload) {
              setState((prevState) => ({...prevState, rating: 0, comment: ''}));
              changeFormState({...formState, formDisabled: false, textareaValid: false, ratingValid: false});
            }
          })
          .catch(() => {
            changeFormState({...formState, formDisabled: false});
            setPostCommentError(true);
          });
      }}
      className="reviews__form form"
      action="#"
      method="post"
      disabled={formState.formDisabled}
    >
      {postCommentError && <ErrorNotification message={'Your review can not been sent. Please, retry later'} />}
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Array.from(RatingStar).map((ratingStar) => {
          const [key, value] = ratingStar;
          return (
            <Fragment key={key}>
              <input
                onChange={({target}) => {
                  setState((prevState) =>({...prevState, rating: Number(target.value)}));
                  if (state.rating !== 0) {
                    changeFormState({...formState, ratingValid: true});
                  }
                }}
                className="form__rating-input visually-hidden"
                name="rating"
                value={key}
                id={`${key}-stars`}
                type="radio"
                checked={state.rating === Number(`${key}`)}
              />
              <label
                htmlFor={`${key}-stars`}
                className="reviews__rating-label form__rating-label"
                title={value}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>);
        })}
      </div>
      <textarea
        onChange={(evt) => {
          setState((prevState) => ({ ...prevState, comment: evt.target.value}));
          if (evt.target.reportValidity()) {
            changeFormState({...formState, textareaValid: true});
          }
        }}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={state.comment}
        minLength={CommentCharactersCount.MIN}
        maxLength={CommentCharactersCount.MAX}
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={formState.formDisabled}
        required
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!formState.textareaValid && !formState.ratingValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

CommentPostForm.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
  onCommentPost: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onCommentPost: (id, state) => dispatch(postComment(id, state)),
});

export {CommentPostForm};
export default connect(null, mapDispatchToProps)(CommentPostForm);
