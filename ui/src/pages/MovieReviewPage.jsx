import { useMemo, useState } from "react";
import Header from "../components/Header.jsx";
import SearchBar from "../components/SearchBar.jsx";
import MovieCard from "../components/MovieCard.jsx";
import Pagination from "../components/Pagination.jsx";
import ReviewModal from "../components/ReviewModal.jsx";

const PAGE_SIZE = 4;

export default function MovieReviewPage({ movies, setMovies, onNavigate }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewTarget, setReviewTarget] = useState(null);

  const filteredMovies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return movies;
    return movies.filter((m) => m.title.toLowerCase().includes(q));
  }, [movies, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / PAGE_SIZE));

  const paginatedMovies = useMemo(() => {
    const safePage = Math.min(currentPage, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredMovies.slice(start, start + PAGE_SIZE);
  }, [filteredMovies, currentPage, totalPages]);

  function handleSearch() {
    setSearchQuery(searchInput);
    setCurrentPage(1);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmitReview(movieId, { rating, content }) {
    setMovies((prev) =>
      prev.map((movie) => {
        if (movie.id !== movieId) return movie;
        return {
          ...movie,
          reviews: [
            {
              id: Date.now(),
              rating,
              content,
              createdAt: new Date().toISOString(),
            },
            ...movie.reviews,
          ],
        };
      })
    );
  }

  const displayPage = Math.min(currentPage, totalPages);

  return (
    <div className="page">
      <Header activeNav="reviews" onNavigate={onNavigate} />
      <SearchBar
        value={searchInput}
        onChange={setSearchInput}
        onSearch={handleSearch}
      />

      <section className="movie-list" aria-label="영화 목록">
        {paginatedMovies.length === 0 ? (
          <p className="empty-message">검색 결과가 없습니다.</p>
        ) : (
          paginatedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onWriteReview={setReviewTarget}
            />
          ))
        )}
      </section>

      <Pagination
        currentPage={displayPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {reviewTarget && (
        <ReviewModal
          movie={reviewTarget}
          onClose={() => setReviewTarget(null)}
          onSubmit={(payload) =>
            handleSubmitReview(reviewTarget.id, payload)
          }
        />
      )}
    </div>
  );
}
