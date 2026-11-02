---
title: "Stanford CS231n | Lecture 4: Neural Networks and Backpropagation"
description: Neural Network의 비선형성과 Backpropagation의 동작 원리를 정리한 글입니다. Chain Rule을
  기반으로 Upstream·Local·Downstream Gradient의 관계와 Vector Backpropagation에서 사용되는
  Jacobian Matrix를 설명합니다.
pubDate: 2026-11-02
updatedDate: ""
slug: cs231n-lecture-4-neural-networks-backpropagation
topic: study
tags:
  - CS231n
  - Deep Learning
  - Neural Networks
  - Backpropagation
  - Chain Rule
  - Jacobian
draft: false
series: Stanford CS231N Deep Learning for Computer Vision | Spring 2025
seriesOrder: 4
featured: false
---
## **Stanford CS231N Deep Learning for Computer Vision | Spring 2025 | Lecture 4: Neural Networks and Backpropagation**

> **Lecture:** [Stanford CS231n Spring 2025 — Lecture 4: Neural Networks and Backpropagation](https://www.youtube.com/watch?v=25zD5qJHYsk)
>
> **Lecturer:** Ehsan Adeli
>
> **Sources:**
> - [Lecture Slides](https://cs231n.stanford.edu/slides/2025/lecture_4.pdf)
> - [CS231n Official Course Website](https://cs231n.stanford.edu/2025/)

## Neural Networks, Activation function

Linear Classifier는 linear decision boundary만 표현할 수 있기 때문에 복잡한 nonlinear pattern을 학습하기 어렵다

이를 해결하기 위해 여러 Linear Layer와 Nonlinear Activation Function을 결합한 Neural Network를 사용한다

⇒ 여러 Layer + Nonlinear Activation Function을 통해 복잡한 decision boundary를 학습할 수 있다

## Backpropagation

Neural Network를 학습하려면 Loss를 최소화하는 방향으로 weight를 업데이트해야 한다

이를 위해 각 weight에 대한 gradient를 계산하는 알고리즘이 Backpropagation(역전파) 이다

핵심은 Chain Rule을 이용해 최종 Loss에서 입력 방향으로 gradient를 전달하는 것이다

다음과 같은 예시를 보자

![subword-tokenization-1.png](/images/uploads/cs231n-lecture-4-neural-networks-backpropagation-1.svg)

- $f(x, y, z) = (x + y)z$
    - $q = x + y$,   $f = qz$

이제 f에 대한 x의 gradient를 구하려면 다음과 같이 Chain Rule이 필요하다

$$
\frac{\partial f}{\partial x}
=
\frac{\partial f}{\partial q}
\frac{\partial q}{\partial x}

$$

- Upstream gradient - 뒤쪽 node에서 전달받은 gradient → $\frac{\partial f}{\partial q}$
- Local gradient - 현재 node의 입력과 출력 사이의 Gradient → $\frac{\partial q}{\partial x}$
- Downstram gradient - 앞쪽 node로 전달할 gradient → $\frac{\partial f}{\partial x}$

→ Downstream = Upstream x Local gradient

따라서, 각 Node는 자신의 Local 만 계산하면 되고, upstream 이랑 곱해 앞쪽 node로 전달하면 된다

### Backpropagation with Vectors

앞에서는 모든 입 출력이 scalar였지만

실제 NN에서는 vector(tensor)가 입출력 된다

따라서, vector에서는 각 출력 원소를 각 입력 원소로 미분해야 한다

이때 사용하는 것이 Jacobian Matrix이다

### Jacobian Matrix

Vector-valued Function의 편미분을 행렬 형태로 표현한 것이다

입력 $x\in\mathbb{R}^n$, 출력 $z\in\mathbb{R}^m$ 라면,  $z=f(x)$

Jacobian은 다음과 같다

$$

J=
\frac{\partial z}{\partial x}
=
\begin{bmatrix}
\frac{\partial z_1}{\partial x_1}&\cdots&\frac{\partial z_1}{\partial x_n}\\
\vdots&\ddots&\vdots\\
\frac{\partial z_m}{\partial x_1}&\cdots&\frac{\partial z_m}{\partial x_n}
\end{bmatrix}

$$

Vector Backpropagation에서는 Chain Rule이 다음과 같이 확장된다.

$$
\nabla_x L=J^T\nabla_z L
$$

즉, Downstream Gradient = Jacobian Transpose × Upstream Gradient
