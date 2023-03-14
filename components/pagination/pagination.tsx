import React from "react";
import { usePagination, DOTS } from "../../hooks/usePagination";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type paginationProp = {
  onPageChange: any;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
};

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: paginationProp) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  //   // If there are less than 2 times in pagination range we shall not render the component
  //   if (currentPage === 0 || paginationRange!.length < 2) {
  //     return null;
  //   }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange![paginationRange!.length - 1];
  //   const diabledStyle =
  //     currentPage === 1 ? `${Styles.disabled} ${Styles.pagination_item}` : "";

  return (
    <div className="flex px-5">
      <div className="text-primaryText">
        <span>{currentPage === 1 ? currentPage : 2 + currentPage * 1}</span> -{" "}
        <span>
          {pageSize * currentPage > totalCount
            ? totalCount
            : pageSize * currentPage}
        </span>{" "}
        of {totalCount} items
      </div>

      <ul className="flex items-center ml-auto p-0">
        <li
          className={
            currentPage === 1
              ? "pointer-events-none hidden"
              : "flex items-center"
          }
          onClick={onPrevious}
        >
          <MdChevronLeft fontSize={20} color="#0064EB" cursor="pointer" />
        </li>
        {paginationRange!.map((pageNumber, i) => {
          //   const selectedStyle = pageNumber === currentPage? `${Styles.selected} ${Styles.pagination_item}`: ''

          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return <li className="my-auto mx-1">&#8230;</li>;
          }

          //   const selectedStyle =
          //     pageNumber === currentPage
          //       ? `text-white bg-[#0064EB] ${Styles.pagination_item}`
          //       : Styles.pagination_item;

          // Render our Page Pills
          return (
            <li
              // className={classnames('pagination-item', {
              //   selected: pageNumber === currentPage
              // })}
              // className={Styles.pagination_item}
              key={i}
              //   className={selectedStyle}
              className={`px-3 h-8 text-center my-auto mx-2  flex items-center rounded text-sm min-w-[32px] cursor-pointer ${
                pageNumber === currentPage
                  ? "text-white bg-blue"
                  : "text-primaryText"
              }`}
              onClick={() => {
                onPageChange(pageNumber);
                console.log(pageNumber);
              }}
            >
              {pageNumber}
            </li>
          );
        })}
        {/*  Right Navigation arrow */}
        <li
          // className={classnames('pagination-item', {
          //   disabled: currentPage === lastPage
          // })}
          // className={Styles.pagination_item}
          className={
            currentPage === lastPage
              ? "pointer-events-none hidden"
              : "flex items-center"
          }
          onClick={onNext}
        >
          {/* <div className={`${Styles.arrow} ${Styles.right}`} /> */}
          <MdChevronRight fontSize={20} color="#0064EB" cursor="pointer" />
        </li>
      </ul>
    </div>

    // <div className="bg-red">IS IR WORKING</div>
  );
};

export default Pagination;
