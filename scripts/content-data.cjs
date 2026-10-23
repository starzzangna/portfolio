const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const text = fs.readFileSync(path.join(root, 'lib/site-data.ts'), 'utf8');
const tree = ts.createSourceFile('site-data.ts', text, ts.ScriptTarget.Latest, true);

// 데이터 선언만 읽어 외부 시트 요청과 화면 코드를 실행하지 않는다.
function readData(name) {
  for (const statement of tree.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.name.getText(tree) === name) {
        return vm.runInNewContext(`(${declaration.initializer.getText(tree)})`);
      }
    }
  }
  throw new Error(`데이터를 찾을 수 없습니다: ${name}`);
}

function resumeMarkdown(careers) {
  return ['# 조정민 | 프론트엔드 개발자', '', careers[0].summary, '',
    ...careers.flatMap(career => [
      `## ${career.company} · ${career.period}`, '',
      ...career.responsibilities.filter(group => group.title !== '구축 서비스').flatMap(group => [
        `### ${group.title}`, '',
        ...group.items.map((line, index) => index === 0 && /^\d{4}/.test(line) ? line : `- ${line}`), '',
      ]),
    ]),
  ].join('\n');
}

module.exports = { root, readData, resumeMarkdown };
