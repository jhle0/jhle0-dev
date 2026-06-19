---
title: 어텐션 메커니즘(Attention Mechanism)
description: >-
  NN-based Seq2Seq의 context vector bottleneck에서 Attention이 왜 필요한지 정리한 글입니다.

  Decoder가 각 출력 시점마다 입력 sequence의 필요한 부분을 참고하는 방식과 Query, Key, Value 개념으로 이어지는 흐름을 설명한 내용입니다.
pubDate: 2026-06-19
updatedDate: ""
slug: attention-mechanism
topic: study
tags:
  - NLP
  - LLM
  - Transformer
  - Attention
  - Seq2Seq
  - RNN
  - Encoder-Decoder
  - Query
  - Key
  - Value
draft: false
series: Transformer & LLM Foundations
seriesOrder: 4
featured: false
---

### RNN-based Seq2Seq의 문제점

RNN-based Seq2seq에는 구조적인 한계가 있었다.

먼저 context vector bottleneck이다.

encoder의 마지막 hidden state 하나에 입력 sequence의 전체 context를 압축한다.

따라서, 문장이 짧을 때는 어느 정도 가능하지만,

문장이 길어지면 중요한 정보가 손실될 수 있다.

또한 context vector가 decoder의 모든 곳에서 같은 값이 사용된다.

이로인해 decoder가 출력 token을 생성할 때마다 입력 sequence의 다른 부분을 직접 참고하기 어렵다.

## Attention

Attention을 아래 사진을 바탕으로 설명하겠다.

![attention-mechanism-1.png](/images/uploads/attention-mechanism-1.png)

decoder에서 각 time step마다의 context vetor를 보면

(그림에서 s1,s2, s3, s4, s5를 생성할때 사용되는 context vec)

Seq2Seq : $c_1 = c_2 = c_3=c_4=c_5 = h_3$ 이다.

하지만 attention mechanism에서는 

$c_1 \neq c_2 \neq c_3\neq c_4\neq c_5$ 이 된다.

decoder의 4번째 time step에서의 Loss를 보자.

$$
L_4 = CE(\hat y_4, y_4)
$$

기존 Seq2Seq에서 $\hat y _4$값은 다음과 같다

$$
\hat y_4 = \text{softmax}(s_4W_y + b_y) 
$$

여기서 Attention은 context vector를 추가로 출력 계산에 관여시킨다.

$$
\hat y_4 = \text{softmax}(s_4W_y + \boxed{C_4W_c}+b_y) 
$$

즉, 시점 s_4에서의 context vector를 고려해준다.

이로인해, decoder가 출력을 생성할 때 time step에 따라 어떤 단어를 ‘attention(주목)’할지를 학습하게 된다.

### context vector 구하기

먼저 incoder의 hidden layer의 hidden vector $h_1, h_2, h_3$를 다른 관점으로 봐야한다.

원래는 $h_3$를 입력값 모두를 담은 ‘문장 벡터’로 보았다.

하지만 attention에서는 $h_3$를 이전 token들을 고려하긴 하지만 $x_3$의 ‘**임베딩 벡터**’로 바라본다.

즉, 각 hidden vec을 ‘개별 단어를 잘 표현하는 word embedding vector’로 본다.

이에 따라 $c_4 = h_3$로 하게되면 decoder는 거의 $x_3$만 고려한 것과 같다.

따라서, context vector를 구할 때 모든 hidden vector를 weight sum하여 구한다.

$$
C_4 = W_1h_1 + W_2h_2 + W_3h_3
$$

하지만 이 방법에는 문제가 있다.

weight가 오직 순번에 의미만 갖게 된다.

즉, $W_2$를 높이는 것은 2번째의 token과의 가중치를 높이는 거지 $h_2$가 중요하다는 뜻이 아니게 된다.

예를 들어 같은 단어지만 문장에 따라 위치가 다르게 되면 모델이 어떤 weight를 높여줘야 할 지가 계속 달라진다.

이렇게 되면 학습 방향의 일관성이 없어지고 어떤 token를 중요하게 볼지 혼란에 빠지게 된다.

⇒ 따라서, weight를 고정된 값이 아닌 각 token의 function으로 만든다.

이로 인해, ‘몇 번째 token을 중요하게 봐라’가 아닌 “어떤 ‘token’에 더 주목해라”를 학습시킬 수 있다.

이때, 어떤 token과의 주목도를 구할때 지금 time step이 뭔지도 고려해야한다.

이를 위해 decoder의 은닉 상태 S를 활용한다. 

S는 각 time step의 token 정보를 담고 있는 word embedding vector이다.

context vector를 구하는 식을 다시 보면

$$
C_4 = f(s_4, h_1)h_1 + f(s_4, h_2)h_2 + f(s_4, h_3)h_3 
$$

이 식에서 $f(s_4, h_i)$는 현재 time step의 embedding vector $s_4$와 각각의 입력 token의 embedding vector $h_i$ 사이의 **‘주목도(attention)’**를 나타낸다.

