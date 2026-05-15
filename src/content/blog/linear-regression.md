---
title: 선형회귀 (Linear Regression)
description: 선형회귀의 기본 개념과 OLS(Ordinary Least Squares), MSE 기반 최적화 과정을 정리한 글입니다.
  정규방정식, QR/SVD 분해, Gradient Descent를 이용한 선형회귀 해법까지 함께 설명합니다.
pubDate: 2026-03-13
updatedDate: ""
slug: linear-regression
topic: study
tags:
  - Machine Learning
  - Linear Regression
  - OLS
  - MSE
  - Gradient Descent
  - QR Decomposition
  - SVD
draft: false
featured: false
---

## 선형회귀란?

**회귀(regression)** - 관측 데이터에서 어떤 함수를 훈련한 다음 새로운 데이터에 대한 예측을 만드는 방법

즉, 입력 x로 부터 **연속값** y를 예측하는 문제

### 선형회귀(linear Regression)

입력과 출력간의 **관계(함수)** 를 (**선형으로 놓고**) 알아내는 것

중요한 점은

선형회귀에서 **“선형”** 이라는 말은 입력 $x$ 에 대해 반드시 직선 형태라는 뜻이 아니라,
모델이 **파라미터 $\theta$ 에 대해 선형결합 형태**로 표현된다는 뜻이다.

### 선형 모델

선형 모델은 **가중치(계수)** 와 **편향(bias = 절편(intercept))** 이라는 상수를 통해 예측한다.

- 가중치(계수) = $\theta_1, \theta_2, \theta_3 ,...\theta_n$
- 편향(절편) = $\theta_0$

이 $\theta_1$과 $\theta_0$을 **모델의 파라미터**라고 한다.

가중치 $\theta_j$의 의미는 다른 특성들이 고정되어 있을 때,

특성 $x_j$가 1 증가하면 예측값 $\hat y$가 얼마나 변하는지를 나타낸다.

선형 모델은 아래 식처럼 표현된다.

$$
\hat y = \theta_0 + \theta_1x_1 + \theta_2x_2 + ... + \theta_nx_n
$$

- $\hat y$ : 예측 값
- $n$ : 특성 수
- $x_i$ : i 번째 특성 값
- $\theta_j$ : j 번째 모델 파라미터(편향 $\theta_0$와 나머지 가중치들 포함)

이 식을 벡터 형태로 간단히 쓰면,

$$
\hat y = h_\theta(x) = \theta \cdot x = \theta^Tx
$$

- $h_\theta$ : 가설 함수(예측 함수)
- $\theta$ : 편향과 특성 가중치를 담은 벡터
- $x$ : $x_0$ ~ $x_n$ 까지 담은 샘플의 특성 벡터 **($x_0$은 항상 1이다)**

모델을 훈련시킨다는 것은 모델이 **훈련 세트에 가장 잘 맞도록** 최적의 파라미터 $\theta$를 찾는 것이다.

최적의 파라미터는 어떻게 찾을까?

파라미터의 좋고 나쁨을 정량적으로 어떻게 평가할까?

이를 위해 도입되는 개념이 Loss함수(손실 함수)dlek.

Loss 함수는 해당 파라미터가 얼마나 안 좋은지를 나타내는 함수로, 이를 최소화 하는 것이 AI의 목표이다.

Loss 함수는 해결하고자 하는 문제의 특성에 맞게 적절히 정의해야 한다.

선형회귀 문제에서는 예측값 $\hat y$ 과 실제값 $y$의 차이를 Loss로 정의한다.

각 샘플 $i$에 대해 예측값 $\hat y$ 과 실제값 $y$의 차이를

$$
r^{(i)} = y^{(i)} - \hat y^{(i)} = y^{(i)} -\theta^Tx^{(i)}
$$

라고 정의하고, 이 값을 **잔차(residual)**라고 한다.

학습은 이 잔차들이 전체적으로 작아지도록(즉, 전체 데이터에서 오차가 작아지도록) $\theta$를 선택하는 과정이다.

선형 회귀에서 자주 쓰는 성능 측정 지표는 **RMSE(평균 제곱근 오차)** 이다.

