import React,  { useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { changeCommentSendingStatus } from '../../store/action.js';
import { getCommentSendingStatus } from '../../store/app-data/selectors.js';
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

function CommentPostForm() {
  const isCommentSending = useSelector(getCommentSendingStatus);

  const {id} = useParams();

  const dispatch = useDispatch();

  const [state, setState] = useState({rating: 0, comment: ''});
  const [isTextareaValid, changeTextareaValidity] = useState(false);
  const [postCommentError, setPostCommentError] = useState(false);

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        setPostCommentError(false);
        dispatch(changeCommentSendingStatus(true));

        dispatch(postComment(id, state))
          .then((response) => {
            if (response.payload) {
              setState((prevState) => ({...prevState, rating: 0, comment: ''}));
              changeTextareaValidity(false);
              dispatch(changeCommentSendingStatus(false));
            }
          })
          .catch(() => {
            setPostCommentError(true);
            dispatch(changeCommentSendingStatus(false));
          });
      }}
      className="reviews__form form"
      action="#"
      method="post"
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
                }}
                className="form__rating-input visually-hidden"
                name="rating"
                value={key}
                id={`${key}-stars`}
                type="radio"
                checked={state.rating === Number(`${key}`)}
                disabled={isCommentSending}
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
            changeTextareaValidity(true);
          }
        }}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        data-testid="textarea"
        value={state.comment}
        minLength={CommentCharactersCount.MIN}
        maxLength={CommentCharactersCount.MAX}
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isCommentSending}
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
          disabled={!(state.rating) || !isTextareaValid || isCommentSending}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentPostForm;

