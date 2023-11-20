import styles from "./pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  paginationPageNumber: number;
}

export const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  paginationPageNumber,
}: PaginationProps) => {
  const pageNumbers = [];

  let startPage = Math.max(
    1,
    currentPage - Math.floor(paginationPageNumber / 2)
  );
  let endPage = startPage + paginationPageNumber - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - paginationPageNumber + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.pagination}>
      <div className={styles.pagination_container}>
        <div
          className={`${styles.pagination_button} ${
            currentPage === 1 && `${styles.pagination_disabled}`
          }`}
          aria-label="Go to first leaderboard page"
          onClick={() => setCurrentPage(1)}
        >
          {"<<"}
        </div>
        <div
          className={`${styles.pagination_button} ${
            currentPage === 1 && `${styles.pagination_disabled}`
          }`}
          aria-label="Go to previous leaderboard page"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {"<"}
        </div>
      </div>

      <div className={styles.pagination_container}>
        {pageNumbers.map((pageNumber) => (
          <div
            key={pageNumber}
            className={`${styles.pagination_button} ${
              pageNumber === currentPage && `${styles.current_page}`
            }`}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </div>
        ))}
      </div>

      <div className={styles.pagination_container}>
        <div
          className={`${styles.pagination_button} ${
            currentPage === totalPages && `${styles.pagination_disabled}`
          }`}
          aria-label="Go to next leaderboard page"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {">"}
        </div>
        <div
          className={`${styles.pagination_button} ${
            currentPage === totalPages && `${styles.pagination_disabled}`
          }`}
          aria-label="Go to last leaderboard page"
          onClick={() => setCurrentPage(totalPages)}
        >
          {">>"}
        </div>
      </div>
    </div>
  );
};
