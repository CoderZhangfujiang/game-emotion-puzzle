/**
 * 情绪解谜馆 - 微信小游戏
 * 治愈系轻量解谜 + 收集 + 社交
 * 
 * 运行方式：
 * 1. 浏览器预览：直接打开 index.html
 * 2. 微信小游戏：导入微信开发者工具
 */

// 检测运行环境
const isMiniGame = typeof wx !== 'undefined' && typeof wx.createCanvas === 'function';

// ==================== 微信小游戏环境 ====================
if (isMiniGame) {
    // 创建画布
    const canvas = wx.createCanvas();
    const ctx = canvas.getContext('2d');
    
    canvas.width = 750;
    canvas.height = 1334;
    
    // 游戏状态
    let currentLevel = 1;
    let emotionBottles = [];
    
    // 绘制背景
    const drawBg = () => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 1334);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 750, 1334);
    };
    
    // 绘制文本
    const drawText = (text, x, y, size = 30, color = '#fff') => {
        ctx.font = size + 'px Microsoft YaHei';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y);
    };
    
    // 绘制按钮
    const drawBtn = (x, y, w, h, text, color) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.fillRect(x, y, w, h);
        ctx.fill();
        drawText(text, x + w/2, y + h/2 + 10, 32);
    };
    
    // 首页
    const renderHome = () => {
        drawBg();
        drawText('🎭 情绪解谜馆', 375, 180, 50);
        drawBtn(175, 300, 400, 90, '开始解谜', '#ff6b6b');
        drawBtn(175, 420, 400, 90, '📚 我的收藏', '#4ECDC4');
        drawBtn(175, 540, 400, 90, '🏆 排行榜', '#FFD700');
        drawBtn(175, 660, 400, 90, '📋 每日任务', '#9B59B6');
    };
    
    // 游戏页面
    const renderGame = () => {
        drawBg();
        drawText('🎮 第' + currentLevel + '关', 375, 100, 40);
        drawText('点击按钮开始游戏', 375, 160, 26);
        
        // 绘制5个星星
        for(let i = 0; i < 5; i++) {
            drawBtn(110 + i * 105, 250, 95, 85, (i+1)+'', '#4ECDC4');
        }
        
        drawBtn(175, 900, 400, 80, '← 返回', '#666');
    };
    
    // 渲染首页
    renderHome();
    
    // 触摸事件
    canvas.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const info = wx.getSystemInfoSync();
        const x = touch.clientX * (750 / info.windowWidth);
        const y = touch.clientY * (1334 / info.windowHeight);
        
        // 首页按钮检测
        if (y >= 300 && y <= 390) {
            // 开始游戏
            renderGame();
        } else if (y >= 420 && y <= 510) {
            drawBg();
            drawText('📚 收藏馆', 375, 200, 40);
            drawText('暂无收藏', 375, 300, 28);
            drawBtn(175, 800, 400, 80, '← 返回', '#666');
        } else if (y >= 540 && y <= 630) {
            drawBg();
            drawText('🏆 排行榜', 375, 200, 40);
            drawText('暂未开放', 375, 300, 28);
            drawBtn(175, 800, 400, 80, '← 返回', '#666');
        } else if (y >= 660 && y <= 750) {
            drawBg();
            drawText('📋 每日任务', 375, 200, 40);
            drawText('完成3关 解锁奖励', 375, 300, 28);
            drawBtn(175, 800, 400, 80, '← 返回', '#666');
        } else if (y >= 900 && y <= 980) {
            renderHome();
        }
    });
    
    console.log('情绪解谜馆 - 微信小游戏环境已启动');
}
else {
    // ==================== 浏览器环境兼容层 ====================
    const MiniGame = {
        elementCache: {},
        createElement: (tag) => ({
            id: 'el_' + Math.random().toString(36).substr(2, 9),
            tagName: tag.toUpperCase(), className: '', style: {}, children: [], parentNode: null,
            innerHTML: '', textContent: '', value: '',
            appendChild: function(c) { c.parentNode = this; this.children.push(c); return c; },
            remove: function() { if(this.parentNode){const i=this.parentNode.children.indexOf(this);if(i>-1)this.parentNode.children.splice(i,1);} },
            addEventListener: function(){}, removeEventListener: function(){}
        }),
        getElementById: function(id) { return this.elementCache[id] || null; },
        setElement: function(id, el) { this.elementCache[id] = el; },
        storageData: {}
    };
    
    const $$ = MiniGame.createElement;
    const $ = (id) => MiniGame.getElementById(id);
    
    if (typeof localStorage === 'undefined') {
        globalThis.localStorage = {
            getItem: (k) => MiniGame.storageData[k],
            setItem: (k, v) => MiniGame.storageData[k] = v
        };
    }
    
    console.log('情绪解谜馆 - 浏览器环境');
}

