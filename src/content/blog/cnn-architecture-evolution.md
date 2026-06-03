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
> **URL** : NeurIPS Proceedings
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
> URL : arXiv:1409.1556
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

또한 VGGNet에서는 conv 층 사이 max pooling을 해준다.

이렇게 하면 해상도는 반으로 줄고, 다음 conv에서 채널 수를 2배로 늘려준다.

이로 인해, 더 깊고 추상적인 특징을 학습하게 된다.

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
- mobile이나 real-time vision에는 적합하지 않다.

이 한계는 이후 ResNet, MobileNet, EfficientNet 같은 모델들이 해결하려는 방향으로 이어진다.

### What I Should Remember

- VGGNet의 핵심은 **3×3 convolution을 반복적으로 쌓아 깊은 CNN을 만든 것**이다.
- CNN에서 **depth가 성능 향상에 중요하다**는 것을 보여줬다.
- VGG-16, VGG-19는 단순하고 규칙적인 구조 덕분에 오랫동안 vision backbone으로 사용되었다.
- 단점은 parameter 수와 연산량이 크다는 것이다.

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
> URL : arXiv:1409.4842
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
- VGG보다 훨씬 적은 parameter 수로 높은 성능을 냈다.
- 이후 Inception 계열 모델은 더 효율적인 convolution factorization과 residual connection 방향으로 발전한다.

# InceptionNet v2 / v3

> 
> 
> 
> Title : Rethinking the Inception Architecture for Computer Vision
> 
> Authors : Sergey Ioffe, Christian Szegedy / Christian Szegedy et al.
> 
> Year / Venue : 2015 ICML / 2016 CVPR
> 
> Field / Main Task : Computer Vision / Image Classification / CNN Architecture
> 
> URL :  arXiv:1512.00567
> 

### One-sentence Summary

InceptionNet v2/v3는 Inception v1의 구조를 개선하여 **Batch Normalization, convolution factorization, label smoothing, RMSProp 등을 적용해 더 깊고 효율적인 CNN을 만든 모델**이다.

### Core Problem

Inception v1은 1×1 convolution과 multi-branch 구조를 통해 좋은 성능과 효율성을 보였지만, 여전히 개선할 문제가 있었다.

핵심 문제는 다음이다.

- 깊은 네트워크는 학습이 불안정할 수 있다.
- 큰 convolution은 연산량이 크다.
- Inception module을 더 효율적으로 확장할 방법이 필요했다.
- 모델을 크게 만들면서도 parameter 수와 연산량을 통제해야 했다.
- overfitting과 과도한 confidence 문제를 줄일 필요가 있었다.

### Key Idea

Inception v2/v3의 핵심은 **Inception module을 더 효율적으로 재설계하는 것**이다.

주요 아이디어는 다음이다.

- **Batch Normalization**으로 학습 안정화와 속도 개선
- **5×5 convolution을 3×3 convolution 2개로 분해**
- **n×n convolution을 1×n, n×1 convolution으로 분해**
- **stride=2 convolution과 pooling을 함께 사용한 grid size reduction**으로 feature map 축소 과정의 정보 손실 완화
- **auxiliary classifier 개선**
- **label smoothing**으로 overconfidence 완화
- **RMSProp**을 사용한 안정적인 최적화

즉, Inception v2/v3는 단순히 모델을 깊게 만든 것이 아니라, **같은 연산량으로 더 좋은 representation을 얻기 위한 구조 개선**에 초점을 둔 모델이다.

### Architecture

Inception v2/v3는 기본적으로 Inception v1의 multi-branch 구조를 유지한다.

하지만 branch 안의 큰 convolution을 더 작은 convolution으로 나눈다.

예를 들어 5×5 convolution은 다음처럼 바꾼다.

```
5×5 Conv
→ 3×3 Conv
→ 3×3 Conv
```

또한 큰 2D convolution은 비대칭 convolution으로 분해한다.

```
n×n Conv
→ 1×n Conv
→ n×1 Conv
```

이 방식은 receptive field를 유지하면서도 parameter 수와 연산량을 줄이는 효과가 있다.

또한 Inception v2/v3에서는 feature map의 spatial size를 줄이는 방식도 개선했다.

기존 CNN에서는 주로 pooling을 사용해 feature map의 크기를 줄였지만, pooling만 사용하면 정보 손실이 커질 수 있다.

이를 완화하기 위해 Inception v2/v3는 **stride=2 convolution branch와 pooling branch를 함께 사용**하여 feature map의 크기를 줄인다.

이 방식은 downsampling 과정에서 spatial resolution은 줄이면서도, convolution을 통해 중요한 feature를 더 잘 보존할 수 있게 한다.

즉, 단순히 크기를 줄이는 것이 아니라, **정보 손실을 줄이면서 효율적으로 feature map을 축소하는 grid size reduction 방식**이라고 볼 수 있다.

기본 흐름은 다음과 같다.

```
Input Image
→ Conv / Pooling
→ Improved Inception Modules
→ Factorized Convolutions
→ Global Average Pooling
→ Linear Classifier
→ Softmax
```

Inception v2에서는 특히 **Batch Normalization**이 중요하다. Batch Normalization은 각 layer의 입력 분포를 정규화하여 더 높은 learning rate를 사용할 수 있게 하고, 학습을 빠르고 안정적으로 만든다.

Inception v3는 v2의 개선점에 더해 factorized convolution, label smoothing, RMSProp, auxiliary classifier 개선 등을 종합적으로 적용한 버전으로 볼 수 있다.

### Experiments & Results

Inception v2/v3는 ImageNet classification에서 강한 성능을 보였다.

중요한 결과는 다음이다.

- Batch Normalization을 적용하면 학습이 빨라지고 안정화된다.
- factorized convolution을 사용하면 연산량을 줄이면서 성능을 유지하거나 개선할 수 있다.
- label smoothing은 모델이 정답 class에 과도하게 확신하는 문제를 줄인다.
- Inception v3는 비교적 적은 parameter와 연산량으로 높은 ImageNet 성능을 달성했다.

논문에서는 Inception v3가 ILSVRC 2012 validation set 기준 single-frame 평가에서 **21.2% top-1 error, 5.6% top-5 error**를 기록했다고 보고했다.

### Significance

Inception v2/v3의 의미는 **CNN을 효율적으로 scale up하는 설계 원칙을 제시했다는 것**이다.

VGGNet은 단순히 3×3 convolution을 깊게 쌓았고, Inception v1은 multi-scale branch를 도입했다.

Inception v2/v3는 여기서 한 단계 더 나아가 다음을 보여줬다.

- normalization은 깊은 CNN 학습에 매우 중요하다.
- 큰 convolution은 작은 convolution 조합으로 대체할 수 있다.
- convolution을 factorization하면 연산 효율을 높일 수 있다.
- 모델 크기를 키우는 것보다 **연산을 어떻게 배치하느냐**가 중요하다.
- regularization과 optimization 기법도 architecture 성능에 큰 영향을 준다.

### Limitations

Inception v2/v3의 한계는 다음이다.

- 구조가 v1보다 더 복잡해졌다.
- branch와 factorization 설계가 사람이 직접 정한 heuristic에 가깝다.
- 이후 Inception-ResNet과 EfficientNet처럼 더 체계적인 scaling 또는 residual connection 기반 구조로 발전한다.

### What I Should Remember

- Inception v2/v3의 핵심은 **Inception module을 더 효율적으로 개선한 것**이다.
- v2의 중요한 키워드는 **Batch Normalization**이다.
- v3의 중요한 키워드는 **factorized convolution, label smoothing, RMSProp**이다.
- 5×5 convolution은 3×3 convolution 두 개로, n×n convolution은 1×n + n×1 convolution으로 분해할 수 있다.
    - 같은 receptive field 지만 parameters 수는 최소화 한다.
- feature map의 크기를 줄일 때 pooling만 사용하는 대신, stride=2 convolution과 pooling을 함께 사용해 정보 손실을 줄이는 grid size reduction 구조를 사용했다.
- 목적은 단순히 깊게 만드는 것이 아니라, **연산량 대비 성능을 높이는 것**이다.

# ResNet

