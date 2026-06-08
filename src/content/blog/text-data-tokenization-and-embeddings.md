---
title: 텍스트 데이터, 토큰화와 임베딩 (Text Data, Tokenization and Embeddings)
description: >-
  텍스트 데이터를 모델이 처리할 수 있는 token ID와 embedding vector로 변환하는 과정을 정리한 글입니다.

  Tokenization, vocabulary, padding, attention mask, embedding, positional information의 기본 흐름을 설명한 내용입니다.
pubDate: 2026-06-08
updatedDate: ""
slug: text-data-tokenization-and-embeddings
topic: study
tags:
  - NLP
  - LLM
  - Transformer
  - Text Data
  - Tokenization
  - Tokenizer
  - Embedding
  - Vocabulary
  - Attention Mask
  - Positional Encoding
draft: false
series: Transformer & LLM Foundations
seriesOrder: 1
featured: false
---

## Text Data란?

Text data는 사람이 사용하는 자연어 문장이나 문서 데이터를 의미한다.

예를 들어 다음과 같은 데이터가 text data이다.

```
I love deep learning.
Large language models predict the next token.
Transformer models use attention mechanisms.
```

텍스트 데이터는 이미지나 표 데이터와 다르게, 기본적으로 **순서가 있는 데이터(sequence data)** 이다.

예를 들어,

```
I love deep learning
```

에서 단어들의 순서가 바뀌면 의미도 달라진다.

```
Deep love I learning
```

따라서 자연어 모델은 단어 또는 token의 **순서와 문맥(context)** 을 함께 처리해야 한다.

### Corpus

**Corpus**는 모델이 학습에 사용하는 텍스트 데이터 전체를 의미한다.

예를 들어 LLM을 학습할 때는 다음과 같은 데이터들이 corpus가 될 수 있다.

- 웹 문서
- 책
- 뉴스 기사
- 논문
- 코드
- 대화 데이터
- 문서 QA 데이터

즉, corpus는 단순히 문장 하나가 아니라, 학습에 사용되는 **대규모 텍스트 집합**이다.

LLM은 이 corpus에서 **language pattern, 문법, 지식, 추론 패턴 등**을 학습한다.

## Character, Word, Subword

텍스트를 모델에 넣으려면 먼저 적절한 단위로 나누어야 한다.

이 단위는 크게 Character, Word, Subword 세 가지로 볼 수 있다.

### Character

Character는 글자 단위이다.

예를 들어,

```
learning
```

을 character 단위로 나누면 다음과 같다.

```
l, e, a, r, n, i, n, g
```

character 단위는 vocabulary 크기가 작다는 장점이 있다.

하지만 하나의 단어를 여러 글자로 나누기 때문에 **sequence length가 길어진다.**

즉, 모델이 처리해야 하는 길이가 길어져 학습이 비효율적일 수 있다.

### Word

Word는 단어 단위이다.

예를 들어,

```
I love deep learning
```

을 word 단위로 나누면 다음과 같다.

```
I / love / deep / learning
```

word 단위는 사람이 보기에는 자연스럽다.

하지만 실제 모델에서는 문제가 있다.

**새로운 단어**가 나오면 vocabulary에 **없을 수 있다.**

예를 들어 학습 데이터에 없던 단어가 등장하면 모델은 그 단어를 처리하기 어렵다.

이 문제를 **out-of-vocabulary, OOV 문제**라고 한다.

또한 영어에서는 단어 변형이 많고, 한국어처럼 조사나 어미 변화가 많은 언어에서는 word 단위가 더 비효율적일 수 있다.

### Subword

Subword는 단어보다 작고 character보다는 큰 단위이다.

예를 들어,

```
unhappiness
```

를 subword 단위로 나누면 다음처럼 나눌 수 있다.

```
un / happy / ness
```

또는 tokenizer에 따라 다르게 나뉠 수 있다.

```
un / happi / ness
```

Subword tokenization은 현대 LLM에서 가장 많이 사용되는 방식이다.

이유는 다음과 같다.

1. word-level보다 OOV 문제를 줄일 수 있다.
2. character-level보다 sequence length를 줄일 수 있다.
3. 자주 등장하는 단어는 하나의 token으로 유지하고, 드문 단어는 더 작은 subword로 나눌 수 있다.

## Token이란?

**Token**은 모델이 텍스트를 처리하는 기본 단위이다.

