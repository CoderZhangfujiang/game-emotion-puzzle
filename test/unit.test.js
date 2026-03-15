/**
 * 情绪解谜馆 - 单元测试
 * 运行方式: node test/unit.test.js
 */

const fs = require('fs');
const path = require('path');

// ==================== 模拟浏览器环境 ====================
global.document = {
  getElementById: () => ({
    appendChild: () => {},
    remove: () => {},
    innerHTML: '',
    style: {},
    className: '',
    textContent: '',
    value: '',
    children: [],
    clientHeight: 500,
    clientWidth: 375,
    offsetTop: 100,
    offsetLeft: 50
  }),
  createElement: () => ({
    style: {},
    className: '',
    textContent: '',
    innerHTML: '',
    appendChild: function() { return this; },
    onclick: null,
    addEventListener: function() {}
  }),
  querySelectorAll: () => [],
  body: { appendChild: () => {} }
};

global.window = {
  onload: null,
  addEventListener: () => {},
  localStorage: {
    data: {},
    getItem: function(key) { return this.data[key] || null; },
    setItem: function(key, value) { this.data[key] = value; },
    removeItem: function(key) { delete this.data[key]; }
  },
  AudioContext: function() {
    this.createOscillator = () => ({
      connect: () => {},
      start: () => {},
      stop: () => {}
    });
    this.createGain = () => ({
      connect: () => {},
      setValueAtTime: () => {},
      exponentialRampToValueAtTime: () => {}
    });
    this.destination = {};
    this.currentTime = 0;
  }
};

global.navigator = {
  clipboard: {
    writeText: () => Promise.resolve()
  }
};

global.myWx = undefined; // 微信环境模拟

console.log = () => {}; // 禁用 console.log

// ==================== 测试类 ====================
class UnitTest {
  constructor() {
    this.passed = 0;
    this.failed = 0;
  }
  
  assert(condition, message) {
    if (condition) {
      this.passed++;
      console.log(`  ✅ ${message}`);
    } else {
      this.failed++;
      console.log(`  ❌ ${message}`);
    }
  }
  
  assertEqual(actual, expected, message) {
    if (actual === expected) {
      this.passed++;
      console.log(`  ✅ ${message}`);
    } else {
      this.failed++;
      console.log(`  ❌ ${message} (expected: ${expected}, got: ${actual})`);
    }
  }
}

// ==================== 加载游戏代码 ====================
const gameCode = fs.readFileSync(path.join(__dirname, '..', 'game.js'), 'utf8');

// 提取 GAME_CONFIG
let GAME_CONFIG;
let EmotionPuzzleGame;

// 尝试执行代码
try {
  eval(gameCode);
  GAME_CONFIG = global.GAME_CONFIG;
  EmotionPuzzleGame = global.EmotionPuzzleGame;
} catch (e) {
  console.log('代码执行跳过 (需要浏览器环境)');
}

// ==================== 运行测试 ====================
const test = new UnitTest();

console.log('\n========== 单元测试 ==========\n');

// 测试 GAME_CONFIG
console.log('【GAME_CONFIG 配置测试】');
if (GAME_CONFIG) {
  test.assert(GAME_CONFIG.name === '情绪解谜馆', '游戏名称正确');
  test.assert(GAME_CONFIG.version === '1.0.0', '版本号正确');
  test.assertEqual(GAME_CONFIG.emotionTypes.length, 8, '情绪瓶类型数量');
  test.assert(GAME_CONFIG.levels.length >= 40, '关卡数量足够');
  
  // 测试情绪瓶结构
  const firstEmotion = GAME_CONFIG.emotionTypes[0];
  test.assert(firstEmotion.id === 'happy', '情绪瓶 ID 正确');
  test.assert(firstEmotion.name === '开心', '情绪瓶名称正确');
  test.assert(firstEmotion.color === '#FFD700', '情绪瓶颜色正确');
  test.assert(firstEmotion.story, '情绪瓶故事存在');
  
  // 测试关卡结构
  const firstLevel = GAME_CONFIG.levels[0];
  test.assert(firstLevel.id === 1, '关卡 ID 正确');
  test.assert(firstLevel.type === 'tap_sequence', '关卡类型正确');
  test.assert(firstLevel.title, '关卡标题存在');
  test.assert(firstLevel.reward, '关卡奖励存在');
} else {
  console.log('  ⚠️ 跳过 (需要完整浏览器环境)');
}

console.log('\n【关卡类型测试】');
const levelTypes = [...new Set(GAME_CONFIG.levels.map(l => l.type))];
test.assert(levelTypes.includes('tap_sequence'), '包含 tap_sequence 关卡');
test.assert(levelTypes.includes('math'), '包含 math 关卡');
test.assert(levelTypes.includes('memory'), '包含 memory 关卡');
test.assert(levelTypes.includes('color_choice'), '包含 color_choice 关卡');

console.log('\n【奖励映射测试】');
const rewards = [...new Set(GAME_CONFIG.levels.map(l => l.reward))];
const validRewards = GAME_CONFIG.emotionTypes.map(e => e.id);
rewards.forEach(reward => {
  test.assert(validRewards.includes(reward), `奖励 ${reward} 有效`);
});

console.log('\n【数据结构测试】');
// 检查所有关卡都有必要字段
let missingFields = 0;
GAME_CONFIG.levels.forEach((level, idx) => {
  if (!level.id || !level.type || !level.title || !level.reward) {
    missingFields++;
    console.log(`  ⚠️ 关卡 ${idx + 1} 缺少字段`);
  }
});
test.assertEqual(missingFields, 0, '所有关卡字段完整');

console.log('\n========================================');
console.log(`  测试结果: ${test.passed} 通过, ${test.failed} 失败`);
console.log('========================================\n');

process.exit(test.failed === 0 ? 0 : 1);
