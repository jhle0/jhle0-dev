---
title: Transformer 이전의 시퀀스 모델(Sequence Models Before Transformer)
description: |-
  Transformer가 등장하기 전 RNN, LSTM, GRU, Seq2Seq가 sequence data를 처리하던 방식을 정리한 글입니다.
  RNN 계열 모델의 구조적 한계와 Attention이 필요해지는 흐름을 설명한 내용입니다.
pubDate: 2026-06-11
updatedDate: ""
slug: sequence-models-before-transformer
topic: study
tags:
  - NLP
  - LLM
  - Sequence Model
  - RNN
  - LSTM
  - GRU
  - Seq2Seq
  - Encoder-Decoder
draft: false
series: Transformer & LLM Foundations
seriesOrder: 3
featured: false
---

## Transformer 이전의 모델

Transformer 이전의 sequence model들은 대부분 **순차 처리(sequential processing)** 방식에 기반했다.

즉, 입력 전체를 한 번에 처리하는 것이 아니라,

앞에서부터 하나씩 읽으면서 정보를 업데이트했다.

현재 입력을 볼 때, 이전까지의 정보를 함께 사용한다.

이런 방식으로 sequence를 처리하려고 나온 대표적인 구조가 **RNN**이다.

## RNN(Recurrent Neural Network)

![sequence-models-before-transformer-1.png](/images/uploads/sequence-models-before-transformer-1.png)

RNN(Recurrent Neural Network)은 시간 순서가 있는 , 순서가 있는 데이터(sequential data)를 처리하도록 설계된 신경망 구조이다.

Recurrent는 되풀이되는, 반복되는 이라는 뜻으로 RNN의 핵심 기능이다.

RNN은 이전 정보를 기억하고 활용하여 시간적 순서나 순차적 관계를 가진 데이터를 효과적으로 처리 할 수있다.

자연어 처리(NLP), 음성인식, 주가 예측 등 다양한 task에서 사용된다.

### RNN의 구조와 원리

RNN은 input layer, recurrent hidden layer, out put layer로 구성된다.

이 중 recurrent hidden layer에서 **순환(recurrence)** 이 만들어진다.

연속적인 데이터들은 tokenizing되어 순차적으로 RNN에 하나씩 입력된다.

RNN은 각 time step t마다 입력 $x_t$가 recurrent layer로 들어가 $h_t$를 출력한다.

이때 이전 time step의 recurrent layer의 출력 $h_{t-1}$가 함께 들어가 $h_t$를 출력한다.

즉, 현재 입력 $x_t$ + 이전 까지의 정보 $h_{t-1}$이 입력으로 들어간다.

이것이 RNN의 핵심인 ‘Recurrent’ 과정이다

이를 위해 recurrent layer는 두 종류의 weight를 가진다.

$w_x$ 는 입력값에 대한, $w_h$는 이전 step의 $h$에 대한 가중치이다.

recurrent layer의 과정을 수식으로 보면, 다음과 같다.

$$
h_t = \tanh(x_t\cdot W_x + h_{t-1}\cdot W_h + b_h)
$$

여기서 $h_t$는 현재 입력만 반영한 값이 아니다.

이전 hidden state $h_{t-1}$가 함께 들어가기 때문에,

$h_t$는 현재 입력 $x_t$와 이전까지의 문맥 정보(context)를 함께 담게 된다.

출력은 task에 따라 다르게 사용할 수 있다.

각 time step마다 출력을 만들 수도 있고,

마지막 hidden state만 사용해 하나의 출력을 만들 수도 있다.

출력을 만드는 기본 형태는 다음과 같다.

$$
\hat y_t = h_t W_y + b_y
$$

분류 문제라면 여기에 softmax를 적용할 수 있다.

회귀 문제라면 softmax를 쓰지 않고, $y_t$ 자체를 예측값으로 사용할 수도 있다.

문장 분류처럼 sequence 전체에 대해 하나의 label만 예측하는 경우에는 보통 마지막 hidden state $h_t$를 사용한다.

이 과정에서 가장 중요한 부분은 

$W_x, W_h, W_y, b_h, b_y$가 모든 time step에서 동일하게 사용된다는 것이다.

