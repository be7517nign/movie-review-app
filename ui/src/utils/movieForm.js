const EMPTY_FORM = {
  title: "",
  genre: "",
  release_date: "",
  poster_url: "",
};

export function getEmptyMovieForm() {
  return { ...EMPTY_FORM };
}

export function movieToForm(movie) {
  return {
    title: movie.title,
    genre: movie.genre,
    release_date: movie.release_date,
    poster_url: movie.poster_url || "",
  };
}

export function isValidUrl(value) {
  if (!value?.trim()) return true;
  try {
    new URL(value.trim());
    return true;
  } catch {
    return false;
  }
}

export function validateMovieForm(form, movies, editingId = null) {
  const errors = {};
  const title = form.title.trim();
  const genre = form.genre.trim();
  const releaseDate = form.release_date.trim();

  if (!title) errors.title = "영화 제목을 입력해 주세요.";
  if (!genre) errors.genre = "장르를 입력해 주세요.";
  if (!releaseDate) errors.release_date = "개봉일을 선택해 주세요.";

  if (
    title &&
    movies.some(
      (m) =>
        m.title.trim().toLowerCase() === title.toLowerCase() &&
        m.id !== editingId
    )
  ) {
    errors.title = "이미 등록된 영화 제목입니다.";
  }

  return errors;
}

export function resolvePosterUrl(url) {
  const trimmed = url?.trim();
  if (!trimmed) return null;
  return isValidUrl(trimmed) ? trimmed : null;
}
