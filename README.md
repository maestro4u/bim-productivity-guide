# Civil 3D + Dynamo 업무생산성 웹 가이드

이 저장소는 Next.js 기반의 정적 웹 앱입니다. GitHub Pages로 배포되며, 현재는 `Civil 3D + Dynamo` 교육축만 실제 내용으로 작성되어 있습니다.

## 핵심 파일

- `src/app/layout.tsx`: 전역 레이아웃과 메타데이터
- `src/app/page.tsx`: 첫 화면과 본문 구성
- `src/app/globals.css`: 전역 스타일, 배경 모션, 타이포그래피
- `src/components/Hero.tsx`: 랜딩 히어로
- `src/components/Guide.tsx`: 가이드 본문
- `public/CNAME`: GitHub Pages custom domain 설정
- `.github/workflows/deploy.yml`: GitHub Pages 배포 워크플로

## 운영 범위

이 저장소에는 외부 공유 가능한 웹 소스만 둡니다. 도메인 등록, DNS 설정, 운영 권한 같은 내부 정보는 별도 기록으로 관리합니다.