> Title : Deep Residual Learning for Image Recognition
> 
> 
> Authors : Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun
> 
> Year / Venue : 2015 arXiv / CVPR 2016
> 
> Field / Main Task : Computer Vision / Image Classification / CNN Architecture
> 
> URL : arXiv:1512.03385
> 

### One-sentence Summary

ResNet은 **skip connection을 사용해 매우 깊은 CNN도 안정적으로 학습할 수 있게 만든 대표적인 CNN architecture 논문**이다.

### Core Problem

VGGNet 이후 CNN은 더 깊어지는 방향으로 발전했지만, 단순히 layer를 많이 쌓는다고 항상 성능이 좋아지지는 않았다.

핵심 문제는 **degradation problem**이다.

깊은 plain network에서는 layer를 더 추가했을 때 train error조차 오히려 높아질 수 있었다.

중요한 점은 이것이 단순한 overfitting 문제가 아니라는 것이다.

- overfitting이면 train error는 낮고 test error가 높아야 한다.
- degradation problem은 train error 자체가 높아지는 현상이다.
- 즉, 네트워크가 너무 깊어지면 최적화가 어려워져 학습이 잘 되지 않는다.

### Key Idea

ResNet의 핵심 아이디어는 **residual learning**이다.

일반적인 네트워크는 원하는 mapping을 직접 학습한다.

```
H(x)
```

ResNet은 이를 직접 학습하지 않고, residual function을 학습한다.

```
F(x) = H(x) - x
```

따라서 최종 출력은 다음처럼 계산된다.

```
H(x) = F(x) + x
```

원래, x를 conv layer 들에 넣으면 f(x)가 나온다.

이때, conv를 통과한 f(x)에 x를 더해주고, ReLU를 통과시킨다.

즉, layer가 입력 `x`를 완전히 새로 변환하는 것이 아니라, 입력에 더해질 변화량 `F(x)`만 학습하게 만든다.

이때 `x`를 뒤쪽 layer로 바로 전달하는 연결을 **skip connection** 또는 **identity shortcut**이라고 한다.

핵심 효과는 다음이다.

- x에 어떤 값을 조금 더해 변화시킬까를 학습한다.
- gradient가 더 잘 흐른다.
- 깊은 네트워크의 최적화가 쉬워진다.
- 필요하면 layer가 identity mapping에 가깝게 동작할 수 있다.

⇒ 즉, layer가 매우 깊다면 차근차근 조금씩 입력값을 바꿔가는게 좋다고 보는 아이디어이다

### Architecture

ResNet은 여러 개의 **residual block**을 쌓아 만든 구조이다.

기본 residual block은 다음과 같다.

```
Input x
→ Conv
→ BatchNorm
→ ReLU
→ Conv
→ BatchNorm
→ + x
→ ReLU
```

핵심 구조는 다음이다.

```
Output = F(x) + x
```

ResNet에는 대표적으로 두 가지 block이 있다.

첫째, **Basic Block**이다.

```
3×3 Conv
→ 3×3 Conv
→ Skip Connection
```

주로 ResNet-18, ResNet-34에서 사용된다.

둘째, **Bottleneck Block**이다.

```
1×1 Conv
→ 3×3 Conv
→ 1×1 Conv
→ Skip Connection
```

주로 ResNet-50, ResNet-101, ResNet-152에서 사용된다.

여기서 1×1 convolution은 channel 수를 줄이거나 늘리는 역할을 한다.

이를 통해 깊은 네트워크를 만들면서도 연산량을 통제할 수 있다.

대표 모델은 다음과 같다.

- ResNet-18
- ResNet-34
- ResNet-50
- ResNet-101
- ResNet-152

### Experiments & Results

ResNet은 ImageNet classification에서 매우 강한 성능을 보였다.

중요한 실험은 **plain network와 residual network의 비교**이다.

논문에서는 깊이가 같은 plain network와 ResNet을 비교했고, skip connection이 있는 모델이 훨씬 학습이 잘 된다는 것을 보였다.

핵심 결과는 다음이다.

- 34-layer plain network는 더 얕은 plain network보다 학습이 어려웠다.
- 34-layer ResNet은 residual connection 덕분에 더 잘 학습되었다.
- ResNet은 50, 101, 152 layer처럼 매우 깊은 네트워크까지 확장 가능했다.

### Significance

ResNet의 의미는 **깊은 네트워크 학습 문제를 구조적으로 해결했다는 것**이다.

ResNet의 중요한 의의는 다음이다.

- skip connection을 통해 매우 깊은 CNN 학습을 가능하게 했다.
- degradation problem을 명확히 제시하고 해결했다.
- skip connection이 deep architecture의 핵심 설계 원리가 되었다.
- 이후 CNN뿐 아니라 Transformer, VLM, LLM에서도 residual connection이 기본 구조로 사용된다.
- classification, detection, segmentation 등 다양한 vision task의 표준 backbone으로 널리 사용되었다.

### Limitations

ResNet은 매우 강력하지만 한계도 있다.

- 깊어질수록 여전히 연산량과 메모리 사용량이 증가한다.
- residual connection이 효율성 문제까지 해결해주는 것은 아니다.
- block 구조와 depth 설정은 여전히 사람이 설계한 부분이 크다.
- mobile이나 real-time 환경에서는 ResNet 계열도 무거울 수 있다.
- 이후 연구는 ResNet을 기반으로 width, cardinality, feature reuse, attention, efficiency를 개선하는 방향으로 발전했다.

### What I Should Remember

- ResNet의 핵심은 **residual connection**이다.
- ResNet은 `H(x)`를 직접 학습하는 대신 `F(x) = H(x) - x`를 학습한다.
- 최종 출력은 `F(x) + x`로 계산된다.
- 모델이 깊어질수록 모델의 성능은 좋아질 수 있지만 학습이 어려워질 수 있다.
- 이를 위해, skip connection은 gradient flow를 개선하고 깊은 네트워크의 최적화를 쉽게 만든다.
- ResNet은 degradation problem을 해결해 매우 깊은 CNN 학습을 가능하게 했다.
- ResNet 이후의 많은 CNN 모델은 residual connection을 기본 설계 원리로 사용한다.

# Inception-v4 / Inception-ResNet

> Title : Inception-v4, Inception-ResNet and the Impact of Residual Connections on Learning
> 
> 
> Authors : Christian Szegedy, Sergey Ioffe, Vincent Vanhoucke, Alexander A. Alemi
> 
> Year / Venue : 2016 arXiv / AAAI 2017
> 
> Field / Main Task : Computer Vision / Image Classification / CNN Architecture
> 
> URL : arXiv:1602.07261
> 

### One-sentence Summary

Inception-v4는 Inception v3를 더 체계적으로 확장한 모델이고, 같은 논문에서 **Inception 구조에 residual connection을 결합한 Inception-ResNet**도 함께 제안했다.

### Core Problem

Inception v2/v3는 효율적인 multi-branch 구조를 통해 좋은 성능을 보였지만, 구조가 깊어질수록 학습이 어려워질 수 있었다.

동시에 ResNet은 residual connection을 통해 매우 깊은 네트워크 학습을 쉽게 만들었다.

핵심 문제는 다음이다.

- Inception 구조를 더 깊고 강하게 만들 수 있는가?
- Inception module에 residual connection을 결합하면 학습이 더 빨라지는가?
- residual connection이 Inception 구조의 성능도 개선하는가?
- 매우 넓은 Inception-ResNet 구조를 안정적으로 학습하려면 어떤 처리가 필요한가?

### Key Idea

이 논문의 핵심 아이디어는 두 가지다.

첫째, **순수 Inception 구조를 더 정리하고 확장한 Inception-v4**를 제안했다.

둘째, **Inception module에 residual connection을 결합한 Inception-ResNet**을 제안했다.

주요 아이디어는 다음이다.

- Inception-v3보다 더 uniform하고 체계적인 Inception module 설계
- Inception-A, Inception-B, Inception-C block 사용
- Reduction-A, Reduction-B block으로 feature map 크기 축소
- Inception module에 residual connection 결합
- residual scaling을 통해 매우 넓은 residual Inception network의 학습 안정화

논문에서는 residual connection이 Inception network의 학습 속도를 크게 높인다고 보고했다. 다만 성능 향상은 존재하지만, 비슷한 계산량의 순수 Inception보다 압도적으로 큰 차이는 아니라고 해석하는 것이 정확하다.

