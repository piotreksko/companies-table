import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TableHeader, { headers, downArrow, upArrow } from './TableHeader';
import { ORDER_OPTIONS } from '../../common/constant';

const defaultProps = {
  sort: {}, setSort: jest.fn(),
};

const firstHeader = headers[0];

const getWrapper = (newProps) => {
  const combinedProps = { ...defaultProps, ...newProps };
  return render(<TableHeader {...combinedProps} />);
};

describe('TableHeader', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render all headers', () => {
    const { queryByText } = getWrapper();
    headers.forEach(({ header }) => expect(queryByText(header)).toBeVisible());
  });

  it('should setSort on click with ascending order', () => {
    const { queryByText } = getWrapper();
    const header = queryByText(firstHeader.header);
    fireEvent.click(header);

    expect(defaultProps.setSort).toHaveBeenCalledWith({ by: firstHeader.fieldName, order: ORDER_OPTIONS.ASCENDING });
  });

  it('should setSort on click with descending order', () => {
    const props = {
      sort: {
        by: firstHeader.fieldName,
        order: ORDER_OPTIONS.ASCENDING,
      },
    };
    const { queryByText } = getWrapper(props);
    const header = queryByText(firstHeader.header, { exact: false });
    fireEvent.click(header);

    expect(defaultProps.setSort).toHaveBeenCalledWith({ by: firstHeader.fieldName, order: ORDER_OPTIONS.DESCENDING });
  });


  it('should have down arrow visible', () => {
    const props = {
      sort: {
        by: firstHeader.fieldName,
        order: ORDER_OPTIONS.ASCENDING,
      },
    };
    const { queryByText } = getWrapper(props);
    const headerWithArrow = queryByText(downArrow, { exact: false });
    expect(headerWithArrow).toBeVisible();
  });

  it('should have up arrow visible', () => {
    const props = {
      sort: {
        by: firstHeader.fieldName,
        order: ORDER_OPTIONS.DESCENDING,
      },
    };
    const { queryByText } = getWrapper(props);
    const headerWithArrow = queryByText(upArrow, { exact: false });
    expect(headerWithArrow).toBeVisible();
  });
});
