import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import './Table.scss';

const Table = ({ companies, sort, setSort }) => (
  <>
    <table cellPadding="0" cellSpacing="0" border="0">
      <TableHeader sort={sort} setSort={setSort} />
      <tbody>
        {companies.map((company) => (
          <TableRow
            key={company.id}
            {...company}
          />
        ))}
      </tbody>
    </table>
  </>
);

Table.propTypes = {
  sort: PropTypes.shape({
    by: PropTypes.string,
    order: PropTypes.string,
  }),
  setSort: PropTypes.func.isRequired,
  companies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    city: PropTypes.string,
    totalIncome: PropTypes.string,
    averageIncome: PropTypes.string,
  })),
};

export default Table;
