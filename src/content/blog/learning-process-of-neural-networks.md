---
title: 신경망의 학습 과정(Learning Process of Neural Networks)
description: |-
  신경망이 입력을 받아 예측을 만들고, 손실 계산·역전파·파라미터 업데이트를 통해 점진적으로 학습하는 과정을 정리한 글입니다.
  순전파, 역전파, gradient, 공통 오차항 δ, 파라미터 업데이트의 흐름을 수식과 함께 설명하는 글입니다.
pubDate: 2026-04-28
updatedDate: ""
slug: learning-process-of-neural-networks
topic: study
tags:
  - Deep Learning
  - Neural Network
  - Forward Propagation
  - Backpropagation
draft: false
heroImage: ""
series: Neural Network
featured: false
---
## 학습 과정이란

신경망 학습은 **입력을 받아 예측을 만들고, 그 예측이 정답과 얼마나 다른지 측정한 뒤, 그 차이를 줄이도록 파라미터를 반복적으로 수정하는 과정**이다.

신경망이 학습하는 대상은 각 층의 **가중치(weight)** 와 **편향(bias)** 이며, 이를 합쳐 **파라미터(parameters)** 라고 한다.

학습의 전체 흐름은 다음과 같다.

$$
\text{입력} \rightarrow \text{순전파} \rightarrow \text{손실 계산} \rightarrow \text{역전파} \rightarrow \text{업데이트}
$$

즉, 신경망은 처음부터 정답을 아는 것이 아니라,

예측을 해보고, 틀린 정도를 측정하고, 그 틀린 방향을 바탕으로 파라미터를 조금씩 수정하면서 점점 더 나은 모델이 된다.

## 순전파

**순전파(Forward Propagation)** 는 입력이 신경망의 앞에서 뒤로 흐르며 최종 출력을 만드는 과정이다.

각 층에서는 보통 다음 계산이 일어난다.

### 1. 아핀 변환

$$
z = Wx + b
$$

### 2. 활성화 함수 적용

$$
a = \phi(z)
$$

- x: 입력
- W: 가중치
- b: 편향
- z: 선형 결합 결과
- $\phi$: 활성화 함수
- a: 해당 층의 출력

이걸 그림으로 나타내면 다음과 같다

![NeuralNetwork_example.png]

신경망을 수식으로 보면,

$$
z^{[1]} = W^{[1]}x + b^{[1]}
$$

$$
a^{[1]} = f(z^{[1]})
$$

$$
z^{[2]} = W^{[2]}a^{[1]} + b^{[2]}
$$

$$
a^{[2]} = g(z^{[2]})
$$

$$
\hat{y} = a^{[2]}
$$

순전파는 **입력에서 출력으로 값이 전달되는 계산 과정** 이며,

학습의 첫 단계이다.

## 역전파(backpropagation)

**역전파(backpropagation)** 는 손실이 각 파라미터에 대해 얼마나 민감한지

즉, 각 파라미터의 gradient를 **출력층에서 입력층 방향으로 거꾸로 계산하는 방법**이다.

순전파가 값이 앞에서 뒤로 흐르는 과정이라면,

역전파는 손실에 대한 gradient가 뒤에서 앞으로 흐르는 과정이다.

신경망은 손실을 줄이기 위해 각 파라미터를 얼마나 바꿔야 하는지 알아야 한다.

이때 필요한 값이

$$
\frac{\partial L}{\partial W}, \quad \frac{\partial L}{\partial b}
$$

같은 gradient이다.

각 weight와 bias는 여러 층의 계산을 거쳐 최종 손실 $L$ 에 영향을 준다.

→ 따라서 이 영향을 계산하기 위해 연쇄 법칙(chain rule)을 사용한다.

### $w_2$에 대한 편미분

$w_2$가 비용함수에 대한 관계를 보면

→ $w_2$의 변화는 $z_2$를 변화시키고,

→ 이는 $a_2$를 바꾸어 비용함수 $L$에 영향을 준다.

즉 , $W2→z2→a2→L$

따라서 연쇄법칙으로 쓰면

$$
\frac{\partial L}{\partial W_2}=\frac{\partial L}{\partial a_2}\cdot\frac{\partial a_2}{\partial z_2}\cdot\frac{\partial z_2}{\partial W_2}
$$

여기서

$$
a_2 = g(z_2)
$$

이므로

$$
\frac{\partial a_2}{\partial z_2} = g'(z_2)
$$

또

$$
z_2 = W_2 a_1 + b_2
$$

이므로

$$
\frac{\partial z_2}{\partial W_2} = a_1
$$

따라서

$$
\frac{\partial L}{\partial W_2}=\frac{\partial L}{ \partial a_2}\cdot g'(z_2 )\cdot a_1^T
$$

로 쓸 수 있다.

보통 중간항을

$$
\delta_2 = \frac{\partial L}{\partial z_2}=\frac{\partial L}{\partial a_2} \odot g'(z_2)
$$

라고 두면

$$
\frac{\partial L}{\partial W_2} = \delta_2 a_1^T
$$

가 된다.

### $w_1$에 대한 편미분

$w_1$으로 L을 만드는 과정을 보면