즉, RNN은 매 time step마다 다른 모델을 쓰는 것이 아니라,

같은 recurrent layer를 반복해서 적용한다.

이를 **weight sharing**이라고 한다.

이 구조에 따라 RNN의 이점은 다음과 같다.

우선, 이전 step의 정보를 현재 시점으로 전달하기 때문에, 연속적인 데이터의 맥락을 이해할 수 있게된다.

다음으로, RNN은 동일한 가중치와 layer들을 사용해 모든 데이터를 학습한다.

따라서 입력의 길이가 어떠하든 상관없이 처리할 수 있다.

### RNN forward

RNN의 forward 과정은 sequence를 앞에서부터 하나씩 읽으며 hidden state를 업데이트하는 과정이다.

초기 hidden state를 $h_0$라고 하자.

보통 $h_0$는 0으로 초기화하거나, 학습 가능한 vector로 둘 수 있다.

가장 기본적인 경우에는 다음처럼 진행된다.

$$

h_0 = 0

$$

첫 번째 time step에서는 $x_1$과 $h_0$를 사용해 $h_1$을 만든다.

$$
a_1 = x_1 W_x + h_0 W_h + b_h
$$

$$
h_1 = \tanh(a_1)
$$

두 번째 time step에서는 $x_2$와 이전 hidden state $h_1$을 사용한다.

$$
a_2 = x_2 W_x + h_1 W_h + b_h
$$

$$
h_2 = \tanh(a_2)
$$

세 번째 time step도 같은 방식이다.

이런 방식으로 RNN은 sequence를 순서대로 읽으면서 정보를 업데이트한다.

### RNN **Backpropagation Through Time, BPTT**

RNN도 일반 신경망처럼 backpropagation으로 학습된다.

다만 RNN은 time step을 따라 같은 구조가 반복되기 때문에,

시간축으로 펼친 뒤 역전파를 수행한다.

이를 **Backpropagation Through Time, BPTT** 라고 한다.

간단히 loss가 마지막 time step에서만 계산된다고 하자.

그러면 앞쪽 hidden state $h_k$가 loss에 미치는 영향은 chain rule로 다음처럼 표현할 수 있다.

$$
\frac{\partial L_T}{\partial h_k} = \frac{\partial L_T}{\partial h_T}\prod_{t=k+1}^{T}\frac{\partial h_t}{\partial h_{t-1}}
$$

이 식이 중요하다.

앞쪽 time step으로 갈수록 여러 개의 미분값이 계속 곱해진다.

이것때문에 gradient가 vanishing/exploding 하게 된다.

또한, RNN의 backpropagation에서는 모든 time step에서 같은 $W_x, W_h$가 사용되었기 때문에,

각 time step에서 발생한 gradient가 같은 파라미터에 누적된다.

## RNN의 구조적 한계

RNN은 연속적 데이터의 매우 강력한 모델이지만, 구조로 인한 한계들이 존재한다.

### 기울기 소실 /폭발(vanishing gradient /exploding )

RNN에서는 sequence가 길수록 전체 loss에 대한 앞 쪽 입력(토큰)이 미치는 영향이 작아진다.

즉, loss와 멀리 있을수록 gradient에 미치는 영향력이 작아진다.

backpropagation 수식으로 보면

$$
\frac{\partial L_T}{\partial h_k} = \frac{\partial L_T}{\partial h_T}\prod_{t=k+1}^{T}\frac{\partial h_t}{\partial h_{t-1}}
$$

$\frac{\partial h_t}{\partial h_{t-1}}$가 여러번 곱해진다

이 미분항에는 activation function의 미분값과 hidden-to-hidden weight $W_h$가 함께 포함된다.

이 값들이 time step마다 반복해서 곱해지기 때문에,

gradient가 작아지면 vanishing gradient가 되고,

커지면 exploding gradient가 된다.

→ 따라서 각 time step 마다 Loss에 미치는 영향은 달라지게 된다.

예를 들어 $h_1$에서 loss가 계산된다고 하자.

$$
\frac{\partial L_3}{\partial h_3}\frac{\partial h_3}{\partial h_2}\frac{\partial h_2}{\partial h_1}
$$

