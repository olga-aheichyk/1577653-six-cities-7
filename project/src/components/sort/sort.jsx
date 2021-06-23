import React, { useState } from 'react';
import { SortingTableState, SortType } from '../../consts.js';
import PropTypes from 'prop-types';

function Sort(props) {
  const { activeSortType, onSortingTypeClick } = props;

  const [sortingTableState, setSortingTableState] = useState(SortingTableState.CLOSED);


  return (
    <form
      className="places__sorting" action="#" method="get"
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        onClick={() => setSortingTableState(SortingTableState.OPENED)}
        className="places__sorting-type" tabIndex="0"
      >
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul onClick={(evt) => {
        onSortingTypeClick(evt.target.textContent);
        setSortingTableState(SortingTableState.CLOSED);
      }}
      className={`places__options places__options--custom ${sortingTableState === SortingTableState.OPENED ? 'places__options--opened' : ''}`}
      >
        {Object.values(SortType).map((value) => (
          <li className={`places__option ${activeSortType === value ? 'places__option--active' : ''}`} tabIndex="0" key={value}>
            {value}
          </li>))}
      </ul>
    </form>
  );
}

Sort.propTypes = {
  activeSortType: PropTypes.string.isRequired,
  onSortingTypeClick: PropTypes.func.isRequired,
};

export default Sort;

