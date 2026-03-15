/**
 * 情绪解谜馆 - 微信小游戏
 * 治愈系轻量解谜 + 收集 + 社交
 * 
 * 运行方式：
 * 1. 浏览器预览：直接打开 index.html
 * 2. 微信小游戏：导入微信开发者工具
 */

// ==================== 微信小游戏兼容层 ====================
// 检测运行环境
const isMiniGame = typeof wx !== 'undefined' && typeof wx.createCanvas === 'function';
const isBrowser = typeof document !== 'undefined';

// 微信小游戏环境
if (isMiniGame) {
    // 创建画布
    const canvas = wx.createCanvas();
    const ctx = canvas.getContext('2d');
    
    canvas.width = 750;
    canvas.height = 1334;
    
    // 全局对象
    globalThis.canvas = canvas;
    globalThis.ctx = ctx;
    globalThis.gameState = { currentLevel: 1, emotionBottles: [] };
    
    // 渲染辅助函数
    const drawText = (text, x, y, fontSize = 30, color = '#fff', align = 'center') => {
        ctx.font = fontSize + 'px Microsoft YaHei';
        ctx.fillStyle = color;
        ctx.textAlign = align;
        ctx.fillText(text, x, y);
    };
    
    const drawButton = (x, y, w, h, text, color = '#ff6b6b') => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x, y, w, h, h/2) : ctx.fillRect(x, y, w, h);
        ctx.fill();
        drawText(text, x + w/2, y + h/2 + 10, 32);
    };
    
    // 首页渲染
    const renderHome = () => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 1334);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 750, 1334);
        
        drawText('🎭 情绪解谜馆', 375, 200, 56, '#fff');
        drawButton(175, 350, 400, 100, '开始解谜', '#ff6b6b');
        drawButton(175, 480, 400, 100, '📚 我的收藏', '#4ECDC4');
        drawButton(175, 610, 400, 100, '🏆 排行榜', '#FFD700');
        drawButton(175, 740, 400, 100, '📋 每日任务', '#9B59B6');
    };
    
    renderHome();
    
    // 触摸事件
    canvas.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const info = wx.getSystemInfoSync();
        const x = touch.clientX * (750 / info.windowWidth);
        const y = touch.clientY * (1334 / info.windowHeight);
        
        // 简单的按钮检测
        if (y >= 350 && y <= 450) {
            ctx.clearRect(0, 0, 750, 1334);
            drawText('🎮 第1关: 点亮星星', 375, 200, 40);
            drawText('按顺序点击1-5颗星星', 375, 280, 28);
            
            // 绘制5个星星按钮
            for (let i = 0; i < 5; i++) {
                drawButton(110 + i * 110, 400, 90, 90, String(i + 1), '#4ECDC4');
            }
            
            drawButton(175, 900, 400, 80, '返回首页', '#666');
        }
    });
    
    console.log('情绪解谜馆 - 微信小游戏环境');
    module.exports = {};
} 
// 浏览器环境
else {
    // 兼容层
    const MiniGame = {
        elementCache: {},
        createElement: function(tag) {
            return {
                id: 'el_' + Math.random().toString(36).substr(2, 9),
                tagName: tag.toUpperCase(),
                className: '', style: {}, children: [], parentNode: null,
                innerHTML: '', textContent: '', value: '',
                offsetTop: 0, offsetLeft: 0, clientHeight: 500, clientWidth: 375,
                getBoundingClientRect: () => ({x:0,y:0,width:375,height:500}),
                appendChild: function(c) { c.parentNode = this; this.children.push(c); return c; },
                remove: function() { if(this.parentNode){const i=this.parentNode.children.indexOf(this);if(i>-1)this.parentNode.children.splice(i,1);} },
                addEventListener: function(){}, removeEventListener: function(){}, focus: function(){}, click: function(){}
            };
        },
        getElementById: function(id) { return this.elementCache[id] || null; },
        setElement: function(id, el) { this.elementCache[id] = el; },
        storageData: {},
        getStorageSync: function(k) { return this.storageData[k] || null; },
        setStorageSync: function(k, v) { this.storageData[k] = v; }
    };
    
    const $$ = MiniGame.createElement;
    const $ = function(id) { return MiniGame.getElementById(id); };
    
    if (typeof localStorage === 'undefined') {
        globalThis.localStorage = {
            getItem: (k) => MiniGame.storageData[k] || null,
            setItem: (k, v) => MiniGame.storageData[k] = v,
            removeItem: (k) => delete MiniGame.storageData[k],
            clear: () => MiniGame.storageData = {}
        };
    }
    
    if (typeof navigator === 'undefined') {
        globalThis.navigator = { clipboard: { writeText: () => Promise.resolve() }, userAgent: 'browser' };
    }
    
    console.log('情绪解谜馆 - 浏览器环境');
}