### Architecture

이 논문에서는 크게 세 가지 모델 계열을 다룬다.

- **Inception-v4**
- **Inception-ResNet-v1**
- **Inception-ResNet-v2**

Inception-v4의 기본 흐름은 다음과 같다.

```
Input Image
→ Stem
→ Inception-A 반복
→ Reduction-A
→ Inception-B 반복
→ Reduction-B
→ Inception-C 반복
→ Global Average Pooling
→ Dropout
→ Linear Classifier
→ Softmax
```

Inception-v4는 residual connection 없이, Inception module 자체를 더 깊고 정교하게 쌓은 구조이다.

반면 Inception-ResNet은 Inception module의 출력에 shortcut connection을 더한다.

```
Input x
→ Inception Branches
→ Filter Concatenation
→ 1×1 Conv
→ Residual Scaling
→ + x
→ Output
```

특히 논문에서는 매우 넓은 residual Inception network를 학습할 때 activation 값이 불안정해질 수 있어, residual branch의 출력을 작게 scaling한 뒤 shortcut에 더하는 방식을 사용했다. 논문은 일반적으로 0.1~0.3 사이의 scaling factor를 사용했다고 설명한다.

### Experiments & Results

이 논문은 ImageNet classification을 중심으로 Inception-v4와 Inception-ResNet 계열을 비교했다.

핵심 결과는 다음이다.

- Inception-v4는 Inception-v3보다 더 강한 성능을 보였다.
- Inception-ResNet은 residual connection 덕분에 학습이 더 빨라졌다.
- Inception-ResNet 계열은 비슷한 비용의 순수 Inception 구조보다 약간 더 좋은 성능을 보였다.
- 3개의 residual model과 1개의 Inception-v4를 ensemble했을 때 ImageNet classification test set에서 **3.08% top-5 error**를 달성했다.

### Significance

Inception-v4 / Inception-ResNet의 의미는 **Inception 계열 구조가 ResNet의 residual learning 흐름과 결합되었다는 점**이다.

중요한 의의는 다음이다.

- Inception 구조를 더 체계적으로 확장했다.
- residual connection이 Inception 계열에도 효과적임을 보였다.
- residual scaling이 넓은 residual network 학습 안정화에 필요할 수 있음을 보였다.

### Limitations

Inception-v4 / Inception-ResNet의 한계는 다음이다.

- 구조가 매우 복잡하다.
- branch, block, reduction module 구성이 많아 구현과 분석이 어렵다.
- ResNet처럼 단순한 구조적 직관을 주지는 않는다.
- residual connection을 결합해도 성능 향상은 아주 큰 폭이라기보다는 제한적이다.
- 이후 CNN 연구는 더 단순한 scaling 법칙이나 효율적인 mobile architecture 쪽으로 이동했다.

즉, Inception-v4는 강력하지만, 구조적 복잡도가 높은 모델이다.

### What I Should Remember

- Inception-v4는 Inception v3를 더 깊고 체계적으로 확장한 순수 Inception 모델이다.
- 같은 논문에서 Inception module에 residual connection을 결합한 Inception-ResNet도 제안했다.
- 핵심 비교는 **순수 Inception 구조 vs residual Inception 구조**이다.
- residual connection은 Inception network의 학습 속도를 크게 높인다.
- 매우 넓은 Inception-ResNet에서는 residual branch를 그대로 더하면 학습이 불안정할 수 있어 **residual scaling**을 사용한다.

# WideResNet

> Title : Wide Residual Networks
> 
> 
> Authors : Sergey Zagoruyko, Nikos Komodakis
> 
> Year / Venue : 2016 / BMVC
> 
> Field / Main Task : Computer Vision / Image Classification / CNN Architecture
> 
> URL : arXiv:1605.07146
> 

### One-sentence Summary

WideResNet은 ResNet을 무작정 더 깊게 만들기보다, **depth를 줄이고 width를 넓혀 더 효율적이고 성능 좋은 residual network를 만든 모델**이다.

### Core Problem

ResNet은 residual connection 덕분에 매우 깊은 네트워크를 학습할 수 있게 만들었다.

하지만 단순히 depth를 계속 늘리는 방식에는 한계가 있었다.

핵심 문제는 다음이다.

- layer를 매우 많이 쌓으면 학습과 추론이 느려진다.
- depth를 늘릴수록 성능 향상 폭이 점점 작아질 수 있다.
- 너무 깊고 얇은 ResNet은 feature reuse가 비효율적일 수 있다.
- 성능을 높이기 위해 반드시 네트워크를 더 깊게 만들어야 하는지 의문이 있었다.

즉, WideResNet은 **깊게 만드는 것보다 넓게 만드는 것이 더 효율적일 수 있는가**를 실험한 논문이다.

### Key Idea

WideResNet의 핵심 아이디어는 **depth는 줄이고 width를 늘리는 것**이다.

여기서 width는 convolution layer의 **channel 수**를 의미한다.

WideResNet은 widening factor `k`를 사용해 residual block의 channel 수를 늘린다.

예를 들어:

```
WRN-28-10
```

은 다음을 의미한다.

- `28`: network depth
- `10`: widening factor
- 즉, 기본 ResNet보다 channel 수를 10배 넓힌 구조

### Architecture

WideResNet은 ResNet의 residual block 구조를 기반으로 한다.

기본 흐름은 다음과 같다.

```
Input Image
→ Conv
→ Wide Residual Block 반복
→ Global Average Pooling
→ Linear Classifier
→ Softmax
```

Wide Residual Block은 ResNet block과 비슷하지만, channel 수를 더 크게 만든다.

```
Input x
→ Conv
→ Conv
→ + x
→ Output
```

WideResNet의 주요 구조적 특징은 다음이다.

- ResNet의 residual connection 유지
- depth를 과도하게 늘리지 않음
- widening factor `k`로 channel 수 증가
- dropout을 residual block 안에 사용하기도 함
- 더 얕지만 넓은 구조로 학습 속도와 성능 개선

논문에서는 매우 깊고 얇은 ResNet보다, **적당히 깊고 넓은 ResNet이 더 좋은 accuracy-efficiency trade-off를 보일 수 있음**을 보였다.

### Experiments & Results

WideResNet은 CIFAR, SVHN, COCO, ImageNet 등에서 좋은 성능을 보였다. 논문은 depth를 줄이고 width를 늘린 WRN이 기존의 매우 깊은 ResNet보다 정확도와 효율성 면에서 더 우수할 수 있다고 보고했다.

핵심 결과는 다음이다.

- 매우 깊은 ResNet보다 더 얕고 넓은 WRN이 좋은 성능을 낼 수 있다.
- widening factor를 늘리면 성능이 개선될 수 있다.
- 하지만 너무 넓게 만들면 parameter 수와 연산량이 증가한다.
- dropout은 넓어진 residual network의 regularization에 도움이 될 수 있다.
- depth보다 width가 더 효율적인 성능 향상 방법이 될 수 있음을 보였다.

### Significance

WideResNet의 의미는 **CNN scaling에서 depth만이 답은 아니라는 점**을 보여준 것이다.

중요한 의의는 다음이다.

- ResNet의 scaling 방향을 depth 중심에서 width 중심으로 확장했다.
- depth, width, training speed 사이의 trade-off를 보여줬다.
- 이후 ResNeXt의 cardinality, EfficientNet의 compound scaling 같은 연구로 이어지는 중간 단계로 볼 수 있다.
- residual network의 성능은 단순히 layer 수만으로 결정되지 않는다는 점을 보여줬다.

### Limitations

WideResNet의 한계는 다음이다.

- width를 늘리면 parameter 수와 메모리 사용량이 증가한다.
- 너무 넓은 모델은 연산량이 커져 mobile 환경에는 부적합할 수 있다.
- depth와 width의 최적 균형은 dataset과 task에 따라 달라진다.
- width를 늘리는 것만으로 multi-scale feature, channel attention, hardware efficiency 문제를 해결하지는 못한다.
- 이후 연구는 width 외에도 cardinality, feature reuse, attention, compound scaling을 함께 고려하는 방향으로 발전했다.