반면  $h_2$에 대한 gradient는 다음처럼 더 짧은 경로를 가진다.

$$
\frac{\partial L_3}{\partial h_3}\frac{\partial h_3}{\partial h_2}
$$

즉, $h_1$은 $h_2$보다 loss까지 더 긴 gradient 경로를 가진다.

이 때문에 sequence 앞쪽 정보일수록 학습 신호가 약해지기 쉽다.

> 
> 
> 
> 이 현상은 일반적인 deep neural network의 vanishing gradient와 같은 원리이다.
> 
> 차이가 있다면, 일반적인 deep network에서는 layer 방향으로 깊어질 때 발생하고,
> RNN에서는 sequence가 길어지면서 time step 방향으로 발생한다는 점이다.
> 

반대로 gradient가 너무 커지는 경우도 있다.

RNN에서는 같은 hidden-to-hidden weight $W_h$가 time step마다 반복해서 사용된다.

이 과정에서 gradient가 반복적으로 커지면 exploding gradient가 발생할 수 있다.

gradient가 너무 커지면 파라미터 업데이트가 과도해지고,

loss가 불안정하게 움직이거나 발산할 수 있다.

이를 완화하기 위해 자주 사용하는 방법이 **gradient clipping**이다.

gradient clipping은 gradient norm이 일정 threshold를 넘으면,

그 크기를 제한하는 방법이다.

### 장기 의존성 문제(Long - term dependency problem)

RNN의 원리를 보면,

이전 time step의 $h_{t-1}$과 현재 time step의 $x_t$가 결합하여 $h_t$를 만든다.

이 과정에서 activation function을 통과한다.

기본 RNN에서는 주로 tanh를 사용하는데

tanh 함수를 보면 출력값은 항상 -1에서 1사이이다.

이로 인해, sequence의 후반부로 갈수록

이전 time step의 정보들은 점차 압축되게 된다.

RNN은 최근 정보는 또렷하게 보지만, 오래된 정보일수록 세부적인 디테일한 정보는 구분하기 어려워지게 된다.

→ 이를 ‘갈수록 뭉개진다’라고 한다.

이러한 현상은 긴 sequence를 다룰 때 문제가 된다.

예를 들어 다음과 같은 문장

“어제 도서관에서 빌리고 밤새 읽었던 그 책은, 생각보다 훨씬 흥미로웠다.”

이 문장에서 ‘흥미로웠다’의 의미를 정확히 파악하기 위해서는 문장 앞 ‘책’이라는 정보가 필요한다.

하지만 초반 정보가 hidden state 안에서 약해지면,

모델은 뒤쪽에서 필요한 문맥을 제대로 활용하기 어려워질 수 있다.

이것이 **장기 의존성 문제(Long-term Dependency Problem)** 이다.

### 순차 계산으로 인한 병렬화 어려움

RNN의 또 다른 한계는 **순차 계산(sequential computation)** 구조이다.

RNN은 현재 time step의 hidden state를 계산하기 위해 이전 time step의 hidden state가 필요하다.

$h_3$를 계산하려면 $h_2$가 필요하고,

$h_2$를 계산하려면 $h_1$이 필요하다.

따라서 각 time step을 독립적으로 동시에 계산하기 어렵다.

이 구조는 짧은 sequence에서는 큰 문제가 아닐 수 있지만,

긴 문장이나 대규모 데이터를 학습할 때는 계산 효율을 떨어뜨린다.

즉, RNN은 sequence의 순서를 자연스럽게 반영할 수 있지만,

그 대신 **time step 방향으로 병렬화하기 어렵다**는 한계를 가진다.

이 한계는 이후 Transformer가 중요해지는 이유 중 하나이다.

## LSTM / GRU

RNN의 Recurrent 구조 덕분에 RNN은 이전 정보를 활용할 수 있다.

하지만 문제가 있었다.

sequence가 길어질수록 앞쪽 정보가 뒤쪽까지 잘 전달되지 않는다.

즉, 오래된 정보일수록 hidden state 안에서 점점 약해지고,

backpropagation 과정에서도 gradient가 앞쪽 time step까지 잘 전달되지 않을 수 있다.

