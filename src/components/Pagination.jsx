import React from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages)?.keys()]?.map(num => num + 1);
  const handleClick = (page) => {
    if (page === currentPage) return;
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return pages.map(page => {
        
        return (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={currentPage === page ? 'pagination-button active' : 'pagination-button'}
          >
            {page}
          </button>
        )
      });
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + 4);

      let pageNumbers = [];

      if (startPage > 1) {
        pageNumbers.push(
          <button key={1} onClick={() => handleClick(1)} className="pagination-button">
            1
          </button>
        );
        if (startPage > 2) {
          pageNumbers.push(
            <span key="ellipsis-left" className="pagination-ellipsis">
              ...
            </span>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={currentPage === i ? `pagination-button active ` : 'pagination-button'}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(
            <span key="ellipsis-right" className="pagination-ellipsis">
              ...
            </span>
          );
        }
        pageNumbers.push(
          <button key={totalPages} onClick={() => handleClick(totalPages)} className="pagination-button">
            {totalPages}
          </button>
        );
      }

      return pageNumbers;
    }
  };

  return (
    <div className="pagination-container ">
     
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-between">
        <span> Showing 1-{totalPages} of {totalPages} results</span>
      <div>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        <GrFormPrevious />
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className=" pagination-button"
      >
   <GrFormNext />
      </button>
      </div>
      </div>
    </div>
  );
};

export default Pagination;
