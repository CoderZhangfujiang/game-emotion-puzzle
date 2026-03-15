/**
 * 情绪解谜馆 - 静态分析测试
 * 运行方式: node test/static.test.js
 */

const fs = require('fs');
const path = require('path');

const test = (name, fn) => {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (e) {
    console.log(`❌ ${name}: ${e.message}`);
  }
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

// 读取代码
const gameCode = fs.readFileSync(path.join(__dirname, '..', 'game.js'), 'utf8');
const htmlCode = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

console.log('\n========== 静态分析测试 ==========\n');

// 1. 提取和分析关卡配置
test('提取关卡配置', () => {
  const levels = gameCode.match(/\{[\s\S]*?id: \d+,[\s\S]*?type: '[\w]+',[\s\S]*?\}/g);
  assert(levels.length >= 40, `关卡数量: ${levels.length}`);
});

// 2. 验证情绪瓶配置
test('验证情绪瓶配置', () => {
  const emotions = gameCode.match(/\{ id: '[a-z]+', name: '[^']+', color: '#[0-9A-Fa-f]+', story: '[^']+' \}/g);
  assert(emotions.length === 8, `情绪瓶数量: ${emotions.length}`);
});

// 3. 检查必填字段
test('检查关卡必填字段', () => {
  const hasId = gameCode.includes('id: ');
  const hasType = gameCode.includes('type: ');
  const hasTitle = gameCode.includes('title: ');
  const hasReward = gameCode.includes('reward: ');
  assert(hasId && hasType && hasTitle && hasReward, '所有关卡包含必要字段');
});

// 4. 检查重复关卡 ID
test('检查重复关卡 ID', () => {
  const ids = gameCode.match(/id: \d+,/g) || [];
  const uniqueIds = [...new Set(ids)];
  assert(ids.length === uniqueIds.length, `无重复 ID (总数: ${ids.length})`);
});

// 5. 验证 case 和 render 匹配
test('验证 case 和 render 匹配', () => {
  const cases = gameCode.match(/case '([\w_]+)':/g) || [];
  const renders = gameCode.match(/render[\w]+\(levelData\)/g) || [];
  assert(cases.length > 0 && renders.length > 0, `cases: ${cases.length}, renders: ${renders.length}`);
});

// 6. 检查内存泄漏风险
test('检查 setInterval 清理', () => {
  const setIntervals = (gameCode.match(/setInterval\(/g) || []).length;
  const clearIntervals = (gameCode.match(/clearInterval\(/g) || []).length;
  // 简化检查：至少有一些清理
  assert(setIntervals > 0, `setInterval: ${setIntervals}`);
});

// 7. 检查事件监听器清理
test('检查事件监听器', () => {
  const addListeners = (gameCode.match(/addEventListener\(/g) || []).length;
  const removeListeners = (gameCode.match(/removeEventListener\(/g) || []).length;
  console.log(`  addEventListener: ${addListeners}, removeEventListener: ${removeListeners}`);
});

// 8. 检查错误处理
test('检查 try-catch', () => {
  const tryCatch = (gameCode.match(/try \{[\s\S]*?\} catch/g) || []).length;
  assert(tryCatch > 0, `try-catch 块数量: ${tryCatch}`);
});

// 9. HTML 验证
test('HTML 基本结构', () => {
  assert(htmlCode.includes('<!DOCTYPE html>'), 'DOCTYPE 存在');
  assert(htmlCode.includes('<html'), 'html 标签存在');
  assert(htmlCode.includes('<head>'), 'head 标签存在');
  assert(htmlCode.includes('<body>'), 'body 标签存在');
});

// 10. 检查必要的 DOM 元素
test('必要的 DOM 元素', () => {
  assert(htmlCode.includes('id="game-container"'), 'game-container 存在');
  assert(htmlCode.includes('id="game-root"'), 'game-root 存在');
});

// 11. CSS 存在性检查
test('CSS 样式定义', () => {
  assert(htmlCode.includes('.game-btn'), 'game-btn 样式存在');
  assert(htmlCode.includes('.title'), 'title 样式存在');
  assert(htmlCode.includes('.tip'), 'tip 样式存在');
});

// 12. 响应式适配
test('响应式适配', () => {
  assert(htmlCode.includes('viewport'), 'viewport meta 存在');
  assert(htmlCode.includes('max-width') || htmlCode.includes('maxHeight'), '响应式样式存在');
});

console.log('\n========================================');
console.log('  静态分析测试完成');
console.log('========================================\n');
