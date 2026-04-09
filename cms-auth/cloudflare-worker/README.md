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

현재 공개 저장소 기준으로 `public_repo` scope를 사용합니다.  
비공개 저장소로 바꿀 경우 `wrangler.jsonc`의 `GITHUB_SCOPE`를 `repo`로 바꾸면 됩니다.