$W_1 \rightarrow z_1 \rightarrow a_1 \rightarrow z_2 \rightarrow a_2 \rightarrow L$ 이다.

따라서 연쇄법칙으로 전개하면

$$
\frac{\partial L}{\partial W_1}=\frac{\partial L}{\partial a_2}\cdot \frac{\partial a_2}{\partial z_2} \cdot \frac{\partial z_2}{\partial a_1} \cdot \frac{\partial a_1}{\partial z_1} \cdot \frac{\partial z_1}{\partial W_1}
$$

위와 같이 계산해보면,

$$
\frac{\partial L}{\partial W_1}=\frac{\partial L}{\partial a_2}\cdot g'(z_2)\cdot W_2\cdot f'(z_1)\cdot x^T
$$

보통은 이것도 $\delta$ 로 정리한다.

먼저 출력층 오차를

$$
\delta_2=\frac{\partial L}{\partial z_2}=\frac{\partial L}{\partial a_2} \odot g'(z_2)
$$

라고 두고,

은닉층 오차를

$$
\delta_1=\frac{\partial L}{\partial z_1}=(W_2^T \delta_2) \odot f'(z_1)
$$

라고 두면,

$$
\frac{\partial L}{\partial W_1}=\delta_1 x^T
$$

가 된다.

### bias의 편미분 값

편향(bias)들에 대해서도 편미분 값을 계산해보면,

$$
\frac{\partial L}{\partial b_2} = \delta_2
$$

$$
\frac{\partial L}{\partial b_1} = \delta_1
$$

## $w_2$와 $w_1$ 의 공통항

각 가중치의 두 식을 비교해보자

### $\frac{\partial L}{\partial W_2}$

$$
\frac{\partial L}{\partial W_2}=\underbrace{\frac{\partial L}{\partial a_2}\cdot g'(z_2)}_{공통 항}\cdot a_1^T
$$

### $\frac{\partial L}{\partial W_1}$

$$
\frac{\partial L}{\partial W_1}=\underbrace{\frac{\partial L}{\partial a_2}\cdot g'(z_2)}_{같은 공통 항}\cdot W_2\cdot f'(z_1)\cdot x^T
$$

여기서 둘 다 공통으로 들어가는 부분이 있다.

이걸 보통

$$
\delta_2 = \frac{\partial L}{\partial z_2}
$$

라고 둔다.

그러면

$$
\delta_2=\frac{\partial L}{\partial a_2}\odot g'(z_2)
$$

이다.

그럼 식이 훨씬 간단해진다.

$$
\frac{\partial L}{\partial W_2} = \delta_2 a_1^T
$$

$$
\frac{\partial L}{\partial W_1}=(W_2^T\delta_2)\odot f'(z_1)\; x^T
$$

즉,

$W_1$의 gradient를 구할 때 $W_2$에서 이미 계산한 공통 오차항  
$\delta_2$를 재사용한다.

이게 **역전파의 핵심**이다.

정리해보면,

각 층의 가중치에 대한 gradient는 손실에서 해당 가중치까지 이어지는 경로의 미분들을 곱해서 계산된다.

이때 앞쪽 층의 gradient일수록 뒤쪽 층에서 이미 등장한 미분 항들을 모두 포함한다.

즉, $\frac{\partial L}{\partial W_1}$ 은 $\frac{\partial L}{\partial W_2}$ 계산에 쓰인 뒤쪽 항을 포함한 더 긴 곱으로 이루어진다.

따라서 각 가중치의 gradient를 독립적으로 처음부터 계산하는 것은 비효율적이다.

역전파는 출력층에서부터 gradient를 계산하고, 그 공통 항을 앞쪽 층으로 전달하며 재사용함으로써 전체 gradient를 효율적으로 구한다.

더 깊은 층의 앞쪽으로 갈수록 gradient에는 뒤쪽 activation 미분과 weight가 계속 추가로 곱해진다.

즉, 출력층에 가까운 가중치의 gradient보다 입력층에 가까운 가중치의 gradient가 더 긴 곱 형태를 가진다.

이 때문에 DNN에서는 1보다 작은 activation 미분과 weight의 반복 곱으로 인해 gradient 소실 또는 폭주가 발생할 수 있다.

## 파라미터 업데이트

역전파를 통해 각 파라미터에 대한 gradient를 계산했다면,

이제 그 값을 이용해 실제로 파라미터를 수정해야 한다.

이 과정을 **파라미터 업데이트(parameter update)** 라고 한다.

신경망 학습의 목적은 손실 함수 L 을 줄이는 것이므로,

각 파라미터는 손실이 가장 빠르게 증가하는 방향의 **반대 방향**으로 이동해야 한다.

가장 기본적인 업데이트 식은 다음과 같다.

$$
\theta \leftarrow \theta - \eta \nabla_{\theta} L
$$

- $\theta$: 모델의 파라미터
- $\eta$: 학습률(learning rate)
- $\nabla_{\theta} L$: 파라미터 $\theta$ 에 대한 손실의 gradient

하지만 실제로는 이 단순한 방식만 사용하는 것이 아니라,

gradient를 더 안정적이고 효율적으로 활용하기 위한 다양한 **최적화 방법(optimization methods)** 을 사용한다.