### What I Should Remember

- WideResNet의 핵심은 **deep but thin보다 shallow but wide가 더 효율적일 수 있다**는 점이다.
- 기존 ResNet의 residual connection은 유지하되, layer 수를 줄이고 channel 수를 늘린다.
- `WRN-28-10`에서 `28`은 depth, `10`은 widening factor이다.
- WideResNet은 depth만 늘리는 방식의 한계를 지적했다.

# ResNeXt

> Title : Aggregated Residual Transformations for Deep Neural Networks
> 
> 
> Authors : Saining Xie, Ross Girshick, Piotr Dollár, Zhuowen Tu, Kaiming He
> 
> Year / Venue : 2016 arXiv / CVPR 2017
> 
> Field / Main Task : Computer Vision / Image Classification / CNN Architecture
> 
> URL : arXiv:1611.05431
> 

### One-sentence Summary

ResNeXt는 ResNet의 residual block을 확장하여, 여러 개의 변환 경로를 병렬로 사용하는 **grouped convolution 기반 aggregated residual transformation**을 제안한 CNN architecture 논문이다.

### Core Problem

ResNet은 residual connection을 통해 매우 깊은 CNN을 학습할 수 있게 만들었다.

하지만 성능을 더 높이기 위해 단순히 depth나 width를 늘리는 방식에는 한계가 있었다.

핵심 문제는 다음이다.

- 네트워크를 더 깊게 만들면 학습과 계산 비용이 커진다.
- width를 늘리면 parameter 수와 연산량이 증가한다.
- Inception처럼 branch를 직접 설계하는 방식은 구조가 복잡하다.
- 더 단순하면서도 성능을 높일 수 있는 새로운 scaling dimension이 필요했다.

### Key Idea

ResNeXt의 핵심 아이디어는 **cardinality**이다.

Cardinality는 하나의 block 안에서 병렬로 수행되는 transformation의 개수를 의미한다.

기존 ResNet은 하나의 residual branch에서 변환을 수행했다.

```markdown
Input x
→ Residual Function F(x)
→ + x
→ Output
```

ResNeXt는 여러 개의 작은 transformation을 병렬로 수행한 뒤, 그 결과를 합친다.

```markdown
Input x
→ Transformation 1
→ Transformation 2
→ Transformation 3
→ ...
→ Aggregation
→ + x
→ Output
```

이렇게 되면 그룹 수 만큼 parameter가 줄어들게 된다.

그 다음 이 grouped conv로 줄인 parameter를 Inner channel 의 수를 키우는데 투자한다.

따라서 bottleneck 현상ㅇ을 조금 완화해 성능을 높인다.

### Architecture

ResNeXt는 ResNet의 bottleneck block을 기반으로 한다.

기존 ResNet bottleneck은 다음과 같다.

```markdown
1×1 Conv
→ 3×3 Conv
→ 1×1 Conv
→ Skip Connection
```

ResNeXt는 가운데 3×3 convolution을 **grouped convolution**으로 바꾼다.

```markdown
1×1 Conv
→ 3×3 Grouped Conv
→ 1×1 Conv
→ Skip Connection
```

여기서 grouped convolution은 channel을 여러 group으로 나누어 각각 독립적으로 convolution을 수행하는 방식이다.

ResNeXt block은 흔히 다음처럼 표현된다.

```markdown
ResNeXt-50 32×4d
```

이 의미는 다음과 같다.

- `32` : cardinality, 즉 group의 개수
- `4d` : 각 group의 width
- `32×4d` : 32개의 group이 각각 4-dimensional transformation을 수행한다는 의미

ResNeXt는 구조적으로 ResNet과 비슷하지만, 핵심 차이는 **residual branch 내부의 transformation을 여러 group으로 나눈다**는 점이다.

### Experiments & Results

ResNeXt는 ImageNet classification에서 ResNet보다 좋은 성능을 보였다.

중요한 실험은 다음이다.

- depth를 늘리는 것
- width를 늘리는 것
- cardinality를 늘리는 것

이 세 가지를 비교했다.

논문의 핵심 결과는 **cardinality를 늘리는 것이 depth나 width를 단순히 늘리는 것보다 효율적인 성능 향상 방법**이 될 수 있다는 것이다.

### Significance

ResNeXt의 의미는 CNN scaling에서 **cardinality라는 새로운 설계 축**을 제시했다는 점이다.

VGGNet은 depth를 강조했고, ResNet은 residual connection을 통해 깊은 네트워크 학습을 가능하게 했다.

ResNeXt는 여기서 한 단계 더 나아가 다음을 보여줬다.

- 성능 향상은 depth나 width만의 문제가 아니다.
- 하나의 block 안에서 여러 transformation을 병렬로 수행하는 것도 중요하다.
- grouped convolution을 사용하면 구조를 단순하게 유지하면서도 표현력을 높일 수 있다.
- Inception의 multi-branch 아이디어를 더 단순하고 규칙적인 형태로 구현할 수 있다.

즉, ResNeXt는 **ResNet의 단순함 + Inception의 multi-branch idea**를 grouped convolution으로 통합한 모델이라고 볼 수 있다.

### Limitations

ResNeXt의 한계는 다음이다.

- cardinality를 늘리면 결국 연산량과 메모리 사용량이 증가한다.
- 모바일 환경이나 매우 제한된 연산 환경에서는 여전히 무거울 수 있다.
- feature reuse나 channel attention 자체를 직접 다루는 모델은 아니다.
- 이후 DenseNet, SENet, EfficientNet 등은 feature reuse, channel importance, scaling efficiency를 다른 방향에서 개선한다.

### What I Should Remember

- ResNeXt의 핵심은 **cardinality**이다.
- Cardinality는 하나의 block 안에서 병렬로 수행되는 transformation의 개수이다.
- ResNeXt는 ResNet bottleneck block의 3×3 convolution을 **grouped convolution**으로 바꾼 구조이다.
- `ResNeXt-50 32×4d`에서 `32`는 group 개수, `4d`는 각 group의 width를 의미한다.
- ResNeXt는 depth와 width 외에 **cardinality도 CNN 성능을 높이는 중요한 설계 축**임을 보여줬다.

# DenseNet

> Title : Densely Connected Convolutional Networks
> 
> 
> Authors : Gao Huang, Zhuang Liu, Laurens van der Maaten, Kilian Q. Weinberger
> 
> Year / Venue : 2016 arXiv / CVPR 2017
> 
> Field / Main Task : Computer Vision / Image Classification / CNN Architecture
> 
> URL : arXiv:1608.06993
> 

### One-sentence Summary

DenseNet은 각 layer가 이전 모든 layer의 feature map을 입력으로 받아 사용하는 **dense connectivity**를 제안한 CNN architecture 논문이다.

### Core Problem

ResNet은 residual connection을 통해 깊은 CNN의 학습 문제를 크게 완화했다.

하지만 여전히 다음 문제가 남아 있었다.

- 깊은 네트워크에서는 feature와 gradient가 여러 layer를 지나며 약해질 수 있다.
- 각 layer가 이전 feature를 충분히 재사용하지 못할 수 있다.
- 네트워크가 깊어질수록 parameter 수와 연산량이 증가한다.
- 더 효율적인 feature propagation과 feature reuse가 필요했다.

즉, DenseNet의 핵심 문제의식은 **깊은 CNN에서 feature와 gradient를 더 잘 흐르게 만들고, 이미 계산된 feature를 효율적으로 재사용하는 것**이다.

### Key Idea

DenseNet의 핵심 아이디어는 **dense connection**이다.

기존 CNN에서는 각 layer가 바로 이전 layer의 출력만 입력으로 받는다.

$$
x_l = H_l(x_{l-1})
$$

ResNet은 이전 feature를 더해서 전달한다.

$$
x_l = H_l(x_{l-1}) + x_{l-1}
$$

DenseNet은 다르게 접근한다.

각 layer가 이전 모든 layer의 feature map을 입력으로 받는다.

$$
x_l = H_l([x_0, x_1, ..., x_{l-1}])
$$

여기서 `[ ]`는 feature map을 channel dimension 방향으로 **concatenate**한다는 뜻이다.

즉, DenseNet은 feature를 더하는 것이 아니라, **이어 붙여서 재사용**한다.

