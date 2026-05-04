---
title: "명령어 사이클: Fetch-Decode-Execute 과정"
description: |-
  CPU가 하나의 명령어를 처리하는 전체 흐름인 Fetch, Decode, Execute 단계와 내부 데이터 흐름을 정리한 글입니다.
  PC, MAR, MDR, IR을 중심으로 실제 데이터 이동 과정까지 설명합니다.
pubDate: 2025-07-25
updatedDate: ""
slug: instruction-cycle-fetch-decode-execute
topic: study
tags:
  - Computer Architecture
  - CPU
  - Instruction Cycle
  - Fetch Decode Execute
  - Register
draft: false
series: Computer Architecture
seriesOrder: 5
featured: false
---
> Active recall
> 
> - 명령어 사이클의 3단계를 설명 할 수 있다
> - 각 단계의 흐름을 순서대로 설명 할 수 있다

→ 명령어 사이클이란 CPU가 메모리에 저장된 하나의 명령어를 가져와(Fetch), 해석하고(Decode), 실행(Execute)하는 전체 과정을 말한다

## Fetch(명령어 가져오기)

- PC가 가리키는 메모리 주소를 MAR로 보냄
- 해당 주소의 명령어를 메모리에서 읽어 MDR에 저장
- MDR → IR(명령어 레지스터)로 이동
- PC는 다음 명령어를 가리키도록 갱신

## Decode(명령어 해석)

- CU(제어장치)가 IR의 내용을 해석
- 어떤 연산을 할지, 필요한 오퍼랜드가 어디 있는지 확인
- 필요한 경우 ALU/레지스터/메모리 접근을 준비

## Execute(실행)

- ALU에서 산술 논리 연산 수행
- 메모리 접근이 필요한 경우 데이터 읽기/쓰기
- 결과를 레지스터/메모리에 저장
- 플래그(ZF, CF, OF) 갱신

### 데이터 흐름 요약

**PC → MAR → MDR → IR (Fetch)** → **CU 해석 → ALU/레지스터 동작 (Decode & Execute)**
