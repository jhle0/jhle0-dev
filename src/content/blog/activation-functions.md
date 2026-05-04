---
title: 활성화 함수 (Activation Functions)
description: 신경망에서 활성화 함수가 왜 필요한지와 선형/비선형 활성화 함수의 차이, 그리고 Sigmoid, Softmax,
  ReLU, GELU 등 주요 활성화 함수의 특징과 사용 위치를 정리한 글입니다.
pubDate: 2026-04-23
updatedDate: ""
slug: activation-functions
topic: study
tags:
  - DeepLearning
  - Neural Network
  - Activation Function
  - ReLU
  - Sigmoid
  - Softmax
  - GELU
  - Tanh
draft: false
series: Neural Network
seriesOrder: 3
featured: false
---
## 활성화 함수란

**활성화 함수(Activation Function)** 는 한 층의 선형 결합 결과에 적용되는 함수이다.

신경망에서는 보통 이 함수를 통해 비선형성을 추가한다.

활성화 함수를 거쳐 입력값을 **변환하거나 압축**하는 기능을 한다.

이 값을 해당 층의 출력 또는 **활성화값(activation)** 이라고 한다.

### 왜 필요한가

활성화 함수가 없다면 여러 층을 쌓아도 전체는 **결국 하나의 선형 변환**으로 합쳐진다.

$$
h=W_1x+b_1
$$

$$
y = W_2h + b_2
$$

대입하면

$$
y = W_2(W_1x + b_1) + b_2
$$

$$
y = (W_2W_1)x + (W_2b_1 + b_2) = W'x + b'
$$

따라서 층을 여러 개 쌓는 것만으로는 비선형 문제를 해결할 수 없고, 

활성화 함수를 통해 **비선형성을 추가**해야 한다.

### Linear activation

그러면 Linear activation은 필요 없는 activation인가?

아니다, 아래 경우에 필요하다.

첫번째 경우, **회귀 문제**에서이다.

**회귀 문제에서 마지막 출력값의 범위가 제한되지 않아야 하므로**,

마지막 층에 Linear activation을 사용한다.

두번째 경우, 모델 중간에서도 사용된다.

아이디어는 **노드 수가 줄어드는 레이어**에서는 Linear activation을 사용함으로써

**정보 손실을 막을 수 있다**.

> ReLu같은 non-Linear activation을 보면,
> 
> 
> 양수 입력은 그대로 출력하지만 음수 입력은 0으로 만든다.
> 
> 이로 인해 정보 손실이 일어난다.
> 

정리해보면

- Linear activation
    - 정보 손실을 없앨수 있다. (입력 정보를 보존)
    - 하지만 복잡도는 증가하지 않는다.
- non-Linear activation
    - 복잡도는 증가한다
    - 하지만 정보 손실이 발생할 수 있다.

## 일반적인 활성화 함수

### 선형(Linear)

- 입력을 그대로 출력한다.
- 비선형성을 추가하지 않는다.
- 주로 회귀 문제의 출력층에서 사용한다.

### 시그모이드(Sigmoid)

- S자형 비선형 함수이다.
- 출력값을 0과 1 사이로 압축한다.
- 주로 이진 분류의 출력층에서 사용된다.
- 입력 절댓값이 크면 gradient가 매우 작아질 수 있어 은닉층에서는 잘 사용되지 않는다.

### 소프트맥스(Softmax)

- 여러 클래스의 점수(logit)를 확률처럼 해석할 수 있는 값으로 변환한다.
- 각 클래스 출력값의 합이 1이 되도록 정규화한다.
- 주로 다중 분류의 출력층에서 사용된다.

### ReLU

- $f(x)=max(0,x)$ 인 비선형 함수이다.
- 음수 입력은 0으로 만들고, 양수 입력은 그대로 통과시킨다.
- sigmoid나 tanh보다 gradient 소실 문제가 덜해 은닉층에서 널리 사용된다.
- 계산이 단순하여 학습이 빠른 편이다.

### Leaky ReLU

- 음수 입력에 대해서도 작은 기울기를 남기는 ReLU의 변형이다.
- 보통 음수 구간에서 $αx$ 형태를 사용하며, $α$는 작은 양수이다.
- dead ReLU 문제를 완화하는 데 도움이 될 수 있다.

### GELU

- 입력을 부드럽게 통과시키는 비선형 함수이다.
- ReLU보다 부드러운 activation으로 볼 수 있다.
- Transformer 계열 모델에서 자주 사용된다.

### tanh

- 출력 범위가 -1에서 1인 S자형 비선형 함수이다.
- sigmoid와 달리 출력이 0 중심이어서 은닉층에서 조금 더 유리할 수 있다.
- 하지만 입력 절댓값이 크면 gradient가 작아지는 문제는 여전히 존재한다.

### 언제 무엇을 쓰는가

- **은닉층**
    - 기본적으로 ReLU를 많이 사용한다.
    - 최신 모델, 특히 Transformer 계열에서는 GELU도 자주 사용된다.
    - dead ReLU가 걱정되면 Leaky ReLU를 고려할 수 있다.
- **출력층**
    - 회귀: Linear
    - 이진 분류: Sigmoid
    - 다중 분류: Softmax
