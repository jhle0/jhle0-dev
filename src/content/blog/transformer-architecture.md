---
title: 트랜스포머 구조(Transformer Architecture)
description: RNN의 순차 처리 한계를 해결하기 위해 제안된 Transformer의 전체 구조를 정리한 글입니다. Token
  Embedding, Positional Encoding, Multi-Head Attention, Encoder-Decoder 구조, 학습과
  추론 과정을 흐름대로 설명합니다.
pubDate: 2026-06-27
updatedDate: ""
slug: transformer-architecture
topic: study
tags:
  - NLP
  - LLM
  - Transformer
  - Self-Attention
  - Multi-Head Attention
  - Token Embedding
  - Positional Encoding
  - Encoder-Decoder
draft: false
series: Transformer & LLM Foundations
seriesOrder: 5
featured: false
---
## Transformer

RNN + attention 구조에는 RNN의 구조적인 문제가 남아 있다.

따라서, RNN의 recurrent connection(이전 $h_{t-1}$ 을 사용하는)를 끊고,

attention을 중심으로 sequence를 처리하는 **Transformer** 구조가 제안되었다.

Transformer는 RNN처럼 token을 순서대로 처리하지 않는다.

대신 **Self-Attention**을 사용해 문장 안의 token들이 서로 어떤 관계를 가지는지 직접 계산한다.

> self-attention 정리
> 
> 
> https://jhle0-dev.vercel.app/blog/attention-mechanism#self-attention 
> 

### Transformer Model Architecture


![transformer-architecture-1.png](/images/uploads/transformer-architecture-1.png)

Transformer는 원래 기계 번역 같은 sequence-to-sequence task를 위해 제안된 모델이다.

따라서 기본 구조는 **Encoder-Decoder 구조**를 가진다.

Encoder는 입력 sequence를 읽고,

각 token에 대해 문맥이 반영된 representation을 만든다.

Decoder는 이전에 생성한 output token들과 encoder output을 참고하여, 다음 output token을 생성한다.

## First Stage: Token Embedding & Positional Encoding

Transformer 구조에서는 입력 sequence를 먼저 vector로 바꿔야 한다.

이 과정은 크게 두 단계로 볼 수 있다.

```
1. Token Embedding
2. Positional Encoding
```

> NLP에서는 shape를 (batch_size, seq_len, d_model) 로 나타낸다
> 
> 
> 예를 들어, 32x50x512 라면,
> 
> 32 - batch안 문장의 개수
> 
> 50 - batch 안 가장 긴 문장의 단어 개수
> 
> 512 - token vector의 차원, 즉  $d_{\text model}$
> 
> 이때 문장마다 token수가 다르기 때문에
> 
> 가장 긴 문장과 길이가 같아지도록 `<pad>` token을 사용해 길이를 맞춰준다
> 

### Token Embedding

Transformer에서는 attention을 수행하기 전, 각 token을 embedding vector로 바꿔준다.

예를 들어 vocab size가 7851이고, $d_{model}=512$라고 하자.

각 token은 처음에는 token id로 표현된다.

이 token id를 embedding layer에 통과시키면,

각 token은 512차원의 vector가 된다.

### Positional Encoding

RNN과 달리 transformer에서는 위치에 대한 정보도 같이 줘야 한다.

먼저, token의 위치를 one-hot encodeing 시킨다.

첫 번째 token은 [1, 0, 0, ..], 두 번째 token은 [0, 1, 0, …] 이다.

그 다음 positional encoding layer를 통과시켜 위치 embedding vector를 구한다.

그리고 앞서 구한 token embedding vec에 더해준다.

> 
> 
> 
> Positional Encoding에는 여러 방식이 있다.
> 
> 원래 Transformer 논문에서는 sin, cos 함수를 사용한 **sinusoidal positional encoding**을 사용했다.
> 
> 반면 다른 모델에서는 학습 가능한 **learned positional embedding**을 사용하기도 한다.
> 

모델은 학습 과정에서 word, positional 에서 곱해지는 행렬을 최적화 한다.

따라서 word embedding 의 행렬은 같은 의미의 token은 가깝게 의미가 다른 token은 멀어지게 된다.

