"""Generate static training pages and downloadable lesson packs. Python stdlib only."""
from pathlib import Path
import html,json,re,csv,io
from datetime import date,timedelta
ROOT=Path(__file__).resolve().parents[1]
PUB=ROOT/'public/training';PUB.mkdir(exist_ok=True)
DATA=json.loads((ROOT/'content/training/lessons.json').read_text())
def schedule(n):
 friday=date(2026,10,2)+timedelta(weeks=n-1)
 moved={date(2026,10,9):'한글날',date(2026,10,23):'공동연차',date(2026,11,13):'공동연차'}
 actual=friday-timedelta(days=1) if friday in moved else friday
 label=actual.isoformat()+(' (목)' if friday in moved else ' (금)')+' 13:30~15:30'+(' · '+moved[friday]+' 조정' if friday in moved else '')
 lesson=next((d for d in DATA if d['week']==n),None)
 if lesson and len(lesson['sessions'])==2:
  return [('A',(friday-timedelta(days=2)).isoformat()+' (수) 15:30~17:30'),('B',label)]
 return [('A',label)]
def schedule_html(n):
 return '<div class="training-schedule" style="margin:18px 0;padding:16px 20px;background:#edf2e9;border:1px solid #d5dfd2;border-radius:6px;font-size:13px;line-height:1.9"><strong>잠정 교육일정 · 한국시간</strong>'+''.join('<div>'+(''+name+'회차 · ' if len(schedule(n))==2 else '')+when+'</div>' for name,when in schedule(n))+'</div>'
