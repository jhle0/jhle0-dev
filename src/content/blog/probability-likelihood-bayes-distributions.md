---
title: 확률(Probability)
description: |-
  확률과 가능도의 차이, 조건부확률과 베이즈 정리, 이항분포와 베타분포까지 핵심 개념을 정리한 글입니다.
  데이터와 모델 관점에서 확률을 해석하는 기본 프레임을 다룹니다.
pubDate: 2026-01-23
updatedDate: ""
slug: probability-likelihood-bayes-distributions
topic: study
tags:
  - log
draft: false
heroImage: /images/uploads/propability-1.png
series: Math
featured: false
---
## 확률(Probability)

확률은 모델(분포, distribution)과 모수(parameter) $\theta$ 가 주어졌을 때, 사건(event)이나 데이터(data)가 발생할 정도이다.

> **모집단을 조사하여 얻을 수 있는 통계적인 특성치**를 모수(Population Parameter)라고 하며 모집단 분포의 특성을 규정짓는 척도이다. 모 평균, 모 분산, 모 비율, 모 표준편차 등을 일컫는 말이다
> 

- 즉, 확률은 **모델은 고정**하고, 그 아래에서 **데이터/사건이 얼마나 가능한지** 본다.
- **표기**
    - **사건 확률 (event probability) :**
    
    $$
     P(A)
    $$
    
    - **PMF (Probability Mass Function, 확률질량함수)** :
        
        이산형(discrete) 확률변수 $X$가 특정 값을 가질 확률
        
        $$
         P_{X}(x\mid\theta)=P(X=x\mid\theta)
        $$
        
    - **PDF (Probability Density Function, 확률밀도함수)** :
        
        연속형(continuous) 확률변수 $X$의 밀도
        연속형에서는 한 점의 확률이 아니라 **밀도(density)** 를 다루며, 실제 확률은 구간 적분으로 계산한다.
        
        $$
         P(a\le X\le b\mid\theta)=\int_a^b f_X(x\mid\theta)\,dx
        $$
        
    

## 가능도(Likelihood, 우도)

가능도(likelihood)란

관측 데이터 $x$를 고정했을 때, 그 데이터를 **가장 그럴듯하게 만드는 모수 $\theta$를 평가하는 함수**
즉, 가능도는 “ **어떤 $\theta$가 데이터를 더 잘 설명하는가**”를 비교하는 점수 함수(score function)

- 정의
    
    $$
     L(θ∣x)≡p(x∣θ)
    $$
    
- **핵심 차이**
    - 확률: $\theta$ 고정, $x$가 변하는 관점
    - 가능도: $x$ 고정, $\theta$가 변하는 관점

- **예시(동전)**
    
    동전을 n번 던져 앞면이 k번 나왔을 때(데이터 k):
    

$$
 L(p\mid k)=P(K=k\mid n,p)=\binom{n}{k}p^k(1-p)^{n-k}
$$

여기서 p를 변수로 보고, 이 값을 가장 크게 만드는 p를 찾는 것이 **최대가능도추정 (MLE, Maximum Likelihood Estimation)** 이다.

### 오즈(Odds)와 로그오즈(Log-odds)

- **오즈 정의**: “일어남 : 안 일어남”의 비율
    
    $$
     {odds}=\frac{p}{1-p}
    $$
    
- **역변환**
    
    $$
     p=\frac{\text{odds}}{1+\text{odds}}
    $$
    
- **예시**: $p=0.66$
    
    $$
     odds=\frac{0.66}{1-0.66}=\frac{0.66}{0.34}\approx 1.94
    $$
    
    - 즉, 사건이 일어나지 않을 때보다 일어날 쪽이 약 1.94배 더 크다는 뜻이다.

- **로그오즈(log-odds) / 로짓 (logit)**
    
    $$
    \log\frac{p}{1-p}
    $$
    
    (로지스틱 회귀/이진분류에서 선형출력 z가 로그오즈가 되며 $p=\sigma(z)$로 확률화된다.)
    

---

## 결합확률(Joint probability)

두 사건이 **동시에 함께** 일어날 확률이다.

$$
P(A\cap B)=P(A,B)
$$

