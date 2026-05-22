# GitHub 업로드 가이드

저장소: [be7517nign/movie-review-app](https://github.com/be7517nign/movie-review-app)

## GitHub에 올리지 않는 파일

| 파일/폴더 | 이유 |
|-----------|------|
| `.env` | DB 비밀번호, `DATABASE_URL` 등 비밀 정보 |
| `configure.env` | 구 환경 변수 파일명 (`.env`로 통일) |
| `node_modules/` | `npm install`로 복원 |
| `dist/`, `build/` | 빌드 결과물 |
| `*.log` | 로그 파일 |
| `.vscode/`, `.idea/` | 개인 IDE 설정 |

## GitHub에 올려도 되는 파일

| 파일 | 설명 |
|------|------|
| `.env.example` | 환경 변수 **예시** (실제 비밀번호 없음) |
| `package.json`, `package-lock.json` | 의존성 정의 |
| 소스 코드 (`ui/src`, `server/src` 등) | 앱 코드 |
| `docs/` | PRD, 문서 |

## 최초 푸시 전 체크리스트

1. `server/.env`에 실제 비밀번호가 들어 있지 않은지 확인 (`.gitignore`에 포함됨)
2. `npm install`은 저장소에 포함하지 않음
3. `.env.example`만 커밋하고, 팀원은 복사 후 `.env` 생성

## 원격 저장소 연결 (최초 1회)

```bash
git init
git remote add origin https://github.com/be7517nign/movie-review-app.git
git add .
git status
# .env, node_modules 가 목록에 없는지 확인 후
git commit -m "Initial commit"
git push -u origin main
```

`main` 브랜치 이름이 `master`이면 해당 이름으로 push하세요.
