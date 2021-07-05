import React,  { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { postReview } from '../../store/api-actions.js';

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

function CommentPostForm({id}) {
  const [state, setState] = useState({
    rating: 0,
    review: '',
  });

  const [formState, changeFormState] = useState({
    formDisabled: false,
    formValid: false,
  });

  const onSuccess = () => {
    setState((prevState) => ({...prevState, rating: 0, review: ''}));
    changeFormState({...formState, formDisabled: true});
  };

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        postReview(id, state, onSuccess);
      }}
      className="reviews__form form"
      action="#"
      method="post"
      disabled={formState.formDisabled}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Array.from(RatingStar).map((ratingStar) => (
          <Fragment key={ratingStar[0]}>
            <input
              onChange={(evt) => {
                setState({ ...state, rating: Number(evt.target.value)});
                if (state.rating !== 0 &&
                  state.review.length >= CommentCharactersCount.MIN) {
                  changeFormState({...formState, formValid: true});
                }
              }}
              className="form__rating-input visually-hidden"
              name="rating"
              value={ratingStar[0]}
              id={`${ratingStar[0]}-stars`}
              type="radio"
              checked={state.rating === `${ratingStar[0]}`}
            />
            <label
              htmlFor={`${ratingStar[0]}-stars`}
              className="reviews__rating-label form__rating-label"
              title={ratingStar[1]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        onChange={(evt) => {
          setState({ ...state, review: evt.target.value });
          if (state.rating !== 0 &&
            state.review.length >= CommentCharactersCount.MIN) {
            changeFormState({...formState, formValid: true});
          }

          if (state.review.length <= CommentCharactersCount.MAX) {
            changeFormState({...formState, formValid: false});
          }
        }}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={state.review}
        min={CommentCharactersCount.MIN}
        max={CommentCharactersCount.MAX}
        placeholder="Tell how was your stay, what you like and what can be improved"
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
          disabled={!formState.formValid}
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
};

export default CommentPostForm;