보통 내적 함수를 사용하기 때문에 다음과 같다.

$$
C_4 = <s_4, h_1>h_1 + <s_4, h_2>h_2 + <s_4, h_3>h_3 
$$

실제로 weight sum을 하기 전에 각 token에 대한 attention( $<s_4, h_1> ...$)을 0과 1 사이의 값으로 표현하고,

그 합이 1이 되도록 softmax를 적용해준다.

이유는

1. 특정 token의 weight가 지나치게 커지는 것을 방지한다.
2. weight의 합이 1이 되므로, 각 token에 대한 attention을 **분포**로 해석할 수 있다.

⇒ Attention mechanism은 각 출력 time step에서 입력 문장의 어떤 부분에 주목해야 할지를 효과적으로 학습할 수 있게 된다.

### Attention 원리

Attention의 weight를 구할 때 내적을 사요하는 이유는

→ 내적이 두 vector의 ‘닮은 정도’를 나타내기 때문이다.

아래 사진을 보면

![attention-mechanism-2.png](/images/uploads/attention-mechanism-2.png)

$S_3$와 $h_1, h_2, h_3$ embedding vector들이 다음과 같이 존재할때

예를 들어 , 4번째 시점에서 ‘raining’을 출력 해야 한다면,

$S_3$와 $h_2$(’비가’)가 가까워지도록 parameter를 업데이트 할것이다.

즉, weight를 학습하는 것은 vector들을 어디에 위치시킬지를 학습하는 것이다.

> 여기서 실제로 가까워지게 학습되는 것은
> 
> 
> 매칭되는 단어끼리가 아니라 한 단어 전 token과 가까워진다.
> 
> 즉, ‘raining’과 ‘비가’가 가까워지는게 아니라
> 
> ‘is’와 ‘비가’ 가 가까워진다.
> 
> 이로 인해, next token prediction을 수행할 수 있다.
> 

context vector 수식을 다시 보면

![attention-mechanism-3.png](/images/uploads/attention-mechanism-3.png)

$s_3$는 현재 time step에서 다음으로 어떤 token이 와야 하는지 묻는 역할 이미로 Query vector라고 한다.

$h_1, h_2, h_3$는 이 질문에 대한 답을 제공하는 역할 이므로 Key vector라고 한다.

또한, 동시에 각 token의 의미를 담고 있다는 점에서 Value vector라고도 한다.

## RNN + Attention의 문제점

RNN + Attentioin 방식에도 여전히 개선할 점이 있다.

첫번째는 Loss와 멀리 떨어진 token이 gradient에 미치는 영향이 작다는 문제가 아직 남아있다.

이 문제는 Encoder에서는 상당 부분 해결되었다.

$L_4$의 Loss를 볼 때

기존의 $W_x$까지의 backpropagation의 가장 짧은 경로는

$$
L_4 \rightarrow \hat y_4 \rightarrow  s_4 \rightarrow  s_3 \rightarrow  s_2 \rightarrow s_1 \rightarrow  h_3 \rightarrow W_x
$$

하지만 attention방식에서는 context vector $c_4$가 $\hat y_4$를 계산 하는데 직접적으로 관여하게 되었고

이로 인해 역전파 경로가

$$
L_4 \rightarrow  \hat y_4 \rightarrow c_4 \rightarrow h_3(or \space h_2 \space or \space h_3) \rightarrow W_x
$$

즉, 모든 입력 time step에 대해 $L_4$까지의 거리가 동일해져 문제는 해결되었다.

하지만, Decoder에서는 여전히 문제가 남아있다.

두번째로, word embedding vecotr들이 의미를 제대로 담지 못하는 문제가 있다.

뒤쪽 time step의 임베딩 벡터를 만들 때,

앞쪽 정보들은 뭉개진 상태로 전달되므로 정확한 의미를 제대로 담을 수 없게 된다.

예를 들어 ‘쓰다’라는 단어가 있을 떄,

이 단어가 7번째 위치에 있고 첫번째 단어는 ‘돈을’ 일 때

$h_7$이 ‘돈을’이라는 의미가 뭉개진 채 넘어와  ‘쓰다’라는 정확한 의미를 제대로 담지 못하게 된다.

즉, ‘쓰다’ 영어로 번역될 때 ‘돈을’이라는 의미를 잘 담지 못하여 spend가 아닌 write, wear, bitter 등과 같이 해석될 수 있게 된다.

이러한 문제들은 RNN의 구조적 한계에서 비롯된다.

따라서 이를 극복하기 위해 RNN의 구조를 완전히 탈피한

‘Transformer’가 제안되었다.

이는 self-attention이라는 혁신적인 mechanism이 사용된다.

이를 통해 문장 내 모든 단어 간의 관계를 직접적으로 고려하고 위와 같은 RNN 구조적 한계를 극복하게 된다.
