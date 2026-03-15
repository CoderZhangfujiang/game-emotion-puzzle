/**
 * 情绪解谜馆 - 微信小游戏
 */

var isMiniGame = typeof wx !== 'undefined' && typeof wx.createCanvas === 'function';

if (isMiniGame) {
    var canvas = wx.createCanvas();
    canvas.width = 750;
    canvas.height = 1334;
    var ctx = canvas.getContext('2d');
    
    var currentLevel = 1;
    var currentPage = 'home';
    var clickedNumbers = []; // 记录已点击的数字
    
    function drawBg() {
        var gradient = ctx.createLinearGradient(0, 0, 0, 1334);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 750, 1334);
    }
    
    function drawText(text, x, y, size, color) {
        ctx.font = size + 'px Microsoft YaHei';
        ctx.fillStyle = color || '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y);
    }
    
    function drawBtn(x, y, w, h, text, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x + 20, y);
        ctx.lineTo(x + w - 20, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + 20);
        ctx.lineTo(x + w, y + h - 20);
        ctx.quadraticCurveTo(x + w, y + h, x + w - 20, y + h);
        ctx.lineTo(x + 20, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - 20);
        ctx.lineTo(x, y + 20);
        ctx.quadraticCurveTo(x, y, x + 20, y);
        ctx.closePath();
        ctx.fill();
        drawText(text, x + w/2, y + h/2 + 8, 32);
    }
    
    function drawCircleBtn(x, y, r, text, isClicked) {
        ctx.fillStyle = isClicked ? '#ff6b6b' : '#4ECDC4';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();
        drawText(text, x, y + 10, 36);
    }
    
    function renderHome() {
        currentPage = 'home';
        clickedNumbers = [];
        drawBg();
        drawText('🎭 情绪解谜馆', 375, 150, 56);
        drawBtn(100, 250, 550, 100, '开始解谜', '#ff6b6b');
        drawBtn(100, 380, 550, 100, '📚 我的收藏', '#4ECDC4');
        drawBtn(100, 510, 550, 100, '🏆 排行榜', '#FFD700');
        drawBtn(100, 640, 550, 100, '📋 每日任务', '#9B59B6');
    }
    
    function renderGame() {
        currentPage = 'game';
        clickedNumbers = [];
        drawBg();
        drawText('🎮 第' + currentLevel + '关', 375, 80, 40);
        drawText('按顺序点击1-5', 375, 140, 24, 'rgba(255,255,255,0.8)');
        var i = 0;
        for (i = 0; i < 5; i++) {
            var num = i + 1;
            var isClicked = clickedNumbers.indexOf(num) !== -1;
            drawCircleBtn(150 + i * 130, 350, 50, String(num), isClicked);
        }
        // 显示已点击提示
        if (clickedNumbers.length > 0) {
            drawText('已点击: ' + clickedNumbers.join(', '), 375, 500, 24, '#FFD700');
        }
        drawBtn(100, 1100, 550, 90, '← 返回首页', '#666');
    }
    
    function renderCollection() {
        currentPage = 'collection';
        clickedNumbers = [];
        drawBg();
        drawText('📚 我的收藏', 375, 100, 44);
        drawText('暂无收藏', 375, 300, 28);
        drawBtn(100, 1100, 550, 90, '← 返回', '#666');
    }
    
    function renderRank() {
        currentPage = 'rank';
        clickedNumbers = [];
        drawBg();
        drawText('🏆 排行榜', 375, 100, 44);
        drawText('暂未开放', 375, 300, 28);
        drawBtn(100, 1100, 550, 90, '← 返回', '#666');
    }
    
    function renderTask() {
        currentPage = 'task';
        clickedNumbers = [];
        drawBg();
        drawText('📋 每日任务', 375, 100, 44);
        drawText('完成3关解锁奖励', 375, 250, 28);
        drawText('奖励：开心情绪瓶', 375, 320, 26, '#FFD700');
        drawBtn(100, 1100, 550, 90, '← 返回', '#666');
    }
    
    function handleTouch(x, y) {
        if (currentPage === 'home') {
            if (y >= 250 && y <= 350) {
                renderGame();
            } else if (y >= 380 && y <= 480) {
                renderCollection();
            } else if (y >= 510 && y <= 610) {
                renderRank();
            } else if (y >= 640 && y <= 740) {
                renderTask();
            }
        } else if (currentPage === 'game') {
            // 游戏页面：检测圆形按钮点击 (y在300-400之间)
            if (y >= 300 && y <= 400) {
                for (var i = 0; i < 5; i++) {
                    var btnX = 150 + i * 130;
                    var dx = x - btnX;
                    var dy = y - 350;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist <= 50) {
                        // 点击了第i+1个按钮
                        var num = i + 1;
                        if (clickedNumbers.indexOf(num) === -1) {
                            clickedNumbers.push(num);
                            // 检查是否按顺序
                            var expected = clickedNumbers.length;
                            if (num === expected) {
                                if (clickedNumbers.length === 5) {
                                    // 全部按顺序点击完成
                                    drawText('🎉 通关成功！', 375, 600, 36, '#FFD700');
                                    setTimeout(function() {
                                        renderHome();
                                    }, 2000);
                                } else {
                                    renderGame();
                                }
                            } else {
                                // 顺序错误
                                drawText('❌ 顺序错误！重新开始', 375, 600, 28, '#ff6b6b');
                                setTimeout(function() {
                                    clickedNumbers = [];
                                    renderGame();
                                }, 1000);
                            }
                        }
                        break;
                    }
                }
            }
            // 返回按钮
            if (y >= 1100 && y <= 1190) {
                renderHome();
            }
        } else {
            // 其他页面返回按钮
            if (y >= 1100 && y <= 1190) {
                renderHome();
            }
        }
    }
    
    // 渲染首页
    renderHome();
    
    // 微信小游戏触摸事件绑定
    if (typeof wx.onTouchStart === 'function') {
        wx.onTouchStart(function(res) {
            if (res.touches && res.touches.length > 0) {
                var touch = res.touches[0];
                var info = wx.getSystemInfoSync();
                var x = touch.clientX * (750 / info.windowWidth);
                var y = touch.clientY * (1334 / info.windowHeight);
                handleTouch(x, y);
            }
        });
    } else {
        canvas.addEventListener('touchstart', function(res) {
            if (res.touches && res.touches.length > 0) {
                var touch = res.touches[0];
                var info = wx.getSystemInfoSync();
                var x = touch.clientX * (750 / info.windowWidth);
                var y = touch.clientY * (1334 / info.windowHeight);
                handleTouch(x, y);
            }
        });
    }
    
    console.log('情绪解谜馆启动成功');
}

if (typeof document !== 'undefined') {
    console.log('浏览器环境');
}
