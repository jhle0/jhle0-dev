---
title: "Astro 블로그 정리 기록 3: 블로그 상세 읽기 경험 개선"
description: "뒤로가기, TOC, 관련 글, 시리즈 내비게이션을 더해 읽기 흐름을 손본 기록."
pubDate: 2026-04-10
updatedDate: 2026-04-10
slug: "astro-blog-rebuild-3"
topic: development
tags: ["astro", "ux", "blog", "series", "toc"]
draft: false
heroImage: ""
series: "Astro Blog Rebuild"
featured: false
canonicalURL: ""
---

# Astro 블로그 정리 기록 3: 블로그 상세 읽기 경험 개선

상세 페이지는 글 하나를 읽는 공간이기 때문에,
목록 페이지와 다른 기준으로 손볼 필요가 있었다.

## 먼저 해결한 문제

상세 글에서 목록으로 돌아가는 흐름이 약했고,
긴 글을 읽을 때 현재 위치를 파악하기가 어려웠다.

### 뒤로가기 버튼 추가

브라우저 히스토리를 우선 사용하고,
필요하면 블로그 목록으로 안전하게 보내도록 처리했다.

### TOC와 하이라이트

헤딩 구조를 기준으로 현재 읽는 섹션을 보여주도록 했다.

## 시리즈와 관련 글

연속된 글이나 유사한 주제의 글을 이어서 읽기 쉽게 만들었다.

## 마무리

이제 블로그는 단순 저장소보다 읽기 경험이 있는 공간에 가까워졌다.