또한, sequence가 길어질수록 모든 정보를 hidden state 하나에 담기는 어렵다.

이를 완화하기 위해 등장한 구조가 **LSTM**과 **GRU**이다.

두 모델 모두 RNN 계열 모델이지만,

기본 RNN보다 정보를 더 오래 유지할 수 있도록 **gate mechanism**을 사용한다.

### **LSTM(Long Short-Term Memory)**

**LSTM(Long Short-Term Memory)** 은 RNN의 장기 의존성 문제를 완화하기 위해 만들어진 모델이다.

기본 RNN은 hidden state 하나로 정보를 전달한다.

반면 LSTM은 **cell state**라는 장기 기억 경로를 추가한다.

cell state는 오래 유지해야 하는 정보를 전달하는 역할을 한다.

그리고 LSTM은 gate를 사용해 어떤 정보를 기억하고, 어떤 정보를 버릴지 조절한다.

대표적인 gate는 다음과 같다.

```
forget gate:
이전 기억 중 무엇을 버릴지 결정

input gate:
현재 입력 중 무엇을 새로 저장할지 결정

output gate:
저장된 정보 중 무엇을 hidden state로 내보낼지 결정
```

다만 LSTM도 여전히 time step을 순서대로 처리한다.

따라서 RNN의 순차 계산 구조 자체를 없애지는 못한다.

### **GRU(Gated Recurrent Unit)**

**GRU(Gated Recurrent Unit)** 는 LSTM과 비슷하게 gate를 사용하는 RNN 계열 모델이다.

목적은 LSTM과 같다. 장기 의존성 문제를 해결하는 것이다.

다만 GRU는 LSTM보다 구조가 더 단순하다.

LSTM은 cell state와 hidden state를 따로 사용하지만,

GRU는 별도의 cell state 없이 hidden state 중심으로 동작한다.

GRU는 주로 두 가지 gate를 사용한다.

```
update gate:
이전 정보를 얼마나 유지할지 결정

reset gate:
이전 정보를 얼마나 무시할지 결정
```

LSTM보다 구조가 단순하고 계산량이 적을 수 있다.

하지만 GRU도 RNN 계열 모델이므로,

time step을 순서대로 처리해야 한다는 한계는 그대로 가진다.

## Seq2Seq(Sequence-to-Sequence)

RNN 계열 모델은 이후 **Seq2Seq(Sequence-to-Sequence)** 구조로 확장되었다.

Seq2Seq는 이름 그대로,

입력 sequence를 받아 출력 sequence를 만드는 구조이다.

대표적인 예시는 기계 번역이다.

```
Input:
I love you

Output:
나는 너를 사랑한다
```

입력도 sequence이고,

출력도 sequence이다.

또한 입력 sequence와 출력 sequence의 길이는 서로 다를 수 있다.

이런 문제는 단순히 각 token마다 label을 붙이는 문제와 다르다.

입력 문장 전체를 이해한 뒤,

새로운 출력 문장을 순서대로 생성해야 한다.

이를 위해 Seq2Seq는 보통 **Encoder-Decoder 구조**를 사용한다.

### Encoder-Decoder Structure

Seq2Seq의 기본 구조는 다음과 같다.

```
Input Sequence
→ Encoder
→ Context Vector
→ Decoder
→ Output Sequence
```

먼저 **encoder**는 입력 sequence를 순서대로 읽는다.

예를 들어 입력 문장이 다음과 같다고 하자.

```
I love you
```

encoder는 이를 순서대로 처리한다.

그리고 입력 문장 전체의 정보를 하나의 벡터로 압축한다.

이 벡터를 **context vector**라고 한다.

그 다음 **decoder**는 이 context vector를 바탕으로 출력 sequence를 생성한다.

즉, encoder는 입력을 이해하고,

decoder는 그 정보를 바탕으로 출력을 생성한다.

정리하면 다음과 같다.

### RNN-based Seq2Seq

초기의 Seq2Seq 구조에서는 encoder와 decoder에 RNN 계열 모델을 사용했다.

이를 **RNN-based Seq2Seq**라고 볼 수 있다.

구조는 다음과 같다.

