import PosterThumb from "../PosterThumb.jsx";

export default function MovieTable({ movies, onEdit, onDelete }) {
  if (movies.length === 0) {
    return (
      <p className="empty-message empty-message--table">
        등록된 영화가 없습니다.
      </p>
    );
  }

  return (
    <div className="table-wrap">
      <table className="movie-table">
        <thead>
          <tr>
            <th scope="col">포스터</th>
            <th scope="col">제목</th>
            <th scope="col">장르</th>
            <th scope="col">개봉일</th>
            <th scope="col">관리</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td data-label="포스터">
                <PosterThumb
                  url={movie.poster_url}
                  alt={`${movie.title} 포스터`}
                  className="movie-table__poster"
                />
              </td>
              <td data-label="제목">{movie.title}</td>
              <td data-label="장르">{movie.genre}</td>
              <td data-label="개봉일">{movie.release_date}</td>
              <td data-label="관리">
                <div className="movie-table__actions">
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => onEdit(movie)}
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(movie)}
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
