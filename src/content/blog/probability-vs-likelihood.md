---
title: Probability vs Likelihood
description: Probability와 Likelihood의 차이를 “무엇을 고정하고 무엇을 변수로 보는가”의 관점에서 정리한 글입니다.
  머신러닝에서 예측과 학습이 각각 probability와 likelihood 관점으로 어떻게 연결되는지 설명합니다.
pubDate: 2026-03-03
updatedDate: ""
slug: probability-vs-likelihood
topic: study
tags:
  - ai-core
  - Probability
  - Likelihood
draft: false
featured: false
---
## Probability와 Likelihood란?

Probability와 Likelihood는 식이 비슷하게 보일 수 있지만

**무엇을 고정하고 무엇을 바꾸는지**가 다르다.

즉, 둘은 같은 수식을 보더라도

**관점이 다른 개념**이다.

## Probability

**Probability(확률)** 는

어떤 **모델 또는 파라미터가 주어졌을 때**,

특정 데이터나 사건이 일어날 가능성을 의미한다.

예를 들어, 아래 식은

$$
P(y | x, \theta)
$$

- 입력 x와 파라미터 θ가 주어졌을 때
- 출력 y가 나올 확률

을 뜻한다.

즉, probability에서는 보통

- **모델/파라미터는 고정**
- **데이터나 사건이 변하는 대상**

## Likelihood

**Likelihood(가능도)** 는

관측된 데이터가 이미 주어졌을 때,

어떤 파라미터가 그 데이터를 **얼마나 그럴듯하게 설명하는지**를 나타낸다.

같은 식

$$
P(y | x, \theta)
$$

를 보더라도 likelihood 관점에서는

- x,y 는 이미 관측된 값으로 고정하고
- $\theta$ 를 바꿔보면서
- 어떤 $\theta$ 가 이 데이터를 가장 잘 설명하는지 본다

즉, likelihood에서는 보통

- **데이터는 고정**
- **파라미터가 변하는 대상**

이다.

보통 likelihood는 다음처럼 쓴다.

$$
L(\theta) = P(\mathcal{D} \mid \theta)
$$

여기서  $\mathcal{D}$ 는 데이터셋이다.

즉, likelihood는

“이 데이터가 주어졌을 때 어떤 파라미터가 더 그럴듯한가?”

를 보는 개념이다.

## Likelihood 예시

두 개의 주머니 A와 B가 있다고 가정하자.

주머니 A에는 검은공 1개와 흰 공 1개가,

주머니 B에는 검은공 2개와 흰송 1개가 들어있다.

### 조건부 확률

각 주머니에 대한 조건부 확률은 다음과 같다.

- 주머니 A : $P(\text{검} \mid A) = \frac12, P(\text{하} \mid A) = \frac12$
- 주머니 B : $P(\text{검} \mid B) = \frac23, P(\text{하} \mid B) = \frac13$

### Likelihood

Likelihood는 이와는 반대로

‘색’을 고정하고 ‘주머니’를 변수로 보는 함수이다.

즉, 검은 공이 나왔을 때 → 이게 A주머니일지 B주머니일지의 확률이다.

## 머신러닝과의 연결

머신러닝에서는 보통

- 모델이 어떤 확률을 출력하는지 보는 것도 중요하고
- 관측된 데이터를 가장 잘 설명하는 파라미터를 찾는 것도 중요하다

이때

- **예측할 때는 probability**
- **학습할 때는 likelihood**

관점이 자주 등장한다.

즉,

- probability는 **모델이 어떤 출력을 얼마나 확률적으로 보는가**
- likelihood는 **어떤 파라미터가 데이터를 가장 잘 설명하는가**