token은 반드시 단어 하나와 같지 않다.

tokenizer에 따라 token은 다음 중 하나일 수 있다.

- 하나의 문자
- 하나의 단어
- 단어의 일부
- 공백이나 특수기호
- 문장 시작/끝을 나타내는 special token

예를 들어,

```
I love deep learning.
```

이라는 문장은 tokenizer에 따라 다음처럼 나뉠 수 있다.

```
I / love / deep / learn / ing / .
```

> **tokenizer**는 텍스트를 여러 token들로 나눈다
> 
> 
> 이 과정을 **Tokenization**이라고 한다
> 

### Vocabulary

**Vocabulary**는 tokenizer가 알고 있는 token들의 집합이다.

각 token은 vocabulary 안에서 고유한 **token ID**를 가진다.

예를 들어 vocabulary가 다음과 같다고 하자.

```
Token       ID
----------------
"I"         10
"love"      25
"deep"      134
"learning"  872
"."         13
```

그러면 문장은 다음처럼 숫자 ID sequence로 바뀐다.

```
"I love deep learning."
→ ["I", "love", "deep", "learning", "."]
→ [10, 25, 134, 872, 13]
```

이때, token ID 자체는 아직 의미 있는 벡터가 아니다.

Token ID는 token을 숫자로 표현한 값이다.

신경망은 문자열을 직접 처리할 수 없기 때문에, token을 정수 ID로 바꿔야 한다.

즉, 단순히 vocabulary 안에서 해당 token이 몇 번째인지를 나타내는 index이다.

이 ID들은 다음 단계에서 embedding vector로 변환된다.

### Special Tokens

LLM이나 Transformer 모델은 일반 token 외에도 special token을 사용한다.

대표적인 special token은 다음과 같다.

| Token | 의미 |
| --- | --- |
| `<bos>` | 문장 또는 sequence 시작 |
| `<eos>` | 문장 또는 sequence 끝 |
| `<pad>` | padding 위치 |
| `<unk>` | vocabulary에 없는 token |
| `[CLS]` | BERT 계열에서 문장 전체 표현용 |
| `[SEP]` | 문장 구분용 |
| `[MASK]` | BERT의 masked language modeling용 |

GPT-style LLM에서는 보통 `<bos>`, `<eos>` 같은 token이 중요하고, BERT 계열에서는 `[CLS]`, `[SEP]`, `[MASK]` 같은 token이 자주 사용된다.

## Tokenization 방법

현대 Transformer / LLM에서는 대부분 **subword tokenization**을 사용한다.

대표적인 subword tokenization 방법은 다음과 같다.

- BPE
- WordPiece
- SentencePiece

### BPE

**BPE(Byte Pair Encoding)** 는 자주 함께 등장하는 문자 또는 subword 쌍을 반복적으로 병합하는 방식이다.

처음에는 작은 단위에서 시작한다.

예를 들어 character 단위에서 시작한다고 하자.

```
l e a r n i n g
```

자주 등장하는 쌍을 병합한다.

```
l e → le
n g → ng
```

이런 식으로 자주 등장하는 token pair를 계속 합치면서 vocabulary를 만든다.

BPE의 핵심은 다음과 같다.

→ 자주 함께 등장하는 작은 단위를 병합해서 효율적인 subword vocabulary를 만든다.

장점은

1. 드문 단어도 subword 조합으로 표현할 수 있다.

2. 자주 등장하는 단어는 하나의 token으로 유지할 수 있다.

3. OOV 문제를 줄일 수 있다.

GPT 계열 모델은 BPE 계열 tokenizer를 많이 사용한다.

### WordPiece

**WordPiece**는 BERT 계열 모델에서 사용된 subword tokenization 방식이다.

BPE와 비슷하게 subword vocabulary를 만들지만, 단순히 자주 등장하는 쌍만 병합하는 것이 아니라, **데이터 likelihood를 높이는 방향**으로 subword를 선택한다.

직관적으로 보면 다음과 같다.

⇒ 문장을 잘 표현할 수 있는 subword 조각들을 vocabulary로 선택한다.

BERT tokenizer에서는 단어 내부의 subword를 `##`로 표시하는 경우가 있다.

예를 들어,

```
playing
```

이 다음처럼 나뉠 수 있다.

```
play / ##ing
```

