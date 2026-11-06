---
title: "Stanford CS231n | Lecture 6: CNN Architectures"
description: Stanford CS231n 6강에서는 CNN을 구성하는 주요 계층, 활성화 함수, 가중치 초기화 방법을 살펴보고,
  데이터 전처리, 증강, 전이 학습 및 하이퍼파라미터 탐색 등 CNN의 설계와 학습 방법을 정리한 글입니다.
pubDate: 2026-11-06
updatedDate: ""
slug: cs231n-lecture-6-cnn-architectures
topic: study
tags:
  - CS231n
  - Computer Vision
  - CNN
  - Deep Learning
  - Normalization
  - Data Augmentation
  - Transfer Learning
draft: false
series: Stanford CS231N Deep Learning for Computer Vision | Spring 2025
seriesOrder: 6
featured: false
---
> **Lecture:** [Stanford CS231n Spring 2025 — Lecture 6: CNN Architectures](https://www.youtube.com/watch?v=aVJy4O5TOk8)
>
>**Lecturer:** Zane Durante
>
>**Sources:**
>- [Lecture Slides](https://cs231n.stanford.edu/slides/2025/lecture_6.pdf)
>- [CS231n Official Course Website](https://cs231n.stanford.edu/2025/)

이번 강의는 다음과 같은 단계로 진행

- How to build CNNs
    - layers in CNNs
    - activation function
    - CNN architectures
    - weight initialization
- How to train CNNs
    - data preprocessing
    - data argmentation
    - transfer learning
    - hyperparameter selection

---

### Layers in CNNs

- convolution layer, pooling layer 들이 반복적으로 사용됨
- FC layer로 마지막 score 계산(최종 class 개수를 맞춰서)
- Normalization layers
    - Normalization은 다음과 같은 2단계로 진행된다
    1. Normalize input data (평균 0, 분산 1 이 되도록)
    2. scale/shift using learned parameters

Batch Normalization / Layer Normalization

- BN - 하나의 batch 안 모든 data의 동일한 feature들을 기준으로 정규화
- LN - 각 data(sample)의 모든 feature 들에 정규화
- 따라서, BN은 batch 내 다른 data값에 영향을 받지만, LN은 다른 sample의 값에는 영향을 받지 않는다
- BN은 보통 CNN에서, LN은 transformer구조에서 많이 사용

- Dropout - add randomization during training process
    
    → forces the network to have redundant representation
    
    즉, 특정 neuron에 너무 의존하는 것을 방지
    

### Activation function

model에 non-linearities를 추가하는 역할

- sigmoid - backprop에서 gradient가 계속 작아지는 vanishing gradient문제
- ReLU - compute  비용 적다, but dead ReLUs when x < 0
- GeLU - more compute cost than ReLU
    - ReLU보다는 vanishing gradient 완화
    - 그래도 매우 작은 음수에서는 여전히 gradient 0 → normalization 의 역할 중요

### CNN Architectures

> 다음 참고 : CNN 계열 모델 (CNN Architectures: AlexNet to EfficientNet)
> 

### weight initialization

- too small, big → 평균과 분산이 너무 작아지거나 커진다
- 따라서, 차원의 크기를 반영한 초기화 기법들 사용
    - Lecun, He, Xavier 등
    
    > 자세한 설명 : Weight Initialization
    > 

---

## How to train CNNs

- data preprocessing - 학습 전 image를 전처리
    
    각 channel 별로 평균, 분산을 구해 정규화
    
    - ImageNet의 사진으로 미리 구해둔 평균과 분산 값 많이 사용

- data augmentation
    - 다양한 방법으로 augmentation
    - 데이터 수를 늘릴 수 있고, 여러 이미지 변형에 모델이 더 강해짐

- transfer learning - 미리 train된 model에서 fine-tuning

- Hyperparameters selection
    1. check initial loss
    2. Overfit a small sample
    3. Find LR that makes loss go down
    4. Coarse grid, train for 1~5 epochs
    5. Refine grid, train longer
    6. Look at loss and accuracy curves
    7. GOTO sept 5
