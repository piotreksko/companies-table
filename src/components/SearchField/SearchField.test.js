import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import SearchField from './SearchField';

const defaultProps = {
  setCurrentPage: jest.fn(),
  setFilterValue: jest.fn(),
};

const getWrapper = () => render(<SearchField {...defaultProps} />);

describe('SearchField', () => {
  it('should not render clear button', () => {
    const { queryByText } = getWrapper();
    const clearButton = queryByText('x');
    expect(clearButton).toBeNull();
  });

  it('should update filter value and show clear button', async () => {
    const value = 'test';
    const { queryByText, getByPlaceholderText } = getWrapper();
    const input = getByPlaceholderText('Search...');

    fireEvent.change(input, { target: { value } });
    expect(input.value).toEqual(value);

    await waitFor(() => expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(1));
    const clearButton = queryByText('x');

    expect(clearButton).toBeVisible();
    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(1);
    expect(defaultProps.setFilterValue).toHaveBeenCalledWith(value);
  });

  it('should clear value on clear button click', async () => {
    const value = 'test';
    const { queryByText, getByPlaceholderText } = getWrapper();
    const input = getByPlaceholderText('Search...');

    fireEvent.change(input, { target: { value } });
    await waitFor(() => expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(1));

    const clearButton = queryByText('x');
    fireEvent.click(clearButton);

    expect(queryByText('x')).toBeNull();
    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(1);
    expect(defaultProps.setFilterValue).toHaveBeenCalledWith('');
    expect(input.value).toEqual('');
  });
});
