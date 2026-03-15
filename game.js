/**
 * 情绪解谜馆 - 微信小游戏
 */

var isMiniGame = typeof wx !== 'undefined' && typeof wx.createCanvas === 'function';

// 游戏数据
var gameData = {
    currentLevel: 1,
    emotionBottles: [],
    unlockedStories: [],
    totalScore: 0
};

// 加载游戏数据
function loadGameData() {
    try {
        if (isMiniGame && wx.getStorageSync) {
            var saved = wx.getStorageSync('emotion_puzzle_data');
            if (saved) {
                var data = JSON.parse(saved);
                gameData = data;
            }
        } else if (typeof localStorage !== 'undefined') {
            var saved = localStorage.getItem('emotion_puzzle_data');
            if (saved) {
                gameData = JSON.parse(saved);
            }
        }
    } catch (e) {
        console.log('加载数据失败', e);
    }
}

// 保存游戏数据
function saveGameData() {
    try {
        if (isMiniGame && wx.setStorageSync) {
            wx.setStorageSync('emotion_puzzle_data', JSON.stringify(gameData));
        } else if (typeof localStorage !== 'undefined') {
            localStorage.setItem('emotion_puzzle_data', JSON.stringify(gameData));
        }
    } catch (e) {
        console.log('保存数据失败', e);
    }
}

// 情绪瓶类型
var emotionTypes = [
    { id: 'happy', name: '开心', color: '#FFD700', story: '今天阳光正好，鸟儿在歌唱，嘴角不自觉上扬。', icon: '😊' },
    { id: 'peaceful', name: '平静', color: '#87CEEB', story: '夜晚仰望星空，思绪飘向远方，内心无比宁静。', icon: '😌' },
    { id: 'surprised', name: '惊喜', color: '#FF69B4', story: '意外收到的礼物，满心欢喜，难以置信！', icon: '😲' },
    { id: 'nostalgic', name: '怀旧', color: '#DDA0DD', story: '翻开老照片，回忆涌上心头，那些美好的时光。', icon: '😊' },
    { id: 'touched', name: '感动', color: '#FF6347', story: '家人的温暖，永远是最强的后盾。', icon: '😭' },
    { id: 'grateful', name: '感恩', color: '#20B2AA', story: '感谢生命中遇见的每一个人，每一段经历。', icon: '🙏' },
    { id: 'hopeful', name: '希望', color: '#98FB98', story: '明天会更好，充满期待和向往。', icon: '🌟' },
    { id: 'calm', name: '从容', color: '#9370DB', story: '看淡得失，坦然面对一切。', icon: '😎' },
    { id: 'excited', name: '兴奋', color: '#FF4500', story: '即将到来的旅程，让心跳加速！', icon: '🎉' },
    { id: 'melancholy', name: '淡淡的忧伤', color: '#6A5ACD', story: '有些情绪，不需要理由，只是淡淡的。', icon: '😔' },
    { id: 'confident', name: '自信', color: '#32CD32', story: '相信自己，你可以的！', icon: '💪' },
    { id: 'dreamy', name: '梦幻', color: '#FFB6C1', story: '像棉花糖一样的柔软梦境。', icon: '🌙' },
    { id: 'brave', name: '勇敢', color: '#DC143C', story: '面对未知，保持勇气。', icon: '🦁' },
    { id: 'lazy', name: '慵懒', color: '#DEB887', story: '什么都不想做，只想发呆。', icon: '😴' },
    { id: 'curious', name: '好奇', color: '#00CED1', story: '世界那么大，我想去看看。', icon: '👀' }
];

