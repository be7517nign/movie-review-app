import { useState } from "react";
import StarRating from "./StarRating.jsx";

export default function ReviewForm({ initial, onSubmit, onCancel }) {
  const [content, setContent] = useState(initial?.content || "");
  const [rating, setRating] = useState(initial?.rating || 5);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ content, rating });
  }

  return (
    <form className="review-form card" onSubmit={handleSubmit}>
      <label>
        별점
        <StarRating value={rating} onChange={setRating} />
      </label>
      <label>
        리뷰 내용
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="영화에 대한 생각을 적어 주세요."
          required
        />
      </label>
      <div className="form-actions">
        <button type="submit" className="btn primary">
          {initial ? "수정 저장" : "리뷰 등록"}
        </button>
        {onCancel && (
          <button type="button" className="btn" onClick={onCancel}>
            취소
          </button>
        )}
      </div>
    </form>
  );
}
