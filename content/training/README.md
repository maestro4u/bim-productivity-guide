# Civil 3D × AI 강의 원고

- `lessons.json`: 2~12주차의 정본 원고. 목표·준비물·개념·회차별 단계·프롬프트·사례·해설·검토·참고자료를 관리합니다.
- `public/training/week-01.html`: 기존 1주차 정본 HTML. 생성기는 본문을 유지하고 주차 메뉴만 연결합니다.
- 수정 후 프로젝트 루트에서 `python3 scripts/build_training.py`를 실행하면 2~12주차 HTML, 교육 홈, 다운로드 자료가 생성됩니다.
- 이후 `npm run build`를 실행하고 Pages 배포와 실제 도메인을 확인합니다.
- 생성된 `public/training/materials/week-XX/`에는 강의노트, AI 요청문, 빈 CSV 입력표, 결과 기록표가 들어 있습니다.
- 실제 DWG·Dynamo·패밀리·직원 결과는 등록 전이며, 본문의 가상 검산 예제와 구분합니다.
- 도표는 설명용 SVG이며 CAD/BIM 원본 모델 또는 실제 산출 결과가 아닙니다.
