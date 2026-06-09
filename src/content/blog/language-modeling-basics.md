---
title: 언어 모델링 기초(Language Modeling Basics)
description: >-
  자연어를 token sequence의 확률 구조로 바라보고, Language Model이 무엇을 학습하는지 정리한 글입니다.

  Next-token prediction, causal language modeling, masked language modeling, logits, loss, training과 inference의 차이를 설명한 내용입니다.
pubDate: 2026-06-09
updatedDate: ""
slug: language-modeling-basics
topic: study
tags:
  - NLP
  - LLM
  - Transformer
  - Language Modeling
  - Sequence
  - Context
  - Next-token Prediction
  - Autoregressive Modeling
  - Causal Language Modeling
  - Masked Language Modeling
draft: false
series: Transformer & LLM Foundations
seriesOrder: 2
featured: false
---

## Language Modeling이란?

이전 포스트에서 텍스트는 그대로 모델에 들어갈 수 없고,

다음 과정을 거쳐야 한다고 정리했다.

```
Text
→ Tokenization
→ Token ID
→ Embedding
→ Model Input
```

그럼 이제 중요한 질문은 이것이다.

> 모델은 이 token sequence를 보고 무엇을 학습하는가?
> 

이 질문과 직접 연결되는 개념이 **Language Modeling**이다.

**Language Modeling**은 자연어 문장, 더 정확히는 **token sequence의 확률 구조를 학습하는 문제**이다.

쉽게 말하면,

```
지금까지 주어진 token들을 보고
다음 token 또는 특정 token이 무엇일지 예측하는 것
```

즉, **Language Model은 자연어 sequence가 얼마나 그럴듯한지, 그리고 다음에 어떤 token이 올 가능성이 높은지를 학습하는 모델**이다.

### Sequence

자연어 문장은 기본적으로 **sequence data**이다.

**Sequence**는 순서가 있는 데이터라는 뜻이다.

예를 들어 다음 문장을 보자.

```
I love deep learning
```

이 문장은 단어들이 그냥 모여 있는 것이 아니다.

각 token이 특정 순서로 배열되어 있고, 그 순서가 의미를 만든다.

순서를 바꾸면 문장이 이상해진다.

```
Deep I learning love
```

즉, 자연어에서는 단순히 어떤 token이 등장했는지만 중요한 것이 아니다.

다음 요소들이 함께 중요하다.

- token의 순서
- token 사이의 관계
- 앞뒤 문맥
- 전체 문장 구조

따라서 자연어 모델은 token 하나하나를 독립적으로 보는 것이 아니라,

**순서와 문맥을 함께 고려해야 한다.**

### Context

**Context**는 어떤 token을 이해하거나 예측할 때 참고하는 주변 정보이다.

예를 들어 다음 두 문장을 보자.

```
I deposited money in the bank
```

```
I sat near the river bank
```

두 문장 모두 bank라는 token이 등장한다.

하지만 첫 번째 문장에서 bank는 **은행**이고,

두 번째 문장에서 bank는 **강둑**이다.

같은 token이라도 앞뒤 문맥에 따라 의미가 달라진다.

즉, **bank** 라는 token 하나만 보면 의미가 정해지지 않는다.

주변 token들을 함께 봐야 한다.

Language Model은 이 context를 바탕으로 다음 token의 확률을 계산한다.

### Context Length

**Context length**는 모델이 한 번에 참고할 수 있는 token의 최대 길이이다.

예를 들어 context length가 128이라면,

모델은 최대 128개의 token을 입력으로 받을 수 있다.

Context length가 길수록 더 많은 문맥을 볼 수 있다.

긴 문서, 긴 대화, 긴 코드 등을 처리하려면 긴 context length가 필요하다.

하지만 context length가 길어지면 계산량과 메모리 사용량도 커진다.

즉, context length는 다음 사이의 trade-off이다.

## Language Model의 기본 목표

Language Model의 기본 목표는 문장의 확률을 모델링하는 것이다.

예를 들어 다음 문장이 있다고 하자.

```
I love deep learning
```

