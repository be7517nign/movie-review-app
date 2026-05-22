const express = require("express");
const { pool } = require("../db");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        m.id,
        m.title,
        m.created_at,
        COUNT(r.id)::int AS review_count,
        COALESCE(ROUND(AVG(r.rating)::numeric, 1), 0) AS avg_rating
      FROM movies m
      LEFT JOIN reviews r ON r.movie_id = m.id
      GROUP BY m.id
      ORDER BY m.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const movieResult = await pool.query(
      `SELECT id, title, created_at FROM movies WHERE id = $1`,
      [req.params.id]
    );

    if (movieResult.rows.length === 0) {
      return res.status(404).json({ error: "영화를 찾을 수 없습니다." });
    }

    const reviewsResult = await pool.query(
      `SELECT id, movie_id, content, rating, created_at, updated_at
       FROM reviews
       WHERE movie_id = $1
       ORDER BY created_at DESC`,
      [req.params.id]
    );

    res.json({
      ...movieResult.rows[0],
      reviews: reviewsResult.rows,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const title = req.body.title?.trim();

  if (!title) {
    return res.status(400).json({ error: "영화 제목을 입력해 주세요." });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO movies (title) VALUES ($1) RETURNING id, title, created_at`,
      [title]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "이미 등록된 영화 제목입니다." });
    }
    next(err);
  }
});

module.exports = router;
