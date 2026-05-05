# 03. 3개월차 코리더, 물량산출, 주행검토

> 선형과 종단이 준비되면, 이제 도로를 실제 3차원 설계 모델로 바꾸는 단계입니다.

---

## 코리더 및 토공 모델링

Civil 3D에서 `Corridor`는 도로 설계 모델의 본체다.  
2개월차에서 만든 평면 선형과 계획 종단은 아직 기준선과 높이 계획에 가깝다.

3개월차에서는 이 기준선에 표준 횡단을 결합해 실제 도로 형상을 만들고,  
주변 지형과 연결한 뒤, 물량산출과 주행검토까지 이어지는 흐름을 익힌다.

### 1. 표준 횡단을 작성한다

#### 1.1 Assembly의 역할

`Assembly`는 도로의 표준 횡단이다.  
쉽게 말하면 도로 중심선을 기준으로 차로, 갓길, 측구, 법면이 어떻게 붙는지를 정의한 단면 템플릿이다.

Civil 3D의 코리더는 이 Assembly를 선형과 종단을 따라 반복 배치하면서 만들어진다.  
따라서 Assembly를 잘못 만들면 코리더 전체가 잘못 만들어진다.

#### 1.2 Assembly 생성

Assembly는 다음 위치에서 만든다.

**Home 탭 -> Create Design -> Assembly -> Create Assembly**

명령어로는 다음을 사용할 수 있다.

**표준횡단작성 : `CREATEASSEMBLY`**

작업 순서는 다음과 같다.

1. Assembly 이름을 입력한다.
2. 기준점을 도면에 찍는다.
3. Tool Palettes에서 필요한 Subassembly를 선택한다.
4. 중심선을 기준으로 좌우에 차로, 갓길, 법면 등을 붙인다.

Assembly 이름 예시:

- `ROAD_A_TYPICAL_ASSEMBLY`
- `MAIN_ROAD_ASM`
- `2LANE_STANDARD_ASSEMBLY`

[그림 예정: Create Assembly 명령 실행 후 기준점이 배치된 화면]

### 2. Subassembly를 구성한다

#### 2.1 Subassembly의 의미

`Subassembly`는 Assembly를 구성하는 작은 부품이다.  
차로, 갓길, 측구, 법면, 포장층처럼 도로 단면을 구성하는 요소를 하나씩 붙여서 표준 횡단을 만든다.

예시:

- 차로: `Lane`
- 갓길: `Shoulder`
- 측구: `Curb` 또는 `Ditch`
- 법면: `Daylight`
- 포장층: `Pavement`, `Base`, `Subbase`

초보자는 처음부터 복잡한 횡단을 만들기보다,  
차로와 법면만 있는 단순 Assembly부터 시작하는 것이 좋다.

[그림 예정: 중심선 좌우에 Lane과 Daylight가 붙은 Assembly 화면]

#### 2.2 Subassembly 이름 변경

Subassembly를 붙이면 Civil 3D는 기본 이름을 자동으로 만든다.  
예를 들어 `BasicLane1`, `BasicLane2` 같은 이름이 붙는다.

이 이름을 그대로 두면 나중에 Target Mapping에서 문제가 생긴다.  
어떤 차로가 좌측인지, 어떤 법면이 우측인지 바로 알 수 없기 때문이다.

따라서 다음처럼 바꾸는 것이 좋다.

| 기본 이름 | 권장 이름 |
|---|---|
| BasicLane1 | Lane_L |
| BasicLane2 | Lane_R |
| Daylight1 | Daylight_L |
| Daylight2 | Daylight_R |
| Shoulder1 | Shoulder_L |
| Shoulder2 | Shoulder_R |

이름을 바꾸는 것은 단순 정리가 아니다.  
코리도 타겟팅, 물량산출, 오류 수정의 기준을 명확히 하는 실무 습관이다.

[그림 예정: Subassembly Properties에서 Name을 Lane_L로 변경하는 화면]

