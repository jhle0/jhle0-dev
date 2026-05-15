---
title: Ridge와 Lasso 회귀 (Ridge and Lasso Regression)
description: Ridge Regression과 Lasso Regression의 개념과 차이를 정리한 글입니다. L1/L2
  regularization이 선형회귀의 overfitting을 어떻게 완화하는지와, feature
  selection·multicollinearity·Elastic Net까지 함께 설명합니다.
pubDate: 2026-03-14
updatedDate: ""
slug: ridge-and-lasso-regression
topic: study
tags:
  - Machine Learning
  - Ridge Regression
  - Lasso Regression
  - Elastic Net
  - Regularization
draft: false
featured: false
---

> 
> 
> 
> [L1 / L2 / Weight Decay](https://jhle0-dev.vercel.app/blog/l1-l2-weight-decay-regularization) 참고
> 

## 정규화가 필요한 이유

기본 선형회귀는 훈련 데이터에 너무 잘 맞추려고 하다가

가중치가 지나치게 커지거나, 데이터의 noise까지 따라가서

**overfitting**이 생길 수 있다.

특히 다음과 같은 상황에서 문제가 커질 수 있다.

- feature 수가 많을 때
- 서로 강하게 상관된 feature가 많을 때
- 데이터 수가 적을 때
- noise가 많은 데이터일 때

이때 선형회귀에 regularization을 추가해서

**더 단순하고 일반화가 잘 되는 해**를 찾는 방법이

Ridge Regression과 Lasso Regression이다.

---

## Ridge Regression

Ridge Regression은

기본 선형회귀의 loss에 **L2 penalty**를 추가한 회귀 모델이다.

선형회귀에서 주로 최소화하는 MSE로 보면

Ridge Regression은  여기에 가중치의 제곱합 패널티를 더한다.

$$
J(\theta) = MSE(\theta) + \frac\lambda m \sum_{i=1}\theta_i^2
$$

즉, 규제항   $\sum_{i=1}\theta_i^2$을 사용해서 가중치가 너무 커지는 것을 막는다.

### 핵심 아이디어

Ridege는 큰 weight에 더 큰 penalty를 주어서

모델이 **너무 큰 가중치**를 갖지 못하게 만든다.

즉,

- 데이터에 잘 맞추되
- 가중치는 가능한 한 작게 유지하려는 것이다.

### Ridge Regression의 특징

- **가중치를 전체적으로 줄인다**
- **0으로 만들지는 않는다**
    - lasso와 달리, 대부분의 가중치가 작아질 뿐 0이 되지는 않는다.
- **다중공선성(multicollinearity)에 강하다.**
    - feature끼리 강하게 상관되어 있으면 기본 선형회귀에서는 가중치가 불안정해질 수 있다.
    - Ridege는 이런 상황에서 가중치를 안정적으로 만드는 데 도움이 된다.

### Ridge의 장단점

- **장점** :
    - overfitting 완화
    - 계수 안정화
    - multicollinearity 완화
- **단점** :
    - overfitting 완화
    - 계수 안정화
    - multicollinearity 완화

---

## Lasso Regression

Lasso Regression은

기본 선형회귀의 loss에 **L1 penalty**를 추가한 회귀 모델이다.

$$
J(\theta) = MSE(\theta) + 2\lambda \sum_{i=1}|\theta_i|
$$

### 핵심 아이디어

Lasso는

가중치 절댓값 합에 패널티를 주어

**불필요한 계수는 아예 0으로 보내는 방향**으로 학습한다.

즉,

- 데이터에 잘 맞추되
- 중요한 feature만 남기고
- 덜 중요한 feature는 제거하려는 성향이 있다.

### Lasso regression의 특징

- 일부 계수를 정확히 0으로 만들 수 있다
- feature selection 효과가 있다
- sparse한 모델을 만든다

### Lasso regression의 장단점

- **장점** :
    - feature selection 가능
    - 해석이 쉬워질수 있음
    - 불필요한 변수를 줄이기 좋음
- **단점** :
    - feature들끼리 강하게 상관되어 있으면 선택이 불안정할 수 있음
    - correlated feature 중 하나만 고르거나 임의로 선택하는 경향이 있을 수 있음
    - Ridge보다 학습이 덜 안정적인 경우도 있음

---

## Ridge, Lasso

### Ridge

- **L2 penalty**
- 계수를 전체적으로 작게 만든다
- 보통 0으로 만들지는 않는다
- correlated feature가 많을 때 더 안정적이다

### Lasso

- **L1 penalty**
- 일부 계수를 정확히 0으로 만든다
- feature selection 효과가 있다
- sparse model을 만들 수 있다

### Ridge가 더 적합한 경우

- 대부분의 feature가 어느 정도 의미가 있다고 생각될 때
- correlated feature가 많을 때
- feature를 제거하기보다 안정적으로 shrink하고 싶을 때

### Lasso가 더 적합한 경우

- feature가 많고 일부만 중요하다고 생각될 때
- feature selection이 중요할 때
- 해석 가능한 간단한 모델을 원할 때

## λ 의 역할

Ridge와 Lasso 모두

$\lambda$ 가 regularization 강도를 조절한다.

### λ 가 작으면

- penalty 영향이 약하다
- 기본 선형회귀와 비슷해진다

### λ 가 크면

- penalty 영향이 강하다
- 계수를 더 강하게 줄인다
- 너무 크면 underfitting이 될 수 있다

즉, $\lambda$ 는

**데이터 적합과 모델 단순성 사이 균형**을 조절하는 **하이퍼파라미터**이다.

## 표준화(Standardization)

Ridge와 Lasso에서는 보통

feature scaling 또는 **standardization**을 먼저 하는 것이 중요하다.

왜냐하면 penalty는 가중치 크기에 직접 작용하는데,

feature 스케일이 다르면 **어떤 feature는 unfair하게 더 큰 penalty를 받을 수 있기 때문**이다.

예를 들어:

- feature A 범위: 0 ~ 1
- feature B 범위: 0 ~ 10000

이런 경우 스케일이 다르면 계수 해석이 왜곡될 수 있다.

그래서 보통 Ridge/Lasso 전에는

**표준화 후 학습**하는 경우가 많다.

## Elastic Net(엘라스틱넷)

엘라스틱넷 회귀는 **릿지회귀와 라쏘 회귀를 절충**한 모델이다

$$
J(\theta) = MSE(\theta) + r(2\lambda  \sum_{i=1}|\theta_i|) + (1-r)(\frac\lambda m \sum_{i=1}\theta_i^2)
$$

- **혼합 비율 r**을 사용해 릿지와 라쏘의 규제항을 조절한다.

특징:

- Lasso의 sparsity
- Ridge의 안정성

을 어느 정도 같이 가져가려는 방법이다.

특히 correlated feature가 많으면서

feature selection도 어느 정도 하고 싶을 때 자주 사용된다
