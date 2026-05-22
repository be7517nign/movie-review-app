export function getAverageRating(reviews) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function getLatestReview(reviews) {
  if (!reviews.length) return null;
  return [...reviews].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];
}
