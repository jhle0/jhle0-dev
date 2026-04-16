# Cloudflare Worker OAuth Proxy

GitHub Pages에서 Decap CMS를 로그인 가능하게 만들기 위한 외부 OAuth proxy입니다.  
Decap 공식 문서는 GitHub backend에 외부 OAuth server 또는 edge worker가 필요하다고 안내하고 있고, Cloudflare Worker 템플릿도 함께 제시합니다.

## 이 폴더가 하는 일

- `/auth`: GitHub OAuth authorization 화면으로 리다이렉트
- `/callback`: GitHub에서 받은 code를 access token으로 교환
- popup 창에서 `window.postMessage`로 Decap CMS에 토큰 전달

## 준비물

1. Cloudflare 계정
2. GitHub OAuth App
3. GitHub OAuth Client ID / Client Secret

## GitHub OAuth App 값

- Homepage URL: `https://jhle0-dev.vercel.app`
- Authorization callback URL: `https://YOUR_WORKER.workers.dev/callback`

## 로컬 준비

```sh
cd cms-auth/cloudflare-worker
npm install
cp .dev.vars.example .dev.vars
```

`.dev.vars`에 아래 값을 넣습니다.

```env
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

## 로컬 개발

```sh
npm run dev
```

## 배포

```sh
npm run deploy
```

배포 후 Worker 주소가 예를 들어 `https://jhle0-dev-cms-auth.example.workers.dev` 라면, 루트 프로젝트에서 아래 명령으로 CMS 설정을 반영합니다.

```sh
npm run cms:auth:set -- https://jhle0-dev-cms-auth.example.workers.dev
```

다시 주석 상태로 돌리고 싶으면:

```sh
npm run cms:auth:clear
```

## Cloudflare secret 설정

배포 전에 Worker에 아래 secret을 넣어야 합니다.

```sh
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

## 기본 scope

현재는 저장 실패 가능성을 줄이기 위해 `repo` scope를 사용합니다.  
공개 저장소만 다룰 때는 `public_repo`로 줄일 수도 있지만, CMS 저장 흐름 검증이 끝나기 전까지는 `repo`가 더 안전합니다.