FIRST=PUB/'week-01.html'
first=FIRST.read_text()
CSS=re.search(r'<style>(.*?)</style>',first,re.S).group(1)
CSS+='''
.hero h1{font-size:clamp(30px,2.85vw,43px)}.hero .lead{max-width:450px}.concepts{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.concepts h3{font-size:16px;margin:0 0 10px}.concepts p{font-size:13px;color:var(--muted);margin:0;line-height:1.95}.prep{margin-top:26px;background:#edf1eb;padding:20px 24px;border-radius:6px}.prep h3{font-size:14px;margin:0 0 13px}.prep dl{display:grid;grid-template-columns:160px 1fr;gap:8px 16px;margin:0;font-size:12px}.prep dt{font-weight:600}.prep dd{margin:0;color:var(--muted)}.modelstrip{display:flex;gap:16px;flex-wrap:wrap;margin-top:18px;color:var(--muted);font-size:11px}.modelstrip b{color:var(--teal)}.sessionintro{padding:19px 22px;background:#e7eee4;border:1px solid #d5dfd2;border-radius:5px;margin:28px 0 24px;display:flex;justify-content:space-between;gap:15px}.sessionintro h3{font-size:19px;margin:0}.sessionintro p{font-size:11px;color:var(--muted);margin:7px 0 0}.sessionintro .tag{align-self:flex-start}.stepbody ol{font-size:13px;color:#536769;padding-left:19px;margin:12px 0 10px;line-height:1.9}.stepbody li{padding:3px 0}.case{background:#edf2e9;border:1px solid #d5dfd2;border-radius:6px;padding:25px}.case h3{font-size:19px;margin:0 0 12px}.case p{font-size:13px;color:#516b60}.case summary{font-size:13px;font-weight:600;color:var(--teal);cursor:pointer}.case details p{margin-bottom:0}.mistakes{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:22px 0}.mistake{border-left:2px solid var(--orange);padding:4px 15px}.mistake strong{font-size:13px}.mistake p{font-size:12px;color:var(--muted);margin:5px 0}.deliverables{display:grid;grid-template-columns:repeat(3,1fr);gap:17px;margin:22px 0}.deliverables div{padding:20px;border:1px solid var(--line);border-radius:5px}.deliverables span{display:block;font-size:10px;color:var(--teal);margin-bottom:7px}.deliverables strong{font-size:13px}.sourcebox{margin-top:24px;font-size:11px;color:var(--muted)}.sourcebox summary{cursor:pointer}.sourcebox a{text-decoration:underline;text-underline-offset:3px}.pagebottom{display:flex;justify-content:space-between;gap:20px;margin-top:35px}.coursegrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin:28px 0}.coursecard{display:flex;flex-direction:column;border:1px solid var(--line);background:#fbfcf8;padding:24px;border-radius:7px;min-height:218px;transition:transform .15s,border-color .15s}.coursecard:hover{transform:translateY(-3px);border-color:var(--teal)}.coursecard .number{font-size:28px;color:#98b0a0;font-weight:500}.coursecard h3{font-size:18px;margin:10px 0}.coursecard p{font-size:12px;color:var(--muted);margin:0 0 18px}.coursecard .bottom{margin-top:auto;display:flex;justify-content:space-between;font-size:11px;color:var(--teal)}.homeintro{padding:20px 0 10px;max-width:720px}.homeintro h1{font-size:42px;line-height:1.35;letter-spacing:-1.8px}.homeintro p{font-size:15px;color:var(--muted)}.timeline{font-size:11px;color:var(--muted);margin:15px 0 25px}.heroart svg text{font-family:Pretendard,"Apple SD Gothic Neo","Malgun Gothic",sans-serif}.allmaterials{margin:26px 0;padding:22px;border:1px solid var(--line);border-radius:6px}.resources td:first-child{min-width:150px}.refs li{margin:7px 0}.sectionnav{gap:21px}.resultsnote{font-size:13px;color:var(--muted);max-width:760px}.figure-label{font-size:10px;color:var(--muted);margin-top:4px}.hours{font-family:monospace;color:var(--teal);font-size:12px}
@media(max-width:1050px){.concepts{gap:17px}.coursegrid{grid-template-columns:1fr 1fr}.hero h1{font-size:32px}}@media(max-width:760px){.concepts,.deliverables,.mistakes{grid-template-columns:1fr}.coursegrid{grid-template-columns:1fr}.prep dl{grid-template-columns:1fr;gap:3px}.prep dd{margin-bottom:12px}.sessionintro{flex-direction:column}.homeintro h1{font-size:34px}.hero h1{font-size:34px}.pagebottom{gap:12px}.pagebottom .btn{font-size:11px;padding:9px}.resources th:nth-child(2),.resources td:nth-child(2){display:none}}
'''
NAMES={1:'지형 모델링',**{d['week']:d['nav'] for d in DATA}}
def E(s):return html.escape(str(s),quote=True)
def pageurl(n):return f'week-{n:02}.html'
def side(active):
 items=''.join(f'<li><a href="{pageurl(n)}"'+(' class="active" aria-current="page"' if n==active else '')+f'><span>{n:02}</span>{E(t)}</a></li>' for n,t in NAMES.items())
 return f'''<aside class="side" id="sidebar" aria-label="교육과정"><a class="brand" href="index.html">CIVIL <i>LAB.</i><small>DESIGN WITH INTELLIGENCE</small></a><div class="sidetitle">CIVIL 3D × AI · 12 WEEKS</div><ol class="weeks">{items}</ol><div class="sidefoot">작업을 배우고, 결과를 함께 확인합니다.<a href="index.html">전체 교육과정 ↗</a><a href="/ko/">기존 교육 가이드 ↗</a></div></aside>'''
