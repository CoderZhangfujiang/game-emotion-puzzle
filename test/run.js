/**
 * 情绪解谜馆 - 自动化测试框架
 * 运行方式: node test/run.js
 */

const fs = require('fs');
const path = require('path');

// ==================== 测试框架 ====================
class TestRunner {
  constructor() {
    this.passed = 0;
    this.failed = 0;
    this.results = [];
  }
  
  assert(condition, message) {
    if (condition) {
      this.passed++;
      this.results.push({ status: 'pass', message });
      console.log(`  ✅ ${message}`);
    } else {
      this.failed++;
      this.results.push({ status: 'fail', message });
      console.log(`  ❌ ${message}`);
    }
  }
  
  assertEqual(actual, expected, message) {
    if (actual === expected) {
      this.passed++;
      this.results.push({ status: 'pass', message });
      console.log(`  ✅ ${message}`);
    } else {
      this.failed++;
      this.results.push({ status: 'fail', message: `${message} (expected: ${expected}, got: ${actual})` });
      console.log(`  ❌ ${message} (expected: ${expected}, got: ${actual})`);
    }
  }
  
  assertContains(text, substring, message) {
    if (text && text.includes(substring)) {
      this.passed++;
      this.results.push({ status: 'pass', message });
      console.log(`  ✅ ${message}`);
    } else {
      this.failed++;
      this.results.push({ status: 'fail', message: `${message} - text does not contain "${substring}"` });
      console.log(`  ❌ ${message}`);
    }
  }
  
  printSummary() {
    console.log('\n========================================');
    console.log(`  测试结果: ${this.passed} 通过, ${this.failed} 失败`);
    console.log('========================================');
    return this.failed === 0;
  }
}

// ==================== 测试用例 ====================
const test = new TestRunner();

// 读取游戏代码
const gameCode = fs.readFileSync(path.join(__dirname, '..', 'game.js'), 'utf8');
const htmlCode = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

console.log('\n========== 游戏代码自动化测试 ==========\n');

// 1. 基础结构测试
console.log('【1. 基础结构测试】');
test.assertContains(gameCode, 'const GAME_CONFIG', 'GAME_CONFIG 存在');
test.assertContains(gameCode, 'class EmotionPuzzleGame', 'EmotionPuzzleGame 类存在');
test.assertContains(gameCode, 'constructor()', 'constructor 存在');
console.log('');

// 2. 关卡配置测试
console.log('【2. 关卡配置测试】');
const levelCount = (gameCode.match(/id: \d+,/g) || []).length;
test.assert(levelCount >= 40, `关卡数量 >= 40 (实际: ${levelCount})`);

const emotionTypes = (gameCode.match(/id: '[a-z]+',/g) || []).length;
test.assertEqual(emotionTypes, 8, '情绪瓶类型数量为 8');
console.log('');

// 3. 核心功能测试
console.log('【3. 核心功能测试】');
const coreFunctions = [
  ['showHome', '首页函数'],
  ['showLevelSelect', '关卡选择函数'],
  ['showLevelGame', '关卡游戏函数'],
  ['completeLevel', '关卡完成函数'],
  ['showCollection', '收藏馆函数'],
  ['showLeaderboard', '排行榜函数'],
  ['showDailyTasks', '每日任务函数'],
  ['showSoundSettings', '音效设置函数'],
  ['shareToFriends', '分享函数'],
  ['saveProgress', '存档保存函数'],
  ['loadProgress', '存档加载函数'],
  ['playSound', '播放音效函数'],
  ['startBgm', '背景音乐函数'],
];

coreFunctions.forEach(([func, name]) => {
  test.assertContains(gameCode, `${func}(`, `${name}存在`);
});
console.log('');

