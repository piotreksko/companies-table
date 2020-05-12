import React from 'react';
import PropTypes from 'prop-types';

const PaginationButton = ({ number, isSelected, onClick }) => (
  <li>
    <button type="button" onClick={onClick} className={isSelected && 'selected'}>
      {number}
    </button>
  </li>
);

PaginationButton.propTypes = {
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default PaginationButton;
