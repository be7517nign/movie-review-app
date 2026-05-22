export default function MovieList({ movies, selectedId, onSelect }) {
  if (movies.length === 0) {
    return <p className="empty">등록된 영화가 없습니다.</p>;
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id}>
          <button
            type="button"
            className={
              selectedId === movie.id ? "movie-item active" : "movie-item"
            }
            onClick={() => onSelect(movie.id)}
          >
            <span className="movie-title">{movie.title}</span>
            <span className="movie-stats">
              ★ {movie.avg_rating} · 리뷰 {movie.review_count}개
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
