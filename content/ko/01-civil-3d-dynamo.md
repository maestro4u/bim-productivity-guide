# 01. 1개월차 좌표와 지형

> 기준 좌표를 먼저 맞추고, 그 위에 지형을 얹어야 이후 설계가 흔들리지 않습니다.

---

## 좌표설정

Civil 3D의 좌표설정은 도면의 시작점이다.  
좌표가 맞아야 수치지형도, 점 데이터, SHP, Google Earth, KML/KMZ가 같은 위치에 놓인다.

한국 실무에서는 `GRS80` 계열 좌표를 많이 쓰고, Google Earth와 KML/KMZ는 `WGS84` 계열 경위도 좌표를 쓴다.  
둘은 함께 다루지만 같은 것으로 취급하면 안 된다.

### 1. Civil 3D에서 좌표계를 먼저 잡는다

<figure>
  <div className="mx-auto my-4 flex h-[220px] max-w-[72%] items-center justify-center border border-zinc-300 bg-zinc-50 text-sm text-zinc-500">
    [이미지 1 자리: Civil 3D 좌표계 설정 화면]
  </div>
  <figcaption className="text-center text-sm text-zinc-500">그림 1. Civil 3D 좌표계 설정 화면</figcaption>
</figure>

Civil 3D에서 새 도면을 열면 먼저 도면 단위를 확인한다.  
그다음 프로젝트 위치에 맞는 좌표계를 지정한다.  
이 단계에서 중요한 것은 이름이 아니라 실제 데이터와 같은 기준을 쓰는지 확인하는 것이다.

좌표계는 보통 다음 순서로 확인한다.

1. 도면 단위가 미터인지 본다.
2. 좌표계 이름을 찾는다.
3. `GRS80` 계열인지 확인한다.
4. 적용 후 기준점 위치를 본다.
5. 다른 데이터와 겹쳐 본다.

### 2. GRS80 좌표계를 확인한다

<figure>
  <div className="mx-auto my-4 flex h-[220px] max-w-[72%] items-center justify-center border border-zinc-300 bg-zinc-50 text-sm text-zinc-500">
    [이미지 2 자리: GRS80 좌표계 목록 화면]
  </div>
  <figcaption className="text-center text-sm text-zinc-500">그림 2. GRS80 좌표계 목록 화면</figcaption>
</figure>

GRS80은 국내 측량성과와 공공 데이터에서 자주 쓰이는 기준이다.  
Civil 3D에서 좌표계 목록을 열었을 때 원하는 지역의 `GRS80` 계열 항목이 보여야 한다.  
항목이 보이지 않으면 좌표계 라이브러리나 설치 상태를 다시 확인한다.

실무에서는 다음처럼 생각하면 쉽다.

- 도면이 어디를 기준으로 그려지는가
- 가져올 데이터가 어떤 기준으로 만들어졌는가
- 둘이 같은 기준인가

이 세 가지가 맞아야 좌표가 어긋나지 않는다.

### 3. Google Earth와 WGS84를 확인한다

<figure>
  <div className="mx-auto my-4 flex h-[220px] max-w-[72%] items-center justify-center border border-zinc-300 bg-zinc-50 text-sm text-zinc-500">
    [이미지 3 자리: Google Earth KML 확인 화면]
  </div>
  <figcaption className="text-center text-sm text-zinc-500">그림 3. Google Earth와 KML 확인 화면</figcaption>
</figure>

Google Earth에서 보는 위치는 경위도 좌표 기반이다.  
그래서 Civil 3D 평면좌표처럼 바로 쓰는 것이 아니라, KML/KMZ를 통해 가져오거나 변환해서 확인한다.

이때 확인할 것은 다음이다.

- KML의 좌표가 경도, 위도 순서인지
- Civil 3D 도면 좌표계가 이미 지정되어 있는지
- 가져온 객체가 실제 사업지와 겹치는지

### 4. KML 가져오기와 검증

<figure>
  <div className="mx-auto my-4 flex h-[220px] max-w-[72%] items-center justify-center border border-zinc-300 bg-zinc-50 text-sm text-zinc-500">
    [이미지 4 자리: Civil 3D와 외부 데이터 겹침 검증 화면]
  </div>
  <figcaption className="text-center text-sm text-zinc-500">그림 4. Civil 3D와 외부 데이터 겹침 검증 화면</figcaption>
</figure>

KML/KMZ는 설명과 위치 확인에는 좋지만, 설계 원본으로 쓰기에는 부족하다.  
그래서 가져온 뒤에는 꼭 수치지형도나 기준점과 겹쳐 본다.

검증 순서는 단순하다.

1. 도면 좌표계를 맞춘다.
2. KML/KMZ를 가져온다.
3. 기준점 또는 경계선과 겹치는지 본다.
4. 수 m 이상 어긋나면 좌표계와 단위를 다시 본다.
5. 필요한 경우 SHP, 점 데이터, 수치지형도와 함께 다시 비교한다.

### 5. 실무에서 자주 보는 오류

<figure>
  <div className="mx-auto my-4 flex h-[220px] max-w-[72%] items-center justify-center border border-zinc-300 bg-zinc-50 text-sm text-zinc-500">
    [이미지 5 자리: 좌표계 오류 비교 화면]
  </div>
  <figcaption className="text-center text-sm text-zinc-500">그림 5. 좌표계 오류 비교 화면</figcaption>
</figure>

좌표가 어긋날 때는 보통 아래 원인 중 하나다.

- 도면 좌표계가 비어 있다
- `GRS80`과 `WGS84`를 섞어 썼다
- KML을 평면좌표처럼 취급했다
- 도면 단위가 미터가 아니다
- 기준점과 가져온 데이터의 원점이 다르다

이 단계의 목적은 완벽한 모델이 아니라,  
이후 Surface와 설계 객체가 흔들리지 않는 기준을 만드는 것이다.

> 1개월차의 핵심은 예쁜 화면이 아니라, **신뢰할 수 있는 지형 기준**을 만드는 것입니다.
