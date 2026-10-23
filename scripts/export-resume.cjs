const fs = require('node:fs');
const path = require('node:path');
const { root, readData, resumeMarkdown } = require('./content-data.cjs');
fs.writeFileSync(path.join(root, 'docs/resume-v2.md'), resumeMarkdown(readData('careers')));
console.log('경력과 동일한 문장으로 docs/resume-v2.md를 갱신했습니다.');
