---
title: 신경망의 문제와 해결 방법 - 과적합 (Problems in Neural Networks & Solutions - Overfitting)
description: 과적합의 개념과 원인을 설명하고, 모델 단순화, 조기 종료, 데이터 증강, Dropout, L1/L2 정규화를 통해
  일반화 성능을 높이는 방법을 정리한 글입니다.
pubDate: 2026-05-10
updatedDate: ""
slug: neural-network-overfitting-solutions
topic: study
tags:
  - Deep Learning
  - Neural Network
  - Overfitting
  - Regularization
  - Dropout
  - Data Augmentation
  - Early Stopping
draft: false
series: Neural Network
seriesOrder: 7
featured: false
---
train loss를 계속 줄이는 것이 항상 좋은 선택은 아니다.

모델이 train data의 패턴뿐만 아니라 noise나 우연한 특징까지 학습하면,

새로운 데이터에 대한 성능이 떨어질 수 있다. (즉, 일반화 성능이 떨어질 수 있다.)

이처럼 train data에는 잘 맞지만 validation/test data에는 잘 맞지 않는 현상을 **과적합(Overfitting)** 이라고 한다.

→ 이 overfitting을 방지하기 위한 여러 방법이 있다.

- 모델 단순화(Model Simplification)
- 조기 종료(early stopping)
- 데이터 증강(data augmentation)
- Dropout
- Regularization(L1, L2)

### 모델 단순화(Model Simplification)

모델의 capacity가 데이터에 비해 너무 크면 overfitting이 발생할 수 있다.

따라서 신경망의 layer 수, hidden unit 수, parameter 수를 줄여 **모델을 단순하게** 만들 수 있다.

모델이 단순해지면 train data의 세부 noise까지 외우기 어려워지고,

더 일반적인 패턴을 학습할 가능성이 높아진다.

### 조기 종료(early stopping)

val data를 활용하여 **최적의 학습 지점을 찾아** overfitting을 방지 할 수 있다.

모델을 train data로 학습시키는 동안 val data에 대한 성능을 확인한다.
이 성능이 더 이상 좋아지지 않거나 오히려 악화되기 시작할 때 학습을 중단한다.

이로 인해, train data에 과도하게 맞춰지는 것을 방지하고 일반화 성능이 가장 좋을 때 학습을 멈출 수 있다.

## 데이터 증강(Data Augmentation)

overfitting문제의 또 다른 원인 중 하나는 **데이터 부족**이다.

DNN은 많은 파라미터를 가지기 때문에 데이터가 부족하거나 다양성이 낮으면,

모델은 각 샘플에 대해 **거의 ‘암기’** 하는 형태가 된다.

또한, 샘플의 noise들에 대해서까지 모두 학습하게 되어 성능이 떨어지게 된다.

이를 방지하기 위해 데이터 증강 기법을 사용한다.

새로운 데이터를 얻는 것이 가장 좋지만,

이는 시간적 비용적 문제가 발생할 수 있다.

따라서 **기존 데이터를 최대한 활용**하는 기법을 사용한다,

예를 들어,

사진 데이터를 회전, 스케일링, 대칭, 색상 명도 조정 등 다양한 방법으로 데이터를 증강을 한다.

> 데이터를 증강할 때 고려 요소
> 
> - 중요한 정보가 손실될 정도로 과도하게 변형 x
> - 모델이 어떤 특징에 집중하고, 어떤 특징에 덜 민감해도 되는지 고려

→ data augmentation을 잘 활용하면 제한된 데이터로도 모델의 성능을 높이고 overfitting 현상을 완화할 수 있다.

## Dropout

Dropout은 NN의 **일부 뉴런을 임의로 비활성화**하여 학습을 진행하는 정규화기법이다.

학습 과정에서 매 mini-batch마다

무작위로 선택된 뉴런의 출력을 0으로 함으로써,

신경망이 특정 뉴런이나 경로에 과도하게 의존하는 것을 방지하여 overfitting을 방지 한다.

