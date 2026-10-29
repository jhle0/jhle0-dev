---
title: 서브워드 토큰화 알고리즘과 라이브러리 (Subword Tokenization)
description: LLM에서 텍스트를 토큰으로 변환하는 서브워드 토큰화의 원리와 BPE, WordPiece, Unigram LM 알고리즘을
  정리합니다. 또한 SentencePiece와 tiktoken의 구조 및 특징을 살펴봅니다.
pubDate: 2026-10-29
updatedDate: ""
slug: subword-tokenization
topic: study
tags:
  - NLP
  - LLM
  - Tokenization
  - BPE
  - WordPiece
  - Unigram
  - SentencePiece
  - Byte-Pair BPE
  - tiktoken
draft: false
featured: false
---

## Tokenization?

LLM을 포함한 NN들은 raw text 자체를 직접 처리 할 수 없다

why? raw text - 이산적 기호(discrete symbols), NN은 수치적 tensor 기반 연산

따라서 raw text를 모델이 처리할 수 있게 다음과 같은 과정 필요

```
raw text → tokens → token IDs → embedding vector
```

이 글에서 다룰 부분은 raw text를 tokens로 변환하는 tokneization

(어떤 tokenization은 token IDs까지 변환을 포함함)

### word-level, character-level Tokenization

- word-level : 단어 단위로 텍스트 분절
    - I love deep learning → I, love, deep, learning
    - 직관적이지만 한계가 존재
    - OOV(Out of Vocabulary) - 모든 단어를 vocab에 추가 할 수 없으므로 vocab에 없는 단어는 처리하지 못하는 OOV문제 발생 ( [UNK] 특수 토큰 사용)
    - OOV를 줄이기 위해 vocab을 확장하면 모델의 parameter가 늘어 메모리 부담 증가

- Character-level : 개별 문자(Character) 단위로 분절
    - learning → l, e, a, r, n, i, n, g
    - 작은 vocab으로 OOV 완화 (영어만 봐도 소문자 26, 대문자 26이면 모든 단어 표현 가능)
    - 하지만 sequence 길이가 길어져 연산 비용 증가
    - 또한 접두사 접미사 등 언어적 패턴이 사라져 모델이 직접 학습해야 함

### Subword Tokenization

위 두 방법을 절충한 방법으로

character와 word 중간 단위로 Text 분절

- ex) unbelievable → un, believ, able

subword tokenization의 장점으로

- OOV 완화 : subword들의 조합으로 새로운 단어를 처리할 수도 있음
- sequence length가 character-level 보다 짧아짐
- 공통 접두사, 접미사 등을 재사용 가능하다

---

subword tokenization 알고리즘 3가지를 볼 예정

## BPE(Byte Pair Encoding)

aclanthology.org

research background

- 2016, Sennrich , Neural Machine Translation of Rare Words with Subword Units
    - 기존 NMT들은 고정된 Fixed voacbulary 사용함
    - 따라서 당연히 OOV 문제 발생
- 논문의 저자들은 희귀 단어를 더 작은 subword 단위로 분절하는 것을 제안
    - 기존에 학습한 subword를 조합하여 새로운 단어 표현 및 번역이 가능할 거라고 예상
    - 이를 위해, 기존 데이터 압축 알고리즘 Byte Pair encoding(BPE)를 단어 분절에 적용

Methodology & Process

- “가장 빈번하게 등장하는 인접한 symbol pair를 하나의 새로운 symbol로 병합”
    - process : word 단위 pre-tokenization으로 나누고 빈도 수 계산
    - → character 단위로 initialization
    - → 단어 마지막에 End-of-Word symbol 추가
    - → 모든 pair의 frequency 계산
    - → 가장 많이 등장한 pair merge → 이 과정 반복
- 즉, BPE는 “통계적 등장 빈도”를 바탕으로 subword tokenization을 수행

Training & Encoding

training 은 위 과정을 통해 최종 subword vocabulary와 Merge Rules를 학습함

그 뒤 Encoding 과정에서 앞서 학습한 Merge rules를 바탕으로 새로운 text를 tokenization 함

## WordPiece

[](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=6289079)

Research Background

- Schuster & Nakajima (2012), Japanese and Korean Voice Search
- 음성 검색에서 고유명사, 신조어, 다양한 단어 형태를 처리해야 하는 문제 발생
- 이를 위해 subword tokenization 제안
    - 하지만 BPE랑 합칠 pair를 평가하는 기준이 다름

Methodology

