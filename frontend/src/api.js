const API_BASE = "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "요청에 실패했습니다.");
  }

  return data;
}

export function fetchMovies() {
  return request("/movies");
}

export function fetchMovie(id) {
  return request(`/movies/${id}`);
}

export function createMovie(title) {
  return request("/movies", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export function createReview(movieId, payload) {
  return request(`/movies/${movieId}/reviews`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateReview(reviewId, payload) {
  return request(`/reviews/${reviewId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteReview(reviewId) {
  return request(`/reviews/${reviewId}`, {
    method: "DELETE",
  });
}
