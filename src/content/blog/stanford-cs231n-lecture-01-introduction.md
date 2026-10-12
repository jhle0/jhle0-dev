---
title: "Stanford CS231n | Lecture 1: Introduction"
description: Stanford CS231n Lecture 1 강의를 바탕으로 Computer Vision과 Deep Learning의
  역사, ImageNet의 등장, CNN 아키텍처의 발전 과정을 정리한 학습 노트입니다.
pubDate: 2026-10-12
updatedDate: ""
slug: stanford-cs231n-lecture-01-introduction
topic: study
tags:
  - CS231n
  - Computer Vision
  - Deep Learning
draft: false
series: "Stanford CS231N Deep Learning for Computer Vision | Spring 2025 "
seriesOrder: 1
featured: false
---
## **Stanford CS231N Deep Learning for Computer Vision | Spring 2025 | Lecture 1: Introduction**

> **Lecture:** [Stanford CS231n Spring 2025 — Lecture 1: Introduction](https://www.youtube.com/watch?v=2fq9wYslV0A)
>
> **Lecturers:** Fei-Fei Li, Ehsan Adeli
>
> **Sources:**
> - [Lecture Slides — Part 1](https://cs231n.stanford.edu/slides/2025/lecture_1_part_1.pdf)
> - [Lecture Slides — Part 2](https://cs231n.stanford.edu/slides/2025/lecture_1_part_2.pdf)
> - [CS231n Official Course Website](https://cs231n.stanford.edu/2025/)

다루는 주제 : AI → ML → DL → Computer vision (NLP & Robotics)

## Brief History of CV and DL

- 약 540 million years ago — **Cambrian Explosion**
    - 생물의 시각 기관(Eyes)이 발달하면서 환경을 더 잘 인식할 수 있게 되었고, 이를 처리하기 위한 신경계와 행동 능력의 발달에도 영향을 주었을 것이라는 가설
    - Vision은 생물학적 지능의 발달의 primary 요소

![stanford-cs231n-lecture-01-introduction-1.png](/images/uploads/stanford-cs231n-lecture-01-introduction-1.png)

- Hubel and Wiesel (1959)
    - Neuron은 각각 특정 영역을 담당하는 Receptive Field 가지고
    - neuron마다 특정 방향의 edge, line 등의 visual pattern에 선택적으로 반응한다는 것을 발견
    - 단순한 특징에서 더 복잡한 특징으로 이어지는 hierarchical visual processing의 아이디어를 보여줌
    - 이후 CNN의 receptive field와 hierarchical feature representation을 이해하는 데 중요한 생물학적 배경이 됨

이후 Roberts, David Marr, Gen. Cylinders, Canny 등 여러 연구로 Vision 주제 발전

초기 Computer Vision은 주로 사람이 직접 정의한 edges, shapes, geometry 등의 구조를 이용하여 이미지를 이해하려는 접근을 사용

하지만 기대만큼 문제가 쉽게 해결되지 않았고, AI 분야 전체가 침체되는 AI Winter를 겪게 된다.

이 과정과 병렬적으로 Deep Learning 도 발전했다

perceptron이 나오고

- 1980년에 Neovognitron이라는 모델이 Fukushima에서 제안되었다
- 현재 CNN 의 초기 모델의 구조의 기초가 되었다
    - 하지만, 여러 문제(weight 학습 방법, 데이터 양, 컴퓨팅 능력)때문에 크게 발전하지 못했다

이후 backpropagation이 나오면서 MLP를 훈련시킬수 있게 됐다

- 1998 LeCun이 Neocognitron-like architecture를 제안했다 - LeNet

그 이후 점점 발전해 DeepLearning이 나왔다

⇒ 이때, Vision 분야에 backprop, Large-scale Data, Computation이 합쳐지며 크게 발전하게 됐다

### ImageNet

Fei-Fei Li 연구실에서 AI와 Computer Vision의 발전을 위해서는 **large-scale, high-quality labeled data**가 중요하다고 보았고

이에 ImageNet 프로젝트를 구축했고, 2009년에 대규모 hierarchical image database를 발표했다

이후 ILSVRC(ImageNet Larhe Scale Visual Recognition Challenge)를 통해 같은 데이터셋에서 여러 알고리즘을 객관적으로 비교할 수 있는 benchmark 만들어졌다

- dataset은 1.43M 규모

2012년에 image classification 성능을 크게 높인 AlexNet이 제안되고,

이후 CNN architecture가 빠르게 발전하면서 VGG, GoogLeNet, ResNet, SENet, EfficientNet 등 점점 발전된 Model들이 제안되었다

→ Computer Vision의 발전은 Algorithm + Data + computation 이 세 요소가 함꼐 발전하면서 가능해졌다