### Architecture

DenseNet은 여러 개의 **Dense Block**과 **Transition Layer**로 구성된다.

기본 흐름은 다음과 같다.

```markdown
Input Image
→ Convolution
→ Dense Block
→ Transition Layer
→ Dense Block
→ Transition Layer
→ Dense Block
→ Global Average Pooling
→ Linear Classifier
→ Softmax
```

Dense Block 안에서는 각 layer가 이전 모든 layer의 출력을 입력으로 받는다.

```markdown
Layer 1 → Layer 2
Layer 1, 2 → Layer 3
Layer 1, 2, 3 → Layer 4
...
```

DenseNet의 핵심 구성 요소는 다음이다.

- **Dense Block**: 모든 layer가 서로 연결되어 feature를 재사용하는 block
- **Concatenation**: feature를 더하지 않고 channel 방향으로 이어 붙임
- **Growth Rate**: 각 layer가 새롭게 추가하는 channel 수
- **Transition Layer**: feature map size와 channel 수를 줄이는 layer
- **Bottleneck Layer**: 1×1 convolution으로 연산량을 줄인 뒤 3×3 convolution 수행

특히 growth rate가 중요하다.

DenseNet에서는 각 layer가 많은 channel을 새로 만들 필요가 없다. (growth rate개 만큼만 만듬)

이전 layer들의 feature를 계속 재사용할 수 있기 때문에, 각 layer는 적은 수의 새로운 feature만 추가해도 된다.

### Experiments & Results

DenseNet은 CIFAR, SVHN, ImageNet 등 여러 image classification dataset에서 좋은 성능을 보였다.

핵심 결과는 다음이다.

- ResNet과 비교해 적은 parameter로도 경쟁력 있는 성능을 냈다.
- dense connection이 gradient flow를 개선했다.
- feature reuse 덕분에 parameter efficiency가 좋아졌다.
- 깊은 네트워크에서도 학습이 안정적으로 이루어졌다.

중요한 점은 DenseNet이 단순히 성능만 높인 것이 아니라, **feature reuse를 통해 parameter 효율성을 높였다는 것**이다.

### Significance

DenseNet의 의미는 **CNN에서 feature reuse의 중요성을 명확히 보여준 것**이다.

ResNet이 깊은 네트워크의 학습을 쉽게 만들었다면, DenseNet은 한 단계 더 나아가 다음을 보여줬다.

- 이전 layer의 feature를 계속 재사용하면 더 효율적인 network가 된다.
- dense connection은 gradient flow를 개선한다.
- 깊은 CNN이 반드시 많은 parameter를 가져야 하는 것은 아니다.
- feature propagation을 잘 설계하면 compact하면서도 강력한 모델을 만들 수 있다.

DenseNet은 CNN architecture 설계에서 `gradient flow`와 `feature reuse`를 동시에 강조한 모델이다.

### Limitations

DenseNet의 한계는 다음이다.

- 모든 layer의 feature를 concatenate하기 때문에 memory 사용량이 커질 수 있다.
- feature map을 계속 저장해야 하므로 GPU memory 부담이 크다.
- 구조가 ResNet보다 구현과 분석이 복잡하다.
- dense connection이 많아질수록 실제 inference 효율성이 항상 좋은 것은 아니다.
- 이후 모델들은 feature reuse뿐 아니라 attention, scaling, mobile efficiency 쪽으로도 발전했다.

### What I Should Remember

- DenseNet의 핵심은 **dense connectivity**이다.
- 각 layer는 이전 모든 layer의 feature map을 입력으로 받는다.
- ResNet은 feature를 **더하고**, DenseNet은 feature를 **concatenate**한다.
- DenseNet은 feature reuse와 gradient flow를 개선한다.
- Growth rate는 각 layer가 새롭게 추가하는 channel 수를 의미한다.
- DenseNet은 적은 parameter로도 강한 성능을 낼 수 있는 parameter-efficient CNN이다.

# SENet

> Title : Squeeze-and-Excitation Networks
> 
> 
> Authors : Jie Hu, Li Shen, Samuel Albanie, Gang Sun, Enhua Wu
> 
> Year / Venue : 2017 arXiv / CVPR 2018
> 
> Field / Main Task : Computer Vision / Image Classification / CNN Architecture / Channel Attention
> 
> URL : arXiv:1709.01507
> 

### One-sentence Summary

SENet은 CNN feature map의 **channel별 중요도**를 학습해 중요한 channel은 강조하고 덜 중요한 channel은 약화시키는 **Squeeze-and-Excitation block**을 제안한 논문이다.

### Core Problem

기존 CNN은 convolution을 통해 spatial 정보와 channel 정보를 함께 처리하지만, 대부분의 구조는 **channel 간 관계**를 명시적으로 모델링하지 않았다.

핵심 문제는 다음이다.

- feature map의 모든 channel이 항상 똑같이 중요한 것은 아니다.
- 이미지나 입력 상황에 따라 중요한 channel이 달라질 수 있다.
- 기존 CNN은 channel별 중요도를 adaptive하게 조정하는 구조가 부족했다.
- CNN의 표현력을 높이기 위해 channel relationship을 모델링할 필요가 있었다.

즉, SENet의 문제의식은 **“CNN이 만든 여러 feature channel 중 어떤 channel이 더 중요한지 모델이 스스로 판단하게 만들 수 있는가?”**이다.

### Key Idea

SENet의 핵심 아이디어는 **SE block**이다.

SE block은 feature map의 channel별 중요도를 계산하고, 그 중요도에 따라 각 channel을 다시 weighting한다.

전체 과정은 두 단계로 나뉜다.

```
Squeeze → Excitation
```

- **Squeeze**: 각 channel의 전역 정보를 하나의 값으로 압축
- **Excitation**: channel 간 관계를 학습해 각 channel의 중요도 계산
- **Recalibration**: 계산된 중요도로 원래 feature map의 channel을 재조정

즉, SENet은 spatial 위치보다 **channel dimension에 대한 attention**을 적용한 모델로 볼 수 있다.

### Architecture

SE block은 기존 CNN block 뒤에 붙일 수 있는 가벼운 module이다.

기본 흐름은 다음과 같다.

```
Input Feature Map
→ Squeeze
→ Excitation
→ Channel-wise Scaling
→ Output Feature Map
```

구체적으로는 다음 순서로 동작한다.

```
Feature Map
→ Global Average Pooling
→ Fully Connected Layer
→ ReLU
→ Fully Connected Layer
→ Sigmoid
→ Channel-wise Multiplication
```

먼저 **Global Average Pooling**을 사용해 각 channel의 spatial 정보를 하나의 값으로 압축한다.

```
C × H × W → C × 1 × 1
```

이 과정이 **Squeeze**이다.

그다음 작은 fully connected network를 통해 channel별 weight를 계산한다.

```
C → C/r → C
```

여기서 `r`은 reduction ratio이다. 보통 channel 수를 줄였다가 다시 늘려 연산량을 줄인다.

마지막으로 sigmoid를 거쳐 나온 channel별 weight를 원래 feature map에 곱한다.

```
Original Feature Map × Channel Weights
```

이 과정이 **Excitation**과 **Recalibration**이다.

SENet은 독립적인 backbone이라기보다, 기존 CNN에 SE block을 붙여 성능을 높일 수 있는 구조이다.

예를 들어 다음과 같이 사용할 수 있다.

- SE-ResNet
- SE-ResNeXt
- SE-Inception
- SENet

### Experiments & Results

SENet은 ImageNet classification에서 강한 성능을 보였다.

핵심 결과는 다음이다.

- SE block을 기존 CNN에 추가하면 작은 계산 비용 증가만으로 성능을 개선할 수 있다.
- ResNet, ResNeXt, Inception 등 여러 backbone에 적용 가능하다.
- channel attention이 CNN representation 향상에 효과적임을 보였다.
- SENet은 ILSVRC 2017 classification competition에서 우승했고, top-5 error 2.251%를 기록했다.

중요한 점은 SENet이 완전히 새로운 CNN 구조를 처음부터 만든 것이라기보다, **기존 CNN의 feature channel을 더 잘 선택하도록 만드는 plug-in module**에 가깝다는 것이다.