```
RNN Encoder
→ Context Vector
→ RNN Decoder
```

Encoder Decoder에서는 각각 다른 RNN으로 이루어져있다.

따라서 각각의 고유한 파라미터를 가진다.

Encoder RNN은 입력 문장을 순서대로 읽으면서 hidden state를 업데이트한다.

```
x_1 → h_1
x_2 → h_2
x_3 → h_3
```

기본적인 Seq2Seq에서는 encoder의 마지막 hidden state를 context vector로 사용한다.

즉 위에 예시로는 $h_3$가 context vector가 된다.

이 context vector에는 입력 sequence 전체의 정보가 담겨 있다고 가정한다.

Decoder RNN은 이 context vector를 초기 정보로 받아 출력 sequence를 생성한다.

예를 들어 번역 문제라면 다음과 같다.

```
Encoder:
I → love → you
→ context vector

Decoder:
context vector
→ 나는 → 너를 → 사랑한다
```

이 구조를 통해 RNN은 단순히 sequence를 읽는 것에서 나아가,

입력 sequence를 다른 출력 sequence로 변환할 수 있게 되었다.

### Teacher Forcing

Seq2Seq의 decoder는 출력 token을 하나씩 생성한다.

예를 들어 정답 출력 문장이 다음과 같다고 하자.

```
나는 너를 사랑한다
```

decoder는 원래라면 이전에 자신이 생성한 token을 바탕으로 다음 token을 예측한다.

```
나는
→ 너를
→ 사랑한다
```

하지만 학습 초반에는 모델이 틀린 token을 생성할 가능성이 높다.

한 번 틀린 token이 다음 입력으로 들어가면,

그 이후 예측도 계속 흔들릴 수 있다.

이를 완화하기 위해 사용하는 방법이 **teacher forcing**이다.

Teacher forcing은 학습할 때 decoder가 이전 step에서 자신이 생성한 token이 아니라,

실제 정답 token을 다음 입력으로 사용하게 하는 방법이다.

예를 들어 정답 문장이 다음과 같다면,

```
나는 너를 사랑한다
```

학습 중 decoder input과 target은 다음처럼 구성할 수 있다.

```
Decoder input:
<sos> 나는 너를

Target:
나는 너를 사랑한다
```

즉, decoder는 다음 과정을 학습한다.

```
<sos> → 나는
나는 → 너를
너를 → 사랑한다
```

여기서 중요한 점은,

학습 중에만 정답 token을 입력으로 넣어준다는 것이다.

Inference 과정에서는 모델이 생성하 token을 다음 입력으로 사용한다.

Teacher forcing은 학습을 안정적으로 만든다.

하지만 training과 inference의 조건이 달라지는 문제가 있다.

학습할 때는 정답 token을 보고 다음 token을 예측하지만,

실제로 생성할 때는 모델이 직접 만든 token을 보고 다음 token을 예측해야 한다.

이 차이로 인해 **exposure bias**가 생길 수 있다.

### RNN-based Seq2Seq의 문제점

RNN-based Seq2Seq는 입력 sequence를 출력 sequence로 바꿀 수 있다는 점에서 중요한 구조였다.

하지만 구조적인 한계도 있었다.

가장 큰 문제는 **context vector bottleneck**이다.

기본 Seq2Seq에서는 encoder의 마지막 hidden state 하나에 **입력 sequence 전체**를 압축한다.

문장이 짧을 때는 어느 정도 가능하다.

하지만 입력 sequence가 길어지면 문제가 생긴다.

하나의 고정된 크기 벡터 안에 긴 문장의 모든 정보를 압축하면, 중요한 정보가 손실될 수 있다.

또한 decoder가 특정 단어를 생성할 때,

입력 문장의 어느 부분을 참고해야 하는지 직접 알기 어렵다.

예를 들어 출력에서 어떤 단어를 생성할 때는 입력의 앞부분이 중요할 수도 있고,

다른 단어를 생성할 때는 입력의 뒷부분이 중요할 수도 있다.

하지만 기본 Seq2Seq에서는 decoder가 매번 입력 sequence 전체를 직접 보는 것이 아니라, 하나의 context vector만 보고 출력한다.