def box(x,y,w,h,fill):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="{fill}"/>'
def path(d,color='#357d6b',width=2,dash=''):return f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{width}"'+(f' stroke-dasharray="{dash}"' if dash else '')+'/>'
def text(x,y,t,size=12,color='#557567'):return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}">{E(t)}</text>'
def diagram(kind,title):
 p='<defs><pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#c7d5c6" stroke-width=".5"/></pattern></defs><rect x="20" y="25" width="480" height="285" rx="10" fill="#edf2e8"/><rect x="20" y="25" width="480" height="285" fill="url(#grid)"/>'
 if kind=='road':
  p+='<path d="M48 241 Q183 141 270 176 T472 89" fill="none" stroke="#9db5a2" stroke-width="86"/><path d="M48 241 Q183 141 270 176 T472 89" fill="none" stroke="#e1e8d9" stroke-width="57"/>'+path('M48 241 Q183 141 270 176 T472 89','#347b65',2,'10 7')
  p+=path('M172 116L222 240','#d47849',2)+path('M323 117L367 213','#d47849',2)+text(104,95,'선형 · 계획종단')+text(324,243,'표준횡단 → 코리더')
 elif kind=='earthwork':
  p+='<path d="M45 232L110 182L180 193L253 112L328 144L396 211L476 187L476 278H45Z" fill="#c8d7be"/>'
  p+=path('M45 232L110 182L180 193L253 112L328 144L396 211L476 187','#72936b',2)+path('M45 210H476','#d47849',3)+path('M180 85V268','#668779',1,'5 4')+path('M350 85V268','#668779',1,'5 4')+text(58,105,'원지반')+text(378,201,'계획고')+text(239,164,'절토')+text(70,253,'성토')+text(138,297,'동일 경계 · 동일 지표면 버전')
 elif kind=='wall':
  p+='<path d="M40 125H275V255H40Z" fill="#c7d8bb"/><path d="M315 226H480V255H315Z" fill="#cfdbc5"/><path d="M267 89H307V238H337V255H240V238H267Z" fill="#738e80" stroke="#315f4f"/>'
  p+=path('M363 90V227M354 90H372M354 227H372','#d47849',2)+text(373,163,'높이')+text(69,116,'상단고')+text(365,216,'하단고')+text(197,285,'기준선 + 치수표 → 반복 배치')
 elif kind=='bridge':
  p+=box(51,128,421,23,'#749687')+box(77,151,37,100,'#a6bba7')+box(239,151,27,100,'#a6bba7')+box(415,151,37,100,'#a6bba7')+box(62,249,65,15,'#698373')+box(222,249,62,15,'#698373')+box(400,249,65,15,'#698373')+path('M53 115H471','#d47849',3)+path('M92 81H428M92 74V91M252 74V91M428 74V91','#759281',1)+text(148,70,'경간 A')+text(315,70,'경간 B')+text(335,113,'도로 접속고')+text(57,289,'교대')+text(237,289,'교각')+text(408,289,'교대')
 elif kind=='site':
  p+='<path d="M37 234H155L204 190H302L360 244H482V285H37Z" fill="#cbd9be"/>'+box(216,85,73,104,'#8aa697')+box(230,62,74,104,'#c4d3c2')+path('M306 190V283M319 191V283M306 218H320M306 246H320','#d47849',3)+path('M200 188H296','#3b785e',2)+text(203,48,'건축 기준고')+text(93,271,'사면')+text(337,220,'가시설')+text(338,279,'굴착 단계')
 elif kind in ('storm','sewer','water'):
  p+=path('M40 110L120 100L217 117L315 106L408 122L480 113','#7d9c75',3)
  if kind=='water':
   p+=path('M50 205H180V226H300V196H474','#458eac',10)+path('M300 196V154H365','#458eac',7)+box(167,193,23,23,'#d47849')+text(65,178,'압력관')+text(316,143,'분기')+text(334,270,'우수·오수 교차 확인')
  else:
   p+=path('M77 197L233 220L419 246','#3d8195' if kind=='storm' else '#7c7861',10)
   for x,y,z in [(77,105,197),(233,114,220),(419,120,246)]:p+=box(x-12,y,24,z-y+9,'#bdcbbb')+path(f'M{x-10} {z}H{x+10}','#d47849',2)
   p+=path('M280 192L320 199L309 187M320 199L306 207','#347563',2)+text(45,73,'유역 · 유입점' if kind=='storm' else '발생량 · 합류점')+text(328,293,'관저고 → 접속점')
  p+=text(342,90,'계획 지표면')
 elif kind=='drawing':
  p+=box(54,47,414,242,'#fafbf7')+path('M70 190H453M70 222H453M70 252H453M162 205V275M260 205V275M357 205V275','#9dae9b',1)+path('M78 162L153 131L228 146L320 109L443 134','#8aa27a',2)+path('M78 137L153 129L228 120L320 112L443 100','#d47849',3)+text(75,79,'종단뷰')+text(79,217,'원지반')+text(79,244,'계획고')+text(79,272,'측점')+text(178,244,'Profile 1 / Profile 2',11)+text(291,79,'라벨 · 데이터 밴드',11)
 elif kind=='revit':
  p+=box(53,88,153,117,'#d7e2cd')+box(314,88,153,117,'#c9d9ce')+text(81,133,'Civil 3D',19)+text(350,133,'Revit',19)+path('M220 144H297L286 133M297 144L286 155','#d47849',3)+text(81,177,'원본 · 기준점')+text(336,177,'참조 · 패밀리')+path('M53 235H467','#8a9e86',1,'5 5')+text(120,267,'공통 좌표 · 단위 · ID · 버전')
 elif kind=='quantity':
  for i,h in enumerate([78,122,97]):p+=box(64+i*52,251-h,31,h,['#8dad95','#4f8270','#c1cfa9'][i])
  p+=box(281,82,191,182,'#fafbf7')
  for y in [122,163,203,242]:p+=path(f'M295 {y}H455','#ced8c8',1)
  p+=text(298,109,'공종')+text(395,109,'수량')+text(298,149,'관로')+text(395,149,'길이')+text(298,189,'구조물')+text(395,189,'체적')+text(298,230,'부속')+text(395,230,'개수')+text(62,86,'객체별 원본 ID')+text(125,290,'중복 · 누락 · 단위 · 산정 규칙')
 return f'<svg class="terrain" viewBox="0 0 520 340" role="img" aria-label="{E(title)} 설명용 개념도">{p}</svg>'