### Significance

SENet의 의미는 CNN architecture에서 **channel attention**의 중요성을 명확히 보여준 것이다.

중요한 의의는 다음이다.

- CNN feature map의 channel들이 서로 다른 중요도를 가진다는 점을 구조적으로 반영했다.
- channel-wise attention을 통해 feature representation을 강화했다.
- 기존 CNN backbone에 쉽게 추가할 수 있는 module을 제안했다.
- 이후 attention-based CNN, CBAM, EfficientNet, MobileNetV3 등에 영향을 줬다.

즉, SENet은 CNN에 **attention mechanism**을 본격적으로 도입한 대표적인 모델 중 하나로 볼 수 있다.

### Limitations

SENet의 한계는 다음이다.

- channel attention은 다루지만, spatial attention은 직접적으로 다루지 않는다.
- Global Average Pooling으로 channel 정보를 압축하기 때문에 세밀한 spatial 정보는 일부 손실될 수 있다.
- FC layer가 추가되므로 parameter와 연산량이 약간 증가한다.
- channel 관계를 전역 평균 기반으로만 요약하므로 복잡한 spatial-channel 관계를 모두 표현하기는 어렵다.
- 이후 CBAM 같은 모델은 channel attention과 spatial attention을 함께 사용하려고 했다.

### What I Should Remember

- SENet의 핵심은 **Squeeze-and-Excitation block**이다.
- SE block은 feature map의 **channel별 중요도**를 학습한다.
- Squeeze는 Global Average Pooling으로 각 channel의 전역 정보를 압축하는 과정이다.
- Excitation은 작은 FC network로 channel별 weight를 계산하는 과정이다.
- Recalibration은 계산된 channel weight를 원래 feature map에 곱해 중요한 channel을 강조하는 과정이다.
- SENet은 기존 CNN에 쉽게 붙일 수 있는 **channel attention module**이다.

# MobileNet V1

> Title : MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications
> 
> 
> Authors : Andrew G. Howard et al.
> 
> Year / Venue : 2017 / arXiv
> 
> Field / Main Task : Efficient CNN Architecture / Mobile Vision / Image Classification
> 
> URL : arXiv:1704.04861
> 

### One-sentence Summary

MobileNet V1은 **depthwise separable convolution**을 사용해 CNN의 연산량과 parameter 수를 크게 줄인 mobile-efficient CNN architecture이다.

### Core Problem

기존 CNN은 ImageNet 같은 대규모 이미지 분류에서는 좋은 성능을 보였지만, 모바일이나 임베디드 환경에서 사용하기에는 너무 무거웠다.

핵심 문제는 다음이다.

- CNN의 convolution 연산량이 크다.
- parameter 수가 많아 메모리 사용량이 크다.
- 모바일 환경에서는 latency, power consumption, model size가 중요하다.
- 정확도를 어느 정도 유지하면서 가벼운 CNN이 필요했다.

### Key Idea

MobileNet V1의 핵심은 **standard convolution을 depthwise separable convolution으로 바꾸는 것**이다.

일반 convolution은 spatial filtering과 channel mixing을 한 번에 수행한다.

반면 depthwise separable convolution은 이를 두 단계로 나눈다.

```markdown
Depthwise Convolution
→ Pointwise Convolution
```

- **Depthwise Convolution**: 각 input channel마다 따로 spatial convolution 수행
- **Pointwise Convolution**: 1×1 convolution으로 channel 정보를 섞음

이렇게 하면 일반 convolution보다 연산량과 parameter 수를 크게 줄일 수 있다.

또한 MobileNet V1은 모델 크기를 조절하기 위해 두 가지 hyperparameter를 사용한다.

- **Width Multiplier**: channel 수를 줄여 모델 폭 조절
- **Resolution Multiplier**: 입력 이미지 해상도를 줄여 연산량 조절

### Architecture

MobileNet V1은 depthwise separable convolution block을 반복적으로 쌓은 구조이다.

기본 흐름은 다음과 같다.

```markdown
Input Image
→ Standard Conv
→ Depthwise Conv + Pointwise Conv 반복
→ Global Average Pooling
→ Fully Connected Layer
→ Softmax
```

기본 block은 다음과 같다.

```markdown
Depthwise 3×3 Conv
→ BatchNorm
→ ReLU
→ Pointwise 1×1 Conv
→ BatchNorm
→ ReLU
```

MobileNet V1의 구조적 특징은 다음이다.

- 대부분의 convolution을 depthwise separable convolution으로 대체
- 1×1 pointwise convolution이 연산량의 큰 부분을 차지
- width multiplier와 resolution multiplier로 모델 크기 조절 가능
- 모바일 환경에서 accuracy와 efficiency의 trade-off를 조절 가능

### Experiments & Results

MobileNet V1은 ImageNet classification에서 기존 대형 CNN보다 훨씬 적은 연산량과 parameter로 경쟁력 있는 성능을 보였다.

핵심 결과는 다음이다.

- standard convolution 대비 연산량을 크게 줄였다.
- 작은 모델 크기에서도 합리적인 classification 성능을 유지했다.
- classification뿐 아니라 detection, face attribute, landmark 등 mobile vision task에도 적용 가능함을 보였다.
- width multiplier와 resolution multiplier를 통해 다양한 크기의 모델을 만들 수 있었다.

### Significance

MobileNet V1의 의미는 **CNN architecture 설계에서 efficiency를 본격적으로 중심에 둔 것**이다.

중요한 의의는 다음이다.

- depthwise separable convolution을 mobile CNN의 핵심 기법으로 정착시켰다.
- 모바일/엣지 환경에서 CNN을 실제로 사용할 수 있는 방향을 제시했다.
- 이후 MobileNet V2, V3, EfficientNet, EfficientDet 등 efficient model 연구에 영향을 줬다.

### Limitations

MobileNet V1의 한계는 다음이다.

- depthwise separable convolution은 연산량은 줄이지만 표현력이 제한될 수 있다.
- 단순히 channel 수를 줄이면 accuracy 손실이 커질 수 있다.
- ReLU가 low-dimensional feature에서 정보를 손실시킬 수 있다.
- architecture 자체는 비교적 단순하며, 더 정교한 block 설계가 필요했다.
- 실제 latency는 FLOPs만으로 완전히 설명되지 않는다.

### What I Should Remember

- MobileNet V1의 핵심은 **depthwise separable convolution**이다.
- Depthwise convolution은 spatial filtering, pointwise convolution은 channel mixing을 담당한다.
- 목적은 accuracy를 최대화하는 것이 아니라, **accuracy 대비 연산 효율을 높이는 것**이다.
- Width multiplier와 resolution multiplier로 모델 크기와 연산량을 조절한다.
- MobileNet V1은 mobile-efficient CNN의 대표적인 출발점이다.

---

# MobileNet V2

> Title : MobileNetV2: Inverted Residuals and Linear Bottlenecks
> 
> 
> Authors : Mark Sandler, Andrew Howard, Menglong Zhu, Andrey Zhmoginov, Liang-Chieh Chen
> 
> Year / Venue : 2018 / CVPR
> 
> Field / Main Task : Efficient CNN Architecture / Mobile Vision / Image Classification
> 
> URL : arXiv:1801.04381
> 

### One-sentence Summary

MobileNet V2는 **inverted residual block과 linear bottleneck**을 제안해 MobileNet V1보다 더 효율적이고 표현력 있는 mobile CNN을 만든 모델이다.

### Core Problem

MobileNet V1은 depthwise separable convolution으로 연산량을 크게 줄였지만, 여전히 한계가 있었다.

핵심 문제는 다음이다.

- 너무 작은 channel 공간에서 ReLU를 적용하면 정보 손실이 생길 수 있다.
- 가벼운 모델에서는 feature representation을 충분히 유지하기 어렵다.
- 연산량은 줄이면서도 표현력을 유지할 수 있는 block 구조가 필요했다.
- mobile 환경에서 classification뿐 아니라 detection, segmentation에도 쓸 수 있는 backbone이 필요했다.

### Key Idea

MobileNet V2의 핵심은 두 가지다.

```markdown
Inverted Residual
Linear Bottleneck
```

기존 ResNet bottleneck은 보통 channel을 줄였다가 다시 늘린다.

