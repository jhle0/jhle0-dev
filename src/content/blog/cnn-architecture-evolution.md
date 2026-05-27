---
title: "CNN 계열 모델 (CNN Architectures: AlexNet to EfficientNet)"
description: AlexNet부터 VGGNet, InceptionNet, ResNet, DenseNet, SE-Net,
  MobileNet, EfficientNet까지 CNN 계열 모델들이 어떤 문제를 해결하며 발전해왔는지 정리한 글입니다.
pubDate: 2026-05-27
updatedDate: ""
slug: cnn-architecture-evolution
topic: study
tags:
  - Computer Vision
  - CNN
  - CNN Architecture
  - Image Classification
  - AlexNet
  - VGGNet
  - InceptionNet
  - ResNet
  - DenseNet
  - MobileNet
  - EfficientNet
draft: false
series: Computer Vision Foundations
seriesOrder: 4
featured: false
---
## CNN Architecture를 공부하는 이유

CNN은 이미지에서 공간적 구조를 활용해 feature를 추출하는 대표적인 신경망 구조이다.

초기 CNN은 단순히 convolution, pooling, fully connected layer를 쌓는 방식이었지만, 모델이 깊어지고 복잡해지면서 여러 문제가 생겼다.

대표적인 문제는 다음과 같다.

- 깊은 네트워크 학습의 어려움
- 연산량 증가
- parameter 수 증가
- 다양한 scale의 feature 처리 부족
- 모바일/임베디드 환경에서의 비효율성
- 중요한 channel이나 feature를 선택적으로 활용하지 못하는 문제

CNN 계열 모델들은 이러한 문제를 해결하기 위해 발전해왔다.

큰 흐름은 다음과 같다.

```
AlexNet
→ VGG
→ Inception 계열
→ ResNet 계열
→ DenseNet
→ SE-Net
→ MobileNet 계열
→ EfficientNet
```

## AlexNet

