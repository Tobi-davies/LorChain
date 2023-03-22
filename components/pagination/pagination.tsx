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

  const [viewRange, setViewRange] = React.useState<string | null>(null);

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange![paginationRange!.length - 1];

  React.useEffect(() => {
    if (currentPage === 1) {
      setViewRange("1 - 4");
    } else if (currentPage === lastPage) {
      let firstNum = pageSize * (currentPage - 1) + 1;
      setViewRange(`${firstNum} - ${totalCount}`);
    } else {
      let firstNum = pageSize * (currentPage - 1) + 1;
      setViewRange(`${firstNum} - ${currentPage * pageSize}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onPageChange, currentPage, lastPage, pageSize, totalCount]);

  return (
    <div className="flex px-5">
      <div className="text-primaryText">{viewRange} items</div>

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
          if (pageNumber === DOTS) {
            return <li className="my-auto mx-1">&#8230;</li>;
          }

          return (
            <li
              key={i}
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
          className={
            currentPage === lastPage
              ? "pointer-events-none hidden"
              : "flex items-center"
          }
          onClick={onNext}
        >
          <MdChevronRight fontSize={20} color="#0064EB" cursor="pointer" />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