```markdown
Wide → Narrow → Wide
```

MobileNet V2는 반대로 좁은 channel을 먼저 넓힌 뒤, depthwise convolution을 수행하고 다시 좁힌다.

```markdown
Narrow → Wide → Narrow
```

이를 **inverted residual**이라고 한다.

또한 마지막 bottleneck layer에서는 ReLU를 사용하지 않고 linear activation을 사용한다.

이것이 **linear bottleneck**이다.

이유는 low-dimensional bottleneck 공간에서 ReLU를 사용하면 음수 정보가 잘려 representation 손실이 커질 수 있기 때문이다.

### Architecture

MobileNet V2의 기본 block은 **inverted residual block**이다.

기본 흐름은 다음과 같다.

```markdown
Input
→ 1×1 Expansion Conv
→ 3×3 Depthwise Conv
→ 1×1 Projection Conv
→ Linear Bottleneck
→ Skip Connection
```

구조적 특징은 다음이다.

- 1×1 expansion convolution으로 channel 수를 늘림
- 3×3 depthwise convolution으로 spatial feature 추출
- 1×1 projection convolution으로 channel 수를 다시 줄임
- 마지막 projection layer에는 ReLU를 사용하지 않음
- input과 output shape이 같으면 residual connection 사용

MobileNet V2 block은 다음처럼 이해할 수 있다.

```markdown
Expand
→ Filter
→ Project
```

즉, 충분히 넓은 공간에서 feature를 처리한 뒤, 다시 compact한 representation으로 압축하는 구조이다.

### Experiments & Results

MobileNet V2는 ImageNet classification에서 MobileNet V1보다 더 좋은 accuracy-efficiency trade-off를 보였다.

핵심 결과는 다음이다.

- MobileNet V1보다 적은 연산량 또는 비슷한 연산량에서 더 좋은 성능을 보였다.
- inverted residual block이 efficient CNN backbone으로 효과적임을 보였다.
- classification뿐 아니라 object detection, semantic segmentation에서도 좋은 backbone으로 사용될 수 있음을 보였다.
- 특히 lightweight segmentation 모델인 DeepLab 계열과도 연결되었다.

### Significance

MobileNet V2의 의미는 **efficient CNN에서도 representation 손실을 고려해야 한다는 점을 보여준 것**이다.

중요한 의의는 다음이다.

- inverted residual block을 mobile CNN의 핵심 block으로 제안했다.
- linear bottleneck을 통해 low-dimensional feature 손실 문제를 줄였다.
- 이후 MobileNet V3, EfficientNet 계열에 영향을 줬다.
- mobile backbone이 classification뿐 아니라 detection, segmentation에도 쓰일 수 있음을 강화했다.

### Limitations

MobileNet V2의 한계는 다음이다.

- architecture가 여전히 사람이 설계한 hand-designed 구조에 가깝다.
- 실제 hardware latency까지 완전히 최적화한 것은 아니다.
- accuracy를 더 높이려면 더 정교한 activation, attention, search 기법이 필요했다.
- 매우 복잡한 vision task에서는 대형 backbone보다 표현력이 제한될 수 있다.

### What I Should Remember

- MobileNet V2의 핵심은 **inverted residual + linear bottleneck**이다.
- Inverted residual은 `Narrow → Wide → Narrow` 구조이다.
- Expansion layer에서 channel을 넓히고, depthwise convolution으로 feature를 처리한 뒤, projection layer에서 다시 줄인다.
- Bottleneck layer에서는 ReLU를 사용하지 않아 정보 손실을 줄인다.
- MobileNet V2는 단순히 연산량을 줄이는 것이 아니라, **효율성과 representation 보존을 함께 고려한 모델**이다.

---

# MobileNet V3

> Title : Searching for MobileNetV3
> 
> 
> Authors : Andrew Howard et al.
> 
> Year / Venue : 2019 / ICCV
> 
> Field / Main Task : Efficient CNN Architecture / Mobile Vision / Neural Architecture Search
> 
> URL : arXiv:1905.02244
> 

### One-sentence Summary

MobileNet V3는 MobileNet V2의 inverted residual 구조를 기반으로, **NAS, NetAdapt, SE block, h-swish activation**을 결합해 실제 모바일 환경에서 더 좋은 accuracy-latency trade-off를 달성한 모델이다.

### Core Problem

MobileNet V2는 효율적인 구조였지만, 여전히 개선할 부분이 있었다.

핵심 문제는 다음이다.

- FLOPs가 낮아도 실제 기기 latency가 항상 낮은 것은 아니다.
- 모바일 환경에서는 theoretical computation보다 real hardware latency가 중요하다.
- hand-designed architecture만으로는 최적 구조를 찾기 어렵다.
- accuracy와 latency를 함께 고려한 구조 탐색이 필요했다.

즉, MobileNet V3의 문제의식은 **실제 모바일 기기에서 빠르고 정확한 CNN을 어떻게 설계할 것인가**이다.

### Key Idea

MobileNet V3의 핵심은 MobileNet V2 구조를 기반으로 여러 개선을 결합한 것이다.

주요 아이디어는 다음이다.

- **Neural Architecture Search, NAS**를 사용해 기본 architecture 탐색
- **NetAdapt**를 사용해 실제 mobile latency에 맞게 구조 조정
- **SE block**을 추가해 channel attention 적용
- **h-swish activation**을 사용해 정확도와 연산 효율 개선
- 마지막 classification head 구조를 단순화해 latency 감소
- MobileNetV3-Large와 MobileNetV3-Small 두 가지 모델 제안

MobileNet V3는 단순히 FLOPs를 줄이는 것이 아니라, **실제 하드웨어에서 빠르게 동작하는 구조**를 찾는 데 초점을 둔다.

### Architecture

MobileNet V3는 MobileNet V2의 inverted residual block을 기본으로 사용한다.

기본 block은 다음과 같다.

```markdown
Input
→ 1×1 Expansion Conv
→ Depthwise Conv
→ SE Block optional
→ h-swish / ReLU
→ 1×1 Projection Conv
→ Skip Connection optional
```

MobileNet V3의 주요 구성 요소는 다음이다.

- **Inverted Residual Block**: MobileNet V2에서 가져온 기본 구조
- **Depthwise Separable Convolution**: 연산량 절감
- **SE Block**: channel별 중요도 조정
- **h-swish**: swish를 mobile-friendly하게 근사한 activation
- **NAS + NetAdapt**: accuracy와 latency를 함께 고려한 구조 탐색

MobileNet V3는 두 가지 대표 모델을 제안한다.

- **MobileNetV3-Large**: 상대적으로 높은 성능이 필요한 경우
- **MobileNetV3-Small**: 매우 제한된 연산 환경을 위한 작은 모델

### Experiments & Results

MobileNet V3는 ImageNet classification에서 MobileNet V2보다 더 좋은 accuracy-latency trade-off를 보였다.

핵심 결과는 다음이다.

- MobileNet V2보다 실제 mobile latency 기준으로 더 효율적인 성능을 보였다.
- SE block이 작은 비용으로 accuracy 향상에 기여했다.
- h-swish는 mobile 환경에서 효율적인 activation으로 사용되었다.
- MobileNetV3-Large와 Small을 통해 다양한 기기 환경에 대응할 수 있었다.
- classification뿐 아니라 detection, segmentation task에도 적용 가능함을 보였다.

### Significance

MobileNet V3의 의미는 **CNN architecture 설계가 hand-designed 구조에서 hardware-aware architecture search로 이동했다는 점**이다.

MobileNet 계열의 흐름은 다음과 같다.

```markdown
MobileNet V1 = depthwise separable convolution
MobileNet V2 = inverted residual + linear bottleneck
MobileNet V3 = NAS + SE + h-swish + latency-aware optimization
```

중요한 의의는 다음이다.

- mobile CNN 설계에서 실제 latency를 중요한 최적화 목표로 삼았다.
- SE block과 efficient activation을 mobile CNN에 성공적으로 결합했다.
- NAS와 NetAdapt를 통해 사람이 직접 설계하기 어려운 구조를 탐색했다.
- edge AI, mobile vision, real-time inference에 적합한 CNN 설계 방향을 보여줬다.

### Limitations

