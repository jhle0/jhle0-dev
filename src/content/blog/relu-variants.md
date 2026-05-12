---
title: ReLU 계열 활성화 함수 (ReLU Variants)
description: ReLU의 한계인 Dying ReLU 문제를 완화하기 위해 제안된 LeakyReLU, PReLU, ELU, SELU,
  GELU, Swish, Mish 등의 활성화 함수를 정리한 글입니다. 각 함수의 수식, 특징, 사용 조건, 적용 상황을 비교합니다.
pubDate: 2026-05-12
updatedDate: ""
slug: relu-variants
topic: study
tags:
  - Deep Learning
  - ai-core
  - Activation Function
  - ReLU
  - LeakyReLU
  - PReLU
  - ELU
  - SELU
  - GELU
  - Swish
  - Mish
draft: false
featured: false
---
vanishing gradient를 방지하기 위해

sigmoid 대신 ReLU 함수를 많이 선택한다.

하지만 ReLU함수에는 **dying ReLU**로 알려진 문제가 있다.

ReLU에서 pre-activation 값이 계속 음수 영역에 머물면, 출력과 gradient가 계속 0이 되어 해당 뉴런이 거의 학습되지 않을 수 있다. 이를 dying ReLU 문제라고 한다.

→ 이 문제를 해결하기 위해 ReLU 함수를 변형한 다양한 활성화 함수들이 제안되었다.

## LeakyReLU, RReLU, PReLU

### LeakyReLU

Leaky ReLU 활성화 함수는 

$$
\text{LeakyReLU}(x) =\begin{cases}x, & x > 0 \\\alpha x, & x \le 0\end{cases}
$$

로 정의된다.

하이퍼파라미터 $\alpha$가 이 함수가 **‘새는(leaky)’ 정도**를 결정한다.

새는 정도는  **z<0 일 때 이 함수의 기울기**를 말한다.

따라서, 입력이 음수일 때도 0을 출력하지 않아, dying ReLU 문제를 완화할 수 있다.

### RReLU, PReLU

Leaky ReLU를 조금 변형한 activation 함수이다.

RReLU(randomized leaky ReLU)는 $\alpha$를 주어진 범위에서 **랜덤하게 선택**해 훈련하고,

테스트 시에는 평균값을 사용하는 방식이다.

이 함수는 규제의 역할처럼 작용해, overfitting을 방지할 수 있다.

PReLU(parametric leaky ReLU)는 $\alpha$를 훈련하는 동안 **파라미터와 마찬가지로 학습시킨다.**

역전파 과정에서 $\alpha$를 변경하며 최적의 값을 찾는 방법이다.

파라미터를 추가한 것이므로 약간의 overfitting 위험이 있어 대규모 데이터셋에서 주로 사용된다.

## ELU, SELU

ReLU, LeakyReLU, PReLU 모두 매끄러운 함수가 아니라는 단점이 있다.

즉, gradient가 0지점에서 갑자기 변화하게 된다.

이로 인해 최적점에서 진동하게 만들거나 수렴이 느려질 수 있다.

→ 이를 방지하기 위해 ReLU 함수의 부드러운 변형들이 있다.

### ELU(exponential linear unit)

**ELU(Exponential Linear Unit)** 는 양수 영역에서는 입력을 그대로 출력하고, 음수 영역에서는 지수 함수를 사용해 부드럽게 음수 값을 출력하는 활성화 함수이다.

$$
\text{ELU}(x) =\begin{cases}x, & x > 0 \\\alpha(e^x - 1), & x \le 0\end{cases}
$$

여기서 $\alpha$는 음수 영역의 포화값을 조절하는 하이퍼파라미터이다.

$x$가 **매우 작아지면** 다음 값에 가까워진다.

$$
\text{ELU}(x) \rightarrow -\alpha
$$

즉, 음수 영역에서 **출력이 $-\alpha$ 근처로 포화**된다.

따라서 activation의 평균이 0에 가까워지는 효과를 기대할 수 있다. 

이는 layer 입력 분포의 치우침을 줄여 학습을 더 안정적으로 만드는 데 도움을 줄 수 있다. 

또한 음수 영역에서도 gradient가 완전히 0이 아니므로 Dying ReLU 문제를 완화할 수 있다.

### SELU(Scaled ELU)

**SELU(Scaled Exponential Linear Unit)** 는 ELU에 scale을 적용한 활성화 함수이다.

$$
\text{SELU}(x) =\lambda\begin{cases}x, & x > 0 \\\alpha(e^x - 1), & x \le 0\end{cases}
$$

일반적으로 다음 상수를 사용한다.

$$
\alpha \approx 1.6733
$$

$$
\lambda \approx 1.0507
$$

SELU는 신경망의 activation들이 layer를 지나도 평균과 분산이 일정하게 유지되도록 설계된 활성화 함수이다.

이를 **self-normalizing** 성질이라고 한다.

즉, 특정 조건에서 activation의 평균은 0에 가깝게, 분산은 1에 가깝게 유지되도록 유도한다.

> SELU의 사용 조건
> 
> - LeCun Normal Initialization 사용
> - feedforward neural network 구조
> - AlphaDropout 사용
> - 입력 데이터 정규화
> - Batch Normalization과 함께 쓰는 것은 일반적으로 권장되지 않음

## GELU, Swish, Mish

### GELU(Gaussian Error Linear Unit)

**GELU(Gaussian Error Linear Unit)** 는 입력값을 확률적으로 부드럽게 통과시키는 형태의 활성화 함수이다.

Transformer 계열 모델에서 자주 사용된다.

GELU는 다음과 같이 정의된다.

$$
\text{GELU}(x) = x \Phi(x)
$$

