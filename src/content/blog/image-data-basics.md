---
title: 이미지 데이터 기초 (Image Data Basics)
description: 이미지를 픽셀, 채널, 텐서 형태로 이해하고, 모델 입력 전 필요한 전처리와 데이터 증강,
  train/validation/test transform 차이를 정리한 글입니다.
pubDate: 2026-05-19
updatedDate: ""
slug: image-data-basics
topic: study
tags:
  - Computer Vision
  - Deep Learning
  - Image Data
  - Image Preprocessing
  - Data Augmentation
  - Transform
draft: false
series: Computer Vision Foundations
seriesOrder: 1
featured: false
---
# Image Data Basics

## Image / Pixel / Channel

이미지는 컴퓨터에서 숫자로 표현된다.

우리가 보는 이미지는 색과 형태를 가진 시각 정보이지만, 모델 입장에서는 결국 숫자로 이루어진 배열이다.

이 배열의 가장 작은 단위를 **픽셀(pixel)** 이라고 한다.

픽셀은 이미지의 한 위치에 있는 밝기 또는 색상 정보를 나타낸다.

예를 들어 흑백 이미지는 각 픽셀이 하나의 밝기 값을 가진다.

반면 컬러 이미지는 하나의 픽셀이 여러 색상 값을 가진다.

이때 색상 정보를 나누는 축을 **채널(channel)** 이라고 한다.

대표적인 컬러 이미지인 RGB 이미지는 다음 3개의 channel을 가진다.

- Red channel
- Green channel
- Blue channel

즉, 이미지는 단순한 2차원 배열이 아니라,

height, width, channel을 가진 3차원 데이터로 볼 수 있다.

## Image Preprocessing

이미지를 모델에 넣기 전에는 보통 전처리(preprocessing)를 수행한다.

이미지 전처리는 모델이 입력을 안정적으로 처리할 수 있도록 이미지의 크기, 값의 범위, 형태를 맞추는 과정이다.

대표적인 전처리는 다음과 같다.

- Resize
- Crop
- Normalization

### Resize

Resize는 이미지의 크기를 변경하는 과정이다.

CNN이나 Vision 모델은 보통 일정한 크기의 입력을 받는다.

하지만 실제 데이터셋의 이미지는 크기가 제각각일 수 있다.

따라서 모델에 넣기 전에 이미지 크기를 동일하게 맞춰야 한다.

### Crop

Crop은 이미지의 일부 영역을 잘라내는 과정이다.

이미지를 resize한 뒤 중앙 부분만 잘라내거나,

학습 과정에서 무작위 위치를 잘라낼 수 있다.

대표적인 방식은 다음과 같다.

- Center Crop
- Random Crop

Center Crop은 이미지의 중앙 영역을 잘라내는 방식이다.

주로 validation이나 test 단계에서 사용된다.

Random Crop은 이미지에서 무작위 위치를 잘라내는 방식이다.

주로 train 단계에서 data augmentation 목적으로 사용된다.

Crop을 사용하면 모델이 이미지의 특정 위치에만 과하게 의존하지 않도록 만들 수 있다.

### Normalization

Normalization은 이미지 픽셀 값의 범위를 조정하는 과정이다.

이미지의 픽셀 값은 보통 0부터 255 사이의 정수로 표현된다.

하지만 딥러닝 모델에서는 보통 이를 0부터 1 사이의 실수값으로 바꾼다.

$$
x' = \frac{x}{255}
$$

또한 dataset의 평균(mean)과 표준편차(standard deviation)를 사용해 정규화하기도 한다.

$$
x' = \frac{x - \mu}{\sigma}
$$

- $x$: 원래 픽셀 값
- $\mu$: 평균
- $\sigma$: 표준편차

Normalization을 사용하면 입력 값의 scale이 안정되어 학습이 더 잘 진행될 수 있다.

특히 pretrained model을 사용할 때는 그 모델이 학습될 때 사용한 mean과 standard deviation을 맞춰주는 것이 중요하다.

## Data Augmentation

Data Augmentation은 기존 train data에 여러 변형을 적용해 새로운 데이터처럼 사용하는 방법이다.

이미지 데이터에서는 뒤집기, 회전, 색상 변화, crop 등을 적용할 수 있다.