// 关卡配置
var levelConfigs = [
    { id: 1, type: 'tap_sequence', title: '✨ 点亮星星', desc: '按顺序点击1-5颗星星', answer: [1,2,3,4,5], reward: 'happy' },
    { id: 2, type: 'find_pattern', title: '💎 找规律', desc: '找出与众不同的宝石', pattern: [0,0,1,0,0], reward: 'surprised' },
    { id: 3, type: 'count', title: '🔢 数一数', desc: '画面里有多少个圆形？', answer: 5, reward: 'grateful' },
    { id: 4, type: 'memory', title: '🧠 记忆大师', desc: '记住星星点亮的顺序', sequence: [1,3,2,4], reward: 'hopeful' },
    { id: 5, type: 'timing', title: '⏰ 等待时机', desc: '当指针指向红色区域时点击', reward: 'calm' },
    { id: 6, type: 'puzzle', title: '🧩 拼图', desc: '点击正确的颜色块', colors: ['#FF6B6B','#4ECDC4','#FFE66D','#FF6B6B'], correct: '#FF6B6B', reward: 'nostalgic' },
    { id: 7, type: 'math', title: '➕ 简单算术', desc: '3 + 5 × 2 = ', options: [11,13,15,17], answer: 13, reward: 'peaceful' },
    { id: 8, type: 'color_choice', title: '🎨 心情颜色', desc: '选择你喜欢的颜色', colors: ['#FF6B6B','#4ECDC4','#FFE66D','#9B59B6'], reward: 'touched' },
    { id: 9, type: 'tap_sequence', title: '🌟 星星排序', desc: '按从大到小点击星星', answer: [5,4,3,2,1], reward: 'confident' },
    { id: 10, type: 'find_pattern', title: '🔍 找不同', desc: '找出不同的那个', pattern: [1,1,1,0,1], reward: 'excited' },
    { id: 11, type: 'count', title: '📊 数一数', desc: '有多少个正方形？', answer: 4, reward: 'brave' },
    { id: 12, type: 'timing', title: '🎯 精准点击', desc: '在圆心重合时点击', reward: 'curious' },
    { id: 13, type: 'math', title: '🧮 算术题', desc: '10 - 3 × 2 = ', options: [4,14,0,20], answer: 4, reward: 'dreamy' },
    { id: 14, type: 'color_choice', title: '🌈 彩虹选择', desc: '选择彩虹的颜色', colors: ['#FF0000','#FF7F00','#FFFF00','#00FF00','#0000FF','#4B0082','#8B00FF'], reward: 'melancholy' },
    { id: 15, type: 'memory', title: '🎵 音乐记忆', desc: '记住音阶顺序', sequence: [1,2,1,3,2], reward: 'lazy' },
    { id: 16, type: 'tap_sequence', title: '🔢 数字阶梯', desc: '从1点到10', answer: [1,2,3,4,5,6,7,8,9,10], reward: 'hopeful' },
    { id: 17, type: 'find_pattern', title: '🔲 图形规律', desc: '找规律填空白', pattern: [0,1,0,1,1], answer: 0, reward: 'confident' },
    { id: 18, type: 'count', title: '⭐ 星星计数', desc: '数一数有多少颗星', answer: 7, reward: 'dreamy' },
    { id: 19, type: 'timing', title: '⏱️ 节奏大师', desc: '跟着节奏点击', reward: 'excited' },
    { id: 20, type: 'puzzle', title: '🎯 颜色配对', desc: '找出相同的颜色', reward: 'brave' },
    { id: 21, type: 'math', title: '➖ 减法运算', desc: '25 - 8 = ', options: [15,17,18,19], answer: 17, reward: 'curious' },
    { id: 22, type: 'color_choice', title: '🌙 夜晚选择', desc: '选择夜晚的颜色', colors: ['#000033','#000066','#003366','#004466'], reward: 'peaceful' },
    { id: 23, type: 'memory', title: '👁️ 视觉记忆', desc: '记住方块位置', reward: 'touched' },
    { id: 24, type: 'tap_sequence', title: '🎯 靶心射击', desc: '从中心到外围点击', answer: [5,4,3,2,1], reward: 'grateful' },
    { id: 25, type: 'find_pattern', title: '📐 规律填空', desc: '2,4,6,8,', answer: 10, reward: 'confident' },
    { id: 26, type: 'count', title: '🍎 水果数', desc: '有多少个苹果', answer: 6, reward: 'excited' },
    { id: 27, type: 'timing', title: '🎪 走钢丝', desc: '保持平衡', reward: 'brave' },
    { id: 28, type: 'math', title: '✖️ 乘法挑战', desc: '7 × 8 = ', options: [54,56,58,60], answer: 56, reward: 'curious' },
    { id: 29, type: 'color_choice', title: '🌸 春天颜色', desc: '选择春天的颜色', colors: ['#FFB7C5','#98FB98','#87CEEB','#DDA0DD'], reward: 'dreamy' },
    { id: 30, type: 'memory', title: '🔢 数字记忆', desc: '记住数字顺序', sequence: [8,3,7,1,9], reward: 'melancholy' },
    { id: 31, type: 'tap_sequence', title: '🏃 跑步比赛', desc: '按顺序经过每个Checkpoint', answer: [1,2,3,4,5], reward: 'lazy' },
    { id: 32, type: 'find_pattern', title: '🎨 颜色规律', desc: '红黄蓝红黄', answer: '蓝', reward: 'excited' },
    { id: 33, type: 'count', title: '🔷 几何图形', desc: '有多少个三角形', answer: 3, reward: 'brave' },
    { id: 34, type: 'timing', title: '🚦 红绿灯', desc: '绿灯时通过', reward: 'curious' },
    { id: 35, type: 'math', title: '➗ 除法运算', desc: '56 ÷ 7 = ', options: [6,7,8,9], answer: 8, reward: 'dreamy' },
    { id: 36, type: 'color_choice', title: '🔥 火焰颜色', desc: '选择火焰的主色调', colors: ['#FF4500','#FF6347','#FF7F50','#DC143C'], reward: 'melancholy' },
    { id: 37, type: 'memory', title: '🎵 音符记忆', desc: '记住旋律', sequence: [1,2,3,2,1], reward: 'lazy' },
    { id: 38, type: 'tap_sequence', title: '🧗 攀岩挑战', desc: '从下往上爬', answer: [1,2,3,4,5], reward: 'brave' },
    { id: 39, type: 'find_pattern', title: '📊 数据规律', desc: '1,1,2,3,5,8,', answer: 13, reward: 'curious' },
    { id: 40, type: 'count', title: '🎲 骰子点数', desc: '所有骰子的总和', answer: 18, reward: 'dreamy' },
    { id: 41, type: 'final', title: '🎉 最终关卡', desc: 'Congratulations!', reward: 'calm' },
    { id: 42, type: 'bonus', title: '⭐ 额外奖励', desc: '完成所有关卡', reward: 'hopeful' }
];