- character level initialization
    - 하지만 bpe와 다르게 continuation prefix(##) 추가
    - word → w, ##o, ##r, ##d

- pair scoring
    - pair frequency와 개별 frequency를 이용해 score 계산
    
    $$
    Score(a, b) = \frac{freq(a,b)}{freq(a) \times freq(b)}
    $$
    
    - 위 식을 통해 어떤 pair를 합칠지 정함
    
![subword-tokenization-1.png](/images/uploads/subword-tokenization-1.png)

위 예시 표를 보시면

pair A의 a, b symbol은 함께 30번, 각각 100번씩 등장

pair B의 c, d, symbol은 함께 10번, 각각 10번씩 등장

BPE에서는 함께 등장한 빈도만 보므로 당연히 pair A를 선택해 merge

하지만 wordpiece score로 보면 pair B를 선택함

왜냐하면 wordPiece 는 단순 빈도가 아니라 symbol간의 상대적인 결합 특성을 반영하기 때문이다

- pair B의 예시를 보시면 c, d가 각각 10번씩 나왔는데 함께 10번 나왔다는 것은 개별로는 안나오고 모두 함께 등장했다는 뜻이다

Encoding 에서는 Longest-Match-First를 사용함

- 이 방식은 vocabulary에 존재하는 가장 긴 subword를 선택하는 greedy 한 알고리즘
    - unhappyness 가 입력
    - 이 문자 전체를 vocab에서 찾음
    - 없으면 뒤에서 한 글자 씩 줄여 가며 vocab에서 찾음
    - 이를 반복하여 vocab에 있는 가장 긴 subword들로 분절 됨

## Unigram Language Model

aclanthology.org

Research Background

- 2018, Taku Kudo의 Subword Regularization paper에서 제안
- BPE와 WordPiece는 encoding과정에서 동일한 입력에 대해 항상 고정된 분절 결과를 생성
    - 하지만, 실제 단어는 여러 subword sequence로 분절 가능
    - unlockable → (un, lockable), (unlock, able)
    - 이를 Segmentation Ambiguity라고 함
- 논문 저자들은 이런 다양한 분절로 모델을 학습하면, 모델의 강건성(Robustness) 향상될 거라고 예상

Methodology

- 기본 subowrd 후보를 많이 추출해 큰 vocab을 구성 하고 확률 초기화
- 그 다음 EM algorithm을 통과함
    - E-step : subword들의 expected count를 계산
    - M-step : 앞에서 구한 exptected count를 바탕으로 확률 갱신
- 그리고 Vocabulary Pruning 수행 : likelihood의 영향을 고려해 후보 subowrd 제거
- 이 과정을 여러번 반복

Encoding

- 위에서 구한 subword들의 확률을 곱해 text를 어떻게 나눌지의 확률을 계산
- 가장 큰 확률의 subword sequence로 분절 수행
    - ex) un(0.20), lockable(0.10) → P(un, lockable) = 0.020
    - unlock(0.05), able(0.20) → P(unlock, able) = 0.010
        - unlockable은 un + lockable로 분절

Subword Regularization

- 논문에서 다룬 핵심 개념으로
- 동일한 문장에서 여러 subowrd segmentation 생성 가능
- 이때, NMT의 parameter update마다 새로운 분절을 sampling 하여 학습
    - 성능 좋아짐 사용하니까

---

위 알고리즘들을 실제로 사용 할 수 있도록 구현한 library - SentencePiece, tiktoken

## SentencePiece

- 기존 subword tokenization에서는 일반적으로 initialization 하기전 word 단위로 나누는 pre-tokenization 수행
    - 하지만 일본어나 중국어 등 공백이 없는 언어에서는 공백기준으로 나누는 pre-tokenization 할 수 없음
- 따라서, Raw text 자체를 바로 subword model에 training하는 방법을 사용

Methodology

- Raw text를 pre-tokenization 하지 않고 normalizer에 넣은 다음 바로 train
    - normailizer : unicode 기반 정규화 수행, dummy prefix(_) 추가
        - dummy prefix는 문장 사이와 단어 사의 공백을 나타내는 기호
- 그 다음, BPE나 Unigram LM 기반의 train 수행

## tiktoken, Byte-level BPE

- 기존 앞에서 본 character-level BPE는 미등록 문자에 대한 OOV 문제 발생 가능
    - 전체 Unicode를 vocab에서 지원 시 130,000+ 개의 inital symbols 필요
- Byte-level BPE
    - 문자를 우선 UTF-8 기반으로 변환 한 다음
    - BPE 수행
    - ex) ‘가’ → ‘EA’, ‘B0’, ‘80’
    - bytes는 0~255 사이로 256개의 subword들로 모든 문자 표현 가능
    - ⇒ OOV 문제 해결

하지만 위 방법에서는 문제 발생

- dog, dog., dog!, dog? 이 Token들이 각각 개별 Token으로 학습 됨
- 따라서 regex-based pre-tokenization을 수행
    - 정규표현식을 이용해 문자열을 문자, 숫자, 문장 부호 등의 범주로 나눈 뒤
    - 바이트로 변호나하고 BPE를 수행
