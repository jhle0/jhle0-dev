# jhle0-dev

Astro 기반 개인 개발 블로그입니다. 블로그 글과 프로젝트는 Astro content collections로 관리하고, 브라우저에서 바로 편집할 수 있도록 Decap CMS를 `/admin` 경로에 연결해두었습니다.

## 주요 경로

- `src/content/blog`: 블로그 글 Markdown
- `src/content/projects`: 프로젝트 Markdown
- `public/images/uploads`: CMS 업로드 이미지
- `public/admin`: Decap CMS 설정

## 로컬 실행

```sh
npm install
npm run dev
```

로컬에서 Decap CMS까지 함께 쓰려면 아래 명령을 별도 터미널에서 실행합니다.

```sh
npm run cms:proxy
```

그다음 아래 주소로 접속하면 됩니다.

- 사이트: `http://localhost:4321`
- 관리자: `http://localhost:4321/admin/`

더 편하게 쓰려면 아래 문서도 같이 보면 좋습니다.

- [Decap GitHub 인증 가이드](./docs/decap-github-auth.md)
- [노션에서 블로그로 옮기는 작성 규칙](./docs/notion-to-blog-guide.md)
- [Cloudflare Worker OAuth Proxy](./cms-auth/cloudflare-worker/README.md)

## Decap CMS 구성

현재 `/admin`은 아래 구조에 맞게 연결되어 있습니다.

- GitHub backend 기준 저장소: `jhle0/jhle0-dev`
- 브랜치: `main`
- 블로그 컬렉션: `src/content/blog`
- 프로젝트 컬렉션: `src/content/projects`
- 업로드 이미지 경로: `public/images/uploads`

블로그 글은 `topic` 1개와 자유 입력 `tags` 리스트를 함께 사용합니다.

## 배포된 `/admin`에 대해 꼭 알아둘 점

로컬 편집은 `local_backend: true` 설정과 `decap-server`로 바로 동작합니다.  
다만 배포된 GitHub Pages의 `/admin`에서 GitHub 로그인까지 완전히 동작시키려면, GitHub OAuth를 중계해주는 외부 인증 포인트가 하나 필요합니다.

즉, 저장소 내부 구현은 끝났지만 아래 둘 중 하나가 추가되어야 배포 환경 로그인도 완성됩니다.

1. Netlify Identity + Git Gateway 사용
2. 별도 OAuth proxy/auth endpoint 연결

이 저장소에는 Cloudflare Worker 기반 OAuth proxy 스캐폴드도 포함되어 있습니다.

```sh
cd cms-auth/cloudflare-worker
npm install
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npm run deploy
cd ../..
npm run cms:auth:set -- https://YOUR_WORKER.workers.dev
```

현재 배포 기준 사이트 주소는 `https://jhle0-dev.vercel.app` 입니다.

## 빌드

```sh
npm run build
```

Node 버전은 `>=22.12.0` 기준입니다.
