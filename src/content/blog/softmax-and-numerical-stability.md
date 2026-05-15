---
title: Softmax와 Numerical Stability
description: Softmax 함수의 동작 원리와 확률분포로 해석되는 이유를 정리한 글입니다. 또한 overflow/underflow
  문제와 이를 해결하기 위한 max subtraction trick 등 numerical stability 기법도 함께 설명합니다.
pubDate: 2026-03-25
updatedDate: ""
slug: softmax-and-numerical-stability
topic: study
tags:
  - ai-core
  - Softmax
  - Numerical Stability
draft: false
featured: false
---

## Softmax란?

다중분류 문제에서 모델은 보통 각 클래스마다 하나의 **점수(score)** 를 출력한다.

예를 들어 클래스가 K개라면, 모델은 각 클래스에 대해

$$
z_1, z_2, \dots, z_K
$$

와 같은 값을 낼 수 있다.

이 값들은 아직 확률이 아니다.

그냥 각 클래스에 대한 **상대적인 점수**이다.

이때 이 점수들을 **확률분포처럼 해석할 수 있는 값**으로 바꾸는 함수가 **softmax**이다.

$z_k$를 보통 score, logit 이라고 부른다.

다준 분류 선형모델에서는 보통 각 클래스에 대해

$z_k = w^T_kx + b_k$형태로 계산한다.

즉, 각 클래스마다 하나의 선형결합 점수가 나온다.

### Softmax 정의

Softmax는 각 클래스 점수 $z_k$  를 다음처럼 변환한다.

$$
\hat p_k = \frac{e^{z_k}}{\sum_{j=1}^{K} e^{z_j}}
$$

여기서

- $z_k$ : 클래스 k의 logit(score)
- $\hat p_k$ : 클래스 k의 softmax 출력 확률

이다.

즉, 각 score에 지수함수 $e^{z_k}$ 를 취한 뒤

전체 합으로 나누어 정규화한다.

### Softmax의 성질

Softmax를 거치면 출력은 확률처럼 해석할 수 있는 값을 가진다.

**1) 각 값은 0과 1 사이이다**

$$
0 < \hat p_k < 1
$$

**2) 전체 합은 1이다**

$$
\sum_{k=1}^{K} \hat p_k = 1
$$

즉, softmax 출력은 **확률분포 형태**가 된다.

다중분류에서는

각 클래스 중 하나를 선택해야 하므로

출력을 확률분포처럼 만들 수 있으면 해석이 쉬워진다.

예를 들어

$$
[2.0,\;1.0,\;0.1]
$$

같은 raw score보다

$$
[0.65,\;0.24,\;0.11]
$$

같은 softmax 확률이 훨씬 직관적이다.

즉,

- 어떤 클래스가 가장 유력한지
- 얼마나 확신하는지

를 더 쉽게 볼 수 있다.

---

## Numerical Stability란?

softmax의 수식 자체는 간단하지만,

실제 계산에서는 **수치적으로 불안정한 문제**가 생길 수 있다.

이걸 **numerical stability** 문제라고 한다.

### 왜 문제가 생기나

softmax는 $e^{z_k}$ 를 계산한다.

그런데 $z_k$  가 매우 크면

값이 엄청 커져서 **overflow**가 날 수 있다.

반대로 너무 작은 값이면

0에 가까워져 **underflow** 문제가 생길 수 있다.

### Max Subtraction Trick

이 문제를 해결하는 가장 대표적인 방법이

**max subtraction** 이다.

핵심은 softmax 계산 전에

모든 logits에서 가장 큰 값을 빼는 것이다.

즉,

$$
\hat p_k=\frac{e^{z_k - \max(z)}}{\sum_{j=1}^{K} e^{z_j - \max(z)}}
$$

처럼 계산한다.

이로인해, 가장 큰 logit에 대해

$z_k - max(z) = 0$이 되므로, 

가장 큰 항의 지수 값은 $e^0 = 1$이 된다.
