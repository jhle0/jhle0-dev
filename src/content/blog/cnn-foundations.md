---
title: CNN 기초 (CNN Foundations)
description: >-
  CNN의 핵심 개념인 convolution, filter, padding, stride, pooling, receptive field를
  정리한 글입니다.

  이미지의 공간적 구조를 보존하며 계층적으로 feature를 추출하는 CNN의 기본 구조를 설명합니다.
pubDate: 2026-05-21
updatedDate: ""
slug: cnn-foundations
topic: study
tags:
  - Computer Vision
  - CNN
  - Convolution
  - Pooling
  - Feature Extraction
  - Deep Learning
draft: false
series: Computer Vision Foundations
seriesOrder: 3
featured: false
---

# CNN 개요

CNN(Convolutional Neural Network)은 이미지와 같이 **공간적 구조(spatial structure)** 를 가진 데이터를 처리하기 위해 사용되는 대표적인 딥러닝 모델이다.

CNN은 인간의 시각 처리 방식에서 일부 영감을 받았다.

인간의 시각 피질에 있는 뉴런들은 전체 시야를 한 번에 보는 것이 아니라, 시야의 작은 영역에 선택적으로 반응한다.

이 작은 영역을 **국부 수용장(local receptive field)** 이라고 한다.

즉, 각각의 뉴런은 시야의 일부 영역만 담당하고, 이러한 반응들이 모여 전체 시야를 인식하게 된다.

또한 시각 피질의 개별 뉴런들은 특정 방향이나 모양의 자극에 더 강하게 반응한다

예를 들어 수평선, 수직선, 대각선, 모서리 같은 단순한 패턴에 반응하는 뉴런들이 있다.

이러한 특징은 복잡한 이미지를 한 번에 해석하는 것이 아니라,

작은 영역의 **단순한 패턴**을 먼저 인식하고, 이를 **조합해 더 복잡한 대상을 인식**한다는 관점으로 이해할 수 있다.

CNN은 이런 시각 처리 방식에서 영감을 받아, convolution 연산과 filter(kernel)를 통해 이미지의 local pattern을 추출한다.

즉, 이미지 전체를 한 번에  처리하는 것이 아니라,

작은 영역을 보는 filter를 이미지 위에 이동시키면서 edge, line, texture 같은 특징을 찾아낸다.

이 과정을 통해 CNN은 이미지의 공간적 구조를 보존하면서 중요한 특징을 효율적으로 추출할 수 있다.

### FC layer의 문제

이미지를 일반적인 Fully Connected Layer, 즉 FC layer로만 학습시키면 몇 가지 문제가 생긴다.

이미지는 많은 픽셀로 구성되어 있으며, 각 픽셀은 주변 픽셀과의 **위치 관계 속에서 의미**를 가진다.

예를 들어 얼굴 이미지에서 눈, 코, 입은 각각의 픽셀 값만 중요한 것이 아니라, 서로 어떤 위치 관계를 가지는지가 중요하다.

하지만 FC layer는 이미지를 보통 1차원 벡터로 펼쳐서 처리한다.

이렇게 되면 원래 이미지가 가지고 있던 height, width 구조가 약해지고,

픽셀들 사이의 공간적 관계를 직접적으로 활용하기 어렵다.

또한 FC layer는 모든 입력 픽셀과 모든 뉴런을 연결한다.

따라서 이미지 크기가 커질수록 파라미터 수가 매우 빠르게 증가한다.

이는 학습 비용을 증가시키고, overfitting 위험도 키운다.

또 다른 문제는 FC layer가 위치에 따른 패턴 재사용을 효율적으로 하지 못한다는 점이다.

이미지에서 같은 모양의 edge나 texture는 위치만 다르게 여러 곳에 나타날 수 있다.

하지만 FC layer는 각 위치의 픽셀을 별도의 입력으로 취급하기 때문에,

같은 패턴이 다른 위치에 나타났을 때 이를 효율적으로 공유해서 학습하기 어렵다.

반면 CNN은 같은 filter를 이미지 전체에 반복적으로 적용한다.

따라서 특정 패턴이 이미지의 어느 위치에 있든 같은 filter로 감지할 수 있고,

가중치를 공유하기 때문에 파라미터 수도 크게 줄일 수 있다.

정리하면, 이미지 처리에서 FC layer만 사용하는 방식의 문제는 다음과 같다.

