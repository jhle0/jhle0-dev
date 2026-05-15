---
title: 로지스틱 회귀 (Logistic Regression)
description: 로지스틱 회귀의 구조와 sigmoid 함수, log-odds, 결정 경계, Bernoulli 분포 기반 확률 모델링을
  정리한 글입니다. 또한 BCE(Binary Cross-Entropy) loss와 MLE 관점에서의 학습 과정도 함께 설명합니다.
pubDate: 2026-03-28
updatedDate: ""
slug: logistic-regression
topic: study
tags:
  - Machine Learning
  - Logistic Regression
  - Binary Classification
draft: false
featured: false
---

## 로지스틱 회귀란?

로지스틱 회귀는 **이진 분류(Binary Classification)** 를 위한 대표적인 선형 모델이다.

입력 x가 주어졌을 때,

출력이 어떤 클래스에 속할 **확률**을 예측한다.

이름은 회귀(regression)이지만 실제로는 **분류(classification)** 알고리즘이다.

이름에 회귀가 들어가는 이유는

입력 x에 대해 먼저 **선형식(linear function)** 을 만들고,

그 값을 이용해 확률을 예측하기 때문이다.

## 모델 구조

로지스틱 회귀는 먼저 입력에 대해 선형 결함을 만든다.

$$
z = w^Tx + b
$$

- $w$ : 가중치(weight) 벡터
- $b$ : 편향(bias, 절편)
- $z$ : logit 또는 score

그 다음, 이 $z$를 **sigmoid 함수**에 넣는다.

$$
\hat{p} = \sigma(z) = \frac{1}{1 + e^{-z}}
$$

이 값은 0과 1 사이에 있으므로 확률처럼 해석할 수 있다.

즉,

$$
P(y=1 \mid x) = \sigma(w^T x + b)
$$

그리고

$$
P(y=0 \mid x) = 1 - \sigma(w^T x + b)
$$

이다.

### sigmoid 함수

$$
\sigma(z)=\frac{1}{1+e^{-z}}
$$

- 출력 범위가 **0 ~ 1**
- z가 크면 출력은 1에 가까워진다
- z가 작으면 출력은 0에 가까워진다
- z=0 이면 출력은 0.5이다

선형식 $w^T x + b$의 출력은 $(-\infty, \infty)$ 범위이므로

그대로는 확률로 해석할 수 없다.

sigmoid를 쓰면 이를 **확률처럼 해석 가능한 값**으로 바꿀 수 있다.

### 예측과 분류 기준

모델은 먼저 확률을 예측한다.

$$
\hat{p} = P(y=1 \mid x) = \sigma(w^T x + b)
$$

그 다음 보통 threshold(임계값) 0.5를 기준으로 분류한다.

$$
\hat{y} =\begin{cases}1 & \text{if } \hat{p} \ge 0.5 \\0 & \text{if } \hat{p} < 0.5\end{cases}
$$

하지만 threshold는 항상 0.5일 필요는 없다.

예를 들어:

- 암 진단: recall을 높이기 위해 threshold를 낮출 수 있다
- 스팸 필터: precision을 높이기 위해 threshold를 높일 수 있다

### 로그 오즈와 선형 관계

로지스틱 회귀는 확률 $p=P(y=1\mid x)$ 자체를 선형으로 두지 않고,

그 확률의 **로그 오즈(log-odds)** 를 선형결합으로 모델링한다.

$$
\text{odds}=\frac{p}{1-p}, \qquad\log\text{odds}=\log\frac{p}{1-p}
$$

로지스틱 회귀의 가정은

$$
\log\frac{p}{1-p}=w^T x+b
$$

이며, 이를 p에 대해 풀면

$$
p=\sigma(w^T x+b)=\frac{1}{1+e^{-(w^T x+b)}}
$$

가 된다.

즉, 로지스틱 회귀는 **확률 자체가 선형인 모델이 아니라, log-odds가 선형인 모델**이다.