positional encoding의 행렬은 어떤 위치가 중요한지, 어떤 위치 조항이 의미를 강화하는지를 model이 스스로 찾게 된다.

이 둘을 더해줌으로써 “다른 위치에 있는 token과 얼마나 관련 있는가”를 구하게 된다.

## Multi-Head Attention, Scaled dot-product Attention

Embedding과 positional encoding을 더한 token representation들은

encoder와 decoder의 attention layer로 들어간다.

Transformer에서 attention은 보통 **Multi-Head Attention** 형태로 사용된다.

### Query, Key, Value

입력 token representation들을 $h_1, h_2, h_3, .. h_n$라고 할때,

Transformer는 이 vector들을 바로 attention에 사용하지 않는다.

각 vector에 서로 다른 learned projection matrix($W_Q, W_K, W_V$)를 곱해

Query, Key, Value vector를 만든다.

이렇게 나누는 이유는

역할을 분담해, 더 각각 Q, K, V에 특화된 vector를 만들기 위함이다.

즉, 같은 vector를 그대로 쓰는 것이 아니라, 질문하는 역할, 비교되는 역할, 실제로 전달되는 정보 역할을 분리한다.

### Scaled Dot-Product Attention

다음으로 이 Q, K, V vector들을 scaled dot-product  attention layer에 통과시킨다.

이 layer에서는 다음과 같은 수식이 진행된다.

$$
\text{Attention(Q, K, V)} = \text{softmax}(\frac{QK^T}{\sqrt{d_k}})V
$$

첫 번째,

Query와 Key를 내적한다.

$$
QK^T
$$

이 값은 각 token이 다른 token들과 얼마나 관련 있는지를 나타내는 score matrix이다.

두 번째,

이 score를 $\sqrt{d_k}$로 나누어 **scale** 한다.

$$
\frac{QK^T}{\sqrt{d_k}}
$$

$d_k$는 key vector의 차원이다.

차원이 커질수록 dot product 값이 커질 수 있는데,

그렇게 되면 softmax가 너무 한쪽으로 치우칠 수 있다.

따라서 $\sqrt{d_k}$로 나누어 score의 크기를 조절한다.

세 번째,

softmax를 적용해 attention weight를 만든다.

$$
\text{softmax}
\left(
\frac{QK^T}{\sqrt{d_k}}
\right)
$$

이 attention weight에 Value를 곱하면,

각 token이 다른 token들의 정보를 얼마나 가져올지 결정된다.

$$
\text{softmax}
\left(
\frac{QK^T}{\sqrt{d_k}}
\right)V
$$

결과적으로 각 token은 자기 자신뿐만 아니라,

문장 안의 다른 token들과의 관계가 반영된 새로운 representation을 얻게 된다.

## Multi-Head Attention

Multi-Head Attention은 attention을 한 번만 수행하지 않는다.

여러 개의 head로 나누어 attention을 병렬로 수행한다.

예를 들어 $d_{model}=512$이고 head가 8개라면,

각 head는 보통 64차원 subspace에서 attention을 수행한다.

그리고, 각 head는 서로 다른 projection matrix를 사용한다.

따라서 각 head는 입력 sequence를 서로 다른 관점에서 볼 수 있다.

예를 들어 어떤 head는 주어-동사 관계를 더 잘 볼 수 있고,

어떤 head는 인접한 token 관계를 더 잘 볼 수 있고, 

다른 head는 멀리 떨어진 token 관계를 볼 수 있다.

각 head의 결과는 concat된다.

그 다음 다시 linear layer를 통과한다.

linear layer를 통과함으로써 다른 관점으로 봤던 시각들을 섞어 주게 된다.

Multi-Head Attention은 한 번에 여러 시각에서 입력 sequence를 바라보게 한다.

이로 인해 모델은 다양한 token 관계를 동시에 학습할 수 있다.

## Encoder

Encoder는 입력 sequence를 받아 각 token의 contextual representation을 만든다.

Encoder layer는 크게 두 부분으로 구성된다.

```
1. Multi-Head Self-Attention
2. Feed Forward Network
```

각 layer에서는 skip-connection과 layer normalization을 해준다.

skip-connection을 통해 model은 새로운 vector를 만들지 않고 원래 vector를 얼마나 이동시켜줄지 인 차이 vector를 학습하게 된다.

