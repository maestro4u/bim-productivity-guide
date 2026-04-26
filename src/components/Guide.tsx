const civilResources = [
  {
    rank: "1순위",
    title: "Autodesk Civil 3D용 Dynamo 공식 도움말",
    description: "Civil 3D 안에서 Dynamo 실행 위치, 샘플 그래프 위치, Dynamo Player 흐름을 확인합니다.",
    href: "https://help.autodesk.com/cloudhelp/2027/KOR/Civil3D-Dynamo/files/Civil3D_Dynamo_About_Dynamo_for_Autodesk_Civil_3D_html.html",
  },
  {
    rank: "2순위",
    title: "Dynamo Primer - Civil 3D",
    description: "노드, 와이어, 리스트, Civil 3D 객체 연결 개념을 체계적으로 익힙니다.",
    href: "https://primer2.dynamobim.org/dynamo-for-civil-3d",
  },
  {
    rank: "3순위",
    title: "Autodesk University Hands-on",
    description: "AutoCAD와 Civil 3D 사용자를 위한 초급 실습형 강의입니다.",
    href: "https://www.autodesk.com/autodesk-university/class/Dynamo-for-Civil-3D-Hands-on-for-Beginners-2024",
  },
];

const sampleGroups = [
  {
    title: "AutoCAD 객체와 특성 세트",
    description: "블록, 폴리선, 도면층, 속성값을 정리해 2D 도면 자산을 자동화합니다.",
    samples: [
      "AutoCAD_AddPropertySetByDefinition.dyn",
      "AutoCAD_BufferAroundObject.dyn",
      "AutoCAD_SetBlockElevationByAttribute.dyn",
    ],
  },
  {
    title: "Civil 3D 설계 객체",
    description: "선형, 코리더, 형상선, 지표면, 관망, 코리더 솔리드를 직접 다룹니다.",
    samples: [
      "Civil3D_CreateSurfaceFromCSV.dyn",
      "Civil3D_ExportCorridorFeatureLines.dyn",
      "Civil3D_ReadAndWriteSubassemblyParameters.dyn",
    ],
  },
  {
    title: "Dynamo Player 반복작업",
    description: "부서원이 버튼처럼 실행할 수 있는 입문용 자동화입니다.",
    samples: [
      "Calculate Total Length of Selected Lines.dyn",
      "Hatch Areas Table",
      "Update Style for Multiple Objects.dyn",
    ],
  },
];

const priorities = [
  ["총연장 계산", "선택 라인워크 길이 계산으로 즉시 효과 확인"],
  ["해치 면적표", "2D 면적 산출 자동화"],
  ["다중 Offset", "기존 AutoCAD 사용자가 이해하기 쉬운 자동화"],
  ["CSV → TIN 지표면", "외부 좌표 데이터를 Civil 3D 객체로 전환"],
  ["2D Linework Drape", "2D 도면을 3D 지형 위로 전환"],
];

const timeline = [
  ["1주차", "Dynamo 실행 위치 확인, 공식 도움말과 소개 영상으로 개념 잡기"],
  ["2주차", "노드, 와이어, 입력·출력, 리스트 등 그래프 기본 구조 학습"],
  ["3주차", "Civil 3D 설치 샘플 그래프 실행, Dynamo Player 흐름 확인"],
  ["4주차", "부서 반복업무 1개를 선택해 버튼형 자동화로 제작"],
];

