---
title: 엔트로피, 교차 엔트로피, KL Divergence (Entropy, Cross-Entropy, KL Divergence)
description: Entropy, Cross-Entropy, KL Divergence의 개념과 관계를 정리한 글입니다. 확률분포의
  불확실성과 분포 간 차이를 어떻게 측정하는지, 그리고 왜 Cross-Entropy minimization이 KL Divergence
  minimization과 연결되는지를 설명합니다.
pubDate: 2026-03-17
updatedDate: ""
slug: entropy-cross-entropy-kl-divergence
topic: study
tags:
  - ai-core
  - Entropy
  - Cross Entropy
  - KL Divergence
  - Information Theory
draft: false
featured: false
---
## Entropy, Cross-Entropy, KL이란?

머신러닝에서 분류 문제를 다룰 때는

단순히 “정답이 맞았냐 틀렸냐”만 보는 것이 아니라,

모델이 만든 **확률분포**가 실제 정답 분포와 얼마나 가까운지를 보는 경우가 많다.

이때 자주 등장하는 개념이

- Entropy
- Cross-Entropy
- KL Divergence

이다.

이 세 개는 따로 떨어진 개념이 아니라

서로 직접 연결되어 있다.

## Entropy

### 정의

**Entropy(엔트로피)** 는

확률분포가 가지고 있는 **불확실성의 양**을 나타내는 개념이다.

이산확률분포 p(x) 에 대해 entropy는 다음처럼 정의된다.

$$
H(p) = - \sum_x p(x)\log p(x)
$$

즉, 각 사건의 확률에 log를 취한 값을 평균내고, 앞에 음수를 붙인 형태이다.

Entropy는

**“이 분포가 얼마나 예측하기 어려운가?”** 를 나타낸다고 볼 수 있다.

- 분포가 **한쪽에 몰려 있으면 entropy가 낮다**
- 분포가 **고르게 퍼져 있으면 entropy가 높다**

즉, entropy는

**분포 자체의 불확실성**을 나타낸다.

## Cross-Entropy

### 정의

**Cross-Entropy(교차 엔트로피)** 는

실제 분포 p 와 예측 분포 q 가 있을 때,

p 를 q 로 표현하는 데 드는 평균 비용으로 정의된다.

$$
H(p, q) = - \sum_x p(x)\log q(x)
$$

- p : 실제 분포
- q : 모델의 예측 분포

Cross-Entropy는

“**실제 정답 분포가 있을 때, 모델이 만든 예측 분포가 얼마나 비효율적인가**?”

를 보는 개념이다.

즉,

- 실제 분포와 예측 분포가 비슷하면 작아지고
- 예측 분포가 실제 분포와 다르면 커진다

## KL Divergence

### 정의

**KL Divergence(Kullback-Leibler Divergence)** 는

두 확률분포 p 와 q 가 얼마나 다른지를 나타내는 값이다.

$$
D_{KL}(p\|q) = \sum_x p(x)\log \frac{p(x)}{q(x)}
$$

여기서 보통

- p : 실제 분포
- q : 모델 분포

KL divergence는

**“모델 분포 q 가 실제 분포 p 와 얼마나 다른가?”**

를 나타낸다.

즉,

- 두 분포가 같으면 KL은 0
- 다를수록 KL은 커진다

## 세 개의 핵심 관계

가장 중요한 식은 이것이다.

$$
H(p,q) = H(p) + D_{KL}(p\|q)
$$

즉,

**→ cross-entropy = entropy + KL**

### $H(p)$

실제 분포 자체의 entropy이다.

데이터가 정해지면 이 값은 고정되어 있다.

### $D_{KL}(p\|q)$

모델 분포 q 가 실제 분포 p 와 얼마나 다른지 나타낸다.

따라서,

모델이 바꿀 수 있는 것은 결국 q 이므로,

**cross-entropy를 최소화하는 것은 KL divergence를 줄이는 것과 연결된다.**

즉,

> 실제 분포와 예측 분포를 가깝게 만들고 싶다면 cross-entropy를 줄이면 된다.
>