- 이미지를 1차원 벡터로 펼치면서 공간적 구조가 약해진다.
- 픽셀 간의 위치 관계를 충분히 활용하기 어렵다.
- 모든 픽셀을 모든 뉴런과 연결하므로 파라미터 수가 매우 많아진다.
- 같은 패턴이 다른 위치에 나타나는 경우를 효율적으로 학습하기 어렵다.
- 큰 이미지에서는 계산 비용과 overfitting 위험이 커진다.

이러한 이유로 이미지 데이터에는 FC layer보다 convolution 연산을 사용하는 CNN이 더 적합하다.

### CNN 정리

CNN은 이미지와 같이 **공간적 구조(spatial structure)** 를 가진 데이터를 처리하는 데 특화된 신경망이다.

일반적인 FC layer는 이미지를 1차원 벡터로 펼쳐서 처리하기 때문에 픽셀 간의 위치 관계를 충분히 활용하기 어렵고, 파라미터 수도 매우 많아진다.

반면 CNN은 이미지의 작은 영역을 바라보는 filter(kernel)를 사용해 local pattern을 추출한다.

이 filter는 이미지 전체를 이동하면서 반복적으로 적용되기 때문에, 같은 패턴이 이미지의 어느 위치에 있어도 감지할 수 있다.

또한 같은 filter를 여러 위치에서 공유하므로 FC layer보다 파라미터 수가 훨씬 적다.

CNN은 layer가 깊어질수록 단순한 특징에서 복잡한 특징으로 나아간다.

초기 layer에서는 edge, line, color 같은 단순한 특징을 학습하고, 깊은 layer에서는 object part나 object-level feature처럼 더 추상적인 특징을 학습한다.

즉, CNN은 이미지의 공간적 구조를 유지하면서 중요한 특징을 계층적으로 추출하는 모델이다.

정리하면 CNN의 핵심은 다음과 같다.

- 작은 영역을 보는 local receptive field
- 같은 filter를 반복해서 사용하는 weight sharing
- 이미지의 공간적 구조 보존
- 파라미터 수 감소
- 단순한 특징에서 복잡한 특징으로 이어지는 hierarchical feature learning

### CNN의 사용 분야

CNN은 주로 이미지나 영상처럼 공간적 구조가 중요한 데이터에 사용된다.

대표적인 사용 분야는 다음과 같다.

- Image Classification: 이미지가 어떤 class에 속하는지 분류
- Object Detection: 이미지 안의 객체 종류와 위치를 예측
- Segmentation: 이미지의 각 픽셀이 어떤 class에 속하는지 예측
- Face Recognition: 얼굴 검출, 얼굴 인증, 표정 분석
- Medical Image Analysis: X-ray, CT, MRI 등 의료 영상 분석
- Autonomous Driving: 차선, 차량, 보행자, 표지판 인식
- Video Analysis: 영상 frame에서 공간적 특징 추출

즉, CNN은 이미지 안에서 의미 있는 시각적 특징을 추출해야 하는 다양한 문제에 사용된다.

---

# Convolution layer / Pooling layer

## Convolution 연산

Convolution 연산은 입력 데이터의 작은 영역에 filter(kernel)를 적용하여 local feature를 추출하는 연산이다.

이미지 처리 관점에서는 필터를 이미지 위에 이동시키며 적용하는 filter operation으로 이해할 수 있다.

![cnn-foundations-1.png](/images/uploads/cnn-foundations-1.png)

CNN의 convolution layer에서는 하나의 출력값이 입력 전체가 아니라 입력의 작은 영역에만 연결된다.

이 작은 영역을 receptive field라고 하며, 이를 filter(kernel)를 통해 계산한다.

이 필터의 **window를 일정 간격으로 움직이며** 입력 데이터에 적용한다.

각 위치에서 입력 영역과 필터의 대응하는 원소끼리 곱한 뒤, 그 값들을 모두 더한다.

이렇게 계산된 값이 출력 feature map의 해당 위치에 저장된다.

이 과정을 입력 데이터의 모든 위치에 대해 반복한다.

그 다음 filter마다 하나의 bias를 더해주면 convolution layer의 최종 출력이 된다.

→ 이 연산을 통해 위치 정보를 의도적으로 보존하면서, 훨씬 적은 파라미터로 학습할 수 있게 된다.

