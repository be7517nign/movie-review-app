const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const { initDb } = require("./db");
const moviesRouter = require("./routes/movies");
const reviewsRouter = require("./routes/reviews");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/movies", moviesRouter);
app.use("/api", reviewsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "서버 오류가 발생했습니다." });
});

async function start() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL 환경 변수가 필요합니다.");
    process.exit(1);
  }

  await initDb();

  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
