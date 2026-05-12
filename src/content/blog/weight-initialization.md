---
title: 가중치 초기화 기법 (Weight Initialization)
description: >-
  신경망 학습에서 가중치 초기화가 중요한 이유와 Zero Initialization, Random Initialization의 문제를 정리한
  글입니다.

  Fan-in/Fan-out 개념을 바탕으로 LeCun, He, Xavier 초기화 기법의 차이를 설명합니다.
pubDate: 2026-05-12
updatedDate: ""
slug: weight-initialization
topic: study
tags:
  - Deep Learning
  - ai-core
  - Weight Initialization
  - LeCun
  - He
  - Xavier
draft: false
featured: false
---
NN 학습에서 중요한 것 중 하나가 weight initialization이다.

weight 값을 어떻게 설정하느냐에 따라 학습 효율과 최종 성능이 크게 달라지게 된다.

적절히 초기화되지 않으면,

gradient 소실/폭발, 학습 속도 저하, saddle point 주변 정체 등의 문제가 발생할 수 있다

### Zero Initialization

가장 단순하게 모든 weight를 0으로 초기화할 수 있다.

하지만 이는 큰 문제점이 있다.

모든 weight가 0으로 같다면 같은 layer 안의 뉴런들이 모두 같은 출력을 만들고, 역전파 과정에서도 같은 gradient를 받는다. 따라서 업데이트 후에도 같은 값을 유지하게 된다.

결과적으로 여러 뉴런을 만들어도 서로 다른 특징을 학습하지 못한다.

이를 **대칭성 문제(Symmetry Problem)** 라고 한다.

→ 따라서, weight를 무작위로 설정해야 한다.

### 너무 큰/작은 Random Initialization

weight를 같은 값으로 초기화 하면 위와 같은 문제가 발생해,

랜덤하게 설정해야 한다 했다.

근데 또 너무 크거나 작은 값으로 랜덤하게 초기화하게 되면

예를 들어 다음처럼 매우 작은 값으로 초기화한다고 하자.

$$
W \sim \mathcal{N}(0, 0.01^2)
$$

이 방식은 대칭성 문제는 해결한다.

하지만 너무 작은 값이어서 layer를 지날수록 activation 값이 매우 작아지게 된다.

또한 역전파 과정에서도 gradient가 매우 작아져 학습이 제대로 이루어지지 않게 된다.

너무 큰 weight로 초기화해도 문제가 발생한다.

sigmoid나 tanh를 사용하는 경우 pre-activation 값이 너무 커지거나 작아져 activation이 포화되고, gradient가 매우 작아질 수 있다. 이를 **saturation**이라고 한다.

반면 ReLU 계열에서는 양수 영역에서 saturation이 발생하지는 않지만, activation과 gradient의 크기가 layer를 지나며 커져 exploding gradient 문제가 생길 수 있다.

## Fan-in과 Fan-out

가중치 초기화 방법을 이해하려면 **fan-in**과 **fan-out**을 알아야 한다.

fan-in은 한 뉴런으로 들어오는 입력의 개수이다.

즉, 이전 layer의 뉴런 수이다.

$$
\text{fan\_in} = n_{\text{in}}
$$

**fan-out**은 한 layer의 출력 뉴런 개수이다.

즉, 다음 layer로 나가는 출력의 개수이다.

$$
\text{fan\_out} = n_{\text{out}}
$$

### Fan-in과 Fan-out을 고려하는 이유

좋은 초기화의 핵심은 layer를 지날 때 값의 **분산이 너무 커지거나 작아지지 않게** 하는 것이다.

**순전파 과정**

입력 벡터 x의 분산이 $\sigma_x^2$이고, $y = Wx$를 거치면

출력 y의 분산은

$$
Var[z] \approx N_{in}\cdot \sigma_w^2\cdot \sigma_x^2
$$

이다.

여기서 layer를 지나도 x와 y의 분산이 유지되려면

$$
\text{Var}(z) \approx \text{Var}(x)
$$

이어야 한다.

