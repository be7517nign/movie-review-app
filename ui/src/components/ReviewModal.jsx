import { useState } from "react";

export default function ReviewModal({ movie, onClose, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!content.trim()) return;
    onSubmit({ rating, content: content.trim() });
    onClose();
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-labelledby="review-modal-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="review-modal-title" className="modal__title">
          {movie.title} — 리뷰 작성
        </h2>
        <form onSubmit={handleSubmit}>
          <fieldset className="modal__field">
            <legend>별점</legend>
            <div className="star-rating star-rating--interactive">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={
                    star <= rating ? "star star--filled" : "star"
                  }
                  onClick={() => setRating(star)}
                  aria-label={`${star}점`}
                >
                  ★
                </button>
              ))}
            </div>
          </fieldset>
          <label className="modal__field">
            리뷰 내용
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              placeholder="영화에 대한 생각을 적어 주세요."
              required
            />
          </label>
          <div className="modal__actions">
            <button type="submit" className="btn btn-primary">
              등록
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
