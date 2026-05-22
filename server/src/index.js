require("./loadEnv");

const app = require("./app");
const { initDb, testConnection } = require("./db");

const PORT = process.env.PORT || 3001;

async function start() {
  if (process.env.DATABASE_URL) {
    try {
      await initDb();
      const info = await testConnection();
      console.log(
        `PostgreSQL 연결 완료 (DB: ${info.database}, ${info.connected_at})`
      );
    } catch (err) {
      console.error("데이터베이스 초기화 실패:", err.message);
      process.exit(1);
    }
  } else {
    console.warn(
      "DATABASE_URL이 설정되지 않았습니다. 헬스 체크만 사용할 수 있습니다."
    );
  }

  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
}

start();