if (isMiniGame) {
    var canvas = wx.createCanvas();
    canvas.width = 750;
    canvas.height = 1334;
    var ctx = canvas.getContext('2d');
    
    var currentLevel = 1;
    var currentPage = 'home';
    var clickedNumbers = [];
    var lastClickedNum = 0;
    var showMessage = '';
    var messageTimer = null;
    var messageColor = '#FFD700';
    var gameProgress = { level: 1, answers: [] };
    
    // 加载数据
    loadGameData();
    currentLevel = gameData.currentLevel  1;
    
    function drawBg() {
        var gradient = ctx.createLinearGradient(0, 0, 0, 1334);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 750, 1334);
    }
    
    function drawText(text, x, y, size, color) {
        ctx.font = size + 'px Microsoft YaHei';
        ctx.fillStyle = color  '#ffffff';
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
    
    function drawCircleBtn(x, y, r, text, isClicked, isLastClicked) {
        if (isLastClicked) {
            ctx.fillStyle = '#ff6b6b';
        } else if (isClicked) {
            ctx.fillStyle = '#98FB98';
        } else {
            ctx.fillStyle = '#4ECDC4';
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();
        drawText(text, x, y + 12, 36);
    }
    
    function showTempMessage(msg, color, duration) {
        showMessage = msg;
        messageColor = color  '#FFD700';
        renderGame();
        if (messageTimer) {
            clearTimeout(messageTimer);
        }
        messageTimer = setTimeout(function() {
            showMessage = '';
            renderGame();
        }, duration  1500);
    }
    
    function renderHome() {
        currentPage = 'home';
        clickedNumbers = [];
        lastClickedNum = 0;
        drawBg();
        
        // 标题
        drawText('🎭 情绪解谜馆', 375, 120, 48);
        
        // 进度显示
        drawText('已收集 ' + gameData.emotionBottles.length + ' / ' + emotionTypes.length + ' 个情绪瓶', 375, 180, 22, 'rgba(255,255,255,0.7)');
        
        // 按钮
        drawBtn(100, 230, 550, 100, '开始解谜', '#ff6b6b');
        drawBtn(100, 360, 550, 100, '📚 我的收藏', '#4ECDC4');
        drawBtn(100, 490, 550, 100, '🏆 排行榜', '#FFD700');
        drawBtn(100, 620, 550, 100, '📋 每日任务', '#9B59B6');
        
        // 当前关卡
        drawText('当前关卡: ' + currentLevel, 375, 900, 24, 'rgba(255,255,255,0.6)');
    }
    
    function renderLevelSelect() {
        currentPage = 'levelSelect';
        drawBg();
        drawText('选择关卡', 375, 100, 44);
        
        // 显示前20个关卡按钮
        var startX = 75;
        var startY = 180;
        var gap = 100;
        
        for (var i = 0; i < 20; i++) {
            var col = i % 5;
            var row = Math.floor(i / 5);
            var x = startX + col * gap;
            var y = startY + row * 100;
            var levelNum = i + 1;
            
            // 已完成的关卡显示不同颜色
            var isUnlocked = levelNum <= currentLevel;
            var isCompleted = levelNum < currentLevel;
            
            if (isUnlocked) {
                drawCircleBtn(x + 40, y + 40, 35, String(levelNum), isCompleted, false);
            } else {
                ctx.fillStyle = 'rgba(100,100,100,0.5)';
                ctx.beginPath();
                ctx.arc(x + 40, y + 40, 35, 0, Math.PI * 2);
                ctx.fill();
                drawText('🔒', x + 40, y + 45, 24);
            }
        }
        
        drawBtn(100, 1200, 550, 90, '← 返回', '#666');
    }
    
    function renderGame() {
        currentPage = 'game';
        drawBg();
        
        var levelData = levelConfigs[currentLevel - 1];
        if (!levelData) {
            drawText('🎉 恭喜通关！', 375, 400, 48);
            drawText('你已收集所有情绪瓶', 375, 480, 28);
            drawBtn(100, 1100, 550, 90, '返回首页', '#666');
            return;
        }
        
        drawText('🎮 第' + currentLevel + '关', 375, 80, 40);
        drawText(levelData.title, 375, 130, 32);
        drawText(levelData.desc, 375, 170, 22, 'rgba(255,255,255,0.7)');
        
        // 根据关卡类型渲染不同的游戏内容
        if (levelData.type === 'tap_sequence'  levelData.type === 'tap') {
            // 绘制数字按钮
            var maxNum = levelData.answer ? Math.max.apply(null, levelData.answer) : 10;
            var btnY = 300;
            
            for (var i = 0; i < maxNum; i++) {
                var num = i + 1;
                var isClicked = clickedNumbers.indexOf(num) !== -1;
                var isLastClicked = lastClickedNum === num;
                var btnX = 375 - (maxNum * 60) / 2 + i * 60 + 30;
                drawCircleBtn(btnX, btnY, 40, String(num), isClicked, isLastClicked);
            }
        }
        
        if (showMessage) {
            drawText(showMessage, 375, 550, 32, messageColor);
        }
        
        drawBtn(100, 1100, 550, 90, '← 返回', '#666');
    }
    
    function renderCollection() {
        currentPage = 'collection';
        drawBg();
        drawText('📚 我的收藏', 375, 80, 44);
        drawText('已收集 ' + gameData.emotionBottles.length + ' / ' + emotionTypes.length, 375, 130, 22, 'rgba(255,255,255,0.7)');
        
        // 显示收集的情绪瓶
        var y = 180;
        if (gameData.emotionBottles.length === 0) {
            drawText('还没有收集到情绪瓶...', 375, 400, 26, 'rgba(255,255,255,0.6)');
            drawText('快去通关吧！', 375, 450, 24, 'rgba(255,255,255,0.5)');
        } else {
            for (var i = 0; i < gameData.emotionBottles.length; i++) {
                var bottleId = gameData.emotionBottles[i];
                var bottle = emotionTypes.find(function(e) { return e.id === bottleId; });
                if (bottle) {
                    ctx.fillStyle = bottle.color;
                    ctx.fillRect(80, y + i * 90, 60, 70);
                    drawText(bottle.icon, 110, y + i * 90 + 45, 32);
                    drawText(bottle.name, 280, y + i * 90 + 30, 26);
                    drawText(bottle.story.substring(0, 15) + '...', 280, y + i * 90 + 55, 18, 'rgba(255,255,255,0.6)');
                }
            }
        }
        
        drawBtn(100, 1200, 550, 90, '← 返回', '#666');
    }
    
    function renderRank() {
        currentPage = 'rank';
        drawBg();
        drawText('🏆 排行榜', 375, 100, 44);
        drawText('功能开发中...', 375, 300, 28);
        drawBtn(100, 1200, 550, 90, '← 返回', '#666');
    }
    
    function renderTask() {
        currentPage = 'task';
        drawBg();
        drawText('📋 每日任务', 375, 100, 44);
        
        // 今日任务
        drawText('今日目标: 通关3关', 375, 200, 26);
        drawText('进度: ' + Math.min(gameData.totalScore, 3) + ' / 3', 375, 250, 22, 'rgba(255,255,255,0.7)');
        
        // 进度条
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(150, 280, 450, 30);
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(150, 280, 150 * Math.min(gameData.totalScore, 3) / 3, 30);
        
        // 奖励
        if (gameData.totalScore >= 3) {
            drawText('🎉 今日奖励已领取！', 375, 380, 28, '#FFD700');
        } else {
            drawText('奖励: 随机情绪瓶', 375, 350, 24);
        }
        
        drawBtn(100, 1200, 550, 90, '← 返回', '#666');
    }
    
    function handleTouch(x, y) {
        if (currentPage === 'home') {
            if (y >= 230 && y <= 330) {
                renderLevelSelect();
            } else if (y >= 360 && y <= 460) {
                renderCollection();
            } else if (y >= 490 && y <= 590) {
                renderRank();
            } else if (y >= 620 && y <= 720) {
                renderTask();
            }
        } else if (currentPage === 'levelSelect') {
            // 关卡选择
            if (y >= 1200 && y <= 1290) {
                renderHome();
                return;
            }
            
            // 检测关卡按钮点击
            var startX = 75;
            var startY = 180;
            var gap = 100;
            
            for (var i = 0; i < 20; i++) {
                var col = i % 5;
                var row = Math.floor(i / 5);
                var btnX = startX + col * gap + 40;
                var btnY = startY + row * 100 + 40;
                
                var dx = x - btnX;
                var dy = y - btnY;
                var dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist <= 40) {
                    var levelNum = i + 1;
                    if (levelNum <= currentLevel) {
                        currentLevel = levelNum;
                        gameData.currentLevel = levelNum;
                        clickedNumbers = [];
                        lastClickedNum = 0;
                        renderGame();
                    }
                    break;
                }
            }
        } else if (currentPage === 'game') {
            if (y >= 1100 && y <= 1190) {
                renderLevelSelect();
                return;
            }
            
            // 游戏逻辑 - 简单版：按顺序点击
            var levelData = levelConfigs[currentLevel - 1];
            if (levelData && (levelData.type === 'tap_sequence'  levelData.type === 'tap')) {
                var maxNum = levelData.answer ? Math.max.apply(null, levelData.answer) : 10;
                var btnY = 300;
                
                if (y >= btnY - 50 && y <= btnY + 50) {
                    for (var i = 0; i < maxNum; i++) {
                        var btnX = 375 - (maxNum * 60) / 2 + i * 60 + 30;
                        var dx = x - btnX;
                        var dy = y - btnY;
                        var dist = Math.sqrt(dx * dx + dy * dy);
                        
                        if (dist <= 45) {
                            var num = i + 1;
                            if (clickedNumbers.indexOf(num) === -1) {
                                clickedNumbers.push(num);
                                lastClickedNum = num;
                                
                                var expected = clickedNumbers.length;
                                if (num === expected) {
                                    // 正确顺序
                                    if (clickedNumbers.length === maxNum) {
                                        // 通关
                                        var reward = levelData.reward;
                                        if (gameData.emotionBottles.indexOf(reward) === -1) {
                                            gameData.emotionBottles.push(reward);
                                        }
                                        gameData.totalScore++;
                                        gameData.currentLevel++;
                                        currentLevel = gameData.currentLevel;
                                        saveGameData();
                                        
                                        showTempMessage('🎉 通关成功！获得 ' + (emotionTypes.find(function(e) { return e.id === reward; })  {}).name, '#FFD700', 2000);
                                        setTimeout(function() {
                                            renderLevelSelect();
                                        }, 2000);
                                    } else {
                                        renderGame();
                                    }
                                } else {
                                    showTempMessage('❌ 顺序错误！重新开始', '#ff6b6b', 1500);
                                    setTimeout(function() {
                                        clickedNumbers = [];
                                        lastClickedNum = 0;
                                        renderGame();
                                    }, 1500);
                                }
                            }
                            break;
                        }
                    }
                }
            }
        } else if (currentPage === 'collection'  currentPage === 'rank'  currentPage === 'task') {
            if (y >= 1200 && y <= 1290) {
                renderHome();
            }
        }
    }
    
    renderHome();
    
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
    console.log('当前关卡:', currentLevel);
    console.log('已收集:', gameData.emotionBottles.length);
}

if (typeof document !== 'undefined') {
    console.log('浏览器环境');
}
