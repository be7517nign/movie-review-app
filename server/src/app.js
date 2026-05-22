const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "영화 리뷰 앱 API 서버가 실행 중입니다.",
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "요청한 API를 찾을 수 없습니다." });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "서버 오류가 발생했습니다." });
});

module.exports = app;
