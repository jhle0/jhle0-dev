---
title: "HTTP 캐시 기초 메모"
description: "브라우저 캐시, Cache-Control, ETag를 빠르게 다시 정리한 공부 메모."
pubDate: 2026-04-11
updatedDate: 2026-04-11
slug: "cs-note-http-cache-basics"
tags: ["cs", "network", "http", "study", "cache"]
draft: false
heroImage: ""
series: ""
featured: false
canonicalURL: ""
---

# HTTP 캐시 기초 메모

웹 성능을 이해하려면 캐시 동작을 먼저 이해해야 한다.

## Cache-Control

응답이 얼마나 오래 재사용될 수 있는지 결정한다.

### max-age

지정된 초 동안은 새 요청 없이 캐시를 재사용한다.

수식으로 단순하게 적으면 캐시 유효 시간은 아래처럼 볼 수 있다.

$$
freshUntil = responseTime + maxAge
$$

클라이언트 입장에서는 남은 캐시 시간을 다음처럼 생각할 수 있다.

$$
remaining = max(0, freshUntil - now)
$$

## ETag

리소스 버전을 비교해서 변경 여부를 판단한다.

아래 표처럼 역할을 나눠 보면 정리가 쉽다.

<table>
  <thead>
    <tr>
      <th>헤더</th>
      <th>역할</th>
      <th>주요 포인트</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Cache-Control</code></td>
      <td>재사용 정책 지정</td>
      <td>얼마나 오래 캐시할지 결정</td>
    </tr>
    <tr>
      <td><code>ETag</code></td>
      <td>버전 비교</td>
      <td>리소스가 바뀌었는지 확인</td>
    </tr>
    <tr>
      <td><code>If-None-Match</code></td>
      <td>조건부 요청</td>
      <td>바뀌지 않았으면 304 응답 가능</td>
    </tr>
  </tbody>
</table>

## 왜 중요한가

같은 리소스를 반복해서 내려받지 않게 해주기 때문에
성능과 비용 모두에 영향을 준다.

아래 이미지는 테스트용으로 둔 예시 이미지다.

![문서 스타일 테스트용 이미지](/images/profile/profile.jpg)