// ==================== 游戏配置 ====================
const GAME_CONFIG = {
    name: '情绪解谜馆',
    version: '1.0.0',
    designWidth: 750,
    designHeight: 1334,
    emotionTypes: [
        { id: 'happy', name: '开心', color: '#FFD700', story: '今天阳光正好，鸟儿在歌唱...' },
        { id: 'peaceful', name: '平静', color: '#87CEEB', story: '夜晚仰望星空，思绪飘向远方...' },
        { id: 'surprised', name: '惊喜', color: '#FF69B4', story: '意外收到的礼物，满心欢喜...' },
        { id: 'nostalgic', name: '怀旧', color: '#DDA0DD', story: '翻开老照片，回忆涌上心头...' },
        { id: 'touched', name: '感动', color: '#FF6347', story: '家人的温暖，永远是最强的后盾...' },
        { id: 'grateful', name: '感恩', color: '#20B2AA', story: '感谢生命中遇见的每一个人...' },
        { id: 'hopeful', name: '希望', color: '#98FB98', story: '明天会更好，充满期待...' },
        { id: 'calm', name: '从容', color: '#9370DB', story: '看淡得失，坦然面对...' },
    ],
    levels: [
        { id: 1, type: 'tap_sequence', title: '✨ 点亮星星', desc: '按顺序点击1-5颗星星', answer: [1,2,3,4,5], reward: 'happy' },
        { id: 2, type: 'find_pattern', title: '💎 找规律', desc: '找出与众不同的宝石', pattern: [0,0,1,0,0], reward: 'surprised' },
        { id: 3, type: 'count', title: '🔢 数一数', desc: '画面里有多少个圆形？', answer: 5, reward: 'grateful' },
        { id: 4, type: 'memory', title: '🧠 记忆大师', desc: '记住星星点亮的顺序', sequence: [1,3,2,4], reward: 'hopeful' },
        { id: 5, type: 'timing', title: '⏰ 等待时机', desc: '当指针指向红色区域时点击', reward: 'calm' },
        { id: 6, type: 'puzzle', title: '🧩 拼图', desc: '点击正确的颜色块', colors: ['#FF6B6B','#4ECDC4','#FFE66D','#FF6B6B'], correct: '#FF6B6B', reward: 'nostalgic' },
        { id: 7, type: 'math', title: '➕ 简单算术', desc: '3 + 5 × 2 = ?', options: [11,13,15,17], answer: 13, reward: 'peaceful' },
        { id: 8, type: 'color_choice', title: '🎨 心情颜色', desc: '你喜欢什么颜色？', colors: ['#FF6B6B','#4ECDC4','#FFE66D','#9B59B6'], reward: 'touched' },
    ]
};

// ==================== 游戏主类 ====================
class EmotionPuzzleGame {
    constructor() {
        this.currentLevel = 1;
        this.emotionBottles = [];
        this.unlockedStories = [];
        this.init();
    }
    
    init() {
        console.log('🎮 ' + GAME_CONFIG.name + ' v' + GAME_CONFIG.version + ' 启动');
        this.loadProgress();
        this.showHome();
    }
    
    loadProgress() {
        try {
            let saved;
            if (typeof wx !== 'undefined' && wx.getStorageSync) {
                saved = wx.getStorageSync('emotion_progress');
            } else if (typeof localStorage !== 'undefined') {
                saved = localStorage.getItem('emotion_progress');
            }
            if (saved) {
                const data = JSON.parse(saved);
                this.currentLevel = data.currentLevel || 1;
                this.emotionBottles = data.emotionBottles || [];
                this.unlockedStories = data.unlockedStories || [];
            }
        } catch (e) { console.log('新玩家'); }
    }
    
