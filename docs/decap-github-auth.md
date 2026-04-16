# Decap CMS GitHub 인증 연결 가이드

현재 저장소는 `/admin` 화면, 컬렉션, 이미지 업로드, 로컬 프록시까지 연결되어 있습니다.  
남은 마지막 단계는 배포된 GitHub Pages 환경에서 GitHub 로그인까지 처리하는 외부 OAuth 중계 지점을 붙이는 것입니다.

## 왜 외부 인증 포인트가 필요한가

Decap CMS의 GitHub backend는 GitHub API에 직접 쓰기 전에 OAuth 인증 토큰을 받아야 합니다.  
이 토큰 교환 과정은 클라이언트만으로 끝낼 수 없어서, 배포된 `/admin`을 실제로 쓰려면 별도 auth endpoint가 필요합니다.

Decap 공식 문서도 GitHub backend에는 외부 OAuth client 또는 Netlify Identity 같은 인증 계층이 필요하다고 안내합니다.

공식 문서:

- https://decapcms.org/docs/working-with-a-local-git-repository/
- https://decapcms.org/docs/customization/
- https://decapcms.org/docs/basic-steps/

## 추천 방식

가장 현실적인 선택지는 둘 중 하나입니다.

1. 사이트를 Netlify로 옮기고 `Git Gateway + Identity`를 사용
2. 지금처럼 GitHub Pages를 유지하고, 별도 OAuth proxy를 하나 둠

현재 프로젝트는 Vercel 배포 주소를 사용하고 있으므로 2번이 가장 자연스럽습니다.

이 저장소에는 바로 사용할 수 있는 Cloudflare Worker 스캐폴드가 이미 들어 있습니다.

- [Cloudflare Worker OAuth Proxy](/Users/ljeonghyeon/Desktop/dev_blog/jhle0-dev/cms-auth/cloudflare-worker/README.md)

## 연결 순서

1. GitHub OAuth App 생성
2. 외부 auth service 배포
3. `public/admin/config.yml`에 `base_url`, `auth_endpoint` 입력
4. `/admin` 로그인 테스트

## GitHub OAuth App 설정 예시

- Homepage URL: `https://jhle0-dev.vercel.app`
- Authorization callback URL: `https://YOUR_AUTH_SERVICE_DOMAIN/auth`

`YOUR_AUTH_SERVICE_DOMAIN`은 OAuth proxy를 배포한 주소입니다.

## `config.yml`에 넣을 값

`public/admin/config.yml`의 주석 부분을 아래처럼 채웁니다.

```yml
backend:
  name: github
  repo: jhle0/jhle0-dev
  branch: main
  auth_scope: repo
  use_graphql: true
  site_domain: jhle0-dev.vercel.app
  base_url: https://YOUR_AUTH_SERVICE_DOMAIN
  auth_endpoint: auth
```

직접 손으로 바꾸지 않고 아래 명령으로 반영해도 됩니다.

```sh
npm run cms:auth:set -- https://YOUR_AUTH_SERVICE_DOMAIN
```

## 실제 배포 전에 체크할 것

- GitHub OAuth callback URL이 auth service 주소와 정확히 일치하는지
- `repo`와 `branch`가 실제 저장소와 같은지
- GitHub Pages에서 `/admin/`가 정상 서빙되는지
- 브라우저에서 로그인 후 새 글 저장이 실제 커밋으로 올라오는지

## 로컬에서 먼저 확인하는 방법

배포 인증과 별개로 로컬 편집은 이미 바로 가능합니다.

```sh
npm run dev
npm run cms:proxy
```

그다음 `http://localhost:4321/admin/`로 접속하면 됩니다.

## 지금 저장소에서 이미 끝난 부분

- `/admin` 정적 앱 구성 완료
- `blog`, `projects` 컬렉션 연결 완료
- `public/images/uploads` 업로드 경로 연결 완료
- 노션 친화형 프리뷰/블록 구성 완료
- 로컬 프록시 실행 스크립트 연결 완료
- Cloudflare Worker OAuth proxy 스캐폴드 추가 완료
- CMS 설정 자동 반영 스크립트 추가 완료
- GitHub OAuth scope를 `repo` 기준으로 정리 완료

즉, 남은 건 외부 auth service를 실제로 하나 올리는 일뿐입니다.
