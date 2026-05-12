---
title: 신경망의 문제와 해결 방법 - 기울기 소실 (Problems in Neural Networks & Solutions -
  Vanishing Gradient)
description: 깊은 신경망에서 발생하는 기울기 소실 문제와 그 원인, 그리고 Xavier/He 초기화, ReLU 계열 활성화 함수,
  Batch Normalization, Layer Normalization 등의 해결 방법을 정리한 글입니다.
pubDate: 2026-05-10
updatedDate: ""
slug: neural-network-vanishing-gradient-and-solutions
topic: study
tags:
  - Deep Learning
  - Neural Network
  - Vanishing Gradient
  - Batch Normalization
  - Layer Normalization
draft: false
series: Neural Network
seriesOrder: 6
featured: false
---
깊은 신경망을 사용함으로써 더 복잡한 함수를 표현할 수 있다.

하지만 이에 따른 문제들이 발생한다

대표적으로 2가지가 있다.

- 기울기 소실(Vanishing Gradient)
- 과적합(Overfitting)

## 기울기 소실(Vanishing Gradient)

기울기 소실이란 **입력층에 가까운 레이어**일수록 파라미터들에 대한 **gradient값이 거의 0에 가까워져**,

학습이 제대로 이루어지지 않는 현상이다.

역전파 과정을 보면, 

파라미터의 gradient가 입력틍 쪽으로 갈수록

**activation 함수의 미분**이 계속 곱해지는 것을 볼 수 있다.

이때, activation 함수로 sigmoid를 사용했을 때

sigmoid 함수의 미분값의 최대는 입력이 0일때인 $\frac 14$이다.

이 값이 여러번 곱해진다면 **전체 값은 0으로 수렴**하게 된다.

그로 인해 입력에 가까운 층들은 업데이트가 잘 되지 않게 된다.

weight 들은 처음에 랜덤한 값으로 초기화되기 때문에,

**거의 업데이트되지 않아** 학습이 제대로 진행되지 않는다.

또한, 제대로 학습하지 못해 **과소적합(underfitting)**이 발생할 수 있다.

이를 **해결하기 위한 방법**으로

- 적절한 가중치 초기화(Xavier, He)
- ReLU 계열 활성화 함수
- 배치 정규화(Batch Normalization)
- 레이어 정규화(Layer Normalization)

## 적절한 weight 초기화 방법

sigmoid 함수를 사용했을 때,

출력의 분산이 입력의 분산보다 커져

깊은 층으로 살수록 활성화 함수가 0이나 1로 수렴하게 된다.

그로 인해 기울기가 0에 매우 가까워져 기울기 소실 문제가 발생한다.

따라서, 각 층의 출력과 입력에 대한 분산이 같게 해줘야 한다.

또한 역전파 과정에서 layer을 통과하기 전과 후의 gradient의 분산도 같게 해줘야 한다.

이를 위해, 활성화 함수 별로 weight 초기화 방법을 달리 한다.

| Xavier | 활성화 함수 없음, tanh, sigmoid | $\frac1{fan_{avg}}$ |
| --- | --- | --- |
| He | ReLU, LeakyReLU, ELU, GELU, Swish, Mish | $\frac2{fan_{in}}$ |
| LeCun | SELU | $\frac1{fan_{in}}$ |

이러한 다양한 초기화 방법들로

신경망의 깊이가 깊어져도 안정적으로 학습되도록 도와준다.

> 초기화 방법 정리 <링크>
> 

## ReLU 계열 활성화 함수

기울기 소실의 직접적인 원인은 활성화 함수에 있다.

sigmoid 함수의 최대 기울기가 1/4이어서 곱해질수록 0으로 수렴하기 때문이다.

이를 해결하기 위해 다양한 ReLU 계열의 활성화 함수들이 제안되었다.

ReLU 함수는 입력이 양수일 때는 그대로, 음수일 때는 0을 출력하는 함수이다.

이로 인해, 활성화 함수의 미분값은 0 또는 1이 된다.

미분값이 0이되어 몇몇 뉴런은 죽게 되지만,

살아있는 뉴런으로는 gradient가 유지되므로 

역전파 과정에서 gradient가 점점 작아지는 현상은 효과적으로 방지할 수 있게 된다.