JS='''
const menu=document.getElementById('menu');menu.addEventListener('click',()=>{const o=document.getElementById('sidebar').classList.toggle('open');menu.setAttribute('aria-expanded',o);menu.setAttribute('aria-label',o?'교육과정 메뉴 닫기':'교육과정 메뉴 열기')});
let timer;function notify(t){document.getElementById('toast').textContent=t;clearTimeout(timer);timer=setTimeout(()=>document.getElementById('toast').textContent='',3200)}
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{const p=document.getElementById(b.dataset.copy);try{await navigator.clipboard.writeText(p.textContent);notify('작업지시를 복사했습니다. 대괄호 안의 조건을 실제 값으로 바꾸세요.')}catch{const r=document.createRange();r.selectNodeContents(p);const s=window.getSelection();s.removeAllRanges();s.addRange(r);notify('지시문을 선택했습니다. 복사 단축키를 사용하세요.')}}));
'''
def wrap(title,active,content,home=False):
 navtitle='전체 교육과정' if home else f'{active:02} {NAMES[active]}'
 return f'''<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Civil 3D × AI 교육 · {E(navtitle)} · 강의안과 실습 양식"><title>{E(title)} · CIVIL LAB</title><style>{CSS}</style></head><body><a class="skip" href="#main">본문으로 건너뛰기</a>{side(active)}<div class="shell"><header class="top"><div class="crumb"><button class="mobile-toggle" id="menu" aria-label="교육과정 메뉴 열기" aria-expanded="false" aria-controls="sidebar">☰</button><a href="index.html">교육과정</a><span aria-hidden="true">/</span><strong>{E(navtitle)}</strong></div><span class="sample">강의안 v1 · 실습 원본 등록 전</span></header><main id="main">{content}<footer class="footer"><span>CIVIL LAB. / CIVIL 3D × AI</span><span>2026.09.27 · 강의안 v1</span><a href="#main">맨 위로 ↑</a></footer></main></div><div id="toast" class="toast" role="status" aria-live="polite"></div><script>{JS}</script></body></html>'''
