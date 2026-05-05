---
title: 신경망 최적화 방법 (Neural Network Optimization Method)
description: >-
  SGD의 한계에서 출발해 Momentum, NAG, AdaGrad, RMSProp, Adam, AdamW의 핵심 아이디어와 수식을 정리한
  글입니다.

  각 optimizer가 gradient를 어떻게 활용하고 학습 경로를 어떻게 개선하는지 설명합니다.
pubDate: 2026-05-05
updatedDate: ""
slug: neural-network-optimization-methods
topic: study
tags:
  - Deep Learning
  - Optimization
  - SGD
  - Momentum
  - Adam
  - AdamW
draft: false
series: Neural Network
seriesOrder: 5
featured: false
---
신경망 학습의 목표는 Loss 함수의 값을 가능한 한 낮추는 parameter 를 찾는 것이다.

이러한, 매개변수의 최적값을 찾는 문제를 푸는 것을

⇒ **최적화(optimization)** 이라고 한다

parameter 공간은 매우 넓고 복잡해서 최적화하는 것은 매우 어려운 문제이다.

GD와 SGD같은 방법을 사용해 적절한 parameter을 구할 수 있다.

> GD, SGD 정리 링크
> 

하지만, 위의 방법들의 단점도 존재해 다른 최적화 방법들을 정리해보려 한다.

## GD, SGD의 단점

예를 들어 아래 함수의 최솟값을 구하는 문제를 보자.

$$
f(x, y) = \frac1 {20}x^2 + y^2
$$

![neural-network-optimization-methods-1](/images/uploads/neural-network-optimization-methods-1.png)

![neural-network-optimization-methods-2](/images/uploads/neural-network-optimization-methods-2.png)

이 함수의 등고선은 x축 방향으로 쭉 늘린 **타원형 모양**이 된다.

함수의 기울기를 보면

y 축 방향은 크고, x축 방향은 작은 특징이 있다.

여기서 문제는 기울기 대부분이 (0,0) 인 최저점 방향을 가리키지 않는다는 것이다.

따라서, SGD에 의해 최적화를 진행해보면 **최저점까지 지그재그로 이동**하게 되어 매우 비효율적이다.

또한, 딥러닝의 손실 함수는 고차원 비볼록 함수이다.

따라서 단순한 최적점뿐 아니라 saddle point나 plateau가 자주 등장한다.

- saddle point : 어떤 방향에서는 최소점처럼 보이고, 다른 방향에서는 최대점처럼 보이는 지점
- plateau : gradient가 매우 작아 학습이 거의 진행되지 않는 평평한 영역

이런 곳에서는 gradient가 작아져 SGD의 업데이트가 매우 느려질 수 있다.

정리해보면

SGD의 단점은 비등방성(anisotropy)함수에서 탐색 경로가 비효울적이라는 것이다.

> 비등방성(anisotropy): 방향에 따라 함수의 곡률이나 gradient의 크기가 다르게 나타나는 성질
> 

이런 단점을 개선해주는 

momentum, AdaGrad, RMSProp, Adam, AdamW 같은 방법들이 있다.

## 모멘텀(Momentum)

볼링공이 경사를 따라 굴러간다고 해보자.

처음에는 느리게 출발하지만 점점 가속될 것이다.

이것이 Boris Polyak가 1964년에 제안한 momentum 최적화의 핵심원리다.

SGD에서는 경사가 완만할 때는 작게, 가파를 때는 크게 이동한다.

하지만 **속도가 높아지지는 않는다.**

모멘텀 방법에서는 ‘관성’을 이용해

이전 업데이트 방향을 누적하여 학습하는 방법을 사용한다.

즉, 이전에 **계속 이동하던 방향은 더 강하게 밀고**, **자주 바뀌는 방향의 진동은 줄인다**.

따라서 표준적인 경사 하강법보다 최저점에 도달하는 데 일반적으로 훨씬 빠르다.

수식으로 보면,

$$
m_t \leftarrow \beta m_{t-1} - \eta \nabla_{\theta} J(\theta )
$$

