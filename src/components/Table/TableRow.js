import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({
  id, name, city, totalIncome, averageIncome,
}) => (
  <tr>
    <td className="firstColumn">{id}</td>
    <td>{name}</td>
    <td>{city}</td>
    <td>{totalIncome}</td>
    <td>{averageIncome}</td>
  </tr>
);

TableRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  totalIncome: PropTypes.string.isRequired,
  averageIncome: PropTypes.string.isRequired,
};

export default TableRow;