> 특징 맵(Feature map)
> 
> 
> convolution, pooling layer 를 통과해 계산된 출력 텐서를 
> 
> feature map 이라고 한다.
> 

## Filter(Kernel)

![cnn-foundations-2.png](/images/uploads/cnn-foundations-2.png)
Filter 또는 kernel은 입력 데이터에서 특정 패턴을 감지하기 위한 작은 **weight 행렬**이다.

필터의 각 weight는 해당 필터가 **어떤 패턴에 반응할지를 결정한다.**

예를 들어 어떤 필터는 세로선에 강하게 반응하고, 다른 필터는 가로선이나 모서리, 질감 같은 패턴에 반응할 수 있다.

convolution연산은 수학적으로 내적이다.

즉, 이미지의 어떤 영역과 필터 사이의 **유사도**를 측정하는 것이다.

따라서, 출력값이 크다는 것은 해당 위치에 **filter의 패턴이 강하게 나타난다**는 것이다.

여기서 중요한 점은, 하나의 filter weight 세트가 이미지 전체에 반복적으로 적용된다는 것이다.

이를 **weight sharing**이라고 한다.

이로 인해 하나의 filter는 특정 특징이 이미지의 어느 위치에, 얼마나 강하게 존재하는지를 feature map으로 나타낸다.

### Feature learning

전통적인 computer vision에서는 사람이 직접 filter를 설계하였다.

하지만 CNN에서는 이러한 필터를 **학습을 통해 스스로** 찾아낸다.

CNN의 filter weight는 처음에는 무작위로 초기화된다.

그 후 학습 과정에서 backpropagation과 optimization을 통해 loss를 줄이는 방향으로 filter weight가 조정된다.

즉, CNN은 task에 도움이 되는 특징을 데이터로부터 **자동으로 학습**한다.

초기 layer의 filter는 edge, line, color 변화 같은 단순한 특징을 학습하는 경우가 많고,

깊은 layer로 갈수록 texture, object part, object-level feature처럼 더 복잡하고 추상적인 특징을 학습한다.

## 3차원 데이터의 convolution

실제 이미지는 RGB 채널이 있는 3차원 데이터이다.

즉, 하나의 이미지는 height, width뿐만 아니라 **channel dimension**도 가진다.

예를 들어 RGB 이미지는 R, G, B 세 개의 채널을 가진다.

그렇다면 3차원 데이터의 convolution은 어떻게 계산될까?

![cnn-foundations-3.png](/images/uploads/cnn-foundations-3.png)
3차원 convolution에서는 입력 데이터의 채널 수와 filter의 **채널 수가 반드시 같아야 한다.**

그 다음, 입력 데이터와 필터의 convolution 연산을 **채널마다 수행하고, 그 결과를 더하면** 된다.

그리고 마지막에 bias를 더하면 하나의 feature map이 만들어진다.

즉, 하나의 다채널 filter는 입력의 모든 채널을 함께 사용해 하나의 feature map을 만든다.

예를 들어 첫 번째 채널이 R 채널이라고 가정하자.

이때 R 채널의 filter weight는 세로선 패턴을 가지고, G와 B 채널의 weight가 모두 0이라면

이 filter는 빨간색 세로 패턴에 강하게 반응하는 filter가 된다.

### 3차원 convolution shape

3차원 convolution 연산은 데이터와 필터를 **직육면체 블록**으로 보면 편리하다.

3차원 데이터를 배열로 나타낼 대 보통 채널 수 C, 높이 H, 너비 W 순서대로 쓴다.

즉, 하나의 입력 데이터 shape은 (C, H, W)이다.

필터도 마찬가지로 (C, FH, FW)로 나타낸다.

다수의 필터를 가진 convolution layer의 shape은 다음과 같다

![cnn-foundations-4.png](/images/uploads/cnn-foundations-4.png)
(C, FH, FW) 인 필터가 FN개 있으면

출력 feature map의 shape는 (FN, OH, OW)가 된다.

필터가 (10, 3, 4, 4)이면

3채널 4x4 필터가 10개라는 의미이다.

> 참고로 위 그림에서 생략된
> 
> 
> bias의 shape는 (FN, 1, 1)이 된다.
> 

## Padding & Stride

### padding