### 3. 코드 체계를 이해한다

#### 3.1 Point Code

Assembly는 모양만 중요한 것이 아니다.  
Civil 3D는 Assembly 내부의 코드 정보를 이용해 코리도 지표면과 물량을 만든다.

`Point Code`는 단면의 특정 점을 의미한다.

예시:

- 중심점
- 차로 끝
- 갓길 끝
- 법면 접속점

이 점들이 선형을 따라 이어지면 코리도 내부의 Feature Line이 된다.  
따라서 Point Code는 코리도 형상의 뼈대라고 볼 수 있다.

#### 3.2 Link Code

`Link Code`는 점과 점 사이의 선을 의미한다.

대표적인 Link Code:

- `Top`: 최종 포장면 또는 상부면
- `Datum`: 포장층 하부 또는 토공 기준면

나중에 코리도 지표면을 만들 때 `Top` 링크를 모으면 계획 포장면이 되고,  
`Datum` 링크를 모으면 토공량 산출의 기준면이 된다.

#### 3.3 Shape Code

`Shape Code`는 단면 내부의 면적 정보를 의미한다.

예시:

- `Pave1`
- `Pave2`
- `Base`
- `Subbase`

이 Shape Code를 이용하면 포장층, 기층, 보조기층 같은 재료 물량을 계산할 수 있다.

[그림 예정: Assembly 단면에서 Point, Link, Shape Code가 표시된 개념도]

### 4. 코리도를 생성한다

#### 4.1 Corridor의 역할

`Corridor`는 Civil 3D 도로 모델의 본체다.  
선형, 종단, Assembly를 결합해 3차원 도로 형상을 만든다.

2개월차에서 만든 Alignment와 Profile이 기준이고,  
3개월차에서 만든 Assembly가 단면 규칙이다.  
Corridor는 이 세 가지를 합쳐 실제 도로 형상으로 만든다.

#### 4.2 Corridor 생성 명령

Corridor는 다음 위치에서 만든다.

**Home 탭 -> Create Design -> Corridor**

명령어로는 다음을 사용할 수 있다.

**코리더작성 : `CREATECORRIDOR`**

필요한 구성 요소는 다음과 같다.

- Baseline Alignment
- Design Profile
- Assembly
- Target Surface

작업 순서는 다음과 같다.

1. 코리도 이름을 입력한다.
2. 기준 Alignment를 선택한다.
3. 계획 Profile을 선택한다.
4. Assembly를 선택한다.
5. Target Surface로 기존 지형 EG를 지정한다.
6. 코리도를 생성하고 Rebuild한다.

[그림 예정: Create Corridor 대화상자에서 Alignment, Profile, Assembly를 선택하는 화면]

### 5. Region과 Frequency를 설정한다

#### 5.1 Region의 의미

코리도는 하나의 긴 덩어리처럼 보이지만, 실제로는 여러 `Region`으로 나눌 수 있다.

Region을 나누는 경우:

- 일반 구간과 확폭 구간이 다를 때
- 교차로 구간만 다른 단면을 쓸 때
- 옹벽 구간과 일반 법면 구간이 다를 때
- 차로 수가 바뀔 때

초급 교육에서는 먼저 하나의 Region으로 전체 코리도를 만든다.  
그 후 확폭이나 구조물 구간을 별도 Region으로 나누는 방식을 실습한다.

[그림 예정: Corridor Properties의 Parameters 탭에서 Region이 표시된 화면]

#### 5.2 Frequency의 의미

`Frequency`는 Assembly를 얼마나 촘촘하게 배치할지 결정한다.

간격이 너무 넓으면 곡선 구간의 형상이 거칠어진다.  
반대로 너무 촘촘하면 도면이 무거워지고 작업 속도가 느려진다.

권장 개념:

