---
title: ROC Curve와 AUC
description: ROC Curve와 AUC의 개념을 정리한 글입니다. threshold 변화에 따른 TPR/FPR 관계와, 분류 모델이
  positive와 negative를 얼마나 잘 구분하는지를 평가하는 방법을 설명합니다.
pubDate: 2026-04-26
updatedDate: ""
slug: roc-curve-and-auc
topic: study
tags:
  - ai-core
  - ROC Curve
  - AUC
  - Classification
draft: false
featured: false
---

## ROC Curve와 AUC란?

이진분류 모델은 보통

각 샘플이 positive일 **확률** 또는 **score**를 출력한다.

그 다음, 이 값을 기준으로 threshold를 정해서

- threshold 이상이면 positive
- threshold 미만이면 negative

로 분류한다.

그런데 threshold를 어디에 두느냐에 따라

모델의 성능은 달라진다.

이때 threshold를 여러 값으로 바꾸면서

모델이 얼마나 잘 positive와 negative를 구분하는지 보여주는 그래프가 **ROC curve**이다.

그리고 ROC curve를 하나의 숫자로 요약한 값이 **AUC**이다.

## TPR과 FPR

ROC curve를 이해하려면 먼저 두 가지 값을 알아야 한다.

- **TPR (True Positive Rate)**
- **FPR (False Positive Rate)**

### TPR (True Positive Rate)

TPR은 실제 positive 중에서

모델이 positive로 맞춘 비율이다.

즉, **recall과 같다.**

$$
\text{TPR} = \frac{TP}{TP+FN}
$$

→ 실제 positive를 얼마나 잘 잡아내는가

## FPR (False Positive Rate)

FPR은 실제 negative 중에서

모델이 positive로 잘못 예측한 비율이다.

$$
\text{FPR} = \frac{FP}{FP+TN}
$$

→ 실제 negative를 얼마나 자주 positive로 잘못 올리는가

## ROC Curve

ROC curve는 threshold를 바꿔가며 계산한

- x축: **FPR**
- y축: **TPR**

을 그린 그래프이다.

즉, ROC curve는

**False Positive Rate와 True Positive Rate 사이의 관계를 보여주는 곡선**이다.

좋은 분류기는

- positive는 많이 잡고 싶고
- negative를 positive로 잘못 올리는 경우는 적어야 한다.

즉,

- TPR은 높을수록 좋고
- FPR은 낮을수록 좋다.

그래서 ROC curve에서는

**왼쪽 위에 가까울수록 좋은 모델**이라고 본다.

## AUC

AUC는 **Area Under the ROC Curve** 의 줄임말로,

ROC curve 아래 면적을 뜻한다.

즉, ROC curve를 하나의 숫자로 요약한 값이다.

AUC가 높다는 것은

모델이 positive와 negative의**순서를 잘 구분한다**는 뜻이다.
