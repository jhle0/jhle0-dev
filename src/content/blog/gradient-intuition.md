---
title: Gradient의 의미 (Gradient Intuition)
description: 편미분, 방향도함수, gradient의 개념을 통해 왜 gradient가 함수가 가장 빠르게 증가하는 방향을 의미하는지
  설명한 글입니다. 머신러닝의 gradient descent가 왜 음의 gradient 방향으로 이동하는지도 직관적으로 이해할 수 있습니다.
pubDate: 2026-03-09
updatedDate: ""
slug: gradient-intuition
topic: study
tags:
  - ai-core
  - Gradient
  - Partial Derivative
  - Directional Derivative
draft: false
featured: false
---

## 편미분(**Partial Derivative)**

독립변수가 여러개에 종속변수가 하나인 함수에 대해서 미분을 어떻게 할까?

예를 들어 $f(x, y) = x^2 + xy + y^2$인 함수를 생각해보자.

이 함수에 임의의 점 하나를 찍어보면

그 점에서 기울기가 유일하게 결정되지 않는다는 것을 알 수 있다.

편미분은 여러 변수 함수에서 각 변수(각 좌표축 방향)가 함수값에 얼마나 영향을 주는지 따로 보고 싶을 때 사용하는 미분이다.

f(x, y)의 x축 방향으로의 변화율과 y축 방향으로의 변화율은 각각 구할 수 있기 때문에 다른 변수는 상수로 놓고 미분한다.

x방향으로의 편미분 : $\frac{\partial f }{\partial x} = 2x + y$

y방향으로의 편미분 : $\frac{\partial f }{\partial y} = 2y + x$

→ 즉, 편미분은 여러 변수 중 하나만 변화시킬 때의 함수 변화율이다.

## 그라디언트(Gradient)

gradient는 함수의 각 변수에 대한 편미분들을 하나의 벡터로 모아 놓은 것이다.

위 예시를 이용해 gradient를 수식으로 보면

$$
\nabla f= f_x\hat i +f_y\hat j =  \frac{\partial  }{\partial x}f(x,y)\hat i + \frac{\partial  }{\partial y}f(x,y)\hat j = \begin{bmatrix}\frac{\partial f }{\partial x} \\ \frac{\partial f }{\partial y} \end{bmatrix} 
$$

위 예시로 보면 $\nabla f(x, y) = \begin{bmatrix}2x + y \\ x + 2y\end{bmatrix}$  이다.

> gradient는 $\nabla$ 라는 Del(또는 nabla) 연산자를 이용한다
> 

gradient이 역할은 무엇일까?

원래 함수 $f$는 각 점에 대해 하나의 숫자(스칼라)를 출력하지만,
gradient는 각 점에 대해 **하나의 벡터를 출력**한다.

## gradient의 의미

gradient의 의미는 바로 ⇒ **함수가 가장 빠르게 증가하는 방향**

왜 일까??

### 방향 도함수(directional derivative)

함수 $f(\mathbf{x})$가 있고,

현재 점 $\mathbf{x}$에서 어떤 단위벡터 $u$ 방향으로 조금 움진인다고 하자.

그 방향으로의 변화율은 방향 도함수로 주어진다.

$$
D_uf(\mathbf{x}) = \nabla f(\mathbf{x}) \cdot u
$$

 $\nabla f(x)$와 $u$를 내적하면:

> **“전체 변화율 벡터 gradient를, 내가 가려는 방향 u에 투영한 값”이다.**
> 

즉, 방향도함수는 gradient를 내가 가고 싶은 방향 $u$ 에 투영한 값이며

그 방향에서의 함수 변화율을 의미한다.

이때, **u 방향이 가장 빨리 증가하는 방향이고 싶다**고 하자.

그러면 $\nabla f(\mathbf{x}) \cdot u$ 값이 가장 커져야 한다. 

내적 공식에 의해

$$
\nabla f(\mathbf{x}) \cdot u = ||\nabla f(\mathbf{x})|| cos\theta \space\space\space\space\space\space\space\space\space(||u|| = 1)
$$

$\theta$는 $\nabla f(\mathbf{x})$와 $u$ 사이의 각도이다.

이제 $u$를 바꿔가며 방향도함수를 가장 크게 만드는 방향을 찾으면 된다.

가장 커지려면 $cos\theta = 1$ 즉, $\theta$=0 일 때 최대이다.

이 말은 곧 

⇒ $u$가 $\nabla f(\mathbf{x})$와 같은 방향일 때 함수가 가장 빠르게 증가한다는 뜻이다

따라서 gradient는 함수가 가장 빠르게 증가하는 방향이다.
