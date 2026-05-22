export default function MovieForm({
  form,
  errors,
  editingId,
  onChange,
  onSubmit,
  onCancelEdit,
}) {
  function handleChange(field, value) {
    onChange({ ...form, [field]: value });
  }

  return (
    <section className="panel" aria-labelledby="movie-form-heading">
      <h2 id="movie-form-heading" className="panel__title">
        {editingId ? "영화 수정하기" : "영화 추가하기"}
      </h2>
      <form className="movie-form" onSubmit={onSubmit} noValidate>
        <div className="movie-form__grid">
          <label className="movie-form__field">
            <span className="movie-form__label">제목</span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="영화 제목을 입력하세요"
            />
            {errors.title && (
              <span className="field-error">{errors.title}</span>
            )}
          </label>

          <label className="movie-form__field">
            <span className="movie-form__label">장르</span>
            <input
              type="text"
              value={form.genre}
              onChange={(e) => handleChange("genre", e.target.value)}
              placeholder="예) SF, 액션, 드라마 등"
            />
            {errors.genre && (
              <span className="field-error">{errors.genre}</span>
            )}
          </label>

          <label className="movie-form__field">
            <span className="movie-form__label">개봉일</span>
            <input
              type="date"
              value={form.release_date}
              onChange={(e) => handleChange("release_date", e.target.value)}
            />
            {errors.release_date && (
              <span className="field-error">{errors.release_date}</span>
            )}
          </label>

          <label className="movie-form__field movie-form__field--full">
            <span className="movie-form__label">포스터 URL</span>
            <input
              type="url"
              value={form.poster_url}
              onChange={(e) => handleChange("poster_url", e.target.value)}
              placeholder="포스터 이미지 URL을 입력하세요"
            />
            {errors.poster_url && (
              <span className="field-error">{errors.poster_url}</span>
            )}
          </label>
        </div>

        <div className="movie-form__actions">
          <button type="submit" className="btn btn-primary btn-block">
            {editingId ? "수정 저장" : "영화 추가"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              수정 취소
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