- **곱셈정리(항상 성립)**
    
    $$
     P(A,B)=P(A\mid B)P(B)=P(B\mid A)\,P(A)
    $$
    
- **독립(independence)일 때만**
    
    두 사건 A, B가 독립(independence) 이면,
    
    $$
     P(A,B)=P(A)\,P(B)
    $$
    

> 
> 
> - **독립 (independence)**: 한 사건이 다른 사건의 확률에 영향을 주지 않음
> - **상호배타 (mutually exclusive)**: 두 사건이 동시에 일어날 수 없음

## 합확률(Union probability)

두 사건 중 **적어도 하나**가 일어날 확률이다.

- **일반식(항상 성립)**
    
    $$
     P(A\cup B)=P(A)+P(B)-P(A\cap B)
    $$
    
- **상호배타적(mutually exclusive)일 때**
    
    $$
     P(A\cup B)=P(A)+P(B)\quad(\because P(A\cap B)=0)
    $$
    
    - **예시(상호배타적)**: 주사위에서 4 또는 6이 나올 확률
    
    $$
     P(A\cup B)=\frac16+\frac16=\frac13
    $$
    
    - **예시(상호배타적 아님)**: “동전 앞면” 또는 “주사위 6”
        - 서로 독립이므로     $P(A\cap B)=P(A)P(B)$
        
        $$
        P(A\cup B)=\frac12+\frac16-\frac12\cdot\frac16
        =\frac12+\frac16-\frac1{12}
        =\frac7{12}\approx 0.5833
        $$
        

---

## 조건부확률(Conditional probability)

어떤 사건 B가 일어났다는 조건 아래에서 A가 일어날 확률

- **정의**
    
    $$
    P(A\mid B)=\frac{P(A\cap B)}{P(B)}\quad (P(B)>0)
    $$
    

조건이 붙으면 원래의 전체 경우의 수를 보는 것이 아니라,

**B가 일어난 경우들만 남겨두고** 그 안에서 A가 일어나는 비율을 보는 것이다.

즉, **표본공간(sample space)이 바뀐다**고 이해하면 된다.

## 베이즈 정리(Bayes’ theorem)

$$
 P(A\mid B)=\frac{P(B\mid A)\,P(A)}{P(B)}
$$

사전 정보(prior information)와 관측 데이터(observed data)를 이용해서,

데이터를 본 뒤의 확률을 업데이트하는 공식이다.

즉, 사전 확률을 바탕으로 사후 확률을 얻는것

### 구성요소

- $P(A)$: prior(사전확률)
- $P(B\mid A)$: likelihood(가능도)
- $P(A\mid B)$: posterior(사후확률)
- $P(B)$: evidence(정규화 상수)

### evidence 계산

$$
 P(B)=\sum_a P(B\mid a)\,P(a)
$$

---

## 이항분포(Binomial)

- **상황**: 성공확률 **p**인 베르누이 시행을 **n**번 했을 때, 성공 횟수 **K** 의 분포
- **정의**
    
    $$
    K\sim\text{Binomial}(n,p),\quad
    P(K=k\mid n,p)=\binom{n}{k}p^k(1-p)^{n-k}
    $$
    

![이항분포](/images/uploads/propability-1.png)

## 베타분포(Beta)

- **상황**: $0 < p < 1$ 인 “성공확률” 자체에 대한 분포(불확실성 표현)
- **정의**
    - $\alpha$번 성공과 $\beta$번 실패일 때 → 사건이 발생할 수 있는 기본 확률의 확률분포
    
    $$
    p\sim\text{Beta}(\alpha,\beta)
    $$
    

![베타분포](/images/uploads/propability-2.png)

### 예시

로켓발사 실험중인 상황

테스트를 했을 때 10번 중 8번 성공하고 2번 실패했다

→ 로켓의 성공률을 90프로라고 기대했지만, 80프로가 나옴

→ 이때, ‘테스트를 더 많이 하면 90프로 이상의 성공률이 나올수 있지 않을까?’ 라는 질문

- 여기서 90프로의 성공 확률을 가진 사건이 10번 시도 했을 때 8번만 성공할 확률은 → 이항 분포
- 10번중 8번 성공 했는데 이 사건의 확률이 90일 확률은? → 베타 분포