    saveProgress() {
        const data = { currentLevel: this.currentLevel, emotionBottles: this.emotionBottles, unlockedStories: this.unlockedStories };
        if (typeof wx !== 'undefined' && wx.setStorageSync) {
            wx.setStorageSync('emotion_progress', JSON.stringify(data));
        } else if (typeof localStorage !== 'undefined') {
            localStorage.setItem('emotion_progress', JSON.stringify(data));
        }
    }
    
    clearScreen() {
        const root = typeof $ === 'function' ? $('game-root') : null;
        if (root) { root.innerHTML = ''; }
    }
    
    createTitle(text) { this.createText(text, 60, 'title'); }
    
    createText(text, top, className = 'normal-text') {
        const el = $$('div');
        el.className = className;
        el.textContent = text;
        el.style.top = top + 'px';
        const root = $('game-root');
        if (root) root.appendChild(el);
    }
    
    createButton(text, onClick) {
        const btn = $$('button');
        btn.className = 'game-btn';
        btn.textContent = text;
        btn.onclick = onClick;
        const root = $('game-root');
        if (root) root.appendChild(btn);
    }
    
    showTip(text) {
        const tip = $$('div');
        tip.className = 'tip';
        tip.textContent = text;
        const root = $('game-root');
        if (root) root.appendChild(tip);
        setTimeout(() => tip.remove && tip.remove(), 2000);
    }
    
    showHome() {
        this.clearScreen();
        this.createTitle('🎭 情绪解谜馆');
        this.createButton('开始解谜', () => this.showLevelSelect());
        this.createButton('📚 我的收藏', () => this.showCollection());
    }
    
    showLevelSelect() {
        this.clearScreen();
        this.createTitle('第 ' + this.currentLevel + ' 关');
        this.createButton('返回', () => this.showHome());
        const levelData = GAME_CONFIG.levels[this.currentLevel - 1];
        if (levelData) {
            this.showLevelGame(levelData);
        } else {
            this.createText('🎉 所有关卡已完成！', 200);
        }
    }
    
    showLevelGame(levelData) {
        this.createText(levelData.title, 100);
        this.createText(levelData.desc, 160);
        
        if (levelData.type === 'tap_sequence') {
            const container = $$('div');
            container.className = 'level-container';
            let clicked = [];
            
            for (let i = 1; i <= 5; i++) {
                const btn = $$('button');
                btn.className = 'star-btn';
                btn.textContent = '⭐';
                btn.onclick = () => {
                    clicked.push(i);
                    btn.classList.add('clicked');
                    if (clicked.length === 5) {
                        this.showTip('🎉 过关！');
                        this.completeLevel(levelData.reward);
                    }
                };
                container.appendChild(btn);
            }
            const root = $('game-root');
            if (root) root.appendChild(container);
        }
    }
    
    completeLevel(rewardId) {
        const emotion = GAME_CONFIG.emotionTypes.find(e => e.id === rewardId);
        if (emotion && !this.emotionBottles.includes(rewardId)) {
            this.emotionBottles.push(rewardId);
            this.unlockedStories.push(emotion.story);
        }
        this.saveProgress();
        this.currentLevel++;
        setTimeout(() => this.showLevelSelect(), 1500);
    }
    
    showCollection() {
        this.clearScreen();
        this.createTitle('🎁 情绪收藏馆');
        this.createButton('返回', () => this.showHome());
        
        if (this.emotionBottles.length === 0) {
            this.createText('还没有收集到情绪瓶...', 200);
            return;
        }
        
        this.emotionBottles.forEach(bottleId => {
            const emotion = GAME_CONFIG.emotionTypes.find(e => e.id === bottleId);
            if (emotion) {
                this.createText(emotion.name + ' - ' + emotion.story, 250 + this.emotionBottles.indexOf(bottleId) * 40);
            }
        });
    }
}

let game;
globalThis.onload = function() { game = new EmotionPuzzleGame(); };