여기서 `##ing`은 단어의 시작이 아니라 앞 subword에 붙는 조각임을 의미한다.

### SentencePiece

**SentencePiece**는 텍스트를 미리 단어 단위로 나누지 않고, raw text에서 직접 subword를 학습하는 방식이다.

특징은 다음과 같다.

1. 공백도 하나의 문자처럼 처리할 수 있다.

2. 언어별 전처리에 덜 의존한다.

3. 한국어, 일본어처럼 공백 기준 단어 분리가 애매한 언어에도 유용하다.

SentencePiece는 BPE 방식이나 unigram language model 방식을 사용할 수 있다.

즉, SentencePiece는 하나의 tokenization 알고리즘이라기보다, raw text에서 subword tokenizer를 학습하고 적용하는 framework에 가깝다.

LLaMA 계열 모델에서도 SentencePiece 계열 tokenizer가 사용된다.

## Padding

모델은 보통 batch 단위로 여러 문장을 동시에 처리한다.

하지만 문장마다 길이가 다를 수 있다.

예를 들어,

```
Sentence 1: I love deep learning
Sentence 2: I love AI
```

token 개수로 보면 길이가 다르다.

```
Sentence 1: [10, 25, 134, 872]
Sentence 2: [10, 25, 91]
```

batch로 묶으려면 길이를 맞춰야 한다.

이때 짧은 sequence 뒤에 `<pad>` token을 추가한다.

```
Sentence 1: [10, 25, 134, 872]
Sentence 2: [10, 25, 91, <pad>]
```

이 과정을 **padding**이라고 한다.

### Attention Mask

Padding을 사용하면 batch 안의 sequence 길이는 같아진다.

하지만 `<pad>` token은 실제 의미가 있는 token이 아니다.

따라서 모델이 `<pad>` token을 참고하지 않도록 표시해줘야 한다.

이때 사용하는 것이 **attention mask**이다.

예를 들어,

```
Input IDs:
[10, 25, 91, 0]

Tokens:
["I", "love", "AI", "<pad>"]
```

이라면 attention mask는 보통 다음과 같다.

```
Attention Mask:
[1, 1, 1, 0]
```

- `1`: 실제 token
- `0`: padding token

## Truncation

문장이 너무 길면 모델이 처리할 수 있는 최대 길이를 넘을 수 있다.

예를 들어 모델의 최대 context length가 512 token이라면, 512 token을 넘는 입력은 그대로 처리할 수 없다.

이때 일정 길이 이후의 token을 잘라내는 과정을 **truncation**이라고 한다.

truncation은 단순하지만 **정보 손실**이 발생할 수 있다.

따라서 긴 문서를 다룰 때는 chunking, sliding window, RAG 같은 방법을 함께 고려해야 한다.

## One-hot Encoding

Token ID를 표현하는 가장 단순한 방법은 one-hot encoding이다.

예를 들어 vocabulary size가 5라고 하자.

```
Vocabulary:
0: I
1: love
2: deep
3: learning
4: .
```

`deep`의 token ID가 2라면 one-hot vector는 다음과 같다.

```
deep → [0, 0, 1, 0, 0]
```

one-hot vector는 해당 token 위치만 1이고 나머지는 모두 0인 vector이다.

### One-hot Encoding의 한계

One-hot encoding에는 큰 한계가 있다.

첫 번째, vocabulary size가 커질수록 **vector dimension이 너무 커진다**.

예를 들어 vocabulary size가 50,000이면 token 하나를 표현하기 위해 50,000차원 vector가 필요하다.

두 번째, 대부분의 값이 0이다.

즉, 매우 **sparse**한 표현이다.

세 번째, token 간 **의미적 유사도를 표현하지 못한다.**

예를 들어, cat, dog, car 세가지 단어가 있을떄

사람이 보기에는 `cat`과 `dog`가 `car`보다 의미적으로 더 가깝다.

하지만 one-hot vector에서는 모든 token이 서로 독립적인 축으로 표현된다.

따라서 one-hot encoding만으로는 token 간 의미 관계를 표현하기 어렵다.

## Embedding이란?

**Embedding**은 token을 dense vector로 표현하는 방법이다.

one-hot vector가 sparse하고 의미 관계를 표현하기 어렵기 때문에, 모델은 token ID를 embedding vector로 변환한다.

이 embedding vector는 **학습 가능한 파라미터**이다.

