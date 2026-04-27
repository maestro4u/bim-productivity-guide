# 01. 1개월차 좌표와 지형

> 기준 좌표를 먼저 맞추고, 그 위에 지형을 얹어야 이후 설계가 흔들리지 않습니다.

---

## 좌표설정

Civil 3D의 좌표설정은 도면의 시작점이다.  
좌표가 맞아야 수치지형도, 점 데이터, SHP, Google Earth, KML/KMZ, 그리고 좌표계 라이브러리가 같은 기준으로 움직인다.

한국 실무에서는 `GRS80` 계열 좌표를 많이 쓰고, Google Earth와 KML/KMZ는 `WGS84` 계열 경위도 좌표를 쓴다.  
둘은 함께 다루지만 같은 것으로 취급하면 안 된다.

### 1. 좌표계 라이브러리로 들어간다

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

### 2. `korea`를 검색한다

<figure>
  <img
    src="/assets/civil3d-coordinate-setup/image-2.png"
    alt="좌표표 라이브러리에서 korea를 검색한 화면"
    className="mx-auto my-4 block w-full max-w-[780px] rounded-md border border-zinc-200 shadow-sm brightness-[0.98] contrast-[0.98]"
  />
  <figcaption className="text-center text-sm text-zinc-500">그림 2. 좌표표 라이브러리에서 korea를 검색한 화면</figcaption>
</figure>

좌표계 목록에서 `korea`를 검색하면 관련 좌표계가 한 번에 보인다.  
이때 중요한 것은 이름을 외우는 것이 아니라, 내 도면에 맞는 계열을 찾는 것이다.

### 3. `KOREA`와 `KOREA_GRS80`을 구분한다

<figure>
  <img
    src="/assets/civil3d-coordinate-setup/image-3.png"
    alt="KOREA 좌표계를 선택한 화면"
    className="mx-auto my-4 block w-full max-w-[780px] rounded-md border border-zinc-200 shadow-sm brightness-[0.98] contrast-[0.98]"
  />
  <figcaption className="text-center text-sm text-zinc-500">그림 3. KOREA 좌표계를 선택한 화면</figcaption>
</figure>

<figure>
  <img
    src="/assets/civil3d-coordinate-setup/image-15.png"
    alt="KOREA_GRS80 좌표계 목록 화면"
    className="mx-auto my-4 block w-full max-w-[780px] rounded-md border border-zinc-200 shadow-sm brightness-[0.98] contrast-[0.98]"
  />
  <figcaption className="text-center text-sm text-zinc-500">그림 4. KOREA_GRS80 좌표계 목록 화면</figcaption>
</figure>

`KOREA`는 상위 묶음처럼 보이고, 실제 실무에서는 `KOREA_GRS80_127TM`처럼 세부 좌표계를 골라야 한다.  
여기서 헷갈리기 쉬운 점은, 같은 `KOREA` 이름 안에 여러 기준이 섞여 보인다는 것이다.  
그래서 도면 위치와 지역 기준을 함께 봐야 한다.

### 4. 상세 값을 확인한다

<figure>
  <img
    src="/assets/civil3d-coordinate-setup/image-4.png"
    alt="KOREA 좌표계 상세 화면"
    className="mx-auto my-4 block w-full max-w-[780px] rounded-md border border-zinc-200 shadow-sm brightness-[0.98] contrast-[0.98]"
  />
  <figcaption className="text-center text-sm text-zinc-500">그림 5. KOREA 좌표계 상세 화면</figcaption>
</figure>

<figure>
  <img
    src="/assets/civil3d-coordinate-setup/image-16.png"
    alt="KOREA_GRS80 좌표계 상세 화면"
    className="mx-auto my-4 block w-full max-w-[780px] rounded-md border border-zinc-200 shadow-sm brightness-[0.98] contrast-[0.98]"
  />
  <figcaption className="text-center text-sm text-zinc-500">그림 6. KOREA_GRS80 좌표계 상세 화면</figcaption>
</figure>

상세 화면에서는 참조 대상, 투영, 원점, 가상 원점, 단위를 확인한다.  
이 정보가 맞아야 SHP나 수치지형도를 가져왔을 때 위치가 크게 어긋나지 않는다.

### 5. 좌표계가 없을 때는 XML을 불러온다

