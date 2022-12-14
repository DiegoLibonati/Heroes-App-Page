import { useEffect, useState } from "react";

export const usePagination = (
  arr,
  ipp,
  counter,
  increment,
  decrement,
  reset,
  setCounter
) => {
  const [itemsPerPage] = useState(ipp);

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];

  for (let i = 1; i <= Math.ceil(arr.length / itemsPerPage); i++) {
    pages.push(i);
  }

  useEffect(() => {
    reset();
    setMaxPageNumberLimit(5);
    setMinPageNumberLimit(0);
  }, [arr]);

  const handleClick = (e) => {
    setCounter(Number(e.target.id));
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          className={
            counter === number
              ? "pagination-page pagination-page-active"
              : "pagination-page "
          }
          key={number * 154}
          id={number}
          onClick={handleClick}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const indexOfLastItem = counter * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = arr.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    increment(1);

    if (counter + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevPage = () => {
    decrement(1);
    if ((counter - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;

  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li className="pagination-button" onClick={() => handleNextPage()}>
        &hellip;
      </li>
    );
  }

  let pageDecrementBtn = null;

  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li className="pagination-button" onClick={() => handlePrevPage()}>
        &hellip;
      </li>
    );
  }

  return {
    renderPageNumbers,
    currentItems,
    pageDecrementBtn,
    pageIncrementBtn,
    handleNextPage,
    handlePrevPage,
    pages,
  };
};
