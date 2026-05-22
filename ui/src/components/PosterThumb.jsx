import { useState } from "react";

export default function PosterThumb({ url, alt = "포스터", className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!url?.trim() || failed) {
    return (
      <div className={`poster-thumb poster-thumb--placeholder ${className}`}>
        <span aria-hidden="true">🎞️</span>
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      className={`poster-thumb ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