$$
\theta_{t+1} \leftarrow \theta_t + m_t
$$

- $m$ : 모멘텀 vector - 매 반복에서 현재 그레디언트를 계속해 반영
- $\beta$ : 모멘텀 이라는 하이퍼 파라미터 - 모멘텀이 너무 커지는 것을 방지

정리해보면, Momentum은 공이 경사면을 굴러 내려가는 것과 비슷하다.

- 같은 방향으로 gradient가 계속 나오면 속도가 누적되어 빠르게 이동한다.
- 방향이 계속 바뀌는 gradient는 서로 상쇄되어 진동이 줄어든다.

따라서 SGD보다 더 빠르고 안정적으로 수렴할 수 있다.

## 네스테로프 가속 경사(Nesterov Accelerated Gradient)

Nesterov Accelerated Gradient, 줄여서 NAG는 Momentum의 변형이다.

1983년 Yurii Nesterov가 제안했다.

Momentum은 현재 위치에서 gradient를 계산한 뒤, 이전 속도를 반영해 이동한다.

반면 Nesterov는 먼저 momentum 방향으로 한 번 미리 가본 위치에서 gradient를 계산한다.

즉, 현재 위치가 아니라 **앞으로 이동할 것으로 예상되는 위치**에서 gradient를 확인한다.

따라서, 실제로 많은 경우 기본 Momentum보다 **더 빠르거나 안정적**으로 수렴할 수 있다.

수식을로 보면,

$$
m_t \leftarrow \beta m_{t-1} - \eta \nabla_{\theta} J(\theta + \beta m_{t-1})
$$

$$
\theta_{t+1} \leftarrow \theta_t + m_t
$$

즉, Nesterov는 관성에 의해 앞으로 갈 위치를 미리 본 다음, 그 위치에서 경사를 확인한다.

따라서 최적점 근처에서 너무 많이 지나치는 것을 줄일 수 있다.

## AdaGrad

신경망 학습에서는 학습률이 매우 중요한 역할을 한다.

너무 크지도 작지도 않게 적당한 값을 찾아야 한다.

여기서, 효과적인 기술로 **학습률 감소(learning rate decay)**가 있다.

이는 학습률을 점차 줄여가는 방법이다.

→ 이를 발전시킨 알고리즘이 ‘AdaGrad’이다.

또한, SGD와 Momentum은 기본적으로 모든 파라미터에 같은 learning rate를 적용한다.

하지만 모든 파라미터가 같은 속도로 학습되어야 하는 것은 아니다.

AdaGrad는 각 파라미터마다 과거 gradient의 크기를 누적하고, 많이 업데이트된 파라미터는 learning rate를 작게 만든다.

즉, **파라미터별로 learning rate를 자동 조절한다.**

수식으로 보면

현재 gradient를 $g_t$라고 하자.

$$
g_t = \nabla_{\theta} J(\theta _t)
$$

AdaGrad는 gradient 제곱을 누적한다.

$$
r_t=r_{t-1}+g_t \odot g_t 
$$

그 다음 파라미터를 다음과 같이 업데이트한다.

$$
\theta_{t+1}=\theta_t -\frac{\eta}{\sqrt{r_t} + \epsilon}\odot g_t
$$

- $r_t$ : 과거 gradient 제곱의 누적합
- $\epsilon$  : 0으로 나누는 것을 방지하는 아주 작은 값

각 파라미터마다 업데이트 크기가 다르게 조절된다.

gradient가 자주 크던 파라미터는 $r_t$가 커진다.

그러면 다음 항이 작아진다.

$$
\frac{\eta}{\sqrt{r_t} + \epsilon}
$$

따라서 해당 파라미터의 업데이트 크기가 작아진다.

반대로 gradient가 작거나 드물게 업데이트된 파라미터는 $r_t$가 상대적으로 작다.

그러면 상대적으로 큰 learning rate가 적용된다.

이로 인해, 타원형 등고선에서 y축 방향으로 처음에는 크게 움직이지만

