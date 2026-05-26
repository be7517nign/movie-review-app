import StarRating from "./StarRating.jsx";
import PosterThumb from "./PosterThumb.jsx";
import { getAverageRating, getLatestReview } from "../utils/movieHelpers.js";

export default function MovieCard({ movie, onWriteReview }) {
  const avgRating = getAverageRating(movie.reviews);
  const latestReview = getLatestReview(movie.reviews);

  return (
    <article className="movie-card">
      <div className="movie-card__poster">
        <PosterThumb
          url={movie.poster_url}
          alt={`${movie.title} 포스터`}
          className="movie-card__poster-img"
        />
      </div>
      <div className="movie-card__body">
        <h2 className="movie-card__title">{movie.title}</h2>
        <p className="movie-card__meta">
          <span className="movie-card__label">장르 :</span> {movie.genre}
        </p>
        <p className="movie-card__meta">
          <span className="movie-card__label">개봉일 :</span> {movie.release_date}
        </p>
        <StarRating value={avgRating} label={`${movie.title} 평균 ${avgRating}점`} />
        <p className="movie-card__review">
          <span className="movie-card__label">리뷰 :</span>{" "}
          {latestReview
            ? latestReview.content
            : "아직 리뷰가 없습니다."}
        </p>
        <div className="movie-card__actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onWriteReview(movie)}
          >
            리뷰 작성
          </button>
        </div>
      </div>
    </article>
  );
}
