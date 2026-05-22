import { useState } from "react";
import StarRating from "./StarRating.jsx";
import ReviewForm from "./ReviewForm.jsx";

export default function ReviewList({ reviews, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);

  if (reviews.length === 0) {
    return <p className="empty">아직 리뷰가 없습니다. 첫 리뷰를 작성해 보세요.</p>;
  }

  return (
    <ul className="review-list">
      {reviews.map((review) => (
        <li key={review.id} className="card review-item">
          {editingId === review.id ? (
            <ReviewForm
              initial={review}
              onSubmit={async (payload) => {
                await onUpdate(review.id, payload);
                setEditingId(null);
              }}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              <StarRating value={review.rating} readOnly />
              <p className="review-content">{review.content}</p>
              <p className="review-meta">
                {new Date(review.updated_at).toLocaleString("ko-KR")}
              </p>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditingId(review.id)}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="btn danger"
                  onClick={() => onDelete(review.id)}
                >
                  삭제
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