| 구간 | 예시 간격 | 이유 |
|---|---:|---|
| 직선 구간 | 10m | 형상 변화가 작음 |
| 곡선 구간 | 1~5m | 곡선 표현 정밀도 필요 |
| 종단 변화점 | 추가 샘플링 | 고도 변화 반영 필요 |
| 주요 구조물 구간 | 별도 지정 | 정확한 검토 필요 |

[그림 예정: Corridor Frequency 설정 화면]

### 6. 타겟팅을 설정한다

#### 6.1 Targeting의 의미

타겟팅은 코리도를 주변 조건에 맞게 변형시키는 기능이다.  
타겟이 없으면 Assembly가 일정한 폭과 경사로만 반복된다.

타겟을 적용하면 다음을 처리할 수 있다.

- 확폭 구간
- 접속도로
- 기존 도로 접속부
- 법면과 기존 지형 연결
- 특정 높이나 선을 따라가는 단면 변화

#### 6.2 주요 Target 종류

| Target 종류 | 사용 목적 |
|---|---|
| Width or Offset Target | 차로 폭, 갓길 폭, 확폭 조정 |
| Elevation Target | 특정 높이에 맞춰 단면 조정 |
| Slope Target | 특정 경사 조건 적용 |
| Surface Target | 법면이 기존 지형에 닿도록 설정 |

실무에서 가장 먼저 익혀야 할 것은 `Surface Target`이다.  
법면 Subassembly가 기존 지형 EG를 바라보도록 설정해야 절토/성토 형상이 제대로 만들어진다.

[그림 예정: Set All Targets 대화상자에서 Daylight_L/R의 Surface Target을 EG로 지정하는 화면]

#### 6.3 확폭 구간 타겟팅

도로 폭이 일정하지 않은 구간에서는 `Width Target`을 사용한다.

예시:

- 버스정차대
- 교차로 접근부
- 우회전 차로
- 확폭 차로
- 접속도로 연결부

작업 흐름:

1. 확폭 기준이 되는 Polyline 또는 Feature Line을 만든다.
2. 해당 선을 Target 객체로 지정한다.
3. Lane 또는 Shoulder Subassembly의 Width Target에 연결한다.
4. 코리도를 Rebuild한다.
5. Object Viewer에서 형상이 자연스러운지 확인한다.

[그림 예정: 확폭 Polyline을 따라 차로 폭이 변화하는 코리도 화면]

### 7. 코리도 지표면을 만든다

#### 7.1 Corridor Surface의 필요성

코리도 모델만으로는 지표면 분석이나 물량산출을 제대로 할 수 없다.  
따라서 코리도에서 Surface를 추출해야 한다.

코리도 지표면을 만들면 다음 작업이 가능하다.

- 계획 포장면 확인
- 배수 흐름 검토
- 절성토량 산출
- 횡단 작성
- 다른 지표면과 비교

#### 7.2 Top Surface와 Datum Surface

보통 두 종류의 코리도 지표면을 만든다.

| 지표면 | 기준 코드 | 사용 목적 |
|---|---|---|
| Corridor_Top | Top | 완성 포장면, 배수 검토, 시각화 |
| Corridor_Datum | Datum | 토공량 산출, 포장 하부 기준 |

Top과 Datum을 구분하지 않으면 물량산출이 틀어질 수 있다.  
특히 토공량은 포장 상단이 아니라 보통 포장 하부 또는 토공 기준면과 기존 지반을 비교해야 한다.

[그림 예정: Corridor Properties의 Surfaces 탭에서 Top 링크를 추가하는 화면]

#### 7.3 Overhang Correction

코리도 지표면을 만들 때 단면 구조가 복잡하면 삼각망이 잘못 연결될 수 있다.  
이때 `Overhang Correction`을 설정한다.

기본 개념:

- Top Surface는 상부 링크 기준
- Datum Surface는 하부 링크 기준

잘못 설정하면 포장층이 뒤집히거나, 삼각망이 엉뚱하게 연결될 수 있다.

