---
title: "Stanford CS231n | Lecture 5: Image Classification with CNNs"
description: 이미지 분류에서 수작업 Feature Extraction부터 CNN 기반의 자동 Feature Learning까지의 발전
  과정을 정리한 글입니다. CNN의 핵심 구성 요소인 Convolution, Stride, Padding, Receptive Field,
  Pooling을 간략하게 다룹니다.
pubDate: 2026-11-04
updatedDate: ""
slug: cs231n-lecture-5-image-classification-with-cnns
topic: study
tags:
  - CS231n
  - Computer Vision
  - Deep Learning
  - CNN
  - Convolution
draft: false
series: Stanford CS231N Deep Learning for Computer Vision | Spring 2025
seriesOrder: 5
featured: false
---
> **Lecture:** Stanford CS231n Spring 2025 — Lecture 5: Image Classification with CNNs
> 
> 
> **Lecturer:** Justin Johnson
> 
> **Sources:**
> 
> - Lecture Slides
> - CS231n Official Course Website

- 앞 강의에서는 linear classifier로 image 분류
    - 모든 pixel 값들이 입력으로 들어가, FC layer 통과 후 점수 계산

→

- image features를 추출해 입력에 사용
    - color histogram : 색상 정보
    - Histogram of Oriented Gradients(HOG) : 구조 정보 활용
    - 이런 여러 feature를 concat해 입력으로 사용

→ 

- Full NN 사용
    - human-made feature 추출기 보다 gradient descent를 통해 어떤 feature를 사용할지 자동으로 추출
    - human은 NN의 architecture 만 설계
    - feature는 NN가 알아서 추출
    - image 구조를 그대로 두고(2차원 으로) - 이를 계산할 수 있는 convolution 계산 사용
    - (2012 ~ 2020) convNets dominate all vision tasks

→

- 2021 - Transformer가 vision tasks 처리 : ViT

### CNN

- convolution layer
- stride, padding & some formula
- receptive fields
- pooling layer

> CNN 더 자세한 설명 : https://jhle0-dev.vercel.app/blog/cnn-foundations
