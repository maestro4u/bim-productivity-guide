# 01. 1개월차 좌표와 지형

> 기준 좌표를 먼저 맞추고, 그 위에 지형을 얹어야 이후 설계가 흔들리지 않습니다.

---

## 좌표설정

Civil 3D의 좌표설정은 도면의 시작점이다.  
좌표가 맞아야 수치지형도, 점 데이터, SHP, Google Earth, KML/KMZ, 그리고 좌표계 라이브러리가 같은 기준으로 움직인다.

한국 실무에서는 `GRS80` 계열을 지적에서는 Bessel 좌표를 많이 쓰고, Google Earth와 KML/KMZ는 `WGS84` 계열 경위도 좌표를 쓴다.  

### 1. 좌표계 파일을 불러온다

#### 1.1 좌표계 등록

**좌표가져오기 : `MAPCSLIBRARYIMPORT`
좌표내보내기 : `MAPCSLIBRARYEXPORT`**

`CSLibrary_GRS80_BESSEL.xml` 파일도 함께 공유한다.  
[좌표계 라이브러리 XML 파일](/assets/civil3d-coordinate-setup/CSLibrary_GRS80_BESSEL.xml)

#### 1.2 연관범주 `korea` 등록

<div className="image-sample-panel">
  <div>
    <p className="image-sample-label">샘플 B. 파일 보정 + 낮은 투명도</p>
    <figure className="image-frame image-frame-file image-frame-b">
      <img
        src="/assets/civil3d-coordinate-setup/image-16-dark-sample.png"
        alt="낮은 투명도를 적용한 KOREA_GRS80 좌표계 상세 화면"
      />
    </figure>
  </div>
  <div>
    <p className="image-sample-label">샘플 C. 파일 보정 + 배경 투명도 강화</p>
    <figure className="image-frame image-frame-file image-frame-c">
      <img
        src="/assets/civil3d-coordinate-setup/image-16-transparent-sample.png"
        alt="배경 투명도를 강화한 KOREA_GRS80 좌표계 상세 화면"
      />
    </figure>
  </div>
</div>

### 2. 좌표계 라이브러리로 들어간다

<figure>
  <img
    src="/assets/civil3d-coordinate-setup/image.png"
    alt="Civil 3D에서 지도 설정과 라이브러리 메뉴를 여는 화면"
    className="mx-auto my-4 block w-full max-w-[780px] rounded-md border border-zinc-200 shadow-sm brightness-[0.98] contrast-[0.98]"
  />
  <figcaption className="text-center text-sm text-zinc-500">그림 1. Civil 3D에서 지도 설정과 라이브러리 메뉴를 여는 화면</figcaption>
</figure>

먼저 `지도 설정`과 `라이브러리` 메뉴를 연다.  
좌표설정은 여기서 시작한다.  
좌표계를 찾을 수 있어야 도면 기준을 바로 잡을 수 있다.

### 3. `korea`를 검색한다

<figure>
  <img
    src="/assets/civil3d-coordinate-setup/image-3.png"
    alt="좌표표 라이브러리에서 korea를 검색한 화면"
    className="mx-auto my-4 block w-full max-w-[780px] rounded-md border border-zinc-200 shadow-sm brightness-[0.98] contrast-[0.98]"
  />
  <figcaption className="text-center text-sm text-zinc-500">그림 2. 좌표표 라이브러리에서 korea를 검색한 화면</figcaption>
</figure>

좌표계 목록에서 `korea`를 검색하면 관련 좌표계가 한 번에 보인다.  
이때 중요한 것은 이름을 외우는 것이 아니라, 내 도면에 맞는 계열을 찾는 것이다.

### 4. 비교표로 기준을 한 번 더 확인한다

<figure>
  <img
    src="/assets/civil3d-coordinate-setup/image-8.png"
    alt="Bessel과 GRS80 좌표계 비교표"
    className="mx-auto my-4 block w-full max-w-[820px] rounded-md border border-zinc-200 shadow-sm brightness-[0.98] contrast-[0.98]"
  />
  <figcaption className="text-center text-sm text-zinc-500">그림 11. Bessel과 GRS80 좌표계 비교표</figcaption>
</figure>

비교표는 실제 현장에서 많이 헷갈리는 기준을 정리해준다.  
여기서 중요한 것은 `Bessel`과 `GRS80`이 섞여 보일 때 무조건 같은 것으로 넘기지 않는 것이다.  
도면의 기준과 발주처 기준을 먼저 확인해야 한다.

### 5. 맵을 통한 확인

<figure>
  <img
    src="/assets/civil3d-coordinate-setup/image-18.png"
    alt="Civil 3D의 지리 위치와 지도 설정 화면"
    className="mx-auto my-4 block w-full max-w-[780px] rounded-md border border-zinc-200 shadow-sm brightness-[0.98] contrast-[0.98]"
  />
  <figcaption className="text-center text-sm text-zinc-500">그림 13. Civil 3D의 지리 위치와 지도 설정 화면</figcaption>
</figure>

캐드 도면과 지형데이타 간에 지리 위치가 맞는지 확인한다.  
이 과정이 끝나야 점 데이터와 지형 데이터를 넣을 준비가 된다.

### 6. 마무리

좌표설정의 핵심은 어렵지 않다.

- 도면 단위를 먼저 맞춘다.
- `GRS80` 계열인지 확인한다.
- 필요하면 XML 파일을 불러온다.
- 다시 검색해서 실제 도면에 맞는 좌표계를 고른다.
- 마지막으로 다른 데이터와 겹쳐 본다.

> 1개월차의 핵심은 예쁜 화면이 아니라, **신뢰할 수 있는 지형 기준**을 만드는 것입니다.