def heading(no,en,title,sub=''):
 return f'<div class="sectionhead"><div><div class="overline">{no} / {en}</div><h2>{E(title)}</h2><p>{E(sub)}</p></div></div>'
def write_pack(d):
 n=d['week'];directory=PUB/'materials'/f'week-{n:02}';directory.mkdir(parents=True,exist_ok=True)
 link=f'materials/week-{n:02}'
 md=[f"# {n}주차 — {d['nav']}", '\n강의안 v1 · 2026-09-27\n',d['lead'],'\n## 잠정 교육일정 (한국시간)',*[name+'회차 · '+when for name,when in schedule(n)],'\n## 학습 목표',*['- '+g for g in d['goals']],'\n## 범위',d['scope'],'\n## 준비 자료',*['- '+k+': '+v for k,v in d['inputs']],'\n## 핵심 개념']
 for k,v in d['concepts']:md+=['\n### '+k,v]
 for ss in d['sessions']:
  md+=['\n## '+ss['name']+'회차 — '+ss['title'],dict(schedule(n))[ss['name']]+' · 잠정 / 한국시간','120분: 소개 10 / 조건 15 / 시연 40 / 변경 실습 35 / 결과 검토 15 / 정리 5']
  for i,s in enumerate(ss['steps'],1):md+=['\n### '+str(i)+'. '+s['title'],s['why'],*['- '+a for a in s['actions']],'확인: '+s['check']]
  md+=['\n### AI 작업지시',ss['prompt']]
 md+=['\n## 교육용 사례',*d['exercise'],'\n## 자주 발생하는 문제',*['- '+k+': '+v for k,v in d['errors']],'\n## 완료 확인',*['- [ ] '+c for c in d['checks']],'\n## 제출할 결과',*['- '+o for o in d['outputs']],'\n## 공식 참고자료',*['- ['+k+']('+v+')' for k,v in d['references']]]
 (directory/'lesson.md').write_text('\n\n'.join(md))
 prompts='\n\n'.join(ss['name']+'회차 — '+ss['title']+'\n'+ss['prompt'] for ss in d['sessions'])
 (directory/'ai-prompts.txt').write_text(prompts)
 checklist=f"# {n}주차 결과 기록 · {d['nav']}\n\n작성자/팀: \n작업일: \n원본 파일/버전: \n사용 프로그램·연결 도구: \n사용 모델·추론 수준: \n\n## 확인 목록\n"+'\n'.join('- [ ] '+x for x in d['checks'])+'\n\n## 제출 결과\n'+'\n'.join('- '+x for x in d['outputs'])+'\n\n## 변경 조건과 수정 전후\n\n## 검산 결과와 근거\n\n## 미확인 사항\n\n## 공유 파일/이미지 링크\n\n## 검토 의견 및 조치\n'
 (directory/'review.md').write_text(checklist)
 out=io.StringIO(newline='');w=csv.writer(out);w.writerow(d['headers']);w.writerow(['']*len(d['headers']));(directory/'input-table.csv').write_text(out.getvalue(),encoding='utf-8-sig')
 return link