그로 인해 학습률이 큰 폭으로 작아지므로

→ 지그재그 움직임이 줄어들어 최솟값으로 효율적으로 움직이게 된다.

### AdaGrad의 장점

AdaGrad는 sparse feature에 강하다.

예를 들어 NLP처럼 어떤 단어는 자주 등장하고, 어떤 단어는 드물게 등장하는 상황에서 유용할 수 있다.

자주 등장하는 feature에 대해서는 learning rate를 줄이고, 드물게 등장하는 feature에 대해서는 learning rate를 크게 유지할 수 있기 때문이다.

### AdaGrad의 문제점

AdaGrad의 가장 큰 문제는 $r_t$값이 계속해 증가한다는 것이다.

따라서, 학습이 진행될수록 학습률이 계속 작아져 

결국 학습이 너무 일찍 멈추는 문제가 생길 수 있다.

이 문제를 해결하기 위해 RMSProp이 등장했다.

## RMSProp

AdaGrad는 과거 gradient 제곱을 전부 누적한다.

그래서 학습이 진행될수록 learning rate가 계속 작아진다.

RMSProp은 이 문제를 해결하기 위해 gradient 제곱의 단순 누적합이 아니라 **지수 이동 평균**을 사용한다.

즉, 오래된 gradient의 영향은 줄이고, 최근 gradient를 더 중요하게 반영한다.

RMSProp은 다음과 같이 gradient 제곱의 이동 평균을 계산한다.

$$
r_t=\rho r_{t-1}+(1-\rho) g_t \odot g_t
$$

$$
\theta_{t+1}=\theta_t -\frac{\eta}{\sqrt{r_t} + \epsilon}\odot g_t
$$

- $r_t$ : gradient 제곱의 지수 이동 평균
- $\rho$ : decay rate (보통 0.9 사용)
- $g_t$ : 현재 gradient

RMSProp의 장점은 다음과 같다.

- AdaGrad보다 학습 후반부에 덜 멈춘다.
- 비정상적이고 noisy한 gradient에 강하다.
- RNN 같은 모델 학습에서 자주 사용되었다.
- Adam의 기반이 되는 아이디어를 제공한다.

## Adam(**Adaptive Moment Estimation)**

Adam은 **Adaptive Moment Estimation**의 약자이다.

Adam은 Momentum과 RMSProp의 아이디어를 결합한 최적화 방법이다.

즉, Adam은 다음 두 가지를 모두 사용한다.

- Momentum: gradient의 지수 이동 평균을 사용한다.
- RMSProp: gradient 제곱의 지수 이동 평균을 사용한다.

### Adam의 핵심 아이디어

Adam은 두 가지 moment를 추정한다.

### 1. First moment

First moment는 gradient의 평균적인 방향이다.

$$
m_t=\beta_1 m_{t-1}+(1-\beta_1) g_t
$$

- $m_t$ : gradient의 지수 이동 평균
- $\beta_1$ : first moment decay rate

Momentum과 유사한 역할을 한다.

### 2. Second moment

Second moment는 gradient 제곱의 평균이다.

$$
v_t=\beta_2 v_{t-1}+(1-\beta_2) g_t \odot g_t
$$

- $v_t$ : gradient 제곱의 지수 이동 평균
- $\beta_2$ : second moment decay rate

RMSProp과 유사한 역할을 한다.

### 편향 보정(Bias Correction)

Adam에서는 $m_t$와 $v_t$에 대한 편향 보정이 수행된다.

다음과 같이 계산된다.

$$
\hat{m}_t=\frac{m_t}{1-\beta_1^t} \space,\space\space\space\space  \hat{v}_t=\frac{v_t}{1-\beta_2^t}
$$

Bias Correction을 하는 이유는,

보정 전 $m_k$, $v_k$는 실제 추세를 늦게 반영하기 때문이다.

왜냐하면 초깃값 $m_0 = 0$ 이므로, EMA가 0에 치우친다.

