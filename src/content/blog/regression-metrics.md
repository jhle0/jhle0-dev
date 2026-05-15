---
title: 회귀 평가 지표 (Regression Metrics)
description: 회귀 문제에서 사용하는 대표적인 평가 지표인 MAE, MSE, RMSE, MAPE, R² Score를 정리한 글입니다.
  각 metric의 수식, 해석, 장단점과 어떤 상황에서 사용하는 것이 적절한지도 함께 설명합니다.
pubDate: 2026-04-21
updatedDate: ""
slug: regression-metrics
topic: study
tags:
  - ai-core
  - Regression
  - Regression Metrics
  - MAE
  - MSE
  - RMSE
  - MAPE
  - R2 Score
draft: false
featured: false
---

회귀 모델은 보통 **오차(error)** 기반 지표(MAE/MSE/RMSE/MAPE)와 **설명력** 지표(R²)를 쓴다.

- **MAE**: 오차를 “그대로” 평균 → **큰 오차에 덜 민감**(outlier에 상대적으로 강함)
- **MSE/RMSE**: 오차를 **제곱** → **큰 오차를 강하게 처벌**
- **MAPE**: 오차를 **비율(%)**로 → **스케일 비교가 쉬움**, 대신 **0 근처에서 터짐**
- **R²**: 평균 예측(상수모델) 대비 얼마나 좋아졌나 → **상대 비교**

## MAE(Mean Absolute Error), 평균 절대 오차

---

$$
MAE= \frac1n\sum |y - \hat y|
$$

실제 정답 값과 예측 값의 차이를 절댓값으로 변환한 뒤 합산하여 평균을 구한다.

해석 : “평균적으로 예측이 실제와 **몇 단위** 차이나는가”

→ 특이값이 많은 경우에 주로 사용

왜냐하면 오차를 그대로 더하기 때문에 제곱해서 더하는 MSE,RMSE 보다는 outlier에 덜 민감하다

- 장점 :
    - 직관적임
    - 정답 및 예측 값과 같은 단위를 가짐
    - outlier에 덜 민감
- 단점 :
    - 실제 정답보다 낮게 예측했는지, 높게 했는지를 파악하기 힘듦
    - 스케일 의존적임(scal dependency) → 데이터 스케일이 다르면 MAE 절대값 비교가 어렵다

## MSE(Mean Squared Error), 평균  제곱 오차

---

$$
MSE= \frac1n\sum (y - \hat y)^2
$$

실제 정답 값과 예측 값의 차이를 제곱한 뒤 평균을 구한다.

해석 : 큰 오차를 강하게 처벌한다

- 장점 :
    - **미분이 깔끔**해서 최적화에 편하다
    - **큰 오차를 강하게 줄이고 싶을 때** 목적함수로 적합
- 단점 :
    - **outlier**에 매우 민감
    - 단위가 제곱 단위라 해석이 불편

## RMSE(Root Mean Squared Error), 평균  제곱근 오차

---

$$
RMSE= \sqrt{\frac1n\sum (y - \hat y)^2} = \sqrt{MSE}
$$

MSE에 루트는 씌워서 구한다.

해석 : “평균적으로 몇 단위 정도 틀리는가”를 **MSE 기반으로** 표현한 것

- 장점 :
    - 단위가 y와 동일 → **MSE보다 해석이 쉬움**
    - 큰 오차를 더 중요하게 보는 목적에 맞는다
- 단점 :
    - outlier 민감
    - 스케일 의존적임(scal dependency) → 데이터 스케일이 다르면 MAE 절대값 비교가 어렵다

## MAPE(**Mean Absolute Percentage Error), 평균 절대 비율 오차**

---

$$
MAPE = \frac{100}{n}\sum |\frac{y - \hat y}{y}|
$$

MAE를 비율, 퍼센트로 표현하여 스케일 의존적 에러의 문제점을 개선한다.

해석 : “평균적으로 실제값 대비 몇 % 틀리는가”

- 장점 :
    - **스케일이 달라도 비교가 쉬움**(%)라서
- 단점 :
    - 실제 정답보다 낮게 예측했는지, 높게 했는지를 파악하기 힘듦
    - 실제 정답이 0에 가까울수록 무한대의 값으로 발산

## R2 score (Coefficient of Determination)

---

$$
R^2 = 1 - \frac{\sum(y-\hat y)^2}{\sum(y - \bar y)^2}

$$

- 분자: 모델이 못 맞춘 제곱오차(SSE)
- 분모: 그냥 평균으로 예측했을 때의 제곱오차(SST)

해석 : “**평균 예측(상수 모델)** 대비, 내 모델이 오차를 얼마나 줄였는가”

1에 가까울 수록 좋다.

- 장점 :
    - 스케일이 달라도 **상대 비교**가 가능(무차원)
    - 베이스라인(평균모델) 대비 개선 정도를 한 숫자로 보여줌
- 단점 :
    - 같은 데이터라도 **타깃 분산이 작으면** R²가 민감하게 흔들릴 수 있음
    - 모델 비교 시에도 **절대오차가 작은지**는 R²만으로 안 보인다 → MAE/RMSE랑 같이 봐야 한다.

## Metric 선택 가이드

- outlier 많음/노이즈 큼 → **MAE**
- 큰 오차를 특히 줄여야 함(안전/리스크) → **RMSE**
- 스케일 다른 데이터 간 비교 필요, y가 0이 아님 → **MAPE**
- 보고서에 직관적 단위로 오차 제시 → **MAE/RMSE**
- “평균 모델 대비 얼마나 개선?” → **R² (단독 사용 금지, MAE/RMSE와 같이)**
