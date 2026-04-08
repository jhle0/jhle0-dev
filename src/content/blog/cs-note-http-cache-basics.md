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

## ETag

리소스 버전을 비교해서 변경 여부를 판단한다.

## 왜 중요한가

같은 리소스를 반복해서 내려받지 않게 해주기 때문에
성능과 비용 모두에 영향을 준다.
