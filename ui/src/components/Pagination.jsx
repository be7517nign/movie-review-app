export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="페이지 이동">
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={
            page === currentPage
              ? "pagination__btn pagination__btn--active"
              : "pagination__btn"
          }
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="pagination__btn pagination__btn--next"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="다음 페이지"
      >
        &gt;
      </button>
    </nav>
  );
}
