export default function StarRating({ value, onChange, readOnly = false }) {
  return (
    <div className="star-rating" role="group" aria-label="별점">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={star <= value ? "star active" : "star"}
          onClick={() => !readOnly && onChange?.(star)}
          disabled={readOnly}
          aria-label={`${star}점`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
