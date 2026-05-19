---
title: 컴퓨터 비전 주요 과제 (Computer Vision Task Basics)
description: 컴퓨터 비전에서 다루는 대표적인 태스크인 이미지 분류, 객체 탐지, 세그멘테이션, VQA, 이미지-텍스트 검색,
  Visual Grounding을 정리한 글입니다.
pubDate: 2026-05-19
updatedDate: ""
slug: computer-vision-task-basics
topic: study
tags:
  - Computer Vision
  - Deep Learning
  - Image Classification
  - Object Detection
  - Semantic Segmentation
  - Instance Segmentation
  - Image Captioning
  - Visual Question Answering
  - Image-Text Retrieval
  - Visual Grounding
draft: false
series: Computer Vision Foundations
seriesOrder: 2
featured: false
---
# Computer Vision Task Basics

## Computer Vision Task란?

Computer Vision은 컴퓨터가 이미지나 영상에서 의미 있는 정보를 이해하도록 만드는 분야이다.

이미지를 단순히 숫자 배열로 보는 것이 아니라,

그 안에 어떤 객체가 있는지,

객체가 어디에 있는지,

각 픽셀이 어떤 영역에 속하는지,

이미지와 텍스트가 어떻게 연결되는지를 다룬다.

대표적인 Computer Vision task는 다음과 같다.

- Image Classification
- Object Detection
- Semantic Segmentation
- Instance Segmentation
- Image Captioning
- Visual Question Answering, VQA
- Image-Text Retrieval
- Visual Grounding

## Image Classification

Image Classification은 이미지 전체가 어떤 class에 속하는지 예측하는 task이다.

즉, 입력 이미지 하나에 대해 하나의 label을 예측한다.

예를 들어 이미지가 다음 class 중 무엇인지 분류할 수 있다.

- 고양이
- 강아지
- 자동차
- 비행기

입력과 출력은 다음과 같이 볼 수 있다.

$$
\text{Image}\rightarrow\text{Class Label}
$$

CNN에서 가장 기본적으로 다루는 task가 image classification이다.

Image Classification에서는 이미지 안의 객체 위치를 직접 예측하지 않는다.

이미지 전체를 보고 가장 적절한 class를 예측한다.

## Object Detection

Object Detection은 이미지 안에 어떤 객체가 있는지뿐만 아니라,

그 객체가 어디에 있는지도 함께 예측하는 task이다.

즉, classification과 localization을 함께 수행한다.

출력은 보통 다음 정보를 포함한다.

- Class label
- Bounding box
- Confidence score

Bounding box는 객체의 위치를 사각형으로 나타낸 것이다.

보통 다음과 같은 좌표로 표현한다.

$$
(x_{\min}, y_{\min}, x_{\max}, y_{\max})
$$

또는 다음처럼 표현하기도 한다.

$$
(x, y, w, h)
$$

Object Detection의 입력과 출력은 다음과 같다.

$$
\text{Image}\rightarrow\text{Class Label + Bounding Box}
$$

예를 들어 자율주행 이미지에서 자동차, 보행자, 신호등의 위치를 찾는 것이 object detection이다.

대표적인 object detection 모델에는 YOLO, Faster R-CNN, DETR 등이 있다.

## Semantic Segmentation

Semantic Segmentation은 이미지의 각 픽셀이 어떤 class에 속하는지 예측하는 task이다.

Image Classification이 이미지 전체에 하나의 label을 붙이는 문제라면,

Semantic Segmentation은 픽셀 단위로 label을 붙이는 문제이다.

입력과 출력은 다음과 같다.

$$
\text{Image}\rightarrow\text{Pixel-wise Class Map}
$$

예를 들어 자율주행 장면에서 각 픽셀을 다음 class로 분류할 수 있다.

- Road
- Car
- Person
- Sky
- Building

Semantic Segmentation은 객체의 영역을 더 세밀하게 파악할 수 있다는 장점이 있다.

하지만 같은 class에 속하는 여러 객체를 서로 구분하지는 않는다.

예를 들어 이미지 안에 사람이 3명 있어도,

semantic segmentation에서는 세 사람 모두를 같은 `person` class로 표시한다.

즉, semantic segmentation은 **class 단위의 pixel classification**이다.

## Instance Segmentation

Instance Segmentation은 semantic segmentation보다 더 세밀한 task이다.

각 픽셀이 어떤 class에 속하는지 예측할 뿐만 아니라,

