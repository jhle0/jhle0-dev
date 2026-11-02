---
title: "Stanford CS231n | Lecture 3: Regularization and Optimization"
description: Stanford CS231n Lecture 3을 바탕으로 과적합을 방지하기 위한 정규화의 개념과 L1·L2
  Regularization의 차이를 정리한 글입니다. 주요 최적화 알고리즘은 별도 학습 자료로 연결한 내용입니다.
pubDate: 2026-11-02
updatedDate: ""
slug: cs231n-lecture-3-regularization-optimization
topic: study
tags:
  - CS231n
  - " Computer Vision"
  - Deep Learning
  - Regularization
  - Optimization
draft: false
series: Stanford CS231N Deep Learning for Computer Vision | Spring 2025
seriesOrder: 3
featured: false
---
## **Stanford CS231N Deep Learning for Computer Vision | Spring 2025 |** Lecture 3 : Regularization and Optimization

> **Lecture:** Stanford CS231n Spring 2025 — Lecture 3 : Regularization and Optimization
> 
> 
> **Lecturer:** Zane Durante
> 
> **Sources:**
> 
> - Lecture Slides
> - CS231n Official Course Website

## Regularization

정규화(regularization)는 model이 data에 overfitting되는 것을 방지하기 위해 model의 복잡도를 제한하는 방법이다.

- 너무 크거나 복잡한 parameter에 penalty를 주어서 더 단순하고 일반화가 잘되게 하는 방법

Loss에 regularization 항을 추가하는 방법으로 L2, L1, ElasticNet 등이 있고.

Dropout, Batch Normalization, stochastic depth, fractional pooling, etc. 이 있다.

### L1 Regularization

- weight의 절댓값을 loss에 더함

$$
L_{total} = L_{data} + \lambda \|w\|_1
$$

L1은 sparse 한 weight를 만든다

왜냐하면 wight가 크든 작든 다 0방향으로 같은 힘으로 당기기 때문에

작은 weight는 대부분 0이 되어 sparse 해진다.

⇒ 모든 weight에 동일한 penalty → 중요한 feature들만 남기고 안중요한거는 0으로 보낸다

### L2 Regularization

- weight의 제곱값을 loss에 더함

$$
L_{total} = L_{data} + \frac \lambda 2 \| w \|_2^2
$$

L2는 weight가 Spread out 되도록 유도

왜냐하면 weight가 클수록 더 큰 penalty가 부여되기 때문에

특정 weight에 집중하는 것보다 여러 weight에 분산하는 것이 penalty를 줄일 수 있다

예를 들어 동일한 예측을 만드는 두 weight 조합이 있다면

- (2, 0) → $2^2 + 0^2 =4$
- (1, 1) → $1^2  + 1^2 = 2$

⇒ 큰 weight에 더 강한 penalty → 특정 feature에 과도하게 의존하지 않고, 비슷한 정보를 가진 feature들에 weight를 분산하도록 유도한다.

---

## GD, SGD / momentum, RMSProp, Adam

정리한거 참고
https://jhle0-dev.vercel.app/blog/neural-network-optimization-methods

local minima, saddle point 어떻게 해결?

- momentum, RMSProp
- Adam - problem in first timestep → +bias
- AdamW - interact with optimizer
