import React from 'react';
import { render } from '@testing-library/react';
import Table from './Table';

const defaultProps = {
  companies: [
    {
      name: 'ErnserGroup', city: 'North Shirtleyfurt', totalIncome: '2135.38', averageIncome: '42.71',
    },
  ],
  sort: {},
  setSort: jest.fn(),
};

const getWrapper = () => render(<Table {...defaultProps} />);

describe('Table', () => {
  it('should render', () => {
    const { queryByText } = getWrapper();
    expect(queryByText(defaultProps.companies[0].name)).toBeVisible();
  });
});