> [Regression Metrics(MAE, MSE, RMSE, MAPE, R2 score)](https://jhle0-dev.vercel.app/blog/regression-metrics) 참고
> 

$\sqrt{}{}$는 단조 증가 함수이므로, **RMSE를 최소화하는** $\theta$ 는 **MSE를 최소화하는** $\theta$ 와 동일하다.

따라서 다음 **MSE(Mean Squared Error)** 를 최소화하면 된다.

$$
J(\theta) = \frac1m \sum^m_{i=1}(y^{(i)} - \theta^Tx^{(i)})^2
$$

- $m$  : **샘플 수(데이터 개수)**

모든 샘플 $x$들을 행으로 쌓아 행렬 $X$로 쓰면

$$
\hat\theta = \arg\min_{\theta} \frac1m ||y - X\theta||^2_2
$$

- $X \in \mathbb{R}^{m \times (n+1)}$
- $\theta \in\mathbb{R}^{(n+1) \times 1}$
- $y \in\mathbb{R}^{m \times 1}$
- $\hat y = X\theta$

⇒ **즉, (OLS 기준의) 선형회귀의 목적은 MSE(또는 SSE)를 최소화하는 $\theta$를 찾는 것이다**

OLS(Ordinary Least Squares)는 잔차 제곱합(SSE)을 최소화하여 파라미터를 추정하는 선형회귀의 가장 기본적인 방법이다.

## MSE를 최소화하는 $\theta$ 구하기

### 목표(OLS)

선형회귀를 푸는 우리의 목적은 **MSE(또는 SSE)를 최소화하는 $\theta$를 찾는 것이다.**

$$
\theta^* = \arg\min_{\theta} \frac1m ||y - X\theta||^2_2
$$

- $m$ : 샘플 수
- $X \in\mathbb{R}^{m \times d}$ (절편 포함하면 d = n+1)
- $\theta\in \mathbb{R}^{d}$
- $y\in \mathbb{R}^{m}$

위 값을 구하는 방법은 여러가지 있다

- 닫힌 형태의 방정식(정규 방정식)
- 선형대수 활용
- 경사 하강법(GD), mini-batch GD, SGD

## 정규방정식(Normal Equation)

목적함수 $J(\theta)$를 $\theta$에 대해 미분하고 0으로 두면, 다음 **정규방정식을** 얻을 수 있다 :

$$
X^TX\theta = X^Ty
$$

즉, 위 선형 시스템을 만족하는 $\theta$를 구하면 된다.

### 닫힌형 표현(가역일 때)

만약 $X^TX$가 가역(invertible)이면:

$$
\theta^* = (X^TX)^{-1}X^Ty
$$

- 장점 :
    - 개념적으로 단순하다
    - 특성 수(m)이 커도 샘플 수(d)가 아주 작으면 빠르게 처리 가능
- 단점 :
    - 수치 안정성 : 조건수가 제곱으로 인해 악화됨
    - → 즉, $\theta$가 작은 노이즈에도 크게 흔들리고, 계산 오차가 커짐
    - $X^TX$가 특이 행렬이면 역행렬이 불가
    - 계산 비용이 크다 : $O(d^3)$

## 선형대수 풀이 → QR, SVD

### **QR 분해**

$$
X = QR
$$

- $Q\in\mathbb{R}^{m \times d}$ : 열들이 직교(orthonormal)인 행렬
- $R\in\mathbb{R}^{d \times d}$ : upper triangular 행렬

따라서 목적함수가 다음과 같이 변형된다

$$
||y - X\theta||_2 = ||y - QR\theta||_2
$$

직교 행렬은 $Q^TQ = I$ 이므로,

$$
||y - QR\theta||_2 = ||Q^Ty - R\theta||_2
$$

결국 아래식을 푸는 문제로 바뀐다.

$$
R\theta = Q^Ty
$$

### QR 장점

- **정규방정식보다 수치적으로 안정**(조건수 악화를 덜 겪음)
- R이 상삼각이라 **back substitution**으로 빠르게 풂
- 라이브러리에서 OLS 기본 구현으로 자주 사용됨

### QR 단점/주의

- X가 랭크 부족(특이)이면 일반 QR만으로는 처리가 불안정할 수 있어 **SVD가 더 적합**할 때가 있음

### **SVD 분해**

$$
X = U\Sigma V^T
$$

- $U$ : 직교 행렬
- $\Sigma$ : 대각 행렬(특이값 $\sigma_i$)
- $V$ :직교 행렬

의사역행렬(pseudo-inverse)은 다음과 같다

$$
X^+ = V\Sigma^+ U^T
$$

따라서 해는

$$
\theta^* = X^+y = V\Sigma^+ U^Ty
$$

### SVD 장점

- **랭크 부족/특이 행렬에서도 해를 구할 수 있음**
- 수치 안정성이 가장 강함(공선성/ill-conditioned에 강함)
- 해가 여러 개인 경우 보통 **최소 노름(minimum-norm) 해**를 제공
- 계산 복잡도는 : $O(d^2)$

### SVD 단점

- 계산 비용이 QR보다 보통 더 큼(큰 행렬에서는 부담)

## 경사 하강법(Gradient Descent)

위에서는 loss function을 최소화하는 파라미터 값을 직접 계산하는 방법들을 정리했다.

선형회귀는 정규 방정식으로 해를 직접 구할 수 있지만,
일반적으로는 닫힌 형태(closed form)가 없거나 계산 비용이 너무 큰 최적화 문제가 많다.
이런 경우 Gradient Descent 같은 반복적(iterative) 방법이 유용하다.

특히 데이터 양이 매우 크거나 특성 수가 많을 때는
정규 방정식처럼 큰 행렬의 역행렬을 직접 구하는 방법보다 GD가 더 실용적인 경우가 많다.

선형회귀의 MSE 비용 함수는 convex하다.
따라서 local minimum 문제 없이 전역 최솟값 방향으로 최적화할 수 있다.

선형 회귀를 위한 **MSE 비용 함수는 볼록 함수(convex function)** 이다.

따라서 local minimum 문제 없이 전역 최솟값 방향으로 최적화할 수 있다.

경사 하강법을 구현하려면 각 모델 파라미터 $\theta_j$에 대한 비용 함수의 gradient를 계산해야 한다.

즉, $\theta_j$가 조금 변경될 때 비용함수가 얼마나 바뀌는지 계산해야 한다.

$\theta_j$에 대한 비용 함수의 편도함수를 보면

$$
\frac \partial{\partial\theta_j}MSE(\theta) = \frac2m\sum^m_{i=1}(\theta^Tx^{(i)} -y^{(i)})x^{(i)}_j
$$

편미분을 각각 계산하는 대신 gradient 벡터를 사용하면 한꺼번에 계산할 수 있다.

아래 공식은 매 경사 하강법 스텝에서 전체 훈련 세트 $X$에 대해 계산한다.

$$
\nabla_\theta MSE(\theta) = \begin{bmatrix}\frac \partial{\partial\theta_0}MSE(\theta) \\\frac \partial{\partial\theta_1}MSE(\theta) \\\vdots \\ \frac \partial{\partial\theta_n}MSE(\theta) \end{bmatrix} = \frac2mX^T(X\theta -y)
$$

위 식은 전체 훈련 세트를 사용해 gradient를 계산하는 Batch Gradient Descent 기준이다.

선형회귀에서의 경사 하강법 업데이트 식은 다음과 같다.

$$
\theta \leftarrow \theta - \alpha\nabla_\theta MSE(\theta)
$$

위 gradient 식은 전체 훈련 세트를 사용해 gradient를 계산하는 Batch Gradient Descent 기준이다.

실제로는 전체 데이터 대신

- 샘플 1개만 사용하는 SGD
- 작은 batch를 사용하는 Mini-batch GD

를 사용할 수도 있다.

이들은 gradient를 계산할 때 사용하는 데이터 양만 다르며,
자세한 내용은 [GD/SGD/mini-batch GD](https://jhle0-dev.vercel.app/blog/gradient-descent-and-sgd)  파일에서 따로 정리한다.