export function Guide() {
  return (
    <section id="guide" className="guide-shell">
      <aside className="sidebar" aria-label="문서 목차">
        <div className="side-track active">Civil 3D + Dynamo</div>
        <nav className="side-nav">
          <a href="#civil-resources">01 학습자료</a>
          <a href="#samples">02 샘플 그래프</a>
          <a href="#priority">03 실습 우선순위</a>
          <a href="#plan">04 4주 실행계획</a>
        </nav>
        <div className="side-track locked" aria-disabled="true">
          Revit + Dynamo + DiRoots/pyRevit
        </div>
        <div className="side-track locked" aria-disabled="true">
          Navisworks + ACC Model Coordination
        </div>
      </aside>

      <div className="guide-content">
        <section className="panel" id="civil">
          <div className="section-head">
            <span className="section-index">00</span>
            <span className="badge">작성 완료</span>
          </div>
          <h2 className="track-title">Civil 3D + Dynamo</h2>
          <p className="section-lead">
            현재는 첫 번째 교육 축만 실제 내용으로 작성했습니다. 아래의 다른 교육 축은 아직 비활성 상태입니다.
          </p>
          <div className="curriculum-grid" aria-label="교육 축 상태">
            <article className="curriculum-card active">
              <span className="rank">활성</span>
              <h3>Civil 3D + Dynamo</h3>
              <p>Civil 3D에서 반복 설계업무를 줄이기 위한 현재 작업 범위입니다.</p>
              <a href="#civil-resources">세부 내용 보기</a>
            </article>
            <article className="curriculum-card locked" aria-disabled="true">
              <span className="rank">잠금</span>
              <h3>Revit + Dynamo + DiRoots/pyRevit</h3>
              <p>아직 작성되지 않은 교육 축입니다.</p>
            </article>
            <article className="curriculum-card locked" aria-disabled="true">
              <span className="rank">잠금</span>
              <h3>Navisworks + ACC Model Coordination</h3>
              <p>아직 작성되지 않은 교육 축입니다.</p>
            </article>
          </div>
        </section>

        <section className="panel" id="civil-resources">
          <div className="section-head">
            <span className="section-index">01</span>
            <span className="badge">필수</span>
          </div>
          <h2 className="subsection-title">기초 학습자료 추천</h2>
          <blockquote>처음부터 Python이나 API로 가지 말고, 공식 도움말과 샘플 그래프 실행부터 시작합니다.</blockquote>
          <div className="resource-grid">
            {civilResources.map((resource) => (
              <article key={resource.title}>
                <span className="rank">{resource.rank}</span>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <a href={resource.href} target="_blank" rel="noreferrer">
                  공식 도움말 보기
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="panel" id="samples">
          <div className="section-head">
            <span className="section-index">02</span>
            <span className="badge">핵심</span>
          </div>
          <h2 className="subsection-title">Civil 3D 2027 샘플 그래프 활용</h2>
          <p className="section-lead">
            Autodesk 2027 KOR 도움말의 샘플은 AutoCAD 객체 정리, Python 데이터 입출력,
            Civil 3D 설계 객체 자동화, Dynamo Player용 반복작업으로 나눠 활용합니다.
          </p>
          <div className="callout">
            <strong>한 줄 요약</strong>
            <p>부서원은 Dynamo Player로 실행하고, 챔피언은 샘플 그래프를 복사해 실제 업무에 맞게 수정합니다.</p>
          </div>
          <div className="sample-list">
            {sampleGroups.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul>
                  {group.samples.map((sample) => (
                    <li key={sample}>
                      <code>{sample}</code>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="panel" id="priority">
          <div className="section-head">
            <span className="section-index">03</span>
            <span className="badge">실전 팁</span>
          </div>
          <h2 className="subsection-title">초보자 실습 우선순위</h2>
          <ol className="steps">
            {priorities.map(([title, detail]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{detail}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="panel" id="plan">
          <div className="section-head">
            <span className="section-index">04</span>
            <span className="badge">4주 로드맵</span>
          </div>
          <h2 className="subsection-title">4주 교육 및 실행계획</h2>
          <div className="timeline">
            {timeline.map(([week, detail]) => (
              <div key={week}>
                <strong>{week}</strong>
                <p>{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel placeholder-panel" id="revit">
          <div className="section-head">
            <span className="section-index">05</span>
            <span className="badge">예정</span>
          </div>
          <h2 className="subsection-title">Revit + Dynamo + DiRoots/pyRevit</h2>
          <p className="section-lead">아직 작성되지 않은 교육 축입니다. 이후 내용을 이 자리부터 채워 넣습니다.</p>
          <div className="locked-slot-grid" aria-label="Revit 교육 축 자리">
            <div className="locked-slot">05 학습자료</div>
            <div className="locked-slot">06 샘플 그래프</div>
            <div className="locked-slot">07 실습 우선순위</div>
            <div className="locked-slot">08 4주 실행계획</div>
          </div>
        </section>

        <section className="panel placeholder-panel" id="navisworks">
          <div className="section-head">
            <span className="section-index">06</span>
            <span className="badge">예정</span>
          </div>
          <h2 className="subsection-title">Navisworks + ACC Model Coordination</h2>
          <p className="section-lead">아직 작성되지 않은 교육 축입니다. 향후 같은 구조로 확장합니다.</p>
          <div className="locked-slot-grid" aria-label="Navisworks 교육 축 자리">
            <div className="locked-slot">09 학습자료</div>
            <div className="locked-slot">10 샘플 그래프</div>
            <div className="locked-slot">11 실습 우선순위</div>
            <div className="locked-slot">12 4주 실행계획</div>
          </div>
        </section>
      </div>
    </section>
  );
}
