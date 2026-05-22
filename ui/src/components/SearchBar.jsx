export default function SearchBar({ value, onChange, onSearch }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="movie-search">
        영화 제목 검색
      </label>
      <input
        id="movie-search"
        type="search"
        className="search-bar__input"
        placeholder="영화 제목을 검색하세요..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        검색
      </button>
    </form>
  );
}
