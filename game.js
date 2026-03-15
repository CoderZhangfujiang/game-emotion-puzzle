/**
 * 情绪解谜馆 - 微信小游戏
 */

// 检测运行环境
const isMiniGame = typeof wx !== 'undefined' && typeof wx.createCanvas === 'function';

// ==================== 微信小游戏环境 ====================
if (isMiniGame) {
    // 创建画布
    const canvas = wx.createCanvas();
    canvas.width = 750;
    canvas.height = 1334;
    const ctx = canvas.getContext('2d');
    
    // 游戏状态
    let currentLevel = 1;
    let emotionBottles = [];
    
    // 绘制背景
    function drawBg() {
        const gradient = ctx.createLinearGradient(0, 0, 0, 1334);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 750, 1334);
    }
    
    // 绘制文本
    function drawText(text, x, y, size, color) {
        ctx.font = size + 'px Microsoft YaHei';
        ctx.fillStyle = color || '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y);
    }
    
    // 绘制按钮
    function drawBtn(x, y, w, h, text, color) {
        ctx.fillStyle = color;
        // 圆角矩形
        const r = 20;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        drawText(text, x + w/2, y + h/2 + 8, 32);
    }
    
    // 绘制带边框的圆形按钮
    function drawCircleBtn(x, y, r, text) {
        ctx.fillStyle = '#4ECDC4';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();
        drawText(text, x, y + 10, 36);
    }
    
    // 首页
    function renderHome() {
        drawBg();
        drawText('🎭 情绪解谜馆', 375, 150, 56);
        
        // 绘制4个主按钮
        drawBtn(100, 250, 550, 100, '开始解谜', '#ff6b6b');
        drawBtn(100, 380, 550, 100, '📚 我的收藏', '#4ECDC4');
        drawBtn(100, 510, 550, 100, '🏆 排行榜', '#FFD700');
        drawBtn(100, 640, 550, 100, '📋 每日任务', '#9B59B6');
        
        // 绘制底部提示
        drawText('点击按钮开始游戏', 375, 1200, 24, 'rgba(255,255,255,0.6)');
    }
    
    // 游戏页面
    function renderGame() {
        drawBg();
        drawText('🎮 第' + currentLevel + '关', 375, 80, 40);
        drawText('按顺序点击1-5', 375, 140, 24, 'rgba(255,255,255,0.8)');
        
        // 绘制5个数字按钮
        for(let i = 0; i < 5; i++) {
            drawCircleBtn(150 + i * 130, 350, 50, String(i + 1));
        }
        
        drawBtn(100, 1100, 550, 90, '← 返回首页', '#666');
    }
    
    // 收藏馆
    function renderCollection() {
        drawBg();
        drawText('📚 我的收藏', 375, 100, 44);
        drawText('暂无收藏，快去通关吧', 375, 300, 28, 'rgba(255,255,255,0.7)');
        drawBtn(100, 1100, 550, 90, '← 返回', '#666');
    }
    
    // 排行榜
    function renderRank() {
        drawBg();
        drawText('🏆 排行榜', 375, 100, 44);
        drawText('暂未开放', 375, 300, 28, 'rgba(255,255,255,0.7)');
        drawBtn(100, 1100, 550, 90, '← 返回', '#666');
    }
    
    // 每日任务
    function renderTask() {
        drawBg();
        drawText('📋 每日任务', 375, 100, 44);
        drawText('完成3关，解锁奖励', 375, 250, 28, 'rgba(255,255,255,0.7)');
        drawText('奖励：开心情绪瓶', 375, 320, 26, '#FFD700');
        drawBtn(100, 1100, 550, 90, '← 返回', '#666');
    }
    
    // 渲染首页
    renderHome();
    
    // 当前页面
    let currentPage = 'home';
    
    // 触摸事件处理
    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        
        const touch = e.touches[0];
        const info = wx.getSystemInfoSync();
        const x = touch.clientX * (750 / info.windowWidth);
        const y = touch.clientY * (1334 / info.windowHeight);
        
        // 首页按钮检测
        if (currentPage === 'home') {
            if (y >= 250 && y <= 350) {
                currentPage = 'game';
                renderGame();
            } else if (y >= 380 && y <= 480) {
                currentPage = 'collection';
                renderCollection();
            } else if (y >= 510 && y <= 610) {
                currentPage = 'rank';
                renderRank();
            } else if (y >= 640 && y <= 740) {
                currentPage = 'task';
                renderTask();
            }
        } else {
            // 其他页面返回首页
            if (y >= 1100 && y <= 1190) {
                currentPage = 'home';
                renderHome();
            }
        }
    });
    
    // 刷新画布
    function render() {
        if (currentPage === 'home') renderHome();
        else if (currentPage === 'game') renderGame();
        else if (currentPage === 'collection') renderCollection();
        else if (currentPage === 'rank') renderRank();
        else if (currentPage === 'task') renderTask();
    }
    
    console.log('情绪解谜馆启动成功');
}

// ==================== 浏览器环境 ====================
if (typeof document !== 'undefined') {
    // 浏览器环境的代码在这里
    console.log('浏览器环境');
}
