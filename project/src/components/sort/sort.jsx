import React, { useState } from 'react';
import { SortType } from '../../consts.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Sort(props) {
  const { activeSortType, onSortingTypeClick } = props;

  const [isOpenSort, changeSortingTableState] = useState(false);


  return (
    <form
      className="places__sorting" action="#" method="get"
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        onClick={() => changeSortingTableState((prevState) => !prevState)}
        className="places__sorting-type"
        tabIndex="0"
      >
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul onClick={(evt) => {
        onSortingTypeClick(evt.target.textContent);
        changeSortingTableState(false);
      }}
      className={classNames('places__options', 'places__options--custom', {'places__options--opened': isOpenSort})}
      >
        {Object.values(SortType).map((value) => (
          <li
            className={classNames('places__option', {'places__option--active' : activeSortType === value})}
            tabIndex="0"
            key={value}
          >
            {value}
          </li>
        ))}
      </ul>
    </form>
  );
}

Sort.propTypes = {
  activeSortType: PropTypes.string.isRequired,
  onSortingTypeClick: PropTypes.func.isRequired,
};

export default Sort;

