const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const { root, readData, resumeMarkdown } = require('./content-data.cjs');
const careers = readData('careers');
const projects = readData('feProjects');
const featuredSlugs = readData('featuredFeProjectSlugs');
assert.equal(featuredSlugs.length, 6, '홈 FE 대표 프로젝트는 6개여야 합니다.');
assert.equal(new Set(featuredSlugs).size, 6);
for (const slug of featuredSlugs) assert.ok(projects.some(project => project.slug === slug), `대표 프로젝트 누락: ${slug}`);
for (const project of projects) assert.ok(project.teamSize.startsWith('프론트엔드 개발 (본인)'), `담당 역할 표기 불일치: ${project.slug}`);
assert.equal(new Set(projects.map(project => project.slug)).size, projects.length, '상세 경로는 중복될 수 없습니다.');
for (const project of projects) {
  const group = careers[0].responsibilities.find(item => item.title === project.title);
  assert.ok(group, `경력 연결 누락: ${project.slug}`);
  for (const field of ['problem', 'choice', 'implementation', 'results']) {
    assert.ok(project.caseStudy[field].length > 0, `4단계 누락: ${project.slug}/${field}`);
  }
  assert.equal(project.caseStudy.choiceReasons.length, project.caseStudy.choice.length, `선택 이유 연결 누락: ${project.slug}`);
  assert.ok(project.caseStudy.choiceReasons.every(reason => reason.trim()), `빈 선택 이유: ${project.slug}`);
  if (project.outcomes.length > 0) assert.ok(project.caseStudy.effects.length > 0, `상세 개선 효과 누락: ${project.slug}`);
  project.caseStudy.effects.forEach(effect => assert.ok(!project.caseStudy.results.includes(effect), `결과·효과의 동일 문장 반복: ${project.slug}`));
  if (project.slug !== 'common-ui-design-system') {
    assert.ok(project.caseStudy.implementation.length >= 2, `상세 구현 보강 누락: ${project.slug}`);
    assert.ok(project.troubleshooting.length > 0, `문제 해결 사례 누락: ${project.slug}`);
  }
  project.troubleshooting.forEach(item => assert.ok(item.problem.trim() && item.solution.trim()));
  assert.equal(group.items[0], project.period, '경력과 상세 기간이 일치해야 합니다.');
  assert.equal(group.items[1], `해결 과제: ${project.caseStudy.problem.join(' ')}`);
  assert.ok(group.items[2].startsWith('담당 업무: '));
  assert.ok(group.items[3].startsWith('품질 개선: '));
  assert.deepEqual(Array.from(group.items.slice(4)), Array.from(project.outcomes.map(line => `성과 : ${line}`)));
  assert.ok(!/close|대조하지 못|구분해 기록|DT-\d+|RVYN-\d+/.test(JSON.stringify(project)), '공개 설명에 내부 검토 문구를 포함하면 안 됩니다.');
  assert.ok(!/\d+(?:\.\d+)?%/.test(JSON.stringify(project)), `측정 근거 없는 개선율 재유입: ${project.slug}`);
  const publicCopy = [project.summary, ...Object.values(project.caseStudy).flat()].join(' ');
  assert.ok(!/HotelRoomGroup|airClassSet|wrap-bar|new-common\.js|src→dist|템플릿 ID→/.test(publicCopy), `이력서 본문에 코드 식별자 노출: ${project.slug}`);
}
const deployment = projects.find(project => project.slug === 'promotion-deployment-platform');
const logDetails = deployment.troubleshooting.map(item => item.solution).join(' ');
for (const term of ['SSE', '12초', '1초', '증분', '중복', 'ID']) assert.ok(logDetails.includes(term), `로그 보완 동작 누락: ${term}`);
assert.ok(!/12초|1초|증분 조회|중복 제거/.test(deployment.caseStudy.implementation.join(' ')), '로그 복구 절차는 문제 해결 사례에서만 설명해야 합니다.');
assert.equal(fs.readFileSync(path.join(root, 'docs/resume-v2.md'), 'utf8').replace(/\r\n/g, '\n'), resumeMarkdown(careers), '이력서 파일을 다시 생성해야 합니다.');
// 실제 웹 이력서 변환 경로가 4단계와 성과를 누락하지 않는지 검증한다.
function loadTs(relative, imports = {}) {
  const text = fs.readFileSync(path.join(root, relative), 'utf8');
  const { outputText } = ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 } });
  const loadedModule = { exports: {} };
  vm.runInNewContext(outputText, { module: loadedModule, exports: loadedModule.exports, require: name => {
    if (!(name in imports)) throw new Error(`허용되지 않은 import: ${name}`);
    return imports[name];
  } });
  return loadedModule.exports;
}
const parser = loadTs('lib/career-parse.ts');
const legacy = parser.parseProjectGroup({ title: '기존 문제 해결 형식', items: ['이슈 : 배치 충돌', '해결 : 공통 배치 적용', '성과 : 화면 일관성 개선'] });
assert.equal(legacy.troubles[0].solution, '공통 배치 적용');
assert.equal(parser.parseProjectGroup({ title: '새 경력 형식', items: ['해결 과제: 배치 충돌', '담당 업무: 공통 배치 적용', '품질 개선: 예외 보완'] }).summary.length, 3);
const { sortProjectsByDate } = loadTs('lib/project-sort.ts');
const dated = [
  { title: '날짜 없음', period: '' },
  { title: '먼저 시작', period: '2026.01 - 2026.06' },
  { title: '나중 시작', period: '2026.03 - 2026.06' },
  { title: '최신 완료', period: '2026.07 - 2026.08' },
  { title: '진행 중', period: '2026.01 - 현재' },
];
assert.equal(sortProjectsByDate(dated).map(item => item.title).join(','), '최신 완료,나중 시작,진행 중,먼저 시작,날짜 없음');
assert.equal(dated[0].title, '날짜 없음', '정렬 과정에서 원본을 변경하면 안 됩니다.');
assert.equal(sortProjectsByDate(projects)[0].slug, 'promotion-deployment-platform');
assert.equal(sortProjectsByDate(projects)[1].slug, 'ai-builder');
assert.equal(sortProjectsByDate(projects)[5].slug, 'hotel-room-review-improvement');
const resume = loadTs('lib/career-resume.ts', { '@/lib/career-parse': parser });
const entries = resume.buildResumeSourceItems(careers);
for (const career of careers) {
  for (const group of career.responsibilities.filter(group => group.title !== '구축 서비스')) {
    const parsed = parser.parseProjectGroup(group);
    assert.equal(parsed.summary.length, 3, `경력 구성 누락: ${group.title}`);
    ['해결 과제:', '담당 업무:', '품질 개선:'].forEach((label, index) => assert.ok(parsed.summary[index].startsWith(label)));
    const entry = entries.find(item => item.company === career.company && item.title === resume.formatResumeTitle(group.title));
    assert.ok(entry);
    assert.equal(Array.from(entry.bullets).join('\n'), Array.from(parsed.summary).join('\n'));
    assert.equal(entry.outcome, parsed.outcomes[0] ?? null);
  }
}
for (const project of projects) {
  const entry = entries.find(item => item.title === resume.formatResumeTitle(project.title));
  assert.ok(entry, `웹 이력서 누락: ${project.slug}`);
  const group = careers[0].responsibilities.find(item => item.title === project.title);
  assert.equal(entry.bullets.length, 3);
  assert.equal(Array.from(entry.bullets).join('\n'), Array.from(group.items.slice(1, 4)).join('\n'));
  assert.equal(entry.outcome, project.outcomes.join(' ') || null);
}
const draftUi = fs.readFileSync(path.join(root, 'components/career-resume-workbench.tsx'), 'utf8');
assert.ok(draftUi.includes('portfolio-v2:career-resume-draft:v1'), 'v1의 로컬 초안을 덮어쓰면 안 됩니다.');
console.log(`프로젝트 ${projects.length}건·경력 ${entries.length}건: 상세 구성·경력 4개 항목·웹 이력서·문서 일치 검증 통과`);