이 문장이 자연스러운 문장이라면,

Language Model은 이 sequence에 높은 확률을 부여해야 한다.

반대로 다음 문장은 자연스럽지 않다.

```
Deep I learning love
```

이런 sequence에는 낮은 확률을 부여해야 한다.

즉, Language Model은 단순히 token을 외우는 것이 아니라,

**어떤 token sequence가 자연스러운지 확률적으로 학습한다.**

### 문장의 확률

Language Model은 문장 전체의 확률을 token 단위의 조건부 확률로 나눠서 생각할 수 있다.

예를 들어,

```
I love deep learning
```

이라는 문장의 확률은 다음처럼 표현할 수 있다.

$$
P(\text{I love deep learning})=P(\text{I})P(\text{love} \mid \text{I})P(\text{deep} \mid \text{I love})P(\text{learning} \mid \text{I love deep})
$$

즉, 문장 전체 확률은

**각 위치에서 다음 token이 나올 확률을 곱한 것**으로 볼 수 있다.

일반적으로 token sequence가 다음과 같다고 하자.

$$
x_1, x_2, \dots, x_T
$$

그러면 sequence 전체의 확률은 다음처럼 표현된다.

$$
P(x_1, x_2, \dots, x_T)=\prod_{t=1}^{T} P(x_t \mid x_1, x_2, \dots, x_{t-1})
$$

### Next-token Prediction

가장 기본적인 language modeling 문제는 **next-token prediction**이다.

말 그대로,

```
이전 token들을 보고 다음 token을 예측하는 문제
```

이다.

예를 들어 다음 문장이 있다고 하자.

```
I love deep learning
```

그러면 학습 문제는 다음처럼 만들 수 있다.

```
Input:  I
Target: love

Input:  I love
Target: deep

Input:  I love deep
Target: learning
```

### Input Sequence와 Target Sequence

실제 학습에서는 input과 target을 하나씩 따로 만드는 것보다,

하나의 sequence를 한 칸 밀어서 사용한다.

예를 들어 token sequence가 다음과 같다고 하자.

```
[I, love, deep, learning]
```

그러면 input과 target은 다음처럼 구성할 수 있다.

```
Input:
[I, love, deep]

Target:
[love, deep, learning]
```

즉, target은 input을 한 칸 오른쪽으로 shift한 형태이다.

이 구조를 **shifted labels**라고 이해하면 된다.

### BOS / EOS Token

Language Modeling에서는 sequence의 시작과 끝을 알려주기 위해 special token을 사용할 수 있다.

대표적으로 다음 두 token이 있다.

| Token | 의미 |
| --- | --- |
| `<bos>` | Beginning of Sequence, sequence 시작 |
| `<eos>` | End of Sequence, sequence 끝 |

예를 들어 원래 문장이 다음과 같다고 하자.

```
I love deep learning
```

문장 앞뒤에 special token을 붙이면 다음과 같다.

```
<bos> I love deep learning <eos>
```

이때 input과 target은 다음처럼 구성할 수 있다.

```
Input:
<bos> I love deep learning

Target:
I love deep learning <eos>
```

모델은 `<bos>`를 보고 첫 token을 예측하고,

마지막에는 `<eos>`를 예측하도록 학습된다.

`<eos>`는 sequence가 끝났음을 알려주는 token이다.

따라서 생성 과정에서 모델이 `<eos>`를 출력하면,문장 생성을 멈출 수 있다.

### Autoregressive Modeling

**Autoregressive Modeling**은 이전 token들을 이용해 다음 token을 순차적으로 예측하는 방식이다.

Language Modeling에서는 다음과 같은 구조이다.

```
x_1 → x_2 → x_3 → ... → x_T
```

각 token은 이전 token들에 의존한다.

$$
P(x_t \mid x_1, x_2, \dots, x_{t-1})
$$

텍스트 생성도 이 방식으로 이루어진다.

예를 들어 prompt가 다음과 같다고 하자.

```
I love
```

모델이 다음 token으로 `deep`을 생성하면,

이 token은 다시 context에 추가된다.