이로 인해 실제 gradient 값과 차이가 크게 된다.

이를 해결하기 위해 $1-\beta_1^t$로 나누어 주는데

이 과정에서 초기에는 큰 보정이 이루어지고

$t$가 커짐에 따라 보정의 정도가 줄어든다.

### Adam 업데이트 식

first moment와 second moment를 구한다음

편향 보정까지 하고

다음과 같이 업데이트 된다.

$$
\theta_{t+1}=\theta_t-\eta\frac{\hat{m}_t}{\sqrt{\hat{v}_t}+\epsilon}
$$

 

Adam은 **Momentum과 RMSProp**을 합친 방식이다.

Momentum처럼 gradient의 평균 방향을 사용해서 진동을 줄이고 빠르게 이동한다.

RMSProp처럼 gradient 제곱 평균을 사용해서 파라미터별 learning rate를 조절한다.

> 
> 
> 
> Adam에서 자주 사용하는 기본값은 다음과 같다.
> 
> - $\eta = 0.001$
> - $\beta_1 = 0.9$
> - $\beta_2 = 0.999$
> - $\epsilon = 10^{-8}$

Adam의 장점은 다음과 같다.

- 기본 설정만으로도 잘 작동하는 경우가 많다.
- gradient가 noisy해도 비교적 안정적이다.
- sparse gradient에서 잘 작동한다.
- 학습 초반 수렴 속도가 빠른 편이다.
- 많은 딥러닝 모델에서 기본 optimizer처럼 사용된다.

## AdamW

AdamW는 Adam에 **weight decay**를 더 잘 적용하기 위해 나온 최적화 방법이다.

Adam은 Momentum과 RMSProp을 결합한 optimizer이다.

하지만 Adam에 일반적인 L2 regularization을 그대로 넣으면, adaptive learning rate 때문에 weight decay가 의도한 방식대로 깔끔하게 적용되지 않는다.

AdamW는 이 문제를 해결하기 위해 **gradient 기반 업데이트**와 **weight decay 업데이트**를 분리한다.

이를 **decoupled weight decay**라고 한다.

### Adam과 AdamW의 차이

Adam에서 L2 regularization을 사용하면 손실 함수에 다음 항을 추가한다.

$$
J_{\text{total}}(\theta)=J(\theta)+\frac{\lambda}{2}\|\theta\|_2^2
$$

그러면 gradient는 다음처럼 된다.

$$
g_t=\nabla_\theta J(\theta_t)+\lambda \theta_t
$$

즉, weight decay 항이 gradient 안에 섞인다.

Adam은 이 gradient를 다시 moment 추정에 사용한다.

$$
m_t=\beta_1 m_{t-1}+(1-\beta_1)g_t
$$

$$
v_t=\beta_2 v_{t-1}+(1-\beta_2)g_t^2
$$

이렇게 되면 **weight decay 항도 Adam의 adaptive scaling 영향을 받는다.**

즉, 파라미터를 일정하게 줄이는 효과가 파라미터마다 다르게 왜곡될 수 있다.

### AdamW의 업데이트 방식

AdamW는 먼저 Adam 방식으로 gradient update를 계산한다.

그 다음 파라미터를 업데이트할 때 weight decay를 따로 적용한다.

$$
\theta_{t+1}=\theta_t-\eta\frac{\hat{m}_t}{\sqrt{\hat{v}_t}+\epsilon}-\eta \lambda \theta_t
$$

즉, AdamW는 Adam의 gradient update와 weight decay를 분리한다.

따라서 AdamW에서는 weight decay가 **파라미터를 직접 줄이는 역할**을 더 명확하게 한다.

AdamW의 장점은 다음과 같다.

- Adam보다 weight decay가 의도대로 작동한다.
- 일반화 성능이 더 좋아지는 경우가 많다.
- Transformer, Vision Transformer, LLM 계열 모델에서 표준 optimizer처럼 자주 사용된다.
- Adam의 빠른 수렴 장점을 유지하면서 정규화 효과를 더 명확하게 적용한다.
