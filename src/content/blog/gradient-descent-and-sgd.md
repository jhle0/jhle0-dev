---
title: 경사 하강법과 SGD (Gradient Descent and SGD)
description: Gradient Descent(GD), Stochastic Gradient Descent(SGD), Mini-batch
  Gradient Descent의 원리와 차이를 정리한 글입니다. gradient 기반 최적화가 어떻게 동작하는지와 학습률, batch
  size, noisy update 등의 핵심 개념도 함께 설명합니다.
pubDate: 2026-03-09
updatedDate: ""
slug: gradient-descent-and-sgd
topic: study
tags:
  - ai-core
  - Gradient Descent
  - SGD
  - Mini Batch Gradient Descent
  - Optimization
draft: false
featured: false
---
## 경사 하강법(Gradient Descent, GD)
경사 하강법은 **손실 함수(loss function)를 최소화하는 방향으로 파라미터를 반복적으로 업데이트하는 최적화 알고리즘**이다.

머신러닝과 딥러닝에서 모델의 파라미터를 학습할 때 가장 기본적으로 사용된다.

### GD 작동방식 :

1. 파라미터를 **임의의 값으로 초기화(random initialization)**
2. 현재 위치에서 **함수가 가장 빠르게 증가하는 방향**을 찾는다 (= **gradient**)
3.  **gradient의 반대 방향**으로 이동
4. 이를 최소점에 도달할 때까지 반복

즉, GD는 현재 위치에서 **손실 함수가 가장 빠르게 감소하는 방향**으로 조금씩 이동하는 방법이다.

→ 이를 통해 닫힌 해를 구하기 어렵거나 파라미터 차원이 큰 경우에도, 반복적으로 손실을 줄이면서 해를 근사적으로 찾을 수 있다.

