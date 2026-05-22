# Server (Express API)

영화 리뷰 앱 백엔드 서버입니다. 프런트엔드(`ui/`)와 분리된 Express + PostgreSQL 구성입니다.

## 기술 스택

- Node.js
- Express.js
- PostgreSQL (`pg`)

## 폴더 구조

```
server/
├── db/schema.sql      # DB 스키마 참고용 SQL
├── src/
│   ├── index.js       # 서버 진입점
│   ├── app.js         # Express 앱 설정
│   └── db.js          # PostgreSQL 연결·테이블 초기화
├── .env.example
└── package.json
```

## 실행 방법

```bash
cd server
npm install
```

`server/.env` 파일을 설정합니다. (`.env.example` 참고)

```
PORT=3001
DATABASE_URL=postgresql://postgres:설치시_설정한_비밀번호@localhost:5432/movie_review_db
```

PostgreSQL **서비스가 실행 중**이어야 합니다. Windows 서비스에서 `postgresql-x64-*` 항목을 시작하거나, pgAdmin 설치 시 함께 등록된 서비스를 확인하세요.

데이터베이스·테이블 자동 생성:

```bash
npm run db:setup
```

연결만 확인:

```bash
npm run db:test
```

개발 서버 실행:

```bash
npm run dev
```

- `http://localhost:3001/api/health` — 서버 상태 확인

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | 파일 변경 시 자동 재시작 (`node --watch`) |
| `npm start` | 프로덕션 실행 |

## 프런트엔드 연동

`ui`의 Vite 프록시가 `/api`를 `http://localhost:3001`로 전달합니다. 서버와 UI를 동시에 실행할 때 포트가 일치해야 합니다.
