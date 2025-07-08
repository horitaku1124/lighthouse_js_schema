const lighthouse = require('lighthouse').default;
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

const url = 'https://horitaku1124.github.io/';

(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = { port: chrome.port, output: ['html', 'json'] };
  const runnerResult = await lighthouse(url, options);

  // 保存先ディレクトリを作成
  const outputDir = path.resolve(__dirname, '../report');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // HTMLとJSONで保存
  fs.writeFileSync(path.join(outputDir, 'report.html'), runnerResult.report[0], 'utf-8');
  fs.writeFileSync(path.join(outputDir, 'report.json'), runnerResult.report[1], 'utf-8');

  await chrome.kill();
})();
