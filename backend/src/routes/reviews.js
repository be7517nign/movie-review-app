const express = require("express");
const { pool } = require("../db");

const router = express.Router();

router.post("/movies/:movieId/reviews", async (req, res, next) => {
  const movieId = Number(req.params.movieId);
  const content = req.body.content?.trim();
  const rating = Number(req.body.rating);

  if (!content) {
    return res.status(400).json({ error: "리뷰 내용을 입력해 주세요." });
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "별점은 1~5 사이 정수여야 합니다." });
  }

  try {
    const movie = await pool.query(`SELECT id FROM movies WHERE id = $1`, [
      movieId,
    ]);

    if (movie.rows.length === 0) {
      return res.status(404).json({ error: "영화를 찾을 수 없습니다." });
    }

    const { rows } = await pool.query(
      `INSERT INTO reviews (movie_id, content, rating)
       VALUES ($1, $2, $3)
       RETURNING id, movie_id, content, rating, created_at, updated_at`,
      [movieId, content, rating]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const content = req.body.content?.trim();
  const rating = Number(req.body.rating);

  if (!content) {
    return res.status(400).json({ error: "리뷰 내용을 입력해 주세요." });
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "별점은 1~5 사이 정수여야 합니다." });
  }

  try {
    const { rows } = await pool.query(
      `UPDATE reviews
       SET content = $1, rating = $2, updated_at = NOW()
       WHERE id = $3
       RETURNING id, movie_id, content, rating, created_at, updated_at`,
      [content, rating, req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "리뷰를 찾을 수 없습니다." });
    }

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rowCount } = await pool.query(`DELETE FROM reviews WHERE id = $1`, [
      req.params.id,
    ]);

    if (rowCount === 0) {
      return res.status(404).json({ error: "리뷰를 찾을 수 없습니다." });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