여기서 $\Phi(x)$는 **표준정규분포의 누적분포함수(CDF)**이다.

이 함수는 평균이 0, 분산이 1인 정규 분포에서 랜덤하게 샘플링한 값이 $x$보다 작을 확률에 해당한다.

실제 구현에서는 계산 효율을 위해 다음 **근사식**을 사용하기도 한다.

$$
\text{GELU}(x) \approx 0.5x \left(1 + \tanh \left[\sqrt{\frac{2}{\pi}}(x + 0.044715x^3)\right]\right)
$$

ReLU는 $x$가 양수인지 음수인지에 따라 딱 잘라서 통과시킨다.

반면 GELU는 입력값의 크기에 따라 부드럽게 통과 정도를 조절한다.

즉, 작은 양수나 작은 음수 근처에서 더 부드러운 gating처럼 작동한다.

### Swish / SiLU

**Swish**는 입력값에 **sigmoid 함수**를 곱한 활성화 함수이다.

$$
\text{Swish}(x) = x \cdot \sigma(\beta x)
$$

여기서 $\beta$는 조절 가능한 값이다.

$\beta = 1$인 경우를 **SiLU(Sigmoid Linear Unit)**라고 한다.

$$
\text{SiLU}(x) = x \cdot \sigma(x)
$$

Swish/SiLU는 ReLU처럼 양수 입력을 주로 통과시키지만, 음수 영역도 완전히 0으로 자르지 않는다.

또한 함수가 부드럽기 때문에 gradient 변화가 급격하지 않다.

### Mish

**Mish**는 입력값에 `softplus`를 적용한 뒤, 그 값의 `tanh`를 다시 입력값에 곱하는 활성화 함수이다.

$$
\text{Mish}(x) = x \cdot \tanh(\text{softplus}(x))
$$

여기서 `softplus`는 다음과 같다.

$$
\text{softplus}(x) = \ln(1 + e^x)
$$

Mish도 smooth activation이다.

Mish는 Swish/SiLU, GELU와 비슷하게 부드러운 gating 형태를 가지며, 음수 영역도 완전히 0으로 자르지 않는다.

따라서 위 함수들과 같은 장점이 있다.

## 언제 어떤 Activation Function을 사용하는가

활성화 함수는 모델 구조, 데이터셋, 학습 안정성, 계산 비용에 따라 선택한다.

### 기본 MLP / CNN

일반적인 MLP나 CNN에서는 먼저 ReLU를 사용한다.

ReLU는 계산이 빠르고 구조가 단순하며, 많은 기본 신경망에서 충분히 잘 작동한다.

$$
\text{ReLU}(x) = \max(0, x)
$$

따라서 특별한 이유가 없다면 ReLU를 기본 선택지로 둔다.

### Dying ReLU가 의심될 때

학습 중 많은 뉴런의 출력이 계속 0이 되거나, 특정 layer의 activation이 대부분 0이라면 Leaky ReLU를 고려할 수 있다.

Leaky ReLU는 음수 영역에서도 작은 기울기를 유지하므로 Dying ReLU 문제를 완화할 수 있다.

$$
\text{LeakyReLU}(x) =\begin{cases}x, & x > 0 \\\alpha x, & x \le 0\end{cases}
$$

### 음수 영역의 기울기까지 학습시키고 싶을 때

Leaky ReLU의 $\alpha$ 값을 직접 정하지 않고 모델이 학습하게 하고 싶다면 PReLU를 사용할 수 있다.

다만 PReLU는 추가 파라미터가 생기므로 데이터가 적은 경우 overfitting 위험이 조금 증가할 수 있다.

### 출력 평균을 0 근처로 만들고 싶을 때

ELU는 음수 영역에서도 음수 값을 출력하므로 activation의 평균을 0에 가깝게 만드는 데 도움을 줄 수 있다.

이로 인해 학습이 더 안정적으로 진행될 수 있다.

다만 지수 함수 계산이 들어가므로 ReLU보다 계산 비용이 크다.

### Self-Normalizing Network를 사용할 때

SELU는 특정 조건에서 layer를 지나도 activation의 평균과 분산이 안정적으로 유지되도록 설계된 함수이다.

하지만 SELU를 제대로 사용하려면 보통 다음 조건이 필요하다.

- LeCun Normal Initialization
- AlphaDropout
- 입력 데이터 정규화
- Feedforward Neural Network 구조
- Batch Normalization은 일반적으로 함께 사용하지 않음

따라서 SELU는 일반적인 ReLU 대체재라기보다, self-normalizing network를 구성할 때 사용하는 activation으로 보는 것이 좋다.

### Transformer 계열 모델

Transformer 계열에서는 GELU가 자주 사용된다.

GELU는 ReLU처럼 양수/음수를 hard threshold로 나누지 않고, 입력값의 크기에 따라 부드럽게 통과 정도를 조절한다.

BERT, GPT 계열 모델에서 자주 등장하는 activation이다.

### 일부 최신 CNN 계열

EfficientNet 같은 일부 CNN 계열에서는 Swish 또는 SiLU가 사용된다.

Swish/SiLU는 ReLU보다 부드럽고, 음수 영역도 완전히 제거하지 않는다.

다만 sigmoid 계산이 포함되므로 ReLU보다 계산 비용은 크다.

### 실험적 대안으로 비교하고 싶을 때

Mish는 Swish/SiLU와 비슷한 smooth activation 계열이다.

음수 영역을 완전히 0으로 자르지 않고, 부드러운 gating 형태를 가진다.

일부 모델에서 성능 향상을 보일 수 있지만, 계산 비용이 크고 기본 선택지로 항상 우선되는 함수는 아니다.

따라서 ReLU, GELU, SiLU와 비교 실험하는 activation 정도로 이해하면 된다.