<figure>
  <img
    src="/assets/civil3d-coordinate-setup/image-6.png"
    alt="좌표계가 도면에 없을 때 추가 여부를 묻는 경고창"
    className="mx-auto my-4 block w-full max-w-[620px] rounded-md border border-zinc-200 shadow-sm brightness-[0.98] contrast-[0.98]"
  />
  <figcaption className="text-center text-sm text-zinc-500">그림 7. 좌표계가 도면에 없을 때 추가 여부를 묻는 경고창</figcaption>
</figure>

도면에 필요한 좌표계가 없으면 XML 파일을 불러와야 한다.  
이때 좌표계 라이브러리 파일을 먼저 등록하고, 도면에 적용할 좌표계를 다시 찾는다.

### 6. `MAPCSLIBRARYIMPORT`로 좌표계 파일을 불러온다

<figure>
  <img
    src="/assets/civil3d-coordinate-setup/image-9.png"
    alt="MAPCSLIBRARYIMPORT 명령 실행 화면"
    className="mx-auto my-4 block w-full max-w-[260px] rounded-md border border-zinc-200 shadow-sm brightness-[0.98] contrast-[0.98]"
  />
  <figcaption className="text-center text-sm text-zinc-500">그림 8. MAPCSLIBRARYIMPORT 명령 실행 화면</figcaption>
</figure>

<figure>
  <img
    src="/assets/civil3d-coordinate-setup/image-10.png"
    alt="CSLibrary_GRS80_BESSEL XML 파일 선택 화면"
    className="mx-auto my-4 block w-full max-w-[260px] rounded-md border border-zinc-200 shadow-sm brightness-[0.98] contrast-[0.98]"
  />
  <figcaption className="text-center text-sm text-zinc-500">그림 9. CSLibrary_GRS80_BESSEL XML 파일 선택 화면</figcaption>
</figure>

<figure>
  <img
    src="/assets/civil3d-coordinate-setup/image-11.png"
    alt="MAPCSLIBRARYIMPORT 모든 정의를 가져올지 묻는 확인창"
    className="mx-auto my-4 block w-full max-w-[620px] rounded-md border border-zinc-200 shadow-sm brightness-[0.98] contrast-[0.98]"
  />
  <figcaption className="text-center text-sm text-zinc-500">그림 10. 좌표계 정의를 가져올지 묻는 확인창</figcaption>
</figure>

XML 파일을 등록하면 Civil 3D의 좌표계 목록이 늘어난다.  
그다음 다시 `korea`를 검색해서 원하는 `GRS80` 계열 좌표계를 고른다.

### 7. 비교표로 기준을 한 번 더 확인한다

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

### 8. 적용 후 다시 찾는다

<figure>
  <img
    src="/assets/civil3d-coordinate-setup/image-7.png"
    alt="KOREA_GRS80 좌표계를 다시 찾는 화면"
    className="mx-auto my-4 block w-full max-w-[780px] rounded-md border border-zinc-200 shadow-sm brightness-[0.98] contrast-[0.98]"
  />
  <figcaption className="text-center text-sm text-zinc-500">그림 12. KOREA_GRS80 좌표계를 다시 찾는 화면</figcaption>
</figure>

<figure>
  <img
    src="/assets/civil3d-coordinate-setup/image-18.png"
    alt="Civil 3D의 지리 위치와 지도 설정 화면"
    className="mx-auto my-4 block w-full max-w-[780px] rounded-md border border-zinc-200 shadow-sm brightness-[0.98] contrast-[0.98]"
  />
  <figcaption className="text-center text-sm text-zinc-500">그림 13. Civil 3D의 지리 위치와 지도 설정 화면</figcaption>
</figure>

좌표계를 적용한 뒤에는 다시 목록에서 검색하고, 도면의 지리 위치가 맞는지 확인한다.  
이 과정이 끝나야 점 데이터와 지형 데이터를 넣을 준비가 된다.

### 9. 마무리

좌표설정의 핵심은 어렵지 않다.

- 도면 단위를 먼저 맞춘다.
- `GRS80` 계열인지 확인한다.
- 필요하면 XML 파일을 불러온다.
- 다시 검색해서 실제 도면에 맞는 좌표계를 고른다.
- 마지막으로 다른 데이터와 겹쳐 본다.

`CSLibrary_GRS80_BESSEL.xml` 파일도 함께 보관해 두었다.  
[좌표계 라이브러리 XML 파일](/assets/civil3d-coordinate-setup/CSLibrary_GRS80_BESSEL.xml)

> 1개월차의 핵심은 예쁜 화면이 아니라, **신뢰할 수 있는 지형 기준**을 만드는 것입니다.