MobileNet V3의 한계는 다음이다.

- NAS와 NetAdapt 과정이 복잡하다.
- 특정 hardware latency에 맞춰 최적화되면 다른 환경에서는 최적이 아닐 수 있다.
- 구조가 V1, V2보다 덜 직관적이다.
- 매우 큰 모델이나 고정밀 vision task에서는 여전히 대형 backbone보다 성능이 제한될 수 있다.
- architecture search에 의존하기 때문에 설계 원리를 해석하기 어렵다.

### What I Should Remember

- MobileNet V3의 핵심은 **MobileNet V2 + NAS + SE block + h-swish + hardware-aware optimization**이다.
- V1은 depthwise separable convolution, V2는 inverted residual, V3는 실제 latency 최적화가 핵심이다.
- SE block은 channel attention을 추가해 표현력을 높인다.
- h-swish는 mobile-friendly activation이다.
- MobileNet V3는 FLOPs만 줄이는 것이 아니라, **실제 모바일 기기에서 빠르고 정확한 모델**을 만드는 데 초점을 둔다.
- MobileNet 계열은 CNN architecture 흐름에서 `accuracy 중심 → efficiency 중심 → hardware-aware optimization`으로 발전한 대표 사례이다.

# EfficientNet

> Title : EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks
> 
> 
> Authors : Mingxing Tan, Quoc V. Le
> 
> Year / Venue : 2019 / ICML
> 
> Field / Main Task : Efficient CNN Architecture / Image Classification / Model Scaling
> 
> URL : arXiv:1905.11946
> 

### One-sentence Summary

EfficientNet은 CNN을 키울 때 depth, width, resolution을 따로 늘리는 것이 아니라, **compound scaling**을 통해 세 요소를 균형 있게 확장한 efficient CNN architecture이다.

### Core Problem

기존 CNN들은 성능을 높이기 위해 보통 다음 중 하나를 키웠다.

- **Depth**: layer 수를 늘림
- **Width**: channel 수를 늘림
- **Resolution**: 입력 이미지 해상도를 높임

하지만 이 중 하나만 무작정 키우면 비효율적일 수 있다.

핵심 문제는 다음이다.

- depth만 늘리면 학습이 어려워지고 gradient 문제가 생길 수 있다.
- width만 늘리면 parameter 수와 연산량이 커진다.
- resolution만 높이면 feature map 크기가 커져 연산량이 크게 증가한다.
- 모델을 scale up할 때 어떤 요소를 얼마나 키워야 하는지 명확한 기준이 부족했다.

즉, EfficientNet의 문제의식은 **CNN을 더 크고 정확하게 만들 때, depth, width, resolution을 어떻게 균형 있게 조절할 것인가**이다.

### Key Idea

EfficientNet의 핵심 아이디어는 **compound scaling**이다.

기존 방식은 depth, width, resolution 중 하나를 독립적으로 늘렸다.

EfficientNet은 세 요소를 함께 조절한다.

```markdown
Depth
Width
Resolution
```

이 세 가지를 일정한 비율로 동시에 키우는 방식이다.

논문에서는 compound coefficient `φ`를 사용해 모델 크기를 조절한다.

```markdown
depth = α^φ
width = β^φ
resolution = γ^φ
```

여기서 `α`, `β`, `γ`는 각각 depth, width, resolution을 얼마나 키울지 정하는 scaling coefficient이다.

핵심은 다음이다.

```markdown
모델을 키울 때 한쪽만 크게 키우지 말고,
depth, width, resolution을 균형 있게 함께 키우자.
```

### Architecture

EfficientNet은 먼저 작은 baseline model인 **EfficientNet-B0**를 만든 뒤, compound scaling을 적용해 B1부터 B7까지 확장한다.

기본 흐름은 다음과 같다.

```markdown
EfficientNet-B0
→ Compound Scaling
→ EfficientNet-B1
→ EfficientNet-B2
→ ...
→ EfficientNet-B7
```

EfficientNet-B0는 NAS, Neural Architecture Search를 통해 찾은 architecture이다.

EfficientNet의 주요 building block은 **MBConv block**이다.

MBConv는 MobileNet V2에서 사용한 inverted residual block을 기반으로 한다.

기본 구조는 다음과 같다.

```markdown
Input
→ 1×1 Expansion Conv
→ Depthwise Conv
→ Squeeze-and-Excitation
→ 1×1 Projection Conv
→ Skip Connection
```

EfficientNet의 구조적 특징은 다음이다.

- MobileNet V2의 inverted residual 구조 사용
- depthwise separable convolution 사용
- SE block을 사용해 channel attention 적용
- NAS로 찾은 EfficientNet-B0를 baseline으로 사용
- compound scaling으로 B1~B7 모델 확장

즉, EfficientNet은 MobileNet 계열의 efficient convolution block과 SENet의 channel attention, 그리고 compound scaling을 결합한 모델로 볼 수 있다.

### Experiments & Results

EfficientNet은 ImageNet classification에서 매우 좋은 accuracy-efficiency trade-off를 보였다.

핵심 결과는 다음이다.

- 기존 CNN보다 적은 parameter와 FLOPs로 높은 정확도를 달성했다.
- 단순히 depth, width, resolution 중 하나만 키우는 것보다 compound scaling이 더 효율적이었다.
- EfficientNet-B0부터 B7까지 모델 크기에 따라 다양한 accuracy-efficiency 선택지를 제공했다.
- transfer learning에서도 좋은 성능을 보였다.

중요한 점은 EfficientNet이 단순히 “성능이 좋은 모델”이 아니라, **모델 크기를 키우는 체계적인 scaling rule을 제시했다는 것**이다.

### Significance

EfficientNet의 의미는 CNN architecture 설계에서 **scaling strategy의 중요성**을 명확히 보여준 것이다.

이전 CNN 발전 흐름은 다음과 같았다.

```markdown
AlexNet → deep CNN의 가능성
VGGNet → depth의 중요성
Inception → multi-scale feature와 효율성
ResNet → residual connection으로 깊은 네트워크 학습
ResNeXt → cardinality
DenseNet → feature reuse
SENet → channel attention
MobileNet → mobile efficiency
EfficientNet → compound scaling
```

EfficientNet은 이 흐름의 마지막에서 다음 질문에 답한다.

```markdown
좋은 CNN block이 있을 때,
그 모델을 어떻게 효율적으로 크게 만들 것인가?
```

중요한 의의는 다음이다.

- CNN scaling을 체계적인 문제로 다루었다.
- depth, width, resolution을 함께 고려해야 한다는 것을 보였다.
- accuracy와 efficiency 사이의 균형을 잘 잡은 모델 계열을 제안했다.
- 이후 EfficientNetV2, EfficientDet 등 efficient model 연구에 영향을 줬다.

### Limitations

EfficientNet의 한계는 다음이다.

- EfficientNet-B0 자체가 NAS로 찾은 구조라 설계 과정이 직관적이지 않다.
- compound scaling coefficient도 탐색을 통해 정해진다.
- 높은 resolution을 사용하는 큰 모델은 학습 비용이 크다.
- FLOPs가 낮다고 실제 hardware latency가 항상 낮은 것은 아니다.
- 이후 연구에서는 training speed, memory efficiency, hardware-aware optimization을 더 중요하게 다루게 되었다.
- Vision Transformer 계열 등장 이후에는 CNN만의 scaling보다 transformer 기반 scaling도 중요해졌다.

### What I Should Remember

- EfficientNet의 핵심은 **compound scaling**이다.
- CNN을 키울 때 depth, width, resolution을 균형 있게 함께 키운다.
- EfficientNet-B0는 NAS로 찾은 baseline model이다.
- EfficientNet-B1~B7은 B0에 compound scaling을 적용해 만든 모델들이다.
- EfficientNet은 MobileNet의 MBConv, SENet의 SE block, compound scaling을 결합한 efficient CNN이다.
- 단순히 layer를 깊게 하거나 channel만 늘리는 것보다, 여러 scaling 요소를 균형 있게 조절하는 것이 중요하다는 것을 보여줬다.
- CNN architecture 흐름에서 EfficientNet은 `좋은 block 설계`를 넘어 `모델 scaling 전략`까지 정리한 대표 모델이다.
