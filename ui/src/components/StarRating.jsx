export default function StarRating({ value, max = 5, label }) {
  const rounded = Math.round(value);

  return (
    <div
      className="star-rating"
      role="img"
      aria-label={label || `평균 ${value}점 (5점 만점)`}
    >
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={i < rounded ? "star star--filled" : "star"}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}
