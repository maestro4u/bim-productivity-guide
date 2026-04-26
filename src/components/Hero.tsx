import Link from "next/link";

const quickStats = [
  { value: "4주", label: "기초 실행계획" },
  { value: "7개", label: "초보자 우선 샘플" },
  { value: "3~5명", label: "챔피언 운영" },
];

export function Hero() {
  return (
    <section className="hero-shell relative isolate min-h-[100svh] overflow-hidden">
      <div className="hero-noise" aria-hidden="true" />
      <header className="topbar">
        <Link className="brand" href="#top" aria-label="처음으로">
          ▸ BIM Productivity
        </Link>
        <nav className="toplinks" aria-label="상단 링크">
          <a href="https://github.com/maestro4u/bim-productivity-guide" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span>한국어/EN</span>
          <a href="#civil-resources">학습자료</a>
          <a href="#samples">샘플</a>
          <a href="#plan">실행계획</a>
        </nav>
      </header>

      <div className="hero-inner">
        <p className="hero-eyebrow">▸ Civil 3D + Dynamo 업무생산성 가이드</p>
        <h1 className="hero-title">
          <span className="hero-title-accent">BIM으로</span>
          <span>반복 설계업무 줄이기</span>
        </h1>
        <p className="hero-lead">
          AutoCAD 2D 중심 업무에서 Civil 3D 데이터 기반 업무로 전환하기 위한 기초 학습자료,
          샘플 그래프 활용법, 4주 실행계획을 정리했습니다.
        </p>

        <div className="hero-actions">
          <Link className="button button-primary" href="#guide">
            가이드 시작 <span aria-hidden="true">→</span>
          </Link>
          <a
            className="button button-secondary"
            href="https://help.autodesk.com/cloudhelp/2027/KOR/Civil3D-Dynamo/files/Civil3D_Dynamo_About_Dynamo_for_Autodesk_Civil_3D_html.html"
            target="_blank"
            rel="noreferrer"
          >
            공식 문서
          </a>
        </div>

        <div className="terminal-card" aria-label="도입 방향 요약">
          <div className="terminal-head">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <strong>Terminal</strong>
            <button type="button">Copy</button>
          </div>
          <pre>
            <code>
              <span className="prompt">$</span> start dynamo-transition{"\n"}
              <span className="ok">✓</span> 공식 도움말로 실행 위치 확인{"\n"}
              <span className="ok">✓</span> Dynamo Primer로 노드·그래프 이해{"\n"}
              <span className="ok">✓</span> Civil 3D 2027 샘플 그래프 실행{"\n"}
              <span className="ok">✓</span> 반복업무 1개를 Dynamo Player로 자동화
            </code>
          </pre>
        </div>

        <div className="hero-stats">
          {quickStats.map((item) => (
            <div key={item.label} className="hero-stat">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