[그림 예정: Overhang Correction 옵션 화면]

### 8. Boundary를 정리한다

#### 8.1 불필요한 TIN 제거

코리도 Surface를 만들면 도로 바깥으로 불필요한 TIN 삼각망이 생길 수 있다.  
이 삼각망을 정리하지 않으면 물량과 시각화가 모두 부정확해진다.

가장 기본적인 방법은 다음과 같다.

**Add Corridor Extents as Outer Boundary**

이 기능은 코리도 외곽선을 기준으로 Surface 경계를 정리한다.  
특히 Daylight 라인을 따라 법면 끝을 정리할 때 유용하다.

[그림 예정: Boundary 적용 전후 TIN 삼각망 비교 화면]

#### 8.2 Breakline의 역할

지표면이 설계 의도와 다르게 삼각망을 연결할 때는 Breakline을 사용한다.  
Breakline은 지형이 반드시 꺾여야 하는 선을 Civil 3D에 알려주는 역할을 한다.

복잡한 교차로, 막다른 길, 구조물 접속부에서는 Breakline 관리가 중요하다.

### 9. 코리도 오류를 점검한다

#### 9.1 Waterfall 오류의 의미

코리도에서 가장 많이 보는 오류 중 하나가 갑자기 형상이 아래로 떨어지는 현상이다.  
현장에서는 이를 Waterfall 오류처럼 표현하기도 한다.

이 오류는 단순 화면 문제가 아니라, 선형, 종단, Region, Target 중 하나가 서로 맞지 않는다는 신호다.

#### 9.2 주요 원인

대표 원인은 다음과 같다.

- Alignment 시작/끝과 Profile 시작/끝이 맞지 않음
- 계획 종단이 선형보다 짧음
- Region 범위가 선형 범위를 벗어남
- Target Surface가 지정되지 않음
- Assembly의 Subassembly 방향이 잘못됨
- Corridor Rebuild가 되지 않음

#### 9.3 해결 순서

문제가 생기면 다음 순서로 확인한다.

1. Alignment와 Profile의 시작/끝 측점 확인
2. Profile View에서 계획 종단이 끝까지 이어지는지 확인
3. Corridor Properties에서 Region 범위 확인
4. Set All Targets에서 Surface Target 확인
5. Assembly 방향과 좌우 이름 확인
6. Corridor Rebuild 실행
7. Object Viewer로 3D 형상 확인

[그림 예정: 코리도 일부가 아래로 떨어진 오류 화면과 수정 후 화면 비교]

### 10. 물량산출을 준비한다

#### 10.1 Sample Lines의 역할

물량산출은 선형을 따라 일정 간격으로 횡단을 잘라 계산한다.  
이때 사용하는 것이 `Sample Lines`다.

Sample Lines는 단순한 횡단선이 아니라,  
기존 지형, 계획 지표면, 코리도 모델을 비교하는 기준선이다.

#### 10.2 Sample Lines 생성

Sample Lines는 다음 위치에서 만든다.

**Home 탭 -> Profile & Section Views -> Sample Lines**

작업 순서는 다음과 같다.

1. 기준 Alignment를 선택한다.
2. Sample Line Group 이름을 지정한다.
3. 샘플링할 데이터 소스를 선택한다.
4. 간격을 지정한다.
5. 전체 구간에 횡단선을 생성한다.

[그림 예정: Sample Lines 생성 화면과 도면에 횡단선이 배치된 화면]

### 11. 토공 및 재료 물량을 산출한다

#### 11.1 Compute Materials 실행

절토와 성토를 계산하려면 `Compute Materials`를 실행한다.

명령 위치:

**Analyze 탭 -> Volumes and Materials -> Compute Materials**

기본 비교:

- 기존 지반: `EG`
- 계획 기준면: `Corridor_Datum`

결과:

- Cut Volume
- Fill Volume
- Net Volume

