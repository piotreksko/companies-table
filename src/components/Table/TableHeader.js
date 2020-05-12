import React from 'react';
import PropTypes from 'prop-types';
import { ORDER_OPTIONS } from '../../common/constant';

export const headers = [
  {
    header: 'ID',
    fieldName: 'id',
  },
  {
    header: 'Name',
    fieldName: 'name',
  },
  {
    header: 'City',
    fieldName: 'city',
  },
  {
    header: 'Total income',
    fieldName: 'totalIncome',
  },
  {
    header: 'Average income',
    fieldName: 'averageIncome',
  },
];

export const downArrow = '↓';
export const upArrow = '↑';

const TableHeader = ({ sort, setSort }) => {
  const getOnclick = (fieldName) => {
    const getOrder = () => {
      const isFieldChosen = sort.by === fieldName;
      if (isFieldChosen && sort.order !== ORDER_OPTIONS.DESCENDING) {
        return ORDER_OPTIONS.DESCENDING;
      }
      return ORDER_OPTIONS.ASCENDING;
    };
    return () => setSort({ by: fieldName, order: getOrder() });
  };

  const getSortArrow = (fieldName) => sort.by === fieldName && (sort.order === ORDER_OPTIONS.DESCENDING ? upArrow : downArrow);

  const getHeader = (header, fieldName) => (
    <th onClick={getOnclick(fieldName)} key={fieldName}>
      {header}
      {getSortArrow(fieldName)}
    </th>
  );
  return (
    <thead>
      <tr>
        {headers.map(({ header, fieldName }) => getHeader(header, fieldName))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  sort: PropTypes.shape({
    by: PropTypes.string,
    order: PropTypes.string,
  }),
  setSort: PropTypes.func.isRequired,
};

export default TableHeader;