같은 class 안에서도 개별 객체(instance)를 구분한다.

예를 들어 이미지 안에 사람이 3명 있다면,

semantic segmentation은 세 사람을 모두 `person`으로 표시한다.

반면 instance segmentation은 다음처럼 각각을 구분한다.

- person 1
- person 2
- person 3

입력과 출력은 다음과 같다.

$$
\text{Image}\rightarrow\text{Instance-level Masks}
$$

즉, instance segmentation은 객체의 class와 pixel-level mask를 동시에 예측하는 task이다.

대표적인 예로 Mask R-CNN이 있다.

## Image Captioning

Image Captioning은 이미지를 입력으로 받아 그 이미지를 설명하는 문장을 생성하는 task이다.

즉, 이미지에서 시각 정보를 추출한 뒤,

그 내용을 자연어 문장으로 표현한다.

입력과 출력은 다음과 같다.

$$
\text{Image}\rightarrow\text{Text Caption}
$$

예를 들어 고양이가 소파 위에 앉아 있는 이미지가 있다면,

모델은 다음과 같은 문장을 생성할 수 있다.

```
A cat is sitting on a sofa.
```

Image Captioning은 vision과 language가 결합된 task이다.

이미지를 이해하는 능력뿐만 아니라,

그 내용을 자연어로 표현하는 language generation 능력도 필요하다.

## Visual Question Answering, VQA

VQA는 Visual Question Answering의 약자이다.

이미지와 질문이 함께 주어졌을 때,

이미지를 보고 질문에 대한 답을 생성하거나 선택하는 task이다.

입력과 출력은 다음과 같다.

$$
\text{Image + Question}\rightarrow\text{Answer}
$$

예를 들어 이미지에 강아지가 있고,

질문이 다음과 같다고 하자.

```
What animal is in the image?
```

모델은 다음과 같이 답할 수 있다.

```
Dog
```

VQA는 단순히 이미지 안의 객체를 인식하는 것에서 끝나지 않는다.

질문을 이해하고,

이미지에서 질문과 관련된 부분을 찾고,

그 정보를 바탕으로 답을 만들어야 한다.

따라서 VQA는 vision understanding과 language understanding이 함께 필요한 task이다.

## Image-Text Retrieval

Image-Text Retrieval은 이미지와 텍스트를 서로 검색하는 task이다.

대표적으로 두 가지 방향이 있다.

- Text-to-Image Retrieval
- Image-to-Text Retrieval

### Text-to-Image Retrieval

텍스트 query가 주어졌을 때,

그 설명과 가장 잘 맞는 이미지를 찾는 task이다.

예를 들어 다음 문장이 query로 주어졌다고 하자.

```
a dog running on the beach
```

모델은 이 문장과 가장 잘 맞는 이미지를 검색해야 한다.

### Image-to-Text Retrieval

이미지가 주어졌을 때,

그 이미지와 가장 잘 맞는 텍스트 설명을 찾는 task이다.

Image-Text Retrieval에서는 이미지와 텍스트를 같은 embedding space에 정렬하는 것이 중요하다.

이 개념은 CLIP 같은 vision-language model에서 핵심이 된다.

## Visual Grounding

Visual Grounding은 자연어 표현이 이미지의 어느 부분을 가리키는지 찾는 task이다.

즉, 텍스트와 이미지 영역을 연결하는 문제이다.

입력과 출력은 다음과 같다.

$$
\text{Image + Text Phrase}\rightarrow\text{Image Region}
$$

예를 들어 이미지와 함께 다음 문장이 주어졌다고 하자.

```
the red cup on the table
```

Visual Grounding 모델은 이미지 안에서 이 표현이 가리키는 빨간 컵의 위치를 찾아야 한다.

출력은 bounding box일 수도 있고,

segmentation mask일 수도 있다.

Visual Grounding은 VLM과 VLA에서 매우 중요한 task이다.

왜냐하면 언어 명령을 실제 시각적 대상과 연결해야 하기 때문이다.

예를 들어 로봇에게 다음과 같이 명령한다고 하자.

```
Pick up the red cup.
```

이때 로봇은 먼저 이미지 안에서 `red cup`이 무엇인지 찾아야 한다.

이처럼 언어 표현을 시각적 객체나 영역과 연결하는 능력이 visual grounding이다.

![computer-vision-task-basics-1.png](/images/uploads/computer-vision-task-basics-1.png)