몇몇 뉴런이 죽는 현상을 방지하기 위해,

다양한 ReLU 함수를 변형한 활성화 함수들이 있다.
> 
> 
> 
> 더 자세한 ReLU 계열 활성화 함수 설명
> 
> [https://www.notion.so/ReLU-ReLU-Variants-35cb7af373cb80b48693ee97327dfe25](https://www.notion.so/ReLU-ReLU-Variants-35cb7af373cb80b48693ee97327dfe25?pvs=21)
>

이런 다양한 활성화 함수를 통해 기울기 소실 문제를 방지할 수 있다.

## 배치 정규화(Batch normalization)

기울기 소실 문제를 해결하는 다른 방법으로,

배치 정규화(Batch Normalization)가 있다.

배치 정규화는 각 층의 활성화값(activation)이 너무 크거나 작게 치우치지 않도록 분포를 안정화하는 방법이다.

구체적으로는, **같은 feature(열)에 대해 batch 전체**의 평균과 분산을 계산한 뒤, 데이터 분포가 평균이 0, 분산이 1이 되도록 정규화한다.

수식으로 보면

$$
\mu_B \leftarrow \frac1m \sum_{i=1}^mx_i
$$

$$
\sigma^2_B \leftarrow \frac1m \sum_{i=1}^m(x_i - \mu_B)^2
$$

$$
\hat x_i \leftarrow \frac{x_i - \mu_B}{\sqrt{\sigma_B^2 + \epsilon}}
$$

미니배치 $B = \{x_1, x_2, ... x_m\}$이라는 m개의 입력 데이터의 집합에 대하여

평균 $\mu_B$와 분산 $\sigma^2_B$를 구한다.

그 다음 입력 데이터의 평균이 0, 분산이 1이 되도록 정규화 한다.

따라서 입력 데이터 $\{x_1, x_2, ... x_m\}$을

정규화된 $\{\hat x_1,\hat x_2, ...\hat x_m\}$으로 변환한다.

이 처리를 활성화 함수의 앞(or 뒤)에 삽입해 데이터 분포가 덜 치우치도록 도와준다.

또한, 배치 정규화 계층마다 이 정규화된 데이터에

고유한 확대(scale)와 이동(shift) 변환을 수행한다.

$$
y_i \leftarrow \gamma \hat x_i + \beta
$$

$\gamma$가 확대를, $\beta$가 이동을 담당한다.

두 값은 $\gamma = 1, \beta = 0$으로 시작해 학습해가면서 적합한 값으로 조정한다.

배치 정규화의 이점으로는

- 학습 안정화
- gradient 흐름 개선
- 더 큰 learning rate 사용 가능
- 약간의 regularization 효과

가 있다.

## 레이어 정규화(Layer Normalization)

배치 정규화(Batch Normalization)는 batch 단위로 평균과 분산을 계산한다.

하지만 이는:

- batch size가 매우 작은 경우
- sequence 길이가 중요한 RNN/Transformer 구조

에서는 성능이 불안정할 수 있다.

이를 해결하기 위해 제안된 방법이 레이어 정규화(Layer Normalization)이다.

레이어 정규화는 batch 전체가 아니라,

하나의 데이터 **내부 feature들**에 대해 정규화를 수행한다.

즉, Layer Normalization은 하나의 sample(행) 내부 feature들의 평균과 분산을 계산해 정규화한다.

수식으로 보면,

입력 벡터 $x = (x_1, x_2, ..., x_H)$에 대해

평균:

$$
\mu = \frac1H \sum_{i=1}^H x_i
$$

분산:

$$
\sigma^2 = \frac1H \sum_{i=1}^H (x_i - \mu)^2
$$

를 계산한다.

그 다음 정규화를 수행한다.

$$
\hat x_i = \frac{x_i - \mu}{\sqrt{\sigma^2 + \epsilon}}
$$

이후 Batch Normalization과 마찬가지로

확대(scale)와 이동(shift)을 수행한다.

$$
y_i = \gamma \hat x_i + \beta
$$

Layer Normalization의 특징은:

- batch size에 영향을 받지 않음
- sequence 데이터에 안정적
- Transformer에서 매우 중요하게 사용됨

등이 있다.

특히 Transformer에서는 Batch Normalization 대신

거의 항상 Layer Normalization을 사용한다.