padding은 convolution 연산을 수행하기 전에 입력 데이터 주변을 **특정 값으로 채우는 것**이다.

padding에는 2가지 목적이 있다.

- 출력 feature map 크기 조절
- 테두리 정보 보존

convolution 연산을 거치면 이미지의 크기가 점점 작아지는 문제가 있다.

적절한 padding을 적용하면 convolution 이후 feature map의 크기가 줄어드는 것을 막을 수 있다.

![cnn-foundations-5.png](/images/uploads/cnn-foundations-5.png)
위 그림처럼 처음 크기가 (4,4)인 입력 데이터에

패딩을 추가하면 (6,6)이 된다.

이 입력에 (3,3) 크기의 필터를 사용하면

원래 입력값 크기인 (4,4)의 feature map을 얻을 수 있다.

> 더 많은 패딩을 추가하면,
> 
> 
> feature map의 크기가 입력 이미지 보다 커질 수도 있다.
> 

두 번째로, padding은 테두리 정보를 더 잘 활용할 수 있게 해준다.

padding이 없으면 이미지의 가장자리 픽셀은 convolution 연산에 참여하는 횟수가 적다.

예를 들어 가장 왼쪽 위의 픽셀은 padding이 없을 때 한 번만 계산에 참여한다.

하지만 padding을 한 칸 추가하면 더 많은 convolution window에 포함될 수 있다.

이로 인해 가장자리 정보도 더 충분히 반영할 수 있고,

이미지의 중앙 부분과 가장자리 부분을 더 균형 있게 처리할 수 있다.

> 패딩의 종류
> 
> - constant padding - 지정된 상숫값으로 패딩
>     - zero-padding - 0으로 패딩
> - Replicate padding - 가장자리 픽셀을 복제하여 padding
> - Reflect padding - 이미지의 경계를 반사시켜 padding
> 
> CNN에서는 대부분의 경우 zero padding이 많이 사용된다.
> 

### Stride

‘보폭’이라는 뜻의 stride는 **필터를 적용하는 위치의 간격**을 의미한다.

즉, filter window가 한 번에 몇 칸씩 이동할지를 결정하는 값이다.

stride = (2,2)로 설정하면, 

필터 윈도우를 행, 열 방향 2칸씩 이동하며 convolution 연산을 수행한다.

stride를 키우는 이유는 다음과 같다.

큰 stride를 사용하면 feature map의 spatial size가 줄어들어 downsampling 효과가 생긴다. 

따라서 계산량이 줄고, 이후 layer에서 더 넓은 receptive field를 갖는 특징을 만들기 쉬워진다.

그러나 너무 큰 stirde는 정보의 손실을 초래해 모델의 성능이 떨어질 수 있다.

따라서 적절한 값으로 설정해야 한다.

> padding과 stride는 CNN 설계에서 중요한 파라미터로 신경망의 성능과 효율성을 크게 향상시킬 수 있다.
> 

### Output size 계산

convolution layer의 출력 크기는 input size, filter size, padding, stride에 의해 결정된다.

입력의 높이와 너비를 각각 $H, W$라고 하고,

filter의 높이와 너비를 각각 $F_H, F_W$라고 하자.

padding을 $P$, stride를 $S$라고 하면 출력 feature map의 크기는 다음과 같다.

$$
O_H = \left\lfloor \frac{H + 2P - F_H}{S} \right\rfloor + 1
$$

$$
O_W = \left\lfloor \frac{W + 2P - F_W}{S} \right\rfloor + 1
$$

- $H, W$ : 입력의 height, width
- $F_H, F_W$ : filter의 height, width
- $P$ : padding size
- $S$ : stride
- $O_H, O_W$ : 출력 feature map의 height, width

## 1x1 convolution

1x1 convolution은 kernel size가 1x1인 convolution 연산이다.

일반적인 convolution이 주변 spatial 영역을 함께 보면서 특징을 추출한다면,

1x1 convolution은 각 spatial 위치에서 channel 방향의 정보를 조합한다.

즉, feature map의 height와 width는 유지하면서 channel 수를 변환하거나 channel 간 정보를 재조합하는 역할을 한다.

채널 수가 3인 feature map에 1x1 convolution 한 개를 적용하면 하나의 feature map을 얻게 된다.

1x1 convolution 필터의 개수에 따라 출력된 feature map의 채널의 수를 조절할 수 있다.

