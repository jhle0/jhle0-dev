---
title: BCE, CE, NLL의 관계 (BCE, CE, NLL Connection)
description: BCE(Binary Cross-Entropy), CE(Cross-Entropy), NLL(Negative
  Log-Likelihood)의 관계를 정리한 글입니다. 이진분류와 다중분류의 loss 함수가 각각 Bernoulli 분포와
  Categorical 분포의 NLL로부터 어떻게 유도되는지 설명합니다.
pubDate: 2026-03-23
updatedDate: ""
slug: bce-ce-nll-connection
topic: study
tags:
  - ai-core
  - BCE
  - Cross Entropy
  - NLL
  - Binary Classification
  - Multiclass Classification
draft: false
featured: false
---
## BCE, CE, NLL이란?

분류 문제에서 모델은 보통

각 클래스에 대한 **확률**을 출력하려고 한다.

그리고 학습의 목표는

**정답 클래스에 높은 확률을 주도록** 파라미터를 조정하는 것이다.

이때 사용하는 대표적인 loss가

- **BCE (Binary Cross-Entropy)**
- **CE (Categorical Cross-Entropy)**

이다.

그런데 이 둘은 그냥 “분류에서 많이 쓰는 loss 공식”이 아니라,

확률모델을 **MLE 관점으로 학습할 때 자연스럽게 나오는 NLL**이다.

즉,

- 이진분류에서는 **Bernoulli 분포의 NLL**
- 다중분류에서는 **Categorical 분포의 NLL**

## NLL 다시 보기

데이터셋 $\mathcal{D}$ 에 대해 likelihood를 최대화하는 것은

log-likelihood를 최대화하는 것과 같고,

이는 다시 NLL을 최소화하는 것과 같다.

$$
\text{NLL} = - \sum_{i=1}^{m} \log P(y^{(i)} \mid x^{(i)}; \theta)
$$

즉, NLL은

**정답 데이터에 대해 모델이 부여한 확률의 로그에 마이너스를 붙인 값**이다.

따라서 모델이 정답에 높은 확률을 줄수록 NLL은 작아진다.

## BCE (Binary Cross-Entropy)

### BCE란?

BCE는 **이진분류(binary classification)** 에서 사용하는 대표적인 loss이다.

정답 $y \in \{0,1\}$ 이고,

모델이 예측한 양성 클래스 확률을 $\hat p$ 라고 하면

BCE는 다음처럼 쓴다.

$$
L = - \left[ y \log \hat p + (1-y)\log(1-\hat p) \right]
$$

- y=1 이면 정답은 양성 클래스
- y=0 이면 정답은 음성 클래스
- $\hat p = P(y=1 \mid x)$

- y = 1이면 식은
    - $L = -\log \hat p$
- y = 0이면 식은
    - $L = -\log (1-\hat p)$

즉, BCE는

**정답이 1이면 $\hat p$ 를 크게, 정답이 0이면 $\hat p$ 를 작게 만들도록**

모델을 학습시키는 loss이다.

## CE (Categorical Cross-Entropy)

### CE란?

CE는 **다중분류(multiclass classification)** 에서 사용하는 대표적인 loss이다.

클래스가 K개이고,

- 실제 정답 분포를 $y = [y_1, y_2, \dots, y_K]$
- 모델 예측 확률을 $\hat p = [\hat p_1, \hat p_2, \dots, \hat p_K]$

라고 하면 CE는 다음처럼 쓴다.

$$
L = - \sum_{k=1}^{K} y_k \log \hat p_k
$$

여기서 보통 y 는 one-hot vector이다.

예를 들어 클래스 3개 중 두 번째가 정답이면

$$
y = [0,1,0]
$$

이고, L은 다음과 같다

$$
L = -(0\log \hat p_1 +1\log \hat p_2+0\log \hat p_3) = -\log \hat p_2
$$
