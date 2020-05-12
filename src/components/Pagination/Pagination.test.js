import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

const getWrapper = (props) => render(<Pagination {...props} />);

describe('Pagination', () => {
  it('should render only one button', () => {
    const props = { currentPage: 1, setCurrentPage: jest.fn(), entriesNumber: 1 };
    const { getAllByRole } = getWrapper(props);

    const buttons = getAllByRole('button');

    expect(buttons.length).toEqual(1);
  });

  it('should render prev, next, last, higher and lower buttons', () => {
    const props = { currentPage: 5, setCurrentPage: jest.fn(), entriesNumber: 100 };
    const { getByText, getAllByRole } = getWrapper(props);

    const prevButton = getByText('<');
    const nextButton = getByText('>');
    const lastPageButton = getByText('10');
    const twoLowerButton = getByText(String(props.currentPage - 2));
    const oneLowerButton = getByText(String(props.currentPage - 1));
    const oneHigherButton = getByText(String(props.currentPage + 1));
    const twoHigherButton = getByText(String(props.currentPage + 2));
    const allButtons = getAllByRole('button');

    expect(prevButton).toBeVisible();
    expect(nextButton).toBeVisible();
    expect(lastPageButton).toBeVisible();
    expect(twoLowerButton).toBeVisible();
    expect(oneLowerButton).toBeVisible();
    expect(oneHigherButton).toBeVisible();
    expect(twoHigherButton).toBeVisible();
    expect(allButtons.length).toEqual(11);
  });

  it('should handle onClick', () => {
    const props = { currentPage: 3, setCurrentPage: jest.fn(), entriesNumber: 50 };
    const { getAllByRole } = getWrapper(props);
    const allButtons = getAllByRole('button');

    fireEvent.click(allButtons[0]);
    expect(props.setCurrentPage).toHaveBeenLastCalledWith(2);
  });
});