Layer Normalization은 각 token representation의 값 분포를 안정화하여 학습을 더 안정적으로 만든다.

### Feed Forward Network, FFN

Encoder의 attention layer를 통과한 뒤에는 Feed Forward Network를 통과한다.

feed forward 과정을 보면

nn.Linear(512, 2048) → nn.ReLU() → nn.Linear(2048, 512) 이다.

이는 bottleneck 역할을 해준다.

feed forward를 통과시키는 이유는 우선 비선형성을 추가해 각 token의 표현을 보다 복잡하고 풍부하게 만들어준다.

또한, FFN은 각 token 위치마다 독립적으로 적용된다

즉, FFN은 token들 사이의 관계를 계산하는 layer가 아니다.

token 사이의 관계는 attention이 담당한다.

FFN은 각 token representation 자체를 더 풍부하게 변환하는 역할을 한다.

## Decoder

Decoder는 output sequence를 생성하는 역할을 한다.

Decoder layer는 크게 세 부분으로 구성된다.

```
1. Masked Multi-Head Self-Attention
2. Encoder-Decoder Attention
3. Feed Forward Network
```

### Masked Multi-Head Self-Attention

decoder에서는 학습 시 teacher forcing 방식을 사요한다.

하지만 test 시에는 출력으로 나온 token을 입력으로 사용한다.

따라서, 학습 시에 미래 token을 보지 못하게  현재 step 이후의 token들을 masking 처리 해준다.

구현은 softmax 통과 전 작은 음수 값으로 바꾸어 softmax 통과 후 0이 되도록 해준다.

### Multi-head attention(Encoder-Decoder attention)

Decoder의 두 번째 attention layer는 **Encoder-Decoder Attention**이다.

여기서는 Q, K, V가 모두 decoder 내부에서 나오는 것이 아니다.

Q는 해당 Decoder에서 얻은 embedding vec을 사용한다.

하지만, K, V vector는 encoder에서 마지막으로 만들어진 출력 embedding vec을 사용한다.

이렇게 해서 다음 token을 무엇을 출력할지를 output 문장의 Q로 물어보고, input 문장의 K, V를 보고 알아내게 된다.

## Last stage

Decoder의 마지막 layer 출력은 각 position에 대한 representation이다.

이 representation을 vocabulary size로 변환하기 위해 linear layer를 통과시킨다.

이를 통과하면 각 position마다 vocabulary 전체에 대한 logit이 나온다.

학습 시에는 이 logits와 target token id를 비교해 Cross-Entropy Loss를 계산한다.

test 시에는 softmax를 통과한 확률들 중 가장 높은 확률에 해당하는 token을 선택한다.

## Train & Test

### Training

Training에서는 정답 output sequence를 알고 있다.

따라서 decoder input과 target을 한 칸 shift해서 만든다.

모델은 각 position에서 다음 token을 예측한다.

### Test / Inference

Test 시에는 정답 output sequence가 없다.

따라서 decoder에 처음에는 시작 token인 `<sos>`만 넣는다.

모델은 `<sos>`를 보고 첫 번째 token의 확률분포를 만든다.

그중 하나의 token을 선택한다.

그 다음 생성된 token을 decoder input에 붙인다.

이제 모델은 다시 다음 token을 예측한다.

이 과정을 반복한다

## Summary

Transformer는 RNN의 순차 처리 구조를 없애고,

self-attention으로 token 간 관계를 직접 계산하는 모델이다.

RNN은 이전 hidden state를 순서대로 전달했지만,

Transformer는 모든 token이 서로를 한 번에 참고할 수 있게 한다.

이를 위해 token embedding에 positional encoding을 더해 위치 정보를 넣고,

multi-head attention을 통해 여러 관점에서 token 관계를 학습한다.

Encoder는 입력 sequence의 문맥 표현을 만들고,

Decoder는 이전 출력 token과 encoder output을 참고해 다음 token을 생성한다.

학습 시에는 정답 문장을 한 칸 shift해서 넣고,

test 시에는 모델이 생성한 token을 다시 입력으로 넣으며 하나씩 생성한다.

정리하면 Transformer는

**RNN 없이 attention만으로 sequence를 처리할 수 있게 만든 구조**이다.
