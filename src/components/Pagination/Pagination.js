import React from 'react';
import PropTypes from 'prop-types';
import PaginationButton from './PaginationButton';
import { ROWS_PER_PAGE } from '../../common/constant';
import './Pagination.scss';

const Pagination = ({
  currentPage,
  setCurrentPage,
  entriesNumber,
}) => {
  const onClickHandler = (number) => {
    if (number !== currentPage) {
      setCurrentPage(number);
    }
  };
  const maxPageNumber = parseInt(entriesNumber / ROWS_PER_PAGE);

  const getExtraButton = (number, char) => (
    <PaginationButton
      number={char || number}
      onClick={() => onClickHandler(number)}
    />
  );

  const backButton = currentPage > 1 && getExtraButton(currentPage - 1, '<');
  const nextButton = maxPageNumber - currentPage > 1 && getExtraButton(currentPage + 1, '>');

  const lowestNumberButton = currentPage !== 1 && getExtraButton(1);

  const twoLower = currentPage > 3 && getExtraButton(currentPage - 2);
  const oneLower = currentPage > 2 && getExtraButton(currentPage - 1);

  const currentPageButton = (
    <PaginationButton isSelected number={currentPage} />
  );

  const oneHigher = maxPageNumber - currentPage > 1 && getExtraButton(currentPage + 1);
  const twoHigher = maxPageNumber - currentPage > 2 && getExtraButton(currentPage + 2);

  const maxPageNumberButton = maxPageNumber > 1
    && maxPageNumber !== currentPage && maxPageNumber - 1 !== 1 && getExtraButton(maxPageNumber);

  const dotsElement = <li><button type="button">...</button></li>;
  const lowerDots = currentPage > 3 && dotsElement;
  const higherDots = maxPageNumber - currentPage > 3 && dotsElement;

  return (
    <div className="pagination">
      {backButton}
      {lowestNumberButton}
      {lowerDots}
      {twoLower}
      {oneLower}
      {currentPageButton}
      {oneHigher}
      {twoHigher}
      {higherDots}
      {maxPageNumberButton}
      {nextButton}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  entriesNumber: PropTypes.number.isRequired,
};

export default Pagination;
