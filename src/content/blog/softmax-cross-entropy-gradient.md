---
title: Softmax와 Cross-Entropy Gradient
description: |-
  다중 분류에서 Softmax와 Cross Entropy Loss가 함께 사용되는 이유와 순전파 흐름을 정리한 글입니다.
  특히 출력층 역전파의 시작점인 $\frac{\partial L}{\partial z}=p-y$가 어떻게 유도되는지 단계별로 설명한 글입니다.
pubDate: 2026-05-04
updatedDate: ""
slug: softmax-cross-entropy-gradient
topic: study
tags:
  - Deep Learning
  - Neural Network
  - Softmax
  - Cross Entropy
  - Backpropagation
draft: false
series: Neural Network
seriesOrder: 4
featured: false
---
## Softmax + Cross Entropy가 필요한 이유

다중 분류(Multi-class Classification)에서는 하나의 입력이 여러 클래스 중 하나에 속한다.

예를 들어 이미지가

- 고양이
- 강아지
- 호랑이

중 하나인지 분류한다고 하자.

이때 신경망의 마지막 선형층은 각 클래스에 대한 점수(score)를 출력한다.

이 점수를 **logit**이라고 한다.

$$
z = [z_1, z_2, \dots, z_C]
$$

- $z_i$: 클래스 i에 대한 logit
- $C$: 클래스 개수

하지만 logit은 아직 확률이 아니다.

각 값은 음수일 수도 있고, 합이 1이 되지도 않는다.

따라서 이 logit을 확률처럼 해석하기 위해 **Softmax 함수**를 사용한다.

## Softmax 함수

Softmax 함수는 각 logit을 확률값으로 바꾸는 함수이다.

$$
p_i = \frac{e^{z_i}}{\sum_{j=1}^{C} e^{z_j}}
$$

- $z_i$ : 클래스 i의 logit
- $p_i$ : 클래스 i일 확률
- $C$ : 클래스 개수

Softmax를 거친 출력은 다음 성질을 가진다.

$$
0 < p_i < 1
$$

$$
\sum_{i=1}^{C} p_i = 1
$$

즉, Softmax는 여러 클래스에 대한 점수를 **확률분포(probability distribution)** 로 바꿔준다.

## Cross Entropy Loss

다중 분류에서 정답 label은 보통 one-hot vector로 표현한다.

예를 들어 3개 클래스 중 2번 클래스가 정답이라면,

$$
y = [0, 1, 0]
$$

이다.

모델의 예측 확률이 다음과 같다고 하자.

$$
p = [0.2, 0.5, 0.3]
$$

Cross Entropy Loss는 정답 분포 y와 예측 분포 p가 얼마나 다른지 측정한다.

$$
L = -\sum_{i=1}^{C} y_i \log p_i
$$

one-hot label에서는 정답 클래스만 $y_i$ = 1이고 나머지는 0이다.

따라서 정답 클래스가 k라면,

$$
L = -\log p_k
$$

가 된다.

즉, Cross Entropy는 정답 클래스의 예측 확률이 높을수록 작아지고, 정답 클래스의 예측 확률이 낮을수록 커진다.

## 전체 순전파 흐름

Softmax + Cross Entropy가 붙은 출력층의 순전파는 다음과 같다.

$$
z = Wh + b
$$

$$
p = \text{softmax}(z)
$$

$$
L = -\sum_{i=1}^{C} y_i \log p_i
$$

- $h$ : 이전 은닉층의 출력
- $W$ : 출력층의 가중치
- $b$ : 출력층의 편향
- $z$ : 출력층 logit
- $p$ : softmax를 통과한 예측 확률
- $y$ : 실제 정답 label
- $L$ : Cross Entropy Loss

즉,

$$
h \rightarrow z \rightarrow p \rightarrow L
$$

의 흐름이다.

## 우리가 구하려는 값

출력층에서 역전파를 시작하려면 다음 값을 구해야 한다.

$$
\frac{\partial L}{\partial z}
$$

즉, 손실 L이 각 logit  $z_i$에 대해 얼마나 민감한지를 구해야 한다.

이 값을 출력층의 공통 오차항으로 둘 수 있다.

$$
\delta = \frac{\partial L}{\partial z}
$$

Softmax와 Cross Entropy를 함께 사용하면 이 값이 매우 간단해진다.

$$
\delta = p - y
$$

즉,

$$
\boxed{\frac{\partial L}{\partial z_i} = p_i - y_i} 
$$

이다.

이제 왜 이 형태가 되는지 살펴보자.

### Cross Entropy의 미분

Cross Entropy Loss는 다음과 같다.

$$
L = -\sum_{j=1}^{C} y_j \log p_j
$$

먼저 $p_j$에 대해 미분하면,

$$
\frac{\partial L}{\partial p_j}=-\frac{y_j}{p_j}
$$

이다.

즉, 예측 확률 $p_j$가 손실에 미치는 영향은 다음과 같다.

정답 클래스에서는 $y_j = 1$이므로 영향이 있고, 오답 클래스에서는 $y_j = 0$이므로 직접적인 Cross Entropy 미분값은 0이다.

하지만 여기서 끝나지 않는다.

Softmax에서는 하나의 logit이 모든 확률값에 영향을 주기 때문이다.

### Softmax의 미분

Softmax는 다음과 같다.

