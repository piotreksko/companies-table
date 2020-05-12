import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';
import './SearchField.scss';

const SearchField = ({ setCurrentPage, setFilterValue }) => {
  const [filterText, setFilterText] = useState('');
  const [debouncedCallback] = useDebouncedCallback(
    (value) => {
      setCurrentPage(1);
      setFilterValue(value);
    },
    400,
  );

  const handleChange = ({ target: { value } }) => {
    setFilterText(value);
    debouncedCallback(value);
  };

  const handleClear = () => {
    setFilterText('');
    setFilterValue('');
    setCurrentPage(1);
  };

  return (
    <div className="input-container">
      <input value={filterText} onChange={handleChange} placeholder="Search..." />
      {filterText && <button className="input-clear-button" label="clear" type="button" title="Clear" onClick={handleClear}>x</button>}
    </div>
  );
};

SearchField.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  setFilterValue: PropTypes.func.isRequired,
};

export default SearchField;