### Dropout 과정

Dropout 층의 노드에 대해 드롭될 확률(drop rate) $p$를 설정한다.

- 입력 : 한 층의 활성화 값 $h = (h_1, h_2, ... h_d)$
- drop rate : $p$ (보통 0.2 ~0.5 사이)
- mask : $m = (m_1, m_2, ... m_d)$, 각 $m_i \sim \text{Bernoulli}(1-p)$

**<학습 단계>**

$$
\hat h_i = \frac{h_i \cdot m_i}{1-p} 
$$

m값이 0이면 해당 뉴런은 차단, 1이면 살린다.

다음 기댓값을 원래와 동일하게 유지하기 위해 $\frac1{1-P}$을 곱해준다.

이 스케일 과정이 없으면 평균 출력이 $(1-p)\cdot h$로 감소해

학습 단계와 추론 단계 사이에 편향이 발생한다.

**<추론 단계>**

학습 시와 달리

마스크를 적용하지 않고, 스케일링도 하지 않는다.

전체 뉴런 모두를 사용해 test를 진행한다.

### Dropout 효과

머신러닝에서는 앙상블 기법이 매우 효과적이다.

Dropout은 마치 앙상블 효과를 낼 수 있다.

학슬할 때 뉴런을 무작위로 drop하기 때문에,

매번 다른 모델을 학습시키는 것처럼 볼 수 있다.

그러고 나서 test 때는 모든 뉴런을 사용함으로써 여러 모델의 평균을 내는 앙상블과 같은 효과를 얻을 수 있다.

또한 매 학습마다 서로 다른 서브 네트워크가 생성되므로, 모델이 특정 뉴런 조합에만 최적화되지 않는다.

이로 인해 dropout을 적절히 사용하여 overfitting을 완화할 수 있다.

## Regularization(L1, L2)

L1, L2 regularization은 overfitting을 완화하는 효과적인 방법이다.

Regularization은 loss 함수에 **파라미터 크기에 대한 penalty 항**을 추가하여,

파라미터가 **지나치게 커지는 것을 억제**하는 방법이다.

> 
> 
> 
> [L1 / L2 / Weight Decay 정규화 | jhle0](https://jhle0-dev.vercel.app/blog/l1-l2-weight-decay-regularization)
> 

### 왜 파라미터의 크기가 중요할까?

파라미터의 크기를 줄이면, 

모델의 복잡도를 줄이고 더 단순한 모델을 만들 수 있다.
파라미터의 크기가 크면 입력의 작은 변화에도 출력이 크게 변하게 되어

매우 복잡한 비선형 관계를 표현하게 된다.

따라서 regularization을 통해 파라미커의 크기를 줄임으로써 더 일반화된 패턴을 학습하도록 도울 수 있다.

### L1, L2 차이

L2 regularization은 파라미터 크기에 비례하여 penalty가 커진다.

따라서 큰 파라미터일수록 더 강하게 줄어드는 효과가 있다.

반면 L1 regularization은 파라미터의 부호에 따라 일정한 크기의 penalty를 준다.

이 때문에 작은 파라미터들이 0으로 수렴하기 쉬워 sparse한 모델을 만들 수 있다.

수식으로 보면,

**L2 regularization**

$$
L = L + \frac \lambda 2 \| w \|_2^2
$$

이를 편미분 해보면

$$
\frac{\partial L}{\partial w_i} +\lambda w_i
$$

기존 미분값에 $\lambda w_i$만 추가된 걸로 볼 수 있다.

따라서, $w_i$의 크기에 따라 줄어드는 정도가 달라 진다.

**L1 regularization**

$$
L = L + \lambda \| w \|_1
$$

이를 편미분 해보면

$$
\frac{\partial L}{\partial w_i} \pm  \lambda 
$$

이때는 $w_i$의 부호에 따라 + - 가 결정된다.

즉, 모든 파라미터가 $\lambda$ 값 만큼만 줄어든게 된다.