보통, 1x1 convolution을 적용해 채널 수를 감소시킨 후

핵심 연산 layer를 통과한 뒤 1x1 convolution을 사용해 채널 수를 복원한다.

이로 인해, 연산량, 메모리를 절감할 수 있다.

또한 1x1 convolution은 각 위치에서 여러 feature map을 가중합하는 것으로 볼 수 있다.

즉, feature map의 공간적 구조는 유지하면서 channel 방향의 정보를 섞어 새로운 feature map을 만든다.

이로 인해 어떤 feature를 강조하고, 어떤 feature를 약화시킬지 학습할 수 있다.

## Pooling Layer

pooling layer는 convolution layer와 함께 CNN에서 자주 사용되는 layer이다.

pooling layer는 feature map의 spatial size를 줄이는 downsampling 연산이다.

즉, feature map의 height와 width를 줄여 이후 layer가 처리해야 하는 연산량과 메모리 사용량을 감소시킨다.

Pooling layer의 종류에는

- Max Pooling - 지정된 영역에서 최댓값 선택
- Average Pooling - 지정된 영역에서 평균을 사용

pooling layer는 학습해야 할 parameter가 없다.

또한 각 channel에 독립적으로 적용되므로 channel 수는 변하지 않는다.

### Pooling layer 이점

1. **연산량과 메모리 사용량 감소**

pooling layer는 feature map의 spatial size를 줄인다.

따라서 이후 layer가 처리해야 할 데이터 크기가 줄어들고, 연산량과 메모리 사용량도 감소한다.

2. **작은 위치 변화에 덜 민감해짐**

pooling은 일정 영역을 대표값으로 요약한다.

따라서 입력의 작은 이동이나 변화에 대해 출력이 크게 변하지 않도록 도와준다.

특히 max pooling은 특정 feature가 pooling window 안의 어느 위치에 있든 강한 반응을 유지할 수 있다.

3. **Overfitting 완화에 도움**

pooling은 feature map 크기를 줄이므로 이후 fully connected layer나 classifier가 처리해야 할 입력 크기도 줄어들 수 있다.

이로 인해 모델의 계산량과 복잡도가 줄어들고, 결과적으로 overfitting 완화에 도움이 될 수 있다.

단, pooling은 정보를 요약하는 과정이기 때문에 세부 정보가 일부 손실될 수 있다.

따라서 pooling size와 stride를 너무 크게 설정하면 중요한 spatial information을 잃을 수 있다.

### GAP(Global Average Pooling)

Global Pooling은 각 channel의 전체 spatial 영역을 하나의 값으로 요약하는 pooling이다.

그중 가장 자주 사용되는 방식이 **GAP(Global Average Pooling)** 이다.

GAP는 각 feature map의 모든 spatial 위치에 있는 값들의 평균을 계산하여 하나의 값으로 압축한다.

GAP는 CNN의 마지막 부분에서 fully connected layer를 대체하거나 줄이는 데 자주 사용된다.

기존 CNN에서는 convolution feature map을 flatten한 뒤 큰 fully connected layer에 넣는 경우가 많았다.

하지만 flatten 후 fully connected layer를 사용하면 parameter 수가 매우 커질 수 있다.

반면 GAP를 사용하면 각 channel을 하나의 값으로 요약하므로 parameter 수를 크게 줄일 수 있다.

이로 인해 계산량이 줄어들고, overfitting 완화에도 도움이 될 수 있다.

또한 GAP는 각 channel이 어떤 feature에 얼마나 강하게 반응했는지를 요약하는 방식으로 볼 수 있다.

## Receptive Field

receptive field는 feature map의 한 위치가 원본 입력 이미지에서 참고하는 영역을 의미한다.

CNN의 초기 layer에서는 하나의 출력값이 입력 이미지의 작은 영역만 본다.

예를 들어 3x3 filter를 사용하면,

처음 convolution layer의 한 출력값은 입력 이미지의 3x3 영역을 보고 계산된다.

하지만 layer를 여러 개 쌓으면 뒤쪽 layer의 한 위치는 원본 이미지에서 **더 넓은 영역**의 정보를 반영하게 된다.

즉, layer가 깊어질수록 receptive field는 점점 커진다.

이것이 CNN이 단순한 edge나 line에서 시작해,

texture, object part, object-level feature까지 점점 더 복잡한 특징을 학습할 수 있는 이유이다.