> [Gradient 의미(Gradient Intuition)](https://jhle0-dev.vercel.app/blog/gradient-intuition) 참고
> 

### 학습률(learning rate)

GD에서 가장 중요한 파라미터는 스텝의 크기(하강하는 정도)이다

이 크기는 **학습률**이라는 하이퍼파라미터로 조절한다.

- learning rate가 **너무 작을 때**
    - 알고리즘이 수렴하기 위해 반복을 많이 해야하므로, **시간이 오래 걸림**
- learning rate가 **너무 클 때**
    - 최솟값 근처에서 **진동(oscillation)하거나 발산**할 수 있다



⇒ 따라서, **적절한 learning rate**를 설정 해야 함

### GD 기본수식

$$
\theta_{t+1} = \theta_t - \alpha \cdot \nabla_\theta J(\theta_t)
$$

- $\theta_t$ : t 번째 반복에서의 파라미터 벡터
- $\theta_{t+1}$ : t+1 번째 반복에서의 업데이트된 파라미터 벡터
- $\alpha$ : 학습률(learning rate) - 이동 스텝 크기 결정
- $\nabla_\theta J(\theta_t)$ : t번째 손실 함수 $J(\theta_t)$의 gradient

## GD의 단점

### 계산 속도가 느리다

기본 GD(full-batch GD)는 **매 반복마다 전체 데이터셋**에 대해 gradient를 계산한다.
따라서 데이터가 매우 크면 한 번의 업데이트 비용이 크고 학습이 느릴 수 있다.

### Local minimum / Saddle point 문제

손실 함수가 비볼록(non-convex)하면 여러 개의 local minimum이나 saddle point가 존재할 수 있다.
이 경우 GD는 초기값에 따라 전역 최솟값(global minimum)이 아닌 다른 지점에 수렴할 수 있다.

- Local minimum: 주변 영역에서는 가장 낮은 영역
- Global minimum: 실제 전체 영역에서 가장 낮은 영역
- saddle point: 어떤 방향으로는 증가하고 다른 방향으로는 감소하는 지점
- plateau: gradient가 매우 작아 학습이 느려지는 평평한 구간



### feature scale에 민감할 수 있다

입력 feature들의 스케일 차이가 크면 손실 함수의 등고선이 길쭉한 타원형이 된다.
이 경우 GD는 가파른 방향으로는 크게 흔들리고, 완만한 방향으로는 조금씩만 이동하여
지그재그 형태로 느리게 수렴할 수 있다.

→ 따라서 GD를 사용할 때는 feature scaling을 해주는 것이 좋다.

## 확률적 경사 하강법(Stochastic Gradient Descent, SGD)

Batch Gradient Descent(Batch GD)의 가장 큰 문제는 매 스텝마다 **전체 훈련 세트**를 사용해 gradient를 계산한다는 점이다.

이 방법은 훈련 세트가 커지면 매우 느려진다.

SGD는 매 스텝에서 **‘한 개의 샘플’을 랜덤**(stochastic)하게 선택하고,

그 하나의 샘플에 대해 gradient를 계산한다.

→ 매 반복에서 다뤄야 할 데이터가 매우 적기 때문에 GD보다 훨씬 빠르다.

### SGD의 특징

SGD는 Batch GD보다 gradient 추정의 분산이 크기 때문에 업데이트 경로가 더 **noisy**하다.

그래서 학습 과정에서 손실은 매 step마다 매끄럽게 감소하기보다, 최솟값 근처에서도 **요동치며 내려가는 경향**이 있다.

> 
> 
> 
> 이는 SGD가 전체 데이터에 대한 정확한 gradient 대신,
> 하나의 샘플에서 계산한 noisy한 gradient 추정값을 사용하기 때문이다.
> 따라서 업데이트 방향이 매 step마다 흔들릴 수 있다.
> 

시간이 지나면 최솟값에 근접하겠지만, 계속 요동쳐 최솟값에 안착하지는 못한다.

→ 이를 해결하기 위해 학습 스케줄(learning schedule)을 조절해 **학습률(learning rate)을 점진적으로 감소**시키는 방법을 사용한다.

보통은 학습 초반에 비교적 큰 learning rate를 사용해 빠르게 탐색하고,
후반으로 갈수록 learning rate를 줄여 진동을 완화하고 더 안정적으로 수렴하도록 만든다.

또한 SGD의 노이즈는 local minimum이나 saddle point, plateau 같은 지형에서 **벗어나는 데 도움**이 될 수 있지만, **전역 최적해를 보장하지는 않는다**.

## 미니배치 경사 하강법(mini-batch GD)

SGD는 단 하나의 데이터만 고려하므로 지나치게 편향된 업데이트를 초래할 수 있다.

Mini-batch GD는 한 번의 업데이트마다 **작은 크기의 샘플 묶음(batch)**에 대해 gradient를 계산한다.

Batch size를 1로 하면 SGD이고

크기를 키울수록 GD에 가까워진다.

Mini-batch GD는 SGD보다 gradient 추정의 분산이 작아 업데이트가 더 안정적이고, Batch GD보다 한 번의 계산 비용이 작아 실용적이다.

또한 GPU 병렬 연산에 잘 맞기 때문에 딥러닝에서 가장 널리 사용된다.

batch size를 선택할 때는 학습 속도, 메모리 사용량, 최적화 안정성 사이의 trade-off를 고려해야 한다.

- batch size가 너무 작으면 SGD처럼 noisy해질 수 있고
- 너무 크면 Batch GD에 가까워져 업데이트 빈도가 줄고 메모리 사용량이 커진다

### GD, SGD, mini-batch GD

각각의 방법들은 Loss 함수 계산에 포함되는 **데이터의 양에 따라** 각 방법이 구분된다.

- **Batch GD**: 전체 훈련 세트 사용
- **SGD**: 샘플 1개 사용
- **Mini-batch GD**: 작은 batch 사용

→ 이 방법들은 기본적으로 **‘현재 시점의 gradient’만** 을 고려한다.

이를 더 발전시킨 방법으로

Momentum, RMSProp, Adam 이 있다.

이 알고리즘들은 **과거의 gradient 정보를 활용**하여 더 효과적인 학습을 수행한다.