```
I love deep
```

그다음 모델은 다시 다음 token을 예측한다.

```
I love deep learning
```

### Causal Language Modeling

**Causal Language Modeling**은 현재 token을 예측할 때 미래 token을 보지 않는 방식이다.

예를 들어 다음 sequence가 있다고 하자.

```
I love deep learning
```

`deep`을 예측할 때 모델이 볼 수 있는 정보는 다음까지이다.

```
I love
```

미래 token인 `learning`은 보면 안 된다.

이 방식은 왼쪽에서 오른쪽으로 문장을 생성하는 데 적합하다.

정리하면 다음과 같다.

Causal Language Modeling = 이전 token들만 보고 다음 token을 예측하는 방식

### Masked Language Modeling

Causal Language Modeling과 다른 방식으로 **Masked Language Modeling**도 있다.

Masked Language Modeling은 문장 중 일부 token을 가리고,

주변 문맥을 이용해 가려진 token을 맞히는 방식이다.

예를 들어,

```
I love [MASK] learning
```

이라는 문장이 있다면,

모델은 `[MASK]` 위치에 들어갈 token을 예측한다.

이때 모델은 왼쪽 문맥과 오른쪽 문맥을 모두 볼 수 있다.

```
왼쪽 문맥: I love
오른쪽 문맥: learning
```

즉, Masked Language Modeling은 양방향 문맥을 사용하는 방식이다.

이 방식은 나중에 BERT 계열 모델을 이해할 때 중요하다.

### Logits

Language Model은 다음 token을 바로 하나로 출력하지 않는다.

먼저 vocabulary 전체에 대한 점수를 출력한다.

이 점수를 **logit**이라고 한다.

예를 들어 vocabulary가 다음과 같다고 하자.

```
Vocabulary:
[I, love, deep, learning, .]
```

모델은 다음 token 후보마다 점수를 출력한다.

```
I         → -1.2
love      →  0.5
deep      →  1.1
learning  →  3.4
.         → -0.7
```

이 점수 자체는 아직 확률이 아니다.

확률로 바꾸려면 softmax를 적용해야 한다.

### Probability Distribution

Logits에 softmax를 적용하면 vocabulary 전체에 대한 확률분포가 된다.

즉, 모델은 다음 token 하나만 출력하는 것이 아니라,

**다음 token 후보 전체에 대한 확률분포**를 출력한다.

```
learning → 높은 확률
deep     → 낮은 확률
.        → 낮은 확률
```

따라서 모델은 다음 token을 “정답 하나”로 바로 고르는 것이 아니라,

각 token이 다음에 올 가능성을 확률로 계산한다.

### Loss Function

Language Model은 예측한 확률분포와 실제 정답 token 사이의 차이를 줄이도록 학습된다.

보통 **Cross-Entropy Loss**를 사용한다.

예를 들어 정답 token이 `learning`이라면,

모델은 `learning`에 높은 확률을 주도록 학습된다.

즉, Language Model의 학습 목표는 다음과 같다.

```
각 위치에서 실제 다음 token의 확률을 최대화한다.
```

## Training과 Inference

Language Model은 training과 inference에서 사용하는 방식이 다르다.

### Training

Training에서는 정답 sequence가 이미 있다.

따라서 input과 target을 만들어서 각 위치의 loss를 계산할 수 있다.

```
Input:
I love deep

Target:
love deep learning
```

모델은 각 위치에서 다음 token을 예측하고,

정답 target과 비교하여 loss를 계산한다.

```
I             → love
I love        → deep
I love deep   → learning
```

### Inference

Inference에서는 정답 sequence가 없다.

모델이 직접 다음 token을 생성해야 한다.

예를 들어 prompt가 다음과 같다고 하자.

```
I love
```

모델은 다음 token 확률분포를 만든다.

그중 하나의 token을 선택한다.

그 다음 생성된 token을 다시 context에 붙인다.

```
I love deep
```

다시 다음 token을 예측한다.

```
Generated:
learning
```

이 과정을 반복하면 문장이 생성된다.

```
I love deep learning
```
