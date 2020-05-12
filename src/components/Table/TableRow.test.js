import React from 'react';
import { render } from '@testing-library/react';
import TableRow from './TableRow';

const getWrapper = (props) => render(<TableRow {...props} />);

describe('TableRow', () => {
  it('should render company details', () => {
    const props = {
      name: 'ErnserGroup', city: 'North Shirtleyfurt', totalIncome: '2135.38', averageIncome: '42.71',
    };
    const { queryByText } = getWrapper(props);
    Object.values(props).forEach((value) => expect(queryByText(value)).toBeVisible);
  });
});