따라서,

$$
N_{in}\cdot \sigma_w^2 \approx 1
$$

즉, 

$$
\sigma_w^2 \approx  \frac1{N_{in}}
$$

이어야 한다.

weitht를 $N_{in}$을 고려해 초기화 하는게 기본 아이디어이다.

## LeCun, He, Xavier

이 방법들은 공통적으로 weight를 평균이 0인 랜덤한 값으로 초기화한다.

분산을 정하는 방식은 각각 다르다.

### LeCun Initialization

LeCun 초기화는 fan-in 기준으로 분산을 설정한다.

$$
W \sim \mathcal{N}\left(0,\frac{1}{N_{in}}\right)
$$

$$
W \sim U\left(-\sqrt{\frac{3}{N_{in}}},\sqrt{\frac{3}{N_{in}}}\right)
$$

평균은 0, 분산은 $\frac 1 {N_{in}}$로 초기화한다.

- 주로 SELU와 같은 self-normalizing 활성화 함수에 최적이다.

### He(kaiming) Initialization

**He Initialization**은 **ReLU 계열 activation**을 사용할 때 자주 쓰이는 초기화 방법이다.

$$
W \sim \mathcal{N}\left(0,\frac{2}{N_{in}}\right)
$$

$$
W \sim U\left(-\sqrt{\frac{6}{N_{in}}},\sqrt{\frac{6}{N_{in}}}\right)
$$

ReLU 함수에서

입력이 대칭적으로 분포한다고 하면, ReLU를 통과할 때 대략 절반 정도의 값이 0이 된다.

따라서 activation의 분산이 줄어드는 효과가 생긴다.

이를 보정하기 위해 He 초기화는 Lecun보다 2배 더 큰 분산을 사용한다.

→ 즉, He 초기화는 ReLU 계열에서 **줄어드는 분산을 보상하기 위해** 더 큰 초기 weight를 사용한다.

### Xavier(Glorot) Initialization

**Xavier Initialization** 또는 **Glorot Initialization**은 sigmoid나 tanh 같은 activation function을 사용할 때 자주 쓰이는 초기화 방법이다.

핵심 아이디어는 forward propagation과 backward propagation에서 값의 분산을 적절히 유지하는 것이다.

Xavier 초기화는 fan-in과 fan-out을 모두 고려한다

$$
W \sim \mathcal{N}\left(0,\frac{2}{N_{in}+N_{out}}\right)
$$

$$
W \sim U\left(-\sqrt{\frac{6}{N_{in}+N_{out}}},\sqrt{\frac{6}{N_{in}+N_{out}}}\right)
$$

Xavier 초기화는 다른 초기화 기법들과 다르게 $N_{out}$도 고려한다.

왜냐하면 역전파 과정을 보면,

$Var[\delta_p]$가 $N_{out}$배 만큼 커진다.

따라서, 역전파 과정에서도 분산이 커지는 것을 막기위해 $N_{out}$도 고려해준다.

또한 Xavier는 다른 초기화 기법들에 비해 작은 분산으로, 0에 더 가깝게 초기화한다.

따라서, sigmoid나 tanh처럼 포화 구간을 가지는 activation에서 자주 사용된다. 특히 tanh는 출력이 0을 중심으로 분포하기 때문에 Xavier 초기화와 잘 맞는다.

## Bias 초기화

Weight는 random하게 초기화하지만, bias는 보통 0으로 초기화해도 된다.

왜냐하면 symmetry 문제는 주로 같은 layer의 weight들이 모두 같은 값일 때 발생한다.

weight가 random하게 초기화되어 있으면, bias가 모두 0이어도 각 뉴런의 출력은 달라질 수 있다.

따라서 일반적으로 bias는 0으로 초기화해도 문제가 없다.

다만 일부 경우에는 bias를 작은 양수로 초기화하기도 한다.

예를 들어 ReLU에서 초기에 너무 많은 뉴런이 꺼지는 것을 막기 위해 bias를 작은 양수로 둘 수 있다.