for d in DATA:
 n=d['week'];total=len(d['sessions'])*120;lk=write_pack(d);titleparts=d['title'].split('\n');title=E(titleparts[0])+'<br><em>'+E(titleparts[1])+'</em>'
 c=schedule_html(n)+f'<div class="hero"><div><div class="eyebrow">WEEK {n:02} / CIVIL 3D × AI</div><h1>{title}</h1><p class="lead">{E(d["lead"])}</p><div class="meta"><span><b>{total}분</b> · {len(d["sessions"])}회차</span><span>설명 · AI 시연 · 변경 실습</span></div><div class="actions"><a class="btn primary" href="#workflow">작업 순서 보기 ↘</a><a class="btn" href="#materials">오늘의 자료 ↓</a></div></div><div class="heroart"><div class="arttop"><span>WEEK {n:02} / STUDY</span><span>CONCEPT</span></div>{diagram(d["diagram"],d["nav"])}<div class="artbottom"><span><i class="legend-dot"></i>{E(d["nav"])}</span><span>설명용 개념도 · 실제 모델 아님</span></div></div></div>'
 c+='<div class="overview">'+''.join(f'<div class="goal"><span class="n">{i:02}</span><div><h3>{E(g)}</h3><p>오늘의 학습 목표</p></div></div>' for i,g in enumerate(d['goals'],1))+'</div>'
 c+='<nav class="sectionnav" aria-label="강의 목차"><a href="#understand">업무 이해</a><a href="#workflow">작업 순서</a><a href="#review">실습·결과 확인</a><a href="#materials">교육자료</a><a href="#results">결과 공유</a></nav>'
 c+='<section id="understand">'+heading('01','UNDERSTAND','먼저 이해할 세 가지','작업을 시작하기 전에 입력과 결과의 관계를 짚습니다.')+'<div class="concepts">'+''.join(f'<article><h3>{E(k)}</h3><p>{E(v)}</p></article>' for k,v in d['concepts'])+'</div>'
 c+='<div class="prep"><h3>수업 전 준비</h3><dl>'+''.join(f'<dt>{E(k)}</dt><dd>{E(v)}</dd>' for k,v in d['inputs'])+'</dl></div>'
 c+=f'<div class="note"><strong>이번 강의의 범위</strong><br>{E(d["scope"])}</div><div class="modelstrip"><span>최초 시연 <b>{E(d["prep"])}</b></span><span>반복 실습 <b>{E(d["repeat"])}</b></span><span>확인된 결과 요약 <b>Luna low</b></span></div><p class="small-note">모델 설정은 권장 시작값입니다. 반복 실습은 검증된 도구·그래프를 재사용하며, 현재 연결에서 지원되지 않는 기능은 실제 프로그램에서 수행하고 결과를 대조합니다.</p></section>'
 c+='<section id="workflow">'+heading('02','WORKFLOW','오늘의 작업 순서','강사 설명 뒤 실제 프로그램에서 실행하고 조건 하나를 바꿔 비교합니다.')
 for ss in d['sessions']:
  c+=f'<div class="sessionintro" id="session-{ss["name"].lower()}"><div><div class="overline">SESSION {ss["name"]}</div><h3>{E(ss["title"])}</h3><p><strong>{dict(schedule(n))[ss["name"]]} · 잠정 / 한국시간</strong></p><p>소개 10분 · 조건 15분 · 시연 40분 · 변경 실습 35분 · 결과 검토 15분 · 정리 5분</p></div><span class="tag">120분</span></div>'
  for i,s in enumerate(ss['steps'],1):
   c+=f'<div class="step"><div class="stepnum">{i:02}</div><div class="stepbody"><h3>{E(s["title"])}</h3><p>{E(s["why"])}</p><ol>'+''.join('<li>'+E(a)+'</li>' for a in s['actions'])+f'</ol><div class="checkrow">확인 → {E(s["check"])}</div></div></div>'
  pid='prompt-'+ss['name'];c+=f'<div class="promptbox"><div class="prompthead"><span>{ss["name"]}회차 AI 작업지시 · {E(d["prep"])}</span><button data-copy="{pid}" type="button">지시문 복사</button></div><pre id="{pid}">{E(ss["prompt"])}</pre></div><p class="small-note">대괄호 안에는 실제 파일·객체·조건을 넣습니다. 실행 여부와 검증 결과를 함께 기록하세요.</p>'
 c+='</section><section id="review">'+heading('03','PRACTICE & REVIEW','변경하고, 결과를 설명해 보세요','아래 사례는 원리와 검산 연습을 위한 가상 조건입니다.')
 ex=d['exercise'];c+=f'<div class="case"><div class="overline">GUIDED EXERCISE</div><h3>{E(ex[0])}</h3><p>{E(ex[1])}</p><details><summary>생각해 본 뒤 해설 보기</summary><p>{E(ex[2])}</p></details></div>'
 c+='<div class="mistakes">'+''.join(f'<div class="mistake"><strong>{E(k)}</strong><p>{E(v)}</p></div>' for k,v in d['errors'])+'</div><div class="checklist">'+''.join(f'<label><input type="checkbox">{E(ch)}</label>' for ch in d['checks'])+'</div><p class="small-note">화면의 체크는 자가 확인용이며 저장·공유되지 않습니다. 기록을 남길 때는 검토표를 내려받으세요.</p></section>'
 c+='<section id="materials">'+heading('04','MATERIALS','강의와 실습에 사용할 자료','본문·작업지시·입력표·검토표를 내려받아 사용할 수 있습니다.')+'<table class="resources"><thead><tr><th scope="col">자료</th><th scope="col">내용</th><th scope="col">받기</th></tr></thead><tbody>'
 for ext,name,file,desc in [('MD','전체 강의노트','lesson.md','회차별 설명·작업·사례·출처'),('TXT','AI 작업지시','ai-prompts.txt','대상 조건을 바꾸어 사용하는 요청문'),('CSV','입력·대조표','input-table.csv','실제 값을 채우는 빈 양식 · 예측값 없음'),('MD','검토·결과 기록표','review.md','확인 항목·변경 기록·공유 링크')]:c+=f'<tr><td><span class="fileicon">{ext}</span>{name}<small>{n}주차 · v1</small></td><td>{desc}</td><td><a class="textbtn" href="{lk}/{file}" download>다운로드 ↓</a></td></tr>'
 c+='<tr><td><span class="fileicon">MODEL</span>실제 실습 원본<small>DWG · 그래프 · 패밀리 등</small></td><td>위 준비 목록의 실제 프로젝트 자료</td><td><span class="pending">등록 전</span></td></tr></tbody></table>'
 c+='<details class="sourcebox"><summary>공식 참고자료 · 2026.09.27 확인</summary><ul class="refs">'+''.join(f'<li><a href="{E(u)}" target="_blank" rel="noopener noreferrer">Autodesk · {E(t)} ↗</a></li>' for t,u in d['references'])+'</ul><p>기능 개념을 확인하는 자료입니다. 메뉴·패키지·연계 방식은 실제 설치 버전에 맞춰 확인합니다.</p></details></section>'
 c+='<section id="results">'+heading('05','SHARE & LEARN','이 결과를 함께 확인합니다','결과 화면과 원본 링크, 미해결 사항을 같은 형식으로 남깁니다.')+'<div class="deliverables">'+''.join(f'<div><span>OUTPUT {i:02}</span><strong>{E(o)}</strong></div>' for i,o in enumerate(d['outputs'],1))+'</div><p class="resultsnote">작성자·작업일·파일 버전, 변경 조건, 수정 전후 화면, 검토 근거를 정리하세요. 직원 결과는 아직 등록되지 않았습니다. 실제 자료가 모이면 이 영역에 결과 이미지와 공유 링크를 연결합니다.</p>'+f'<a class="btn" href="{lk}/review.md" download>결과 기록 양식 받기 ↓</a><p class="small-note">현재 페이지에는 직원 업로드·댓글·공유 저장소 기능이 없습니다.</p></section>'
 c+='<div class="pagebottom">'+f'<a class="btn" href="{pageurl(n-1)}">← {n-1:02} {E(NAMES[n-1])}</a>'+(f'<a class="btn primary" href="{pageurl(n+1)}">{n+1:02} {E(NAMES[n+1])} →</a>' if n<12 else '<a class="btn primary" href="index.html">전체 교육과정 →</a>')+'</div>'
 (PUB/pageurl(n)).write_text(wrap(f'{n:02} {d["nav"]}',n,c))
