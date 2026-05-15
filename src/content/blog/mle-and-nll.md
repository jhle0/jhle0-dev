---
title: MLE and NLL
description: MLE(Maximum Likelihood Estimation)와 NLL(Negative Log-Likelihood)의
  개념을 정리한 글입니다. 머신러닝의 다양한 loss 함수가 확률분포 기반의 NLL에서 어떻게 유도되는지도 설명합니다.
pubDate: 2026-03-16
updatedDate: ""
slug: mle-and-nll
topic: study
tags:
  - ai-core
  - MLE
  - NLL
  - Likelihood
  - Statistics
draft: false
featured: false
---
## MLE와 NLL이란?

머신러닝에서 모델을 학습한다는 것은

결국 **주어진 데이터를 가장 잘 설명하는 파라미터를 찾는 것**이라고 볼 수 있다.

더 구체적으로는,

모델이 **입력 x** 가 주어졌을 때 **정답 y** 가 어떻게 나오는지를

어떤 **확률분포(probability distribution)** 로 가정하고,

그 분포를 가장 잘 맞추는 파라미터를 찾는 과정이라고 볼 수 있다.

즉, 학습은 단순히 숫자를 맞추는 것이 아니라

**데이터가 생성되는 방식(분포)을 모델링(modeling)하는 과정**이다.

이때 사용하는 대표적인 방법이 **MLE(Maximum Likelihood Estimation)** 이다.

그리고 실제 최적화에서는 likelihood를 직접 최대화하기보다

보통 **NLL(Negative Log-Likelihood)** 을 최소화하는 형태로 바꿔서 사용한다.

## MLE (Maximum Likelihood Estimation)

### 정의

**MLE**는

관측된 데이터를 가장 그럴듯하게 만드는 파라미터를 찾는 방법이다.

식으로 쓰면:

$$
\theta^* = \arg\max_{\theta} P(\mathcal{D} \mid \theta)
$$

즉,

> “현재 데이터를 가장 잘 설명하는 파라미터를 찾자”
> 

### 독립 데이터 가정과 Likelihood

실제 데이터셋은 여러 샘플로 이루어져 있다

보통 각 샘플이 서로 독립이라고 가정하면,

데이터 전체의 likelihood는 각 샘플 likelihood의 곱으로 쓸수 있다.

$$
P(\mathcal{D} \mid \theta)=\prod_{i=1}^{m} P(y^{(i)} \mid x^{(i)}; \theta)
$$

즉, 전체 데이터셋의 likelihood는

각 데이터가 나올 확률을 모두 곱한 것이다.

## Log-likelihood

likelihood를 그대로 계산에 사용하면 문제가 있다.

1. **곱셈 형태를 계산이 불편하다**
    
    많은 데이터에 대해 확률을 계속 곱하면 식이 복잡해진다.
    
2. **값이 매우 작아질 수 있다**
    
    확률은 보통 0과 1사이이므로, 여러 개를 곱하면 숫자가 매우 작아져 수치적으로 불안정하다
    

따라서, likelihood에 **log를 취한다.**

> 로그 함수(log function)는 **단조 증가 함수(monotonically increasing function)** 이다.
> 
> 
> 즉, 값의 크기 순서를 바꾸지 않는다
> 

$$
\log L(\theta)=\log P(\mathcal{D} \mid \theta)=\log \prod_{i=1}^{m} P(y^{(i)} \mid x^{(i)}; \theta)
$$

로그의 성질을 이용하면

$$
\log L(\theta)=\sum_{i=1}^{m} \log P(y^{(i)} \mid x^{(i)}; \theta)
$$

→ 곱이 **합으로 바뀐다**.

이로 인해,

- 계산이 쉬워진다
- 미분도 쉬워진다
- 수치적으로 더 안정적이다

## NLL 최소화

머신러닝에서는 보통 loss를 **최소화**하는 형태로 문제를 푼다.

그런데 MLE는 likelihood 또는 log-likelihood를 **최대화**하는 문제이다.

그래서 보통 부호를 바꿔서

**Negative Log-Likelihood (NLL)** 를 정의한다.

$$
\text{NLL}(\theta)=- \log L(\theta)=- \sum_{i=1}^{m} \log P(y^{(i)} \mid x^{(i)}; \theta)
$$

따라서, MLE의 목표는

$$
\theta^* = \arg\min_{\theta} \text{NLL}(\theta)
$$

## Loss 함수와 NLL의 관계

많은 머신러닝의 loss 함수들은

서로 완전히 별개의 것이 아니라,

사실은 **어떤 확률분포를 가정했을 때의 NLL** 로 해석할 수 있다.

즉, loss 함수는 임의로 만든 식이 아니라

**확률모형(probabilistic model)** 에서 자연스럽게 유도되는 경우가 많다.

대표적으로:

- **Bernoulli distribution 가정**
    
    → **Binary Cross-Entropy (BCE) Loss가 도출**
    
- **laplace distribution 가정**
    
    → **MAE(Mean Absolute Error) Loss가 도출**
    
- **Categorical distribution 가정**
    
    → **Cross-Entropy (CE) Loss가 도출**
    
- **Gaussian distribution 가정**
    
    → **MSE(Mean Squared Error)**  **Loss가 도출**
    

즉,

많은 loss 함수들은 결국

> “관측된 정답이 모델이 가정한 분포 아래에서 얼마나 그럴듯한가?”
> 

를 측정하는 식이라고 볼 수 있다.
