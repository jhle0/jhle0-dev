---
title: L1 / L2 / Weight Decay 정규화
description: |-
  L1 Regularization, L2 Regularization, Weight Decay의 개념과 차이를 정리한 글입니다.
  모델의 과적합을 줄이고 가중치 크기를 제어하는 정규화 방법을 설명합니다.
pubDate: 2026-05-10
updatedDate: ""
slug: l1-l2-weight-decay-regularization
topic: study
tags:
  - Deep Learning
  - ai-core
  - Regularization
  - L1 Regularization
  - L2 Regularization
  - Weight Decay
draft: false
featured: false
---
정규화는 모델이 훈련 데이터에 **과하게 맞춰지는 overfitting**을 막기 위해 

모델의 복잡도를 제한하는 방법이다.

핵심 아이디어는 :

- 훈련 데이터 loss만 줄이는 것이 아니라
- **너무 크거나 복잡한 파라미터를 가진 모델에 벌점(penalty)**을 주어서
- 더 단순하고 일반화가 잘되는 해를 선호하게 만드는 것이다.

## L1 Regularizaition

### 정의

L1 regularization은 모델 파라미터의 절댓값 합에 비례하는 패널티를 loss에 더하는 방법이다.

$$
L_{total} = L_{data} + \lambda \|w\|_1
$$

- $L_{data}$ : 원래의 데이터 loss
- $\lambda$ : regularization strength
- $\|w\|_1 = \sum_i |w|_i$

즉, 가중치들의 절댓값이 클수록 비용이 커진다.

### 직관

L1은 **불필요한 가중치를 아예 0으로 보내려는 성향**이 강하다.

왜냐하면 절댓값 패널티는 작은 값들을 0으로 밀어 붙이는 효과가 있기 때문이다.

따라서 L1을 쓰면 모델이 :

- 중요한 feature만 남기고
- 덜 중요한 feature는 아예 제거하는 방향으로 간다

### L1 regularization의 특징

1. **희소성(sparsity)을 만든다**
    
    L1 regularization은 많은 가중치를 정확히 0으로 만들 수 있다.
    
    즉, feature selection과 비슷한 효과를 낸다.
    
2. **해석이 쉬워진다**
    
    어떤 feature가 실제로 살아남았는지 보기 쉽다.
    
3. **최적화가 L2보다 덜 부드럽다**
    
    절댓값은 0에서 미분이 매끄럽지 않기 때문에 
    
    최적화 관점에서는 L2보다 다루기 까다롭다.
    

## L2 regularization

### 정의

L2 regularization은 모델 파라미터의 제곱합에 비례하는 패널티를 loss에 더하는 방법이다.

$$
L_{total} = L_{data} + \frac \lambda 2 \| w \|_2^2
$$

여기서

$$
\|w\|^2_2 = \sum_i w_i^2
$$

- $\frac \lambda 2$는 미분하기 쉽게 붙인다.

### 직관

L2 regularization는 큰 가중치에 더 큰 벌점을 주기 때문에

가중치를 전체적으로 작게 유지하려는 방향으로 학습을 유도한다.

즉,

- L1처럼 몇 개를 딱 0으로 만들기보다는
- 전체 가중치를 부드럽게 줄이는 성향이 강하다.

### L2 regularization 특징

1. **큰 가중치를 억제한다**
    
    특정 가중치가 너무 커지는 것을 막는다.
    
2. **학습이 더 안정적이다**
    
    수학적으로 매끄럽도 미분이 쉬워서 
    
    실전에서 자주 사용된다.
    
3. **보통 가중치를 0으로 만들지는 않는다**
    
    L1처럼 sparse한 해를 만들기보다는
    
    작지만 0은 아닌 값들로 남는 경우가 많다.
    

## L1과 L2의 차이

### L1 regularization

- 절댓값 합 패널티
- 일부 가중치를 0으로 만들기 쉬움
- sparse한 모델을 만듦

### L2 regularization

- 제곱합 패널티
- 큰 가중치를 부드럽게 줄임
- 전체적으로 작은 가중치를 가진 모델을 만듦

## Weight Decay

### 정의

Weight decay는 학습 과정에서

각 step마다 **가중치를 조금씩 줄이는(shrink)** 방식이다.

원래 gradient descent 업데이트를 보면

$$
w \leftarrow w - \eta \frac{\partial L_{\text{data}}}{\partial w}
$$

여기에 weight decay를 넣으면 :

$$
w \leftarrow (1-\eta \lambda)w - \eta \frac{\partial L_{\text{data}}}{\partial w}
$$

즉, gradient에 의한 업데이트를 하기 전에 또는 동시에

현재 가중치를 조금 줄인다.

### 직관

매 step마다

“가중치가 너무 커지지 않도록 조금씩 원점쪽으로 당기는 힘”을 주는 것이다

그래서 weight decat도 본질적으로는

**가중치 크기를 중이려는 regularization이**다.
