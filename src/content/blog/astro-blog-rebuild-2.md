---
title: "Astro 블로그 정리 기록 2: 전역 스타일 시스템 다듬기"
description: "타이포, 카드, 간격, 네비게이션 규칙을 통일해 사이트 톤을 정리한 과정."
pubDate: 2026-04-09
updatedDate: 2026-04-09
slug: "astro-blog-rebuild-2"
tags: ["astro", "css", "design", "series", "layout"]
draft: false
heroImage: ""
series: "Astro Blog Rebuild"
featured: false
canonicalURL: ""
---

# Astro 블로그 정리 기록 2: 전역 스타일 시스템 다듬기

사이트 전체가 따로 노는 느낌을 줄이기 위해 공통 시각 규칙부터 다시 세웠다.

## 토큰 먼저 정리

색상, 그림자, radius, 본문 폭 같은 토큰을 먼저 정리했다.

## 카드와 타이포의 역할

카드는 정보 묶음, 타이포는 위계 전달이라는 기준으로 나눠 잡았다.

### 너무 무거운 카드 피하기

과한 그림자나 강한 대비보다 조용한 질감을 택했다.

### 모바일 간격 조정

작은 화면에서 카드와 문단 간격이 답답하지 않도록 재조정했다.

## 다음 작업

다음 글에서는 블로그 상세 페이지의 읽기 경험을 손본 과정을 정리한다.
