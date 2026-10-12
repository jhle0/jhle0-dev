---
title: "Stanford CS231n | Lecture 2: Image Classification with Linear Classifiers"
description: Stanford CS231n Lecture 2 강의를 바탕으로 이미지 분류의 기본 개념과 어려움, Nearest
  Neighbor 및 KNN의 원리와 한계, Linear Classifier의 구조와 학습 방식을 정리한 학습 노트입니다.
pubDate: 2026-10-12
updatedDate: ""
slug: stanford-cs231n-lecture-02-image-classification-with-linear-classifiers
topic: study
tags:
  - CS231n
  - Computer Vision
  - Deep Learning
  - Image Classification
  - KNN
  - Linear Classifier
  - Cross-Entropy
draft: false
series: Stanford CS231N Deep Learning for Computer Vision | Spring 2025
seriesOrder: 2
featured: false
---
## **Stanford CS231N Deep Learning for Computer Vision | Spring 2025 |** Lecture 2: Image Classification with Linear Classifiers

> **Lecture:** [Stanford CS231n Spring 2025 — Lecture 2: Image Classification with Linear Classifiers](https://www.youtube.com/watch?v=pdqofxJeBN8)
>
> **Lecturer:** Ehsan Adeli
>
> **Sources:**
> - [Lecture Slides](https://cs231n.stanford.edu/slides/2025/lecture_2.pdf)
> - [CS231n Official Course Website](https://cs231n.stanford.edu/2025/)

## Image Classfication

Image Classification은 입력 이미지를 미리 정의된 class 중 하나로 분류하는 문제

Human-machine 사이에는 semantic gap이 존재

- Human은 이미지의 의미를 직관적으로 이해
- 하지만 Machine에서는
    - image는 0~255 사이의 tensor로 표현된다
    - 또한 이 값들이 다음 여러 요소에 의해 달라진다
        - Viewpoint Variation:카메라 시점 변화
        - Illumination: 조명 변화
        - Background Clutter: 복잡한 배경
        - Occlusion: 물체의 일부가 가려짐
        - Deformation: 물체의 형태 변화
        - Intraclass Variation: 같은 class 내부의 다양한 형태
        - Context: 주변 환경과 맥락의 영향
- 이러한 문제 때문에 pixel 값만으로 이미지의 의미를 파악하기 어렵다

따라서 사람이 직접 분류 규칙을 정의하는 대신, 데이터에서 분류 기준을 학습하는 Data-Driven Approach를 사용한다.

1. Image와 Label로 구성된 Dataset 수집
2. Machine Learning 알고리즘으로 Classifier 학습
3. 새로운 Image를 이용해 Classifier 평가

## two popular method

### Nearest Neighbor Classifier

가장 단순한 Image Classification 방법 중 하나로, 입력 이미지와 가장 유사한 training image의 label을 예측 결과로 사용한다

- train() - memorize all data and labels
- predict() → predict the label of the most similar training image
    - 모든 image(lookup table)와의 distance를 게산
    - L1 distance, L2 distance 사용

how fast training and prediction?

- train - O(1), predict - O(N)

→ this is bad : we want classifiers that are fast at prediction ; slow for training is ok

K-nearest Neighbors(KNN)

nearest neighbor를 확장한 방법

- take majority vote from k closest points
- → problems : white area 생긴다
- K 값은 hyperparameter

하지만 이 방법은 Limitations 존재

- Raw Pixel Distance는 실제 Semantic Similarity를 잘 반영하지 못함
- Viewpoint, Illumination, Background 등의 변화에 민감
- 학습 데이터가 많아질수록 Prediction 비용과 저장 공간 증가

→ 따라서 단순한 pixel 기반 KNN은 복잡한 Image Classification에 적합하지 않다

### Linear Classifier

Nearest Neighbor와 달리 Weight와 Bias를 학습하는 Parametric Approach

- image를 f(x, W)를 통과해 class scores 출력
- logists 계산 → logistic → -log P (= Cross Entrpy Loss)
    - 정답 확률이 높을수록 Loss 감소
    - Cross-Entropy 최소화는 정답 분포와 예측 분포 사이의 KL Divergence 최소화와 동일 (정답 분포가 고정된 경우)

**Limitations**

Linear Classifier는 linear decision boundary로 class를 구분하므로 복잡한 nonlinear pattern을 표현하기 어렵다

→  Linear Layer에 Nonlinear Activation Function을 결합하면 Neural Network로 확장할 수 있다