### 결정 경계

로지스틱 회귀는

$$
P(y=1\mid x)=\sigma(w^T x+b)
$$

로 확률을 계산한다.

보통 threshold를 0.5로 두는데, sigmoid는 z=0일 때 0.5를 출력하므로 결정 경계는

$$
w^T x+b=0
$$

이 된다. 이 식은 입력에 대한 선형식이므로, 로지스틱 회귀의 결정 경계는 선형이다. 따라서 로지스틱 회귀는 **선형 분류기**이다.

### 확률 모델 관점

로지스틱 회귀는 이진 분류 문제에서 출력 $y \in \{0,1\}$를 **Bernoulli 분포**로 모델링할 수 있다.

$$
y \mid x \sim \text{Bernoulli}(p)
$$

여기서

$$
p = P(y=1\mid x)=\sigma(w^T x+b)
$$

이다.

Bernoulli 분포의 확률 질량 함수(PMF)는

$$
P(y\mid x)=p^y(1-p)^{1-y}
$$

이므로, 로지스틱 회귀에서는

$$
P(y\mid x;w,b)=\hat p^y(1-\hat p)^{1-y}
$$

라고 쓸 수 있다.

이 관점은 로지스틱 회귀의 학습이 **최대우도추정(MLE)** 과 연결된다는 점에서 중요하다.

## 훈련과 비용함수

### 비용함수(loss function) → BCE

로지스틱 회귀의 훈련 목적은 양성 샘플(y=1)에 대해서는 높은 확률을 추정하고, 

음성 샘플(y = 0)에 대해서는 낮은 확률을 추정하는

모델의 파라미터 벡터 $\theta$를 찾는 것이다

하나의 훈련 샘플 $x$에 대한 비용함수를 보면,

$$
L(y,\hat p) =\begin{cases}-\log(\hat p) & \text y=1 \\ -\log(1-\hat p) & \text y=0\end{cases}
$$

$\hat p$가 0에 가까워지면 $-\log(\hat p)$가 매우 커지므로 타당하다고 볼 수 있다.

그러므로 모델이 양성 샘플을 0에 가까운 확률로 추정하면 비용이 크게 증가 할 것이다.

반대로 $\hat p$가 1에 가까우면 $-\log(\hat p)$는 0에 가까워진다.

따라서, 양성 샘플을 1에 가깝게 추정하거나, 음성 샘플을 0에 가깝게 추정하면 비용은 0에 가까워질 것이다.

전체 훈련 세트에 대한 비용 함수는 모든 훈련 샘플의 비용을 평균한 것이다.

이를 로그 손실이라고 부르며 식은 다음과 같다

$$
J(\theta)= -\frac{1}{m}\sum_{i=1}^{m}\left[y^{(i)}\log \hat{p}^{(i)} + (1-y^{(i)})\log(1-\hat{p}^{(i)})\right]
$$

이 손실 함수를 **Binary Cross-Entropy(BCE)**라고 한다.

> [BCE / CE / NLL Connection](https://jhle0-dev.vercel.app/blog/bce-ce-nll-connection) 참고
> 

### 훈련

로지스틱 회귀의 BCE 손실을 최소화하는 닫힌형 해(closed-form solution)는 알려져 있지 않다. 

따라서 보통 경사 하강법과 같은 수치 최적화 방법을 사용한다.

→ 경사 하강법을 사용한다.

이 비용 함수의 j번째 모델 파라미터 $\theta _j$에 대해 편미분을 하면

$$
\frac{\partial  }{\partial \theta_j}J(\theta) = \frac1m \sum_{i=1}^m(\sigma(\theta^T\mathbf{x}^{(i)}) - y^{(i)})\mathbf{x}_j^{(i)}
$$

이다.

이를 통해 $\theta$를 최소화하도록 경사 하강법을 수행한다.
