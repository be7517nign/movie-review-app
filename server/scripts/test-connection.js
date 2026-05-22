const path = require("path");
const { Client } = require("pg");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL이 없습니다.");
    process.exit(1);
  }

  const client = new Client({ connectionString: url });
  try {
    await client.connect();
    const result = await client.query("SELECT NOW() AS now, current_database() AS db");
    console.log("연결 성공:", result.rows[0]);
  } catch (err) {
    console.error("연결 실패:", err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
