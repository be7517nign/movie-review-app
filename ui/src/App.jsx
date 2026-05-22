import { useState } from "react";
import { MOCK_MOVIES } from "./data/mockMovies.js";
import MovieReviewPage from "./pages/MovieReviewPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

export default function App() {
  const [page, setPage] = useState("reviews");
  const [movies, setMovies] = useState(MOCK_MOVIES);

  if (page === "admin") {
    return (
      <AdminPage
        movies={movies}
        setMovies={setMovies}
        onNavigate={setPage}
      />
    );
  }

  return (
    <MovieReviewPage
      movies={movies}
      setMovies={setMovies}
      onNavigate={setPage}
    />
  );
}