Data augmentation을 사용하면 모델이 train data를 그대로 외우는 것을 줄이고,

다양한 상황에서도 잘 작동하도록 일반화 성능을 높일 수 있다.

대표적인 image augmentation은 다음과 같다.

- Flip
- Rotation
- Color Jitter
- Random Crop

### Flip

Flip은 이미지를 좌우 또는 상하로 뒤집는 방법이다.

이미지 분류에서는 horizontal flip이 자주 사용된다.

예를 들어 고양이 이미지가 왼쪽을 보고 있든 오른쪽을 보고 있든,

여전히 고양이라는 사실은 변하지 않는다.

따라서 horizontal flip은 많은 이미지 분류 문제에서 유용하다.

다만 모든 task에서 flip을 사용해도 되는 것은 아니다.

예를 들어 글자 인식이나 의료 영상처럼 방향이 중요한 데이터에서는 flip이 오히려 잘못된 데이터를 만들 수 있다.

### Rotation

Rotation은 이미지를 일정 각도만큼 회전시키는 방법이다.

작은 각도의 회전은 모델이 객체의 방향 변화에 덜 민감해지도록 도와준다.

예를 들어 이미지를 $10^\circ$ 또는 $15^\circ$ 정도 회전시켜도,

대부분의 객체 분류 문제에서는 class가 유지될 수 있다.

하지만 너무 큰 회전은 원래 데이터 분포와 다른 이미지를 만들 수 있다.

따라서 rotation 범위는 task에 맞게 조절해야 한다.

### Color Jitter

Color Jitter는 이미지의 색상, 밝기, 대비, 채도를 무작위로 바꾸는 방법이다.

같은 물체라도 조명이나 카메라 환경에 따라 밝기와 색상이 달라질 수 있다.

Color Jitter를 사용하면 모델이 특정 색상이나 밝기에만 과하게 의존하는 것을 줄일 수 있다.

대표적으로 조절하는 요소는 다음과 같다.

- Brightness
- Contrast
- Saturation
- Hue

### Random Crop

Random Crop은 이미지의 무작위 영역을 잘라내는 방법이다.

이는 모델이 객체의 특정 위치나 배경에만 의존하지 않도록 도와준다.

예를 들어 이미지 중앙에만 객체가 있는 데이터로 학습하면,

모델은 중앙 위치에 과하게 의존할 수 있다.

Random Crop을 사용하면 객체의 위치가 조금 달라져도 잘 인식하도록 학습할 수 있다.

단, crop이 너무 강하면 중요한 객체가 잘려나갈 수 있으므로 주의해야 한다.

## Train / Validation / Test Transform 차이

이미지 전처리와 augmentation은 train, validation, test 단계에서 다르게 적용해야 한다.

### Train Transform

Train 단계에서는 모델이 다양한 상황을 학습할 수 있도록 augmentation을 사용한다.

예를 들어 다음과 같은 변형을 적용할 수 있다.

- Random Crop
- Random Horizontal Flip
- Rotation
- Color Jitter
- Normalization

Train transform의 목적은 모델이 train data를 그대로 외우는 것을 줄이고,

더 일반화된 feature를 학습하도록 만드는 것이다.

### Validation Transform

Validation 단계에서는 augmentation을 보통 사용하지 않는다.

Validation은 학습 중인 모델의 성능을 안정적으로 평가하기 위한 데이터이다.

따라서 매번 입력 이미지가 무작위로 바뀌면 평가 결과가 흔들릴 수 있다.

Validation transform에서는 보통 고정된 transform을 사용한다.

예를 들면 다음과 같다.

- Resize
- Center Crop
- Normalization

즉, validation에서는 모델 평가가 일관되게 이루어져야 한다.

### Test Transform

Test 단계도 validation과 마찬가지로 augmentation을 보통 사용하지 않는다.

Test data는 최종 성능을 측정하기 위한 데이터이다.

따라서 입력 변형이 무작위로 달라지면 성능 평가가 불안정해질 수 있다.

Test transform도 보통 다음과 같이 구성한다.

- Resize
- Center Crop
- Normalization

> 즉, train transform은 다양성을 만들기 위한 것이고,
> 
> 
> validation/test transform은 공정하고 일관된 평가를 위한 것이다.
>