# Preserve the original week-1 content and connect its navigation to the new pages.
first=re.sub(r'<ol class="weeks">.*?</ol>',re.search(r'<ol class="weeks">.*?</ol>',side(1),re.S).group(0),first,flags=re.S)
first=first.replace('<a class="brand" href="/ko/">','<a class="brand" href="index.html">')
first=first.replace('<span>교육과정</span>','<a href="index.html">교육과정</a>')
first=first.replace('강의 화면 샘플 · 내용 검토 중','강의안 v1 · 실습 원본 등록 전')
if 'data-course-next' not in first:first=first.replace('<footer class="footer">','<div data-course-next style="display:flex;justify-content:space-between;padding-top:25px"><a class="btn" href="index.html">전체 교육과정</a><a class="btn primary" href="week-02.html">02 도로 설계 →</a></div><footer class="footer">')
first=re.sub(r'<!-- TRAINING SCHEDULE -->.*?<!-- /TRAINING SCHEDULE -->','',first,flags=re.S)
first=first.replace('<div class="hero">','<!-- TRAINING SCHEDULE -->'+schedule_html(1)+'<!-- /TRAINING SCHEDULE --><div class="hero">',1)
FIRST.write_text(first)
intro='<div class="homeintro"><div class="eyebrow">CIVIL 3D × AI / COURSE GUIDE</div><h1>설계의 흐름을 배우고,<br>AI와 함께 완성합니다.</h1><p>항측도면에서 지형·도로·시설물·관망을 만들고,<br>도면과 BIM, 물량으로 연결하는 12주 실무교육입니다.</p></div><div class="overview"><div class="goal"><span class="n">01</span><div><h3>오늘 할 일 확인</h3><p>설명과 작업 순서를 먼저 봅니다.</p></div></div><div class="goal"><span class="n">02</span><div><h3>AI와 실제 작업</h3><p>조건을 바꾸고 결과를 검토합니다.</p></div></div><div class="goal"><span class="n">03</span><div><h3>자료와 결과 공유</h3><p>근거와 변경 내용을 함께 남깁니다.</p></div></div></div><div class="sectionhead" style="margin-top:35px"><div><div class="overline">12 WEEKS / 18 SESSIONS</div><h2>주차별 강의</h2><p>총 36시간 · 2026.10.02~12.18 잠정 일정 (한국시간)<br>기본: 금요일 13:30~15:30 / 주 2회: 수요일 15:30~17:30(A), 금요일 13:30~15:30(B)<br>공휴일·공동연차 조정: 10/08(목), 10/22(목), 11/12(목) 13:30~15:30. · 실제 실습 모델 등록 전</p></div></div><div class="coursegrid">'
for n in range(1,13):
 d=next((v for v in DATA if v['week']==n),None);desc=d['lead'] if d else '항측도면으로 TIN을 만들고 경계·삼각망 오류를 AI와 함께 보완합니다.';hours=len(d['sessions'])*2 if d else 2
 intro+=f'<a class="coursecard" href="{pageurl(n)}"><span class="number">{n:02}</span><h3>{E(NAMES[n])}</h3><p>{E(desc)}</p>{schedule_html(n)}<div class="bottom"><span>{hours}시간 · '+('A/B 2회차' if hours==4 else '1회차')+'</span><span>강의 보기 ↗</span></div></a>'
intro+='</div><div class="allmaterials"><h3>실습 자료는 각 강의 페이지에서</h3><p class="resultsnote">강의노트, AI 작업지시, 입력·대조표, 검토·결과 기록표를 제공합니다. 실제 항측도면·DWG·Dynamo·Revit 패밀리와 직원 결과는 교육자료 확정 후 연결합니다.</p><p class="small-note">공통 운영: 최초 작업은 Astra medium, 검증된 반복 작업은 Sol medium, 고정 양식은 Sol low, 확인된 결과 요약은 Luna low를 시작값으로 사용합니다.</p></div>'
(PUB/'index.html').write_text(wrap('Civil 3D × AI 전체 교육과정',0,intro,True))
print(f'Generated {len(DATA)} lessons + course home; connected week 1; {len(DATA)*4} downloadable files.')