> **Title** : ImageNet Classification with Deep Convolutional Neural Networks
> 
> 
> **Authors** : Alex Krizhevsky, Ilya Sutskever, Geoffrey E. Hinton
> 
> **Year / Venue** : 2012 / NeurIPS
> 
> **Field / Main Task** : Computer Vision / Image Classification / CNN Architecture
> 
> **URL** : [NeurIPS Proceedings](https://proceedings.neurips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf)
> 

### One-sentence Summary

AlexNet은 ImageNet 대규모 이미지 분류에서 **deep CNN이 기존 hand-crafted feature 기반 방법보다 훨씬 뛰어난 성능을 낼 수 있음**을 보여준 논문이다.

### Core Problem

AlexNet 이전의 이미지 분류는 주로 사람이 직접 설계한 feature, 예를 들어 SIFT, HOG 같은 특징을 사용했다.

하지만 ImageNet처럼 이미지 수와 class 수가 큰 문제에서는 이런 방식에 한계가 있었다.

핵심 문제는 다음이다.

- 대규모 이미지 분류에서 더 강력한 feature representation이 필요했다.
- 깊은 CNN은 가능성이 있었지만 학습이 어렵고 overfitting 위험이 컸다.
- 큰 모델을 학습시키기 위한 연산 자원과 regularization 기법이 필요했다.

### Key Idea

AlexNet의 핵심 아이디어는 **큰 ImageNet 데이터셋과 GPU를 활용해 deep CNN을 직접 학습시키는 것**이다.

주요 요소는 다음과 같다.

- convolution layer로 이미지 feature를 자동 학습
- ReLU를 사용해 학습 속도 개선
- GPU 병렬 학습으로 큰 CNN 학습 가능
- dropout으로 overfitting 완화
- data augmentation으로 일반화 성능 개선

### Architecture

AlexNet은 크게 **5개의 convolution layer와 3개의 fully connected layer**로 구성된다.

```
Input Image
→ Conv + ReLU
→ Max Pooling
→ Conv + ReLU
→ Max Pooling
→ Conv + ReLU
→ Conv + ReLU
→ Conv + ReLU
→ Max Pooling
→ Fully Connected + ReLU
→ Dropout
→ Fully Connected + ReLU
→ Dropout
→ Fully Connected
→ Softmax
```

핵심 구조적 특징은 다음과 같다.

- CNN 기반 feature extraction
- ReLU activation
- max pooling
- dropout
- data augmentation
- GPU-based training
- Local Response Normalization, LRN 사용

단, LRN은 이후 Batch Normalization이 등장하면서 거의 사용되지 않게 되었다.

### Experiments & Results

AlexNet은 ILSVRC 2012 ImageNet classification task에서 우승했다.

당시 기존 방법보다 top-5 error를 크게 낮추며, deep CNN이 대규모 이미지 분류에서 매우 강력하다는 것을 보여줬다.

중요한 결과는 단순히 성능 수치가 아니라, **이미지 feature를 사람이 직접 설계하지 않고 neural network가 데이터로부터 학습할 수 있다**는 점을 증명했다는 것이다.

### Significance

AlexNet은 computer vision에서 deep learning 시대를 연 대표적인 논문이다.

이 논문 이후 이미지 분류, 객체 탐지, segmentation 등 많은 vision task가 CNN 기반으로 빠르게 전환되었다.

AlexNet의 의미는 다음과 같다.

- CNN이 large-scale vision task에서 성공할 수 있음을 보였다.
- learned feature가 hand-crafted feature보다 강력할 수 있음을 보였다.
- ReLU, dropout, data augmentation, GPU training의 중요성을 보여줬다.
- 이후 VGGNet, Inception, ResNet 같은 CNN architecture 연구의 출발점이 되었다.

### Limitations

AlexNet은 당시에는 혁신적이었지만, 현대 기준에서는 한계도 명확하다.

- parameter 수가 많다.
- fully connected layer 비중이 크다.
- 구조가 VGG나 ResNet처럼 단순하고 정형화되어 있지는 않다.
- LRN은 이후 거의 사용되지 않는다.
- 매우 깊은 네트워크로 확장하기 어렵다.

### What I Should Remember

- AlexNet은 **deep CNN이 ImageNet에서 성공할 수 있음을 보여준 전환점**이다.
- 핵심은 **대규모 데이터 + GPU + CNN + ReLU + dropout + data augmentation**이다.
- 사람이 직접 feature를 설계하던 방식에서, 모델이 feature를 직접 학습하는 방식으로 vision 연구 흐름을 바꿨다.
- AlexNet 자체 구조보다 중요한 것은 **learned visual representation의 가능성을 증명했다는 점**이다.
- 이후 CNN 연구는 AlexNet을 출발점으로 더 깊고, 더 효율적이고, 더 학습하기 쉬운 구조를 만드는 방향으로 발전했다.

---

## VGGNet

> Title : Very Deep Convolutional Networks for Large-Scale Image Recognition
> 
> 
> Authors : Karen Simonyan, Andrew Zisserman
> 
> Year / Venue : 2014 arXiv / ICLR 2015
> 
> Field / Main Task : Computer Vision / Image Classification / CNN Architecture
> 
> URL : [arXiv:1409.1556](https://arxiv.org/pdf/1409.1556)
> 

### One-sentence Summary

VGGNet은 **작은 3×3 convolution을 반복적으로 쌓아 네트워크를 깊게 만들면 이미지 분류 성능이 좋아진다**는 것을 보여준 CNN architecture 논문이다.

### Core Problem

AlexNet 이후 CNN의 성능은 좋아졌지만, **네트워크 깊이(depth)가 성능에 어떤 영향을 주는지**는 아직 명확하게 정리되지 않았다.

핵심 문제는 다음이다.

- CNN을 더 깊게 만들면 실제로 성능이 좋아지는가?
- 큰 convolution filter 대신 작은 3×3 filter만 사용해도 충분한가?
- 단순하고 규칙적인 구조로 강력한 image representation을 만들 수 있는가?

### Key Idea

VGGNet의 핵심 아이디어는 **큰 filter 하나를 쓰는 대신 작은 3×3 convolution을 여러 번 쌓는 것**이다.

예를 들어:

- 3×3 conv 2개 ≈ 5×5 receptive field
- 3×3 conv 3개 ≈ 7×7 receptive field

이 방식의 장점은 다음이다.

- layer가 깊어져 더 많은 non-linearity를 사용할 수 있다.
- parameter 수를 상대적으로 줄일 수 있다.
    - 3x3 conv 2개→ 18개 , 5x5 conv 1개 → 25개
- 구조가 단순하고 반복적이라 backbone으로 활용하기 좋다.

### Architecture

VGGNet은 대부분의 convolution layer에서 동일한 설계 원칙을 사용한다.

- convolution filter: 3×3
- stride: 1
- padding: 1
- activation: ReLU
- pooling: 2×2 max pooling, stride 2
- classifier: fully connected layer + softmax

기본 흐름은 다음과 같다.

```
Input Image
→ 3×3 Conv + ReLU
→ 3×3 Conv + ReLU
→ Max Pooling
→ 반복
→ Fully Connected Layers
→ Softmax
```

대표 모델은 다음 두 가지다.

- **VGG-16**: 13개의 convolution layer + 3개의 fully connected layer
- **VGG-19**: 16개의 convolution layer + 3개의 fully connected layer

VGGNet의 가장 큰 특징은 **구조가 매우 단순하고 규칙적**이라는 점이다.

### Experiments & Results

VGGNet은 ImageNet classification task에서 강한 성능을 보였다.

논문의 핵심 실험은 **depth를 늘렸을 때 성능이 어떻게 변하는지**를 비교하는 것이었다.

결과적으로 VGGNet은 다음을 보였다.

- 깊은 CNN이 얕은 CNN보다 더 좋은 성능을 낼 수 있다.
- 작은 3×3 convolution만으로도 강력한 feature representation을 만들 수 있다.
- VGG-16과 VGG-19는 이후 다양한 vision task에서 backbone으로 널리 사용되었다.

### Significance

VGGNet의 의미는 **CNN 구조 설계에서 depth의 중요성을 명확히 보여준 것**이다.

AlexNet이 deep CNN의 가능성을 보여줬다면, VGGNet은 그다음 단계로 **단순하고 깊은 CNN architecture의 표준 형태**를 제시했다.

중요한 의의는 다음이다.

- 3×3 convolution을 반복해서 쌓는 설계가 효과적임을 보였다.
- CNN에서 depth가 중요한 설계 요소임을 보여줬다.
- 단순하고 규칙적인 구조 덕분에 backbone으로 재사용하기 쉬웠다.
- 이후 object detection, segmentation, style transfer 등 다양한 task에 영향을 줬다.

### Limitations

VGGNet은 구조는 단순하지만 비효율적인 부분이 많다.

- parameter 수가 매우 많다.
- fully connected layer가 큰 비중을 차지한다.
- 연산량이 크다.
- residual connection이 없어 훨씬 더 깊은 모델로 확장하기 어렵다.
- mobile이나 real-time vision에는 적합하지 않다.

이 한계는 이후 ResNet, MobileNet, EfficientNet 같은 모델들이 해결하려는 방향으로 이어진다.

### What I Should Remember

- VGGNet의 핵심은 **3×3 convolution을 반복적으로 쌓아 깊은 CNN을 만든 것**이다.
- CNN에서 **depth가 성능 향상에 중요하다**는 것을 보여줬다.
- VGG-16, VGG-19는 단순하고 규칙적인 구조 덕분에 오랫동안 vision backbone으로 사용되었다.
- 단점은 parameter 수와 연산량이 크다는 것이다.
- AlexNet이 deep CNN의 가능성을 열었다면, VGGNet은 **깊고 단순한 CNN backbone의 대표 구조**를 제시했다.

---

## InceptionNet v1 / GoogLeNet

> Title : Going Deeper with Convolutions
> 
> 
> Authors : Christian Szegedy et al.
> 
> Year / Venue : 2014 arXiv / CVPR 2015
> 
> Field / Main Task : Computer Vision / Image Classification / CNN Architecture
> 
> URL : [arXiv:1409.4842](https://arxiv.org/pdf/1409.4842)
> 

### One-sentence Summary

InceptionNet v1, 또는 GoogLeNet은 **여러 크기의 convolution을 병렬로 사용하면서 1×1 convolution으로 연산량을 줄인 Inception module**을 제안한 CNN architecture 논문이다.

### Core Problem

AlexNet과 VGGNet 이후 CNN은 점점 깊어지고 커졌지만, 단순히 layer와 parameter 수를 늘리는 방식에는 한계가 있었다.

핵심 문제는 다음이다.

- 더 깊고 넓은 CNN은 성능은 좋아질 수 있지만 연산량이 커진다.
- 큰 모델은 overfitting 위험이 커진다.
- 이미지 안의 객체와 패턴은 다양한 scale로 존재하기 때문에 하나의 filter size만으로는 부족할 수 있다.
- 성능을 높이면서도 계산 효율적인 구조가 필요했다.

### Key Idea

GoogLeNet의 핵심 아이디어는 **Inception module**이다.

Inception module은 하나의 layer에서 여러 연산을 병렬로 수행한다.

- 1×1 convolution
- 3×3 convolution
- 5×5 convolution
- max pooling

이렇게 다양한 receptive field를 동시에 사용해 **multi-scale feature**를 추출한다.

또한 3×3, 5×5 convolution 앞에 **1×1 convolution**을 넣어 channel 수를 줄인다.

이 1×1 convolution은 두 가지 역할을 한다.

- channel dimension reduction
- non-linearity 추가

즉, GoogLeNet은 **넓고 깊은 구조를 만들면서도 계산량을 줄이는 것**이 핵심이다.

### Architecture

GoogLeNet은 여러 개의 Inception module을 쌓아 만든 깊은 CNN이다.

기본 흐름은 다음과 같다.

```
Input Image
→ Conv / Pooling
→ Inception Module 반복
→ Global Average Pooling
→ Linear Classifier
→ Softmax
```

Inception module의 기본 구조는 다음과 같다.

```
Input
→ 1×1 Conv
→ 1×1 Conv → 3×3 Conv
→ 1×1 Conv → 5×5 Conv
→ Max Pooling → 1×1 Conv
→ Concatenate
```

주요 특징은 다음이다.

- 약 22-layer deep network
- Inception module 사용
- 1×1 convolution을 bottleneck으로 사용
- fully connected layer를 줄이고 global average pooling 사용
- 학습 안정화를 위해 auxiliary classifier 사용

VGGNet이 단순히 3×3 convolution을 깊게 쌓는 구조였다면, GoogLeNet은 **여러 scale의 feature를 병렬로 뽑는 module-based CNN**이다.

### Experiments & Results

GoogLeNet은 ILSVRC 2014 classification task에서 매우 높은 성능을 보였고, 우승 모델로 알려져 있다.

중요한 점은 단순히 정확도만 높인 것이 아니라, **VGGNet보다 훨씬 적은 parameter로 좋은 성능을 냈다**는 것이다.

핵심 결과는 다음이다.

- ImageNet classification에서 강한 성능을 보였다.
- Inception module이 multi-scale feature extraction에 효과적임을 보였다.
- 1×1 bottleneck convolution을 통해 연산량과 parameter 수를 줄였다.
- global average pooling을 사용해 fully connected layer의 parameter 부담을 줄였다.

### Significance

GoogLeNet의 의미는 **CNN architecture 설계가 단순한 depth 증가에서 module 설계와 efficiency 중심으로 넘어갔다는 점**이다.

AlexNet과 VGGNet이 깊은 CNN의 가능성과 depth의 중요성을 보여줬다면, GoogLeNet은 다음 질문을 던졌다.

```
어떻게 하면 더 깊고 넓은 CNN을 만들면서도 계산량을 폭발시키지 않을 수 있을까?
```

중요한 의의는 다음이다.

- multi-scale feature extraction을 CNN 구조 안에 넣었다.
- 1×1 convolution을 dimension reduction 용도로 적극 사용했다.
- 효율적인 CNN module 설계의 대표적인 출발점이 되었다.
- 이후 Inception v2, v3, v4, Inception-ResNet으로 발전했다.

### Limitations

GoogLeNet은 성능과 효율성 면에서 강했지만, 구조가 복잡하다.

한계는 다음이다.

- Inception module의 branch 구성이 hand-designed이다.
- VGGNet보다 구조를 이해하고 구현하기 어렵다.
- 어떤 filter size와 branch 구성이 최적인지 명확하지 않다.
- 5×5 convolution은 여전히 계산 비용이 크다.
- 이후 모델에서는 factorized convolution, batch normalization, residual connection 등으로 개선된다.

### What I Should Remember

- GoogLeNet의 핵심은 **Inception module**이다.
- Inception module은 여러 크기의 convolution과 pooling을 병렬로 사용해 **multi-scale feature**를 추출한다.
- 1×1 convolution은 channel 수를 줄여 연산량을 줄이는 **bottleneck 역할**을 한다.
- VGGNet이 “깊고 단순한 CNN”이라면, GoogLeNet은 “효율적인 module-based CNN”이다.
- 이후 Inception 계열 모델은 더 효율적인 convolution factorization과 residual connection 방향으로 발전한다.
