const { Client } = require("pg");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("server/.env 파일에 DATABASE_URL이 필요합니다.");
  process.exit(1);
}

function getAdminUrl(urlString) {
  const url = new URL(urlString);
  const dbName = url.pathname.replace(/^\//, "");
  url.pathname = "/postgres";
  return { adminUrl: url.toString(), dbName };
}

async function ensureDatabase() {
  const { adminUrl, dbName } = getAdminUrl(DATABASE_URL);
  const client = new Client({ connectionString: adminUrl });

  await client.connect();

  const exists = await client.query(
    "SELECT 1 FROM pg_database WHERE datname = $1",
    [dbName]
  );

  if (exists.rowCount === 0) {
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log(`데이터베이스 "${dbName}" 생성 완료`);
  } else {
    console.log(`데이터베이스 "${dbName}" 이미 존재합니다`);
  }

  await client.end();
}

async function initTables() {
  const { initDb, getPool } = require("../src/db");
  await initDb();
  const pool = getPool();
  await pool.query("SELECT 1");
  await pool.end();
}

async function main() {
  try {
    console.log("PostgreSQL 연결 확인 중...");
    await ensureDatabase();
    await initTables();
    console.log("테이블 준비 완료 (movies, reviews)");
    console.log("데이터베이스 연결 성공");
  } catch (err) {
    console.error("설정 실패:", err.message);
    if (err.code === "28P01") {
      console.error(
        "인증 실패: server/.env 의 DATABASE_URL에 올바른 postgres 비밀번호를 넣어 주세요."
      );
    } else if (err.code === "ECONNREFUSED") {
      console.error(
        "연결 거부: PostgreSQL 서비스가 실행 중인지 확인해 주세요."
      );
    }
    process.exit(1);
  }
}

main();