[그림 예정: Compute Materials에서 EG와 Corridor_Datum을 매칭하는 화면]

#### 11.2 재료 물량 산출

포장 재료 물량은 Shape Code를 이용해 계산한다.  
따라서 Assembly 단계에서 코드가 올바르게 구성되어 있어야 한다.

예시:

- `Pave1`: 표층
- `Pave2`: 중간층
- `Base`: 기층
- `Subbase`: 보조기층

Shape Code가 제대로 잡혀 있으면 도로 포장층별 물량을 분리해서 산출할 수 있다.

#### 11.3 물량표 작성

계산된 물량은 도면에 테이블로 배치하거나 보고서로 내보낼 수 있다.

사용 예:

- Total Volume Table
- Section Volume Table
- Material Volume Report
- Excel 내보내기

교육에서는 먼저 전체 절토/성토량을 확인하고,  
그 다음 횡단별 물량이 어떻게 달라지는지 확인한다.

[그림 예정: 도면에 배치된 Total Volume Table 화면]

### 12. Vehicle Tracking으로 주행을 검토한다

#### 12.1 Vehicle Tracking의 역할

Vehicle Tracking은 설계한 도로를 차량이 실제로 통과할 수 있는지 검토하는 단계다.

Civil 3D 기본 도로 모델링과는 별도 기능이지만,  
도로 설계 실무에서는 교차로, 회차부, 진입도로 검토에 매우 중요하다.

#### 12.2 검토 차량 선택

먼저 검토 목적에 맞는 차량을 선택한다.

예시:

- 승용차
- 소형 트럭
- 대형 트럭
- 버스
- 세미트레일러
- 소방차

차량을 잘못 선택하면 검토 결과도 의미가 없다.  
설계 대상 도로를 실제로 이용할 차량을 기준으로 선택해야 한다.

[그림 예정: Vehicle Tracking 차량 라이브러리 선택 화면]

#### 12.3 Swept Path 검토

`Swept Path`는 차량이 회전할 때 차체와 바퀴가 지나가는 궤적이다.

검토 항목:

- 차로를 벗어나는지
- 연석과 간섭되는지
- 중앙선 침범이 발생하는지
- 구조물과 충돌하는지
- 회전부 폭이 충분한지

[그림 예정: 교차로에서 차량 회전 궤적이 표시된 화면]

### 13. 최종 3D 모델을 확인한다

#### 13.1 Object Viewer 확인

마지막으로 `Object Viewer` 또는 3D View에서 코리도를 확인한다.

확인할 내용:

- 법면이 지형과 정상 연결되는가
- 코리도 Surface가 뒤틀리지 않았는가
- 곡선 구간이 거칠지 않은가
- 물량 기준면이 적절한가
- 차량 검토 결과가 도로 폭과 맞는가

[그림 예정: Object Viewer에서 완성 코리도를 회전하며 확인하는 화면]

#### 13.2 최종 산출물

3개월차를 마치면 다음 산출물이 있어야 한다.

- 표준 Assembly
- Corridor 모델
- Corridor Top Surface
- Corridor Datum Surface
- Sample Line Group
- 절성토 물량표
- Vehicle Tracking 검토도

### 14. 마무리

3개월차는 Civil 3D 도로 설계의 핵심이다.

- Assembly는 도로 단면의 규칙이다.
- Corridor는 선형, 종단, 단면을 결합한 3D 도로 모델이다.
- Targeting은 주변 지형과 계획 조건에 맞게 모델을 변형하는 기능이다.
- Corridor Surface는 물량산출과 검토의 기준이다.
- Sample Lines와 Compute Materials는 절성토와 재료 물량을 계산한다.
- Vehicle Tracking은 설계가 실제 차량 주행에 적합한지 확인한다.

> 3개월차의 목표는 코리도를 한 번 만들어보는 것이 아니라, **도로 모델을 만들고 검토하고 물량까지 뽑는 전체 흐름을 이해하는 것**입니다.