## Translation Equivariance와 Translation Invariance

CNN의 중요한 특징 중 하나는 **translation equivariance**이다.

translation equivariance란 입력에서 어떤 패턴의 위치가 이동하면,

출력 feature map에서도 그 반응 위치가 함께 이동하는 성질을 말한다.

예를 들어 이미지의 왼쪽에 있던 vertical edge가 오른쪽으로 이동하면,

그 edge에 반응하는 feature map의 활성 위치도 오른쪽으로 이동한다.

즉, CNN은 같은 filter를 이미지 전체에 적용하기 때문에,

같은 패턴이 이미지의 어느 위치에 있든 감지할 수 있다.

하지만 이것은 정확히 말하면 **translation invariance**와는 다르다.

translation invariance는 입력의 위치가 조금 바뀌어도 최종 출력이 거의 변하지 않는 성질을 말한다.

CNN 자체의 convolution 연산은 translation equivariance에 가깝고,

pooling이나 global average pooling 같은 연산을 거치면서 작은 위치 변화에 덜 민감한 성질을 얻을 수 있다.

정리하면 다음과 같다.

- Translation equivariance: 입력의 패턴이 이동하면 feature map의 반응 위치도 함께 이동한다.
- Translation invariance: 입력의 작은 위치 변화에도 최종 예측이 크게 변하지 않는다.
- Convolution은 주로 translation equivariance를 만든다.
- Pooling과 GAP는 작은 위치 변화에 대한 invariance를 높이는 데 도움을 준다.

## CNN 구조

전형적인 CNN 구조는 convolution layer와 pooling layer를 반복해서 쌓은 뒤,

마지막에 classifier를 연결하여 이미지 분류 문제를 푼다.

초기 CNN에서는 convolution과 pooling을 거쳐 얻은 feature map을 flatten한 뒤,

몇 개의 FC layer에 통과시키고 softmax를 적용해 class 확률을 계산하는 구조가 많이 사용되었다.

convolution layer와 pooling layer를 반복하면,

feature map의 spatial size는 점점 작아지는 반면,

channel 수는 점점 많아지는 경우가 많다.

즉, height와 width는 줄어들고, depth 또는 channel dimension은 깊어진다.

이에 따라 뒤쪽 layer의 한 위치는 원본 이미지에서 더 넓은 영역을 대표하게 된다.

이를 receptive field가 커진다고 표현한다.

또한 layer가 깊어질수록 더 다양한 filter가 사용되기 때문에,

더 많은 종류의 feature를 추출할 수 있다.

딥러닝 시각화 연구들에 따르면,

CNN의 초기 layer에서는 edge, line, corner 같은 저수준 특징을 주로 학습하고,

중간 layer에서는 texture, pattern, object part 같은 특징을 학습하며,

깊은 layer에서는 object-level feature나 class와 관련된 더 추상적인 특징을 학습하는 경향이 있다.

이러한 과정을 통해 CNN은 단순한 시각적 패턴을 점점 더 복잡한 개념으로 조합한다.

이를 **계층적 특징 학습(hierarchical feature learning)** 이라고 한다.

마지막에는 이렇게 얻은 고수준 feature map을 classifier에 입력한다.

초기 CNN 구조에서는 feature map을 flatten한 뒤 FC layer에 통과시켜 모든 feature를 종합적으로 고려했다.

현대 CNN에서는 FC layer 대신 **Global Average Pooling(GAP)**을 사용해 parameter 수를 줄이는 경우도 많다.

결국 CNN의 앞부분은 이미지에서 중요한 feature를 추출하는 **feature extractor** 역할을 하고,

마지막 부분은 추출된 feature를 바탕으로 class를 예측하는 **classifier** 역할을 한다.

정리하면 CNN은 다음과 같은 구조를 가진다.

- Convolution layer: local feature 추출
- Activation function: 비선형성 추가
- Pooling layer: spatial size 감소
- 깊은 layer: 더 넓은 receptive field와 더 추상적인 feature 학습
- Classifier: 추출된 feature를 바탕으로 최종 class 예측

따라서 CNN은 FC layer만 사용하는 구조보다 이미지의 공간적 구조를 더 잘 활용할 수 있고,

더 적은 parameter로 효율적인 이미지 분류를 수행할 수 있다.