// 4. 渲染函数测试
console.log('【4. 渲染函数测试】');
const renderFunctions = [
  'renderTapSequence',
  'renderFindPattern', 
  'renderCount',
  'renderMemory',
  'renderTiming',
  'renderPuzzle',
  'renderMath',
  'renderColorChoice',
  'renderSlider',
  'renderShake',
  'renderLongPress',
  'renderDoubleTap',
  'renderSwipe',
  'renderFindHidden',
  'renderBubblePop',
  'renderGravity',
];

renderFunctions.forEach(func => {
  test.assertContains(gameCode, `${func}(levelData)`, `${func} 渲染函数存在`);
});
console.log('');

// 5. Case 分支测试
console.log('【5. Case 分支测试】');
const caseCount = (gameCode.match(/case '[a-z_]+':/g) || []).length;
test.assert(caseCount >= 40, `Case 分支 >= 40 (实际: ${caseCount})`);

// 验证每个 case 都有对应渲染
const cases = gameCode.match(/case '([a-z_]+)':/g) || [];
let missingRender = 0;
cases.forEach(c => {
  const type = c.replace("case '", '').replace("':", '');
  const funcName = 'render' + type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  if (!gameCode.includes(`${funcName}(levelData)`)) {
    missingRender++;
  }
});
test.assertEqual(missingRender, 0, '所有 Case 都有对应渲染函数');
console.log('');

// 6. 奖励系统测试
console.log('【6. 奖励系统测试】');
test.assertContains(gameCode, 'this.emotionBottles.push', '情绪瓶收集逻辑存在');
test.assertContains(gameCode, 'showRewardDialog', '奖励弹窗函数存在');
test.assertContains(gameCode, 'unlockedStories', '故事解锁功能存在');
console.log('');

// 7. 每日任务测试
console.log('【7. 每日任务测试】');
test.assertContains(gameCode, 'getDailyTasks()', '获取每日任务函数存在');
test.assertContains(gameCode, 'checkDailyTasks()', '检查每日任务函数存在');
test.assertContains(gameCode, 'localStorage', '本地存储使用正确');
console.log('');

// 8. 音效系统测试
console.log('【8. 音效系统测试】');
test.assertContains(gameCode, 'playSound(type)', '播放音效函数存在');
test.assertContains(gameCode, 'startBgm()', '开始背景音乐函数存在');
test.assertContains(gameCode, 'stopBgm()', '停止背景音乐函数存在');
test.assertContains(gameCode, 'toggleBgm', 'BGM 切换函数存在');
console.log('');

// 9. 分享功能测试
console.log('【9. 分享功能测试】');
test.assertContains(gameCode, 'shareToFriends', '分享函数存在');
test.assertContains(gameCode, 'wx.shareAppMessage', '微信分享 API 存在');
test.assertContains(gameCode, 'navigator.clipboard', '剪贴板复制功能存在');
console.log('');

// 10. HTML 结构测试
console.log('【10. HTML 结构测试】');
test.assertContains(htmlCode, '<!DOCTYPE html>', 'DOCTYPE 声明正确');
test.assertContains(htmlCode, 'game-root', '游戏根元素存在');
test.assertContains(htmlCode, 'game.js', '引用 game.js');
test.assertContains(htmlCode, 'viewport', 'viewport meta 标签存在');
console.log('');

// 11. CSS 样式测试
console.log('【11. CSS 样式测试】');
test.assertContains(htmlCode, '#game-container', '游戏容器样式存在');
test.assertContains(htmlCode, '.game-btn', '按钮样式存在');
test.assertContains(htmlCode, '.level-container', '关卡容器样式存在');
console.log('');

// 12. 代码质量测试
console.log('【12. 代码质量测试】');
const consoleLogCount = (gameCode.match(/console\.log/g) || []).length;
test.assert(consoleLogCount < 20, `console.log 数量合理 (< 20, 实际: ${consoleLogCount})`);

const hasUndefined = gameCode.includes('undefined.');
test.assert(!hasUndefined, '无未定义的属性访问');
console.log('');

// 输出总结
const success = test.printSummary();

// 退出
process.exit(success ? 0 : 1);
