import React from 'react';
import { LeftArrowIcon, RightArrowIcon } from '../common/Icons/Icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const onLeftClick = () => {
    if (currentPage !== 1) onPageChange(currentPage - 1);
  };

  const onRightClick = () => {
    if (currentPage !== totalPages) onPageChange(currentPage + 1);
  };

  const allPages = Array.from({ length: totalPages }).map((_, index) => (
    <li key={index} className={`${currentPage === index + 1 ? 'active ' : ''} page-item `}>
      <button
        className={`${currentPage === index + 1 ? 'bg-main-light rounded-full' : ''} w-8 h-8`}
        onClick={() => onPageChange(index + 1)}
      >
        {index + 1}
      </button>
    </li>
  ));

  const firstPages = Array.from({ length: 6 }).map((_, index) => {
    if (index < 4) {
      return (
        <li key={index} className={`${currentPage === index + 1 ? 'active ' : ''} page-item `}>
          <button
            className={`${currentPage === index + 1 ? 'bg-main-light rounded-full' : ''} w-8 h-8`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        </li>
      );
    } else if (index === 4) {
      return (
        <li key={index} className={`page-item`}>
          <button className={`w-8 h-8`} onClick={() => onPageChange(index + 1)}>
            ...
          </button>
        </li>
      );
    } else {
      return (
        <li key={index} className={`page-item`}>
          <button className={`w-8 h-8`} onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </li>
      );
    }
  });

  const middlePages = () => {
    let i = -1;
    return Array.from({ length: 6 }).map((_, index) => {
      if (index === 0) {
        return (
          <li key={index} className={`page-item`}>
            <button className={`w-8 h-8`} onClick={() => onPageChange(currentPage - 1)}>
              ...
            </button>
          </li>
        );
      } else if (index === 4) {
        return (
          <li key={index} className={`page-item`}>
            <button className={`w-8 h-8`} onClick={() => onPageChange(currentPage + 1)}>
              ...
            </button>
          </li>
        );
      } else if (index === 5) {
        return (
          <li key={index} className={`page-item`}>
            <button className={`w-8 h-8`} onClick={() => onPageChange(index + 1)}>
              {totalPages}
            </button>
          </li>
        );
      } else {
        const page = currentPage + i++;
        return (
          <li key={index} className={`page-item`}>
            <button
              className={`${i - 1 === 0 ? 'bg-main-light rounded-full' : ''} w-8 h-8`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        );
      }
    });
  };

  const lastPages = () => {
    let i = -3;
    return Array.from({ length: 6 }).map((_, index) => {
      if (index === 0) {
        return (
          <li key={index} className={`page-item`}>
            <button className={`w-8 h-8`} onClick={() => onPageChange(1)}>
              1
            </button>
          </li>
        );
      } else if (index === 1) {
        return (
          <li key={index} className={`page-item`}>
            <button className={`w-8 h-8`} onClick={() => onPageChange(currentPage - 1)}>
              ...
            </button>
          </li>
        );
      } else {
        const page = totalPages + i++;
        return (
          <li key={index} className={`page-item`}>
            <button
              className={`${page === currentPage ? 'bg-main-light rounded-full' : ''} w-8 h-8`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        );
      }
    });
  };

  const getPages = () => {
    if (totalPages <= 6) return allPages;
    else if (currentPage <= 4) return firstPages;
    else if (currentPage + 3 >= totalPages) return lastPages();
    else return middlePages();
  };

  return (
    <nav className='flex justify-center'>
      <ul className='pagination flex gap-2 items-center'>
        <LeftArrowIcon
          onClick={onLeftClick}
          className={currentPage !== 1 ? 'cursor-pointer' : ''}
        />
        {getPages()}
        <RightArrowIcon
          onClick={onRightClick}
          className={currentPage !== totalPages ? 'cursor-pointer' : ''}
        />
      </ul>
    </nav>
  );
};

export default Pagination;