$$
p_j = \frac{e^{z_j}}{\sum_{k=1}^{C} e^{z_k}}
$$

여기서 중요한 점은 분모에 모든 logit이 들어간다는 것이다.

따라서 어떤 logit $z_i$가 변하면, 자기 자신의 확률 $p_i$뿐만 아니라 다른 클래스의 확률 $p_j$에도 영향을 준다.

Softmax의 미분은 두 경우로 나뉜다.

**1. 자기 자신에 대한 미분**

$i = j$인 경우,

$$
\frac{\partial p_i}{\partial z_i}=p_i(1-p_i)
$$

즉, $z_i$가 커지면 $p_i$는 증가한다.

**2. 다른 클래스에 대한 미분**

$i \neq j$인 경우,

$$
\frac{\partial p_j}{\partial z_i}=-p_jp_i
$$

즉, $z_i$가 커지면 softmax의 분모가 커지기 때문에 다른 클래스의 확률 $p_j$는 감소한다.

**⇒ 하나의 식으로 정리하면,**

$$
\frac{\partial p_j}{\partial z_i}=p_j(\mathbf{1}_{i=j} - p_i)
$$

여기서 $\mathbf{1}_{i=j}$ 는 $i=j$이면 1, 아니면 0인 값이다.

## Chain Rule 적용

우리가 구하려는 값은 다음이다.

$$
\frac{\partial L}{\partial z_i}
$$

그런데 $z_i$는 softmax를 거쳐 $p_j$들을 만들고, 그 $p_j$들이 loss를 만든다.

즉,

$$
z_i \rightarrow p_1, p_2, \dots, p_C \rightarrow L
$$

이다.

따라서 연쇄법칙을 사용하면,

$$
\frac{\partial L}{\partial z_i}=\sum_{j=1}^{C}\frac{\partial L}{\partial p_j}\frac{\partial p_j}{\partial z_i}
$$

이다.

위에서 구한 두 식을 대입하면,

$$
\frac{\partial L}{\partial z_i}=\sum_{j=1}^{C}\left(-\frac{y_j}{p_j}\right)p_j(\mathbf{1}_{i=j} - p_i)
$$

여기서 $p_j$가 약분된다.

$$
=\sum_{j=1}^{C}-y_j(\mathbf{1}_{i=j} - p_i)
$$

분배하면,

$$
=\sum_{j=1}^{C}\left(-y_j\mathbf{1}_{i=j} + y_jp_i\right)
$$

항을 나누면,

$$
=-\sum_{j=1}^{C} y_j\mathbf{1}_{i=j}+\sum_{j=1}^{C} y_jp_i
$$

첫 번째 항은 $j=i$일 때만 남는다.

$$
-\sum_{j=1}^{C} y_j\mathbf{1}_{i=j}=-y_i
$$

두 번째 항에서 $p_i$는 j와 관계없는 값이므로 밖으로 뺄 수 있다.

$$
\sum_{j=1}^{C} y_jp_i=p_i \sum_{j=1}^{C} y_j
$$

one-hot label에서는 정답 클래스 하나만 1이므로,

$$
\sum_{j=1}^{C} y_j = 1
$$

이다.

따라서,

$$
 p_i\sum_{j=1}^{C} y_j = p_i
$$

결국,

$$
\frac{\partial L}{\partial z_i}=-y_i + p_i
$$

즉,

$$
\boxed{\frac{\partial L}{\partial z_i}=p_i - y_i}
$$

이다.

정리해보면,

Softmax + Cross Entropy를 함께 쓰면 출력층의 오차항은 다음처럼 정리된다.

$$
\delta = p - y
$$

즉,

$$
\frac{\partial L}{\partial z} = p - y
$$

는 모델의 예측 확률분포와 실제 정답 분포의 차이이다.

## 최종 정리

다중 분류에서 신경망의 마지막 선형층은 각 클래스에 대한 logit을 출력한다.

$$
z = Wh + b

$$

이 logit은 아직 확률이 아니기 때문에 Softmax를 적용해 확률분포로 변환한다.

$$
p_i = \frac{e^{z_i}}{\sum_{j=1}^{C} e^{z_j}}
$$

그 다음 Cross Entropy Loss를 사용해 정답 분포 y와 예측 분포 p의 차이를 측정한다.

$$
L = -\sum_{i=1}^{C} y_i \log p_i
$$

역전파에서는 출력층에서 먼저 logit에 대한 gradient를 구해야 한다.

$$
\frac{\partial L}{\partial z}
$$

Softmax와 Cross Entropy를 함께 사용하면 이 gradient는 복잡한 형태가 아니라 매우 단순하게 정리된다.

$$
\boxed{\frac{\partial L}{\partial z} = p - y}
$$

즉, 출력층의 오차항은 다음과 같다.

$$
\boxed{\delta = p - y}
$$

이 식의 의미는 명확하다.

모델이 어떤 클래스를 정답보다 크게 예측했다면 해당 클래스의 logit은 낮아지는 방향으로 gradient가 흐르고, 정답 클래스의 예측 확률이 부족하다면 해당 클래스의 logit은 높아지는 방향으로 gradient가 흐른다.

따라서 Softmax + Cross Entropy의 미분 결과인 $p-y$는 다중 분류 모델에서 출력층 역전파의 시작점이 된다.
