import { useMemo, useState } from "react";
import Header from "../components/Header.jsx";
import Pagination from "../components/Pagination.jsx";
import MovieForm from "../components/admin/MovieForm.jsx";
import MovieTable from "../components/admin/MovieTable.jsx";
import {
  getEmptyMovieForm,
  movieToForm,
  resolvePosterUrl,
  validateMovieForm,
} from "../utils/movieForm.js";

const PAGE_SIZE = 6;

export default function AdminPage({ movies, setMovies, onNavigate }) {
  const [form, setForm] = useState(getEmptyMovieForm());
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(movies.length / PAGE_SIZE));

  const paginatedMovies = useMemo(() => {
    const safePage = Math.min(currentPage, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    return movies.slice(start, start + PAGE_SIZE);
  }, [movies, currentPage, totalPages]);

  const displayPage = Math.min(currentPage, totalPages);

  function resetForm() {
    setForm(getEmptyMovieForm());
    setErrors({});
    setEditingId(null);
  }

  function handleEdit(movie) {
    setEditingId(movie.id);
    setForm(movieToForm(movie));
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(movie) {
    const confirmed = window.confirm(
      `「${movie.title}」을(를) 삭제할까요?\n연결된 리뷰도 함께 삭제됩니다.`
    );
    if (!confirmed) return;

    setMovies((prev) => prev.filter((m) => m.id !== movie.id));
    if (editingId === movie.id) resetForm();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validation = validateMovieForm(form, movies, editingId);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const payload = {
      title: form.title.trim(),
      genre: form.genre.trim(),
      release_date: form.release_date,
      poster_url: resolvePosterUrl(form.poster_url),
    };

    if (editingId) {
      setMovies((prev) =>
        prev.map((m) =>
          m.id === editingId ? { ...m, ...payload } : m
        )
      );
    } else {
      const newId = Math.max(0, ...movies.map((m) => m.id)) + 1;
      setMovies((prev) => [
        {
          id: newId,
          ...payload,
          reviews: [],
        },
        ...prev,
      ]);
      setCurrentPage(1);
    }

    resetForm();
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="page">
      <Header
        variant="admin"
        activeNav="admin"
        onNavigate={onNavigate}
      />

      <MovieForm
        form={form}
        errors={errors}
        editingId={editingId}
        onChange={setForm}
        onSubmit={handleSubmit}
        onCancelEdit={resetForm}
      />

      <section className="panel" aria-labelledby="movie-list-heading">
        <h2 id="movie-list-heading" className="panel__title">
          등록된 영화 목록
        </h2>
        <MovieTable
          movies={paginatedMovies}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <Pagination
          currentPage={displayPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
}
