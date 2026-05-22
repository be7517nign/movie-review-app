import { useEffect, useState } from "react";
import {
  createMovie,
  createReview,
  deleteReview,
  fetchMovie,
  fetchMovies,
  updateReview,
} from "./api.js";
import MovieList from "./components/MovieList.jsx";
import ReviewForm from "./components/ReviewForm.jsx";
import ReviewList from "./components/ReviewList.jsx";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadMovies() {
    const data = await fetchMovies();
    setMovies(data);
    return data;
  }

  async function loadMovieDetail(id) {
    const data = await fetchMovie(id);
    setSelectedMovie(data);
  }

  useEffect(() => {
    loadMovies()
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setSelectedMovie(null);
      return;
    }

    loadMovieDetail(selectedId).catch((err) => setError(err.message));
  }, [selectedId]);

  async function handleAddMovie(event) {
    event.preventDefault();
    setError("");

    try {
      const movie = await createMovie(newTitle);
      setNewTitle("");
      await loadMovies();
      setSelectedId(movie.id);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleAddReview(payload) {
    setError("");

    try {
      await createReview(selectedId, payload);
      await Promise.all([loadMovies(), loadMovieDetail(selectedId)]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdateReview(reviewId, payload) {
    setError("");

    try {
      await updateReview(reviewId, payload);
      await Promise.all([loadMovies(), loadMovieDetail(selectedId)]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteReview(reviewId) {
    if (!window.confirm("이 리뷰를 삭제할까요?")) {
      return;
    }

    setError("");

    try {
      await deleteReview(reviewId);
      await Promise.all([loadMovies(), loadMovieDetail(selectedId)]);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>영화 리뷰 앱</h1>
        <p>영화를 등록하고 리뷰와 별점을 남겨 보세요.</p>
      </header>

      {error && <p className="error-banner">{error}</p>}

      {loading ? (
        <p className="empty">불러오는 중...</p>
      ) : (
        <main className="layout">
          <aside className="sidebar card">
            <h2>영화 목록</h2>
            <form className="movie-form" onSubmit={handleAddMovie}>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="영화 제목"
                required
              />
              <button type="submit" className="btn primary">
                영화 등록
              </button>
            </form>
            <MovieList
              movies={movies}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </aside>

          <section className="content">
            {!selectedMovie ? (
              <div className="card placeholder">
                <p>왼쪽에서 영화를 선택하거나 새 영화를 등록하세요.</p>
              </div>
            ) : (
              <>
                <div className="card movie-detail">
                  <h2>{selectedMovie.title}</h2>
                  <p className="movie-stats">
                    리뷰 {selectedMovie.reviews.length}개
                  </p>
                </div>

                <h3>리뷰 작성</h3>
                <ReviewForm onSubmit={handleAddReview} />

                <h3>리뷰 목록</h3>
                <ReviewList
                  reviews={selectedMovie.reviews}
                  onUpdate={handleUpdateReview}
                  onDelete={handleDeleteReview}
                />
              </>
            )}
          </section>
        </main>
      )}
    </div>
  );
}