즉, 모델이 학습되면서 각 token의 embedding도 함께 업데이트된다.

Embedding은 보통 **embedding matrix** 로 표현된다

embedding matrix의 shape은 다음과 같다.

- `(vocabulary_size, embedding_dim)`

각 row는 하나의 token embedding을 의미한다.

예를 들어 token ID가 872라면, embedding matrix의 872번째 row를 가져온다.

이 과정을 **embedding lookup**이라고 한다.

예전 NLP에서는 주로 **word embedding**이라는 표현을 많이 사용했다.

Word2Vec, GloVe 같은 모델은 단어 단위 embedding을 학습했다.

하지만 LLM에서는 token이 반드시 word가 아니다.

현대 LLM은 대부분 subword token을 사용한다.

따라서 LLM에서는 정확히 말하면 **token embedding**이라고 부르는 것이 더 적절하다.

LLM에서는 subword, punctuation, special token 등도 모두 token embedding을 가진다.

Embedding vector는 처음부터 의미를 알고 있는 것이 아니다.

처음에는 보통 랜덤하게 초기화된다.

이후 모델이 language modeling objective로 학습되면서 embedding vector가 업데이트된다.

자주 비슷한 문맥에서 등장하는 token들은 비슷한 방향의 vector를 갖게 될 수 있다.

같은 token들은 유사한 문맥에서 자주 등장하므로 embedding space에서 가까워질 수 있다.

즉, embedding은 학습 과정에서 token의 의미적, 문맥적 정보를 어느 정도 반영하게 된다.

## Static Embedding과 Contextual Embedding

Embedding을 이해할 때 중요한 구분이 있다.

### Static Embedding

Static embedding은 하나의 단어가 항상 같은 vector를 갖는 방식이다.

예를 들어 Word2Vec에서 `bank`라는 단어는 항상 같은 vector를 가진다.

하지만 `bank`는 문맥에 따라 의미가 다르다.

```
river bank
bank account
```

첫 번째는 강둑이고, 두 번째는 은행이다.

Static embedding은 이런 문맥에 따른 의미 차이를 잘 반영하기 어렵다.

### Contextual Embedding

Transformer 기반 모델에서는 token embedding이 여러 layer를 지나면서 문맥에 따라 달라진다.

처음 embedding lookup 단계에서는 같은 token이 같은 vector로 시작한다.

하지만 self-attention layer를 지나면서 주변 token 정보를 반영하게 된다.

예를 들어,

```
river bank
bank account
```

에서 `bank`는 처음에는 같은 token embedding으로 시작할 수 있지만, Transformer layer를 통과한 후에는 서로 다른 contextual representation이 된다.

이것이 Transformer 기반 language model의 중요한 특징이다.

## Positional Information

Transformer의 self-attention은 기본적으로 token들의 관계를 계산하지만, 입력 순서를 자동으로 알지는 못한다.

예를 들어 다음 두 문장을 보자.

```
I love you
You love I
```

단어 집합만 보면 같은 token들이 들어 있다.

하지만 순서가 다르기 때문에 의미가 다르다.

RNN은 token을 순서대로 처리하기 때문에 순서 정보가 자연스럽게 들어간다.

하지만 Transformer는 sequence 전체를 병렬로 처리하기 때문에, 별도의 위치 정보가 필요하다.

따라서 token embedding에 **positional information**을 추가한다.

## 전체 입력 파이프라인

LLM의 입력 처리 흐름을 정리하면 다음과 같다.

```
Raw Text
→ Tokenization
→ Token IDs
→ Token Embedding Lookup
→ Add Positional Embedding
→ Transformer Input
```

예를 들어,

```
Raw Text:
I love deep learning
```

이 들어오면,

```
Tokens:
["I", "love", "deep", "learning"]
```

으로 나뉘고,

```
Token IDs:
[10, 25, 134, 872]
```

로 바뀐다.

그 다음 각 token ID는 embedding matrix에서 vector로 변환된다.

```
Token Embeddings:
[
  embedding_matrix[10],
  embedding_matrix[25],
  embedding_matrix[134],
  embedding_matrix[872]
]
```

마지막으로 각 위치의 positional embedding이 더해진다.

```
Final Input Vectors:
token_embedding + positional_embedding
```

이 vector sequence가 Transformer block으로 들어간다.
