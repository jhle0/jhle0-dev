---
title: 소프트맥스 회귀 (Softmax Regression)
description: 소프트맥스 회귀의 구조와 softmax 함수 기반 확률 예측 과정을 정리한 글입니다. 다중 클래스 분류에서 사용하는
  Cross-Entropy loss와 categorical distribution 기반 NLL 관점도 함께 설명합니다.
pubDate: 2026-03-29
updatedDate: ""
slug: softmax-regression
topic: study
tags:
  - Machine Learning
  - Softmax Regression
  - Multiclass Classification
draft: false
featured: false
---

## 소프트맥스 회귀란?

소프트맥스 회귀는

**다중 클래스 분류(multiclass classification)**

를 위한 대표적인 선형 모델이다.

보통 로지스틱 회귀를 여러 클래스로 확장한 형태로 이해한다.

샘플 $\mathbf{x}$가 주어지면 먼저 소프트맥스 회귀 모델이 각 클래스 k에 대한

점수 $s_k(\mathbf{x})$를 계산하고,

그 점수에 소프트맥스 함수를 적용하여 각 클래스의 확률을 추정한다.

## 모델 구조

먼저 샘플 x에 대해

각 클래스 k에 대한 **점수(score) 또는 로짓(logit)** 을 계산한다

$$
s_k(\mathbf{x}) = (\theta^{(k)})^T\mathbf{x}
$$

각 클래스는 자신만의 파라미터 벡터 $\theta^{(k)}$가 있다.

이 벡터들은 파라미터 행렬 $\theta$에 행으로 저장된다.

샘플 $\mathbf{x}$에 대해 각 클래스의 점수가 계산되면 소프트맥스 함수를 통과시켜

클래스 k에 속할 확률 $\hat p_k$을 추정할 수 있다.

[Softmax & Numerical Stability](https://jhle0-dev.vercel.app/blog/softmax-and-numerical-stability) 참고

$$
\hat p_k = \sigma(s(\mathbf{x}))_k = \frac{e^{s_k(\mathbf{x})}}{\sum^K_{j=1} e^{s_j(\mathbf{x})}}
$$

- $K$ : 클래스 수
- $s(\mathbf{x})$ : 샘플 $\mathbf{x}$에 대한 각 클래스의 점수를 담은 벡터
- $\sigma(s(\mathbf{x}))$ : 샘플 $\mathbf{x}$에 대한 각 클래스의 점수가 주어졌을 때 이 샘플이 클래스 k에 속할 추정 확률

## 비용함수

모델이 타깃 클래스에 대해서는 높은 확률을 추정하도록 만드는 것이 목적이다.

이를 위해, 크로스 엔트로피(cross entropy) 비용 함수를 사용한다.

$$
J(\theta) = -\frac1m \sum^m_{i=1}\sum^K_{k=1} y_k^{(i)}\log(\hat p_k^{(i)})
$$

$y^k(i)$ 는 i번째 샘플의 정답을 one-hot 형태로 나타낸 값이다.

즉, i번째 샘플의 실제 클래스가 k이면 1, 아니면 0이다.

이 비용함수는 다중 클래스 분류에서 정답 레이블이 따른다고 가정한 **categorical distribution의 negative log-likelihood(NLL)** 와 같다.

$\theta^{(k)}$에 대한 그라디언트 벡터는 다음과 같다.

$$
\nabla _{\theta^{(k)}} J(\theta) = \frac1m \sum^m_{i=1}(\hat p_k^{(i)} - y_k^{(i)})\mathbf{x}^{(i)}
$$

각 크래스에 대한 그레디언트 벡터를 계산해서

비용 함수를 최소화하기 위한 파라미터 행렬 $\theta$를 찾기 위해 경사 하강법을 사용한다.
