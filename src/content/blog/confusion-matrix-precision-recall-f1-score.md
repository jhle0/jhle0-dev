---
title: 혼동 행렬과 Precision / Recall / F1-score (Confusion Matrix & Precision /
  Recall / F1-score)
description: Confusion Matrix를 기반으로 Accuracy, Precision, Recall, F1-score의 의미와
  차이를 정리한 글입니다. 클래스 불균형 문제에서 accuracy의 한계와 precision-recall trade-off도 함께 설명합니다.
pubDate: 2026-04-24
updatedDate: ""
slug: confusion-matrix-precision-recall-f1-score
topic: study
tags:
  - ai-core
  - Confusion Matrix
  - Precision
  - Recall
  - F1 Score
  - Classification
draft: false
featured: false
---

‘마이클’이라는 이름을 가진 사람들이 직장을 그만두는 데이터를 가지고 학습한 모델이 있다고 해보자.

이 모델은 이름이 ‘마이클’인 사람은 모두 직장을 그만둘거라고 예측할 것이다.(매개변수가 이름 만 있다고 가정하자)

이때, accuracy가 문제가 되는 경우가 있다.

100명의 직원 중 ‘마이클’인 직원이 한명 있고,

‘샘’이라는 직원이 99명이 있다고 하자.

모델은 마이클이 그만둘 것이라고 예측할 것이다.

실제로는 ‘샘’이 그만 두었다.

이때 모델의 정확도는 어느 정도인가?

100명 중 단 2명에 대해서만 잘못 예측했기 때문에

→ 정확도는 98%이다.

이렇게, 불균형한 데이터의 경우

정확도 지표는 큰 오해를 일으킬 수 있다.

→ 이를 방지하기 위해 **confusion matrix**를 사용한다.

## Confusion Matrix(혼동 행렬)

confusion matrix는 실제 결과에 대한 예측을 나누어

- TP(True Positive)
- TN(True Negative)
- FP(False Positive)
- FN(False Negative)

을 나타내는 표이다.

| 실제 \ 예측 | positive | negative |
| --- | --- | --- |
| positive | TP | FN |
| negative | FP | TN |

### Accuracy(정확도)

전체 데이터 중 모델이 올바르게 예측한 비율이다.

즉, TP와 TN을 전체 데이터 수로 나눈 값이다.

TP와 TN은 confusion matirx의 대각선 값들이다.

$$
\text accuracy = \frac{TP + TN}{TP + TN + FP + FN}
$$

accuracy는 직관적이지만,

데이터가 불균형한 경우에는 실제 성능을 잘 반영하지 못할 수 있다.

### Recall(재현율)

**실제로 positive를 positive로 잘 예측한 비율**이다

$$
\text recall= \frac{TP}{TP +  FN}
$$

Recall에서는 False Positive는 고려하지 않는다.

대신 Recall은 실제 positive를 놓치는 경우(FN)에 특히 민감하다.

즉, positive를 negative로 예측하면 위험한 경우에 사용된다.

예 :

암 진단 같은 경우에 중요하다.

암이 아니지만 암이라고 예측하는 경우는 괜찮지만,

암인데 암이 아니라고 예측하면 큰일 나는 경우이다.

### Precision(정밀도)

**예측은 positive로 했는데 실제로 positive인 비율**

$$
\text precision= \frac{TP }{TP + FP }
$$

precision에서는 False Negative는 중요하지 않다.

Recall은 실제 positive를 놓치는 경우(FN)에 특히 민감하다.

즉, Negative인데 positive로 예측하면 안 된다.

예)

스펨 메일 분류기

스펨 메일인데 아니라고 분류하는 것은 괜찮지만,

스펨이 아닌데 스펨이라고 분류해버리면 안되는 경우이다.

## Recall Precision Trade-off

recall과 precision사이에는 **trade-off**가 존재한다.

즉, recall이 높아진다면 precision이 낮아질 수 밖에 없고,

precision이 높아진다면 recall이 낮아질 수 밖에 없다.

이진분류 상황에서 **threshold**값을 통해 trade-off를 조절할 수 있다.

positive상황의 label을 1이라고 하자.

threshold을 낮추면 모델이 positive라고 예측하는 횟수가 많아진다는 것과 동일하다.

recall의 의미는 실제 positive인데 모델이 positive로 예측한 비율이다.

따라서, 분모의 FN(실제로 positive, 모델이 negative라고 예측) 값이 낮아진다.

→ 이로인해, **recall은 커지**게 된다.

반대로, precision은 모델이 positive라고 예측했을 때 실제 값이 positive인 비율이다.

그래서 분모의 FP(모델이 positive라고 예측, 실제로는 Negative)값이 커지게 된다.

→ 따라서, **precision은 작아**진다.

### F1-score

F1-score는 **Precision과 Recall의 조화평균**이다.

$$
\text{F1-score} = \frac{2 \times Precision \times Recall}{Precision + Recall}
$$

precision과 recall이 둘 다 높을 때 높은 값을 가진다.

한쪽만 높고 다른 한쪽이 낮으면 F1-score는 낮아진다.

F1-score는 특히 클래스 불균형 상황에서 accuracy보다 더 유용할 수 있으며,

precision과 recall을 함께 고려하고 싶을 때 사용한다.
