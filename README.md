# 영화 리뷰 앱

## 웹 사이트 (와이어프레임 UI)

**실제 앱 화면:** https://be7517nign.github.io/movie-review-app/

> GitHub 저장소 페이지(https://github.com/be7517nign/movie-review-app)는 **코드·문서**가 보이는 곳입니다.  
> 위 **GitHub Pages** 링크를 열어야 영화 리뷰·관리자 화면이 나옵니다.

영화 제목을 등록하고, 리뷰와 별점(1~5)을 작성·수정·삭제할 수 있는 풀스택 웹 앱입니다.

## 기술 스택

- **프런트엔드**: React, Vite, HTML, CSS
- **백엔드**: Node.js, Express
- **데이터베이스**: PostgreSQL

GitHub: [be7517nign/movie-review-app](https://github.com/be7517nign/movie-review-app) — 업로드 전 [docs/GITHUB.md](./docs/GITHUB.md) 참고

## 프로젝트 구조

```
MOVIE-REVIEW-APP/
├── server/      # Express API (백엔드)
├── ui/          # React + Vite 프런트엔드
└── docs/        # 요구사항 문서
```

## 사전 준비

1. [Node.js](https://nodejs.org/) (LTS 권장)
2. [PostgreSQL](https://www.postgresql.org/) 설치 및 실행

PostgreSQL에서 데이터베이스를 만듭니다.

```sql
CREATE DATABASE movie_review_db;
```

## 백엔드 실행

```bash
cd server
npm install
```

`server/.env.example`을 참고해 `server/.env` 파일을 만듭니다.

```
PORT=3001
DATABASE_URL=postgresql://postgres:비밀번호@localhost:5432/movie_review_db
```

```bash
npm run db:setup
npm run dev
```

`db:setup`은 `movie_review_db` 데이터베이스와 테이블을 만듭니다. 서버 실행 시에도 테이블이 없으면 자동 생성됩니다.

서버가 `http://localhost:3001` 에서 실행됩니다.

## 프런트엔드 실행

새 터미널에서:

```bash
cd ui
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 을 엽니다. API 요청은 Vite 프록시를 통해 백엔드로 전달됩니다.

## API 요약

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/movies` | 영화 목록 (평균 별점, 리뷰 수 포함) |
| POST | `/api/movies` | 영화 등록 `{ "title": "..." }` |
| GET | `/api/movies/:id` | 영화 상세 + 리뷰 목록 |
| POST | `/api/movies/:id/reviews` | 리뷰 작성 `{ "content", "rating" }` |
| PUT | `/api/reviews/:id` | 리뷰 수정 |
| DELETE | `/api/reviews/:id` | 리뷰 삭제 |

## 기능 (PRD 기준)

- [x] 영화 제목 등록
- [x] 영화 리뷰 작성
- [x] 별점 등록 (1~5)
- [x] 리뷰 수정 및 삭제
- [x] 로그인 없음, 프런트/백엔드 분리