// ==================== 游戏配置 ====================
const GAME_CONFIG = {
    name: '情绪解谜馆',
    version: '2.0.0',
    emotionTypes: [
        { id: 'happy', name: '开心', color: '#FFD700', story: '今天阳光正好，鸟儿在歌唱...' },
        { id: 'peaceful', name: '平静', color: '#87CEEB', story: '夜晚仰望星空，思绪飘向远方...' },
        { id: 'surprised', name: '惊喜', color: '#FF69B4', story: '意外收到的礼物，满心欢喜...' },
        { id: 'nostalgic', name: '怀旧', color: '#DDA0DD', story: '翻开老照片，回忆涌上心头...' },
        { id: 'touched', name: '感动', color: '#FF6347', story: '家人的温暖，永远是最强的后盾...' },
        { id: 'grateful', name: '感恩', color: '#20B2AA', story: '感谢生命中遇见的每一个人...' },
        { id: 'hopeful', name: '希望', color: '#98FB98', story: '明天会更好，充满期待...' },
        { id: 'calm', name: '从容', color: '#9370DB', story: '看淡得失，坦然面对...' },
    ]
};

// 浏览器环境启动游戏
if (typeof document !== 'undefined') {
    class EmotionPuzzleGame {
        constructor() {
            this.currentLevel = 1;
            this.emotionBottles = [];
            this.init();
        }
        
        init() {
            const root = $('game-root');
            if (!root) return;
            this.showHome(root);
        }
        
        clearScreen() {
            const root = $('game-root');
            if (root) root.innerHTML = '';
        }
        
        createText(text, top, className = 'normal-text') {
            const el = $$('div');
            el.className = className;
            el.textContent = text;
            el.style.top = top + 'px';
            el.style.position = 'absolute';
            el.style.width = '100%';
            el.style.textAlign = 'center';
            const root = $('game-root');
            if (root) root.appendChild(el);
        }
        
        createButton(text, onClick) {
            const btn = $$('button');
            btn.className = 'game-btn';
            btn.textContent = text;
            btn.style.position = 'absolute';
            btn.style.left = '50%';
            btn.style.transform = 'translateX(-50%)';
            btn.onclick = onClick;
            const root = $('game-root');
            if (root) root.appendChild(btn);
        }
        
        showHome(root) {
            this.clearScreen();
            this.createText('🎭 情绪解谜馆', 120);
            this.createButton('开始解谜', () => this.showLevelSelect());
            this.createButton('📚 我的收藏', () => this.showCollection());
        }
        
        showLevelSelect() {
            this.clearScreen();
            this.createText('第 ' + this.currentLevel + ' 关', 120);
            this.createButton('返回', () => this.showHome());
        }
        
        showCollection() {
            this.clearScreen();
            this.createText('📚 收藏馆', 120);
            this.createButton('返回', () => this.showHome());
        }
    }
    
    globalThis.onload = () => new EmotionPuzzleGame();
}
