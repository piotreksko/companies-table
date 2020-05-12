import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import PaginationButton from './PaginationButton';

const getWrapper = (props) => render(<PaginationButton {...props} />);

describe('PaginationButton', () => {
  it('should render button, not have selected class and call callback onClick', () => {
    const props = { onClick: jest.fn(), number: '1' };
    const { getByText } = getWrapper(props);
    const button = getByText(props.number);
    fireEvent.click(button);

    expect(button).toBeVisible();
    expect(button).not.toHaveClass('selected');
    expect(props.onClick).toHaveBeenCalled();
  });

  it('should have selected classname', () => {
    const props = { onClick: jest.fn(), number: '1', isSelected: true };
    const { getByText } = getWrapper(props);
    const button = getByText(props.number);
    expect(button).toHaveClass('selected');
  });
});
