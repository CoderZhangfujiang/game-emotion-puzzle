/**
 * 情绪解谜馆 - 微信小游戏
 * 治愈系轻量解谜 + 收集 + 社交
 * 
 * 运行方式：将项目导入微信开发者工具
 */

// ==================== 游戏配置 ====================
const GAME_CONFIG = {
    name: '情绪解谜馆',
    version: '1.0.0',
    designWidth: 750,      // 设计宽度
    designHeight: 1334,   // 设计高度
    
    // 情绪瓶类型
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
    
    // 谜题关卡配置
    levels: [
        {
            id: 1,
            type: 'tap_sequence',
            title: '✨ 点亮星星',
            desc: '按顺序点击1-5颗星星',
            answer: [1, 2, 3, 4, 5],
            reward: 'happy'
        },
        {
            id: 2,
            type: 'find_pattern',
            title: '💎 找规律',
            desc: '找出与众不同的那颗宝石',
            pattern: [0, 0, 1, 0, 0],
            reward: 'surprised'
        },
        {
            id: 3,
            type: 'count',
            title: '🔢 数一数',
            desc: '画面里有多少个圆形？',
            answer: 5,
            hint: '仔细数数哦~',
            reward: 'grateful'
        },
        {
            id: 4,
            type: 'memory',
            title: '🧠 记忆大师',
            desc: '记住星星点亮的顺序',
            sequence: [1, 3, 2, 4],
            reward: 'hopeful'
        },
        {
            id: 5,
            type: 'timing',
            title: '⏰ 等待时机',
            desc: '当指针指向红色区域时点击',
            reward: 'calm'
        },
        {
            id: 6,
            type: 'puzzle',
            title: '🧩 拼图',
            desc: '点击正确的颜色块',
            colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF6B6B'],
            correct: '#FF6B6B',
            reward: 'nostalgic'
        },
        {
            id: 7,
            type: 'math',
            title: '➕ 简单算术',
            desc: '3 + 5 × 2 = ?',
            options: [11, 13, 15, 17],
            answer: 13,
            reward: 'peaceful'
        },
        {
            id: 8,
            type: 'color_choice',
            title: '🎨 心情颜色',
            desc: '你喜欢什么颜色？',
            colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#9B59B6'],
            reward: 'touched'
        },
        {
            id: 9,
            type: 'slider',
            title: '🎚️ 调节音量',
            desc: '把音量调到50%',
            target: 50,
            reward: 'grateful'
        },
        {
            id: 10,
            type: 'shake',
            title: '📳 摇一摇',
            desc: '摇晃手机让星星点亮',
            reward: 'hopeful'
        },
        {
            id: 11,
            type: 'long_press',
            title: '👆 长按',
            desc: '长按3秒点亮星星',
            duration: 3000,
            reward: 'calm'
        },
        {
            id: 12,
            type: 'double_tap',
            title: '👆👆 双击',
            desc: '双击屏幕点亮星星',
            reward: 'surprised'
        },
        {
            id: 13,
            type: 'swipe',
            title: '👉 滑动手势',
            desc: '从左向右滑动',
            reward: 'happy'
        },
        {
            id: 14,
            type: 'find_hidden',
            title: '🔍 找隐藏',
            desc: '找出隐藏的星星',
            reward: 'nostalgic'
        },
        {
            id: 15,
            type: 'bubble_pop',
            title: '🫧 戳泡泡',
            desc: '戳破所有泡泡',
            reward: 'touched'
        },
        {
            id: 16,
            type: 'gravity',
            title: '⬇️ 掉落吧',
            desc: '让星星掉进框里',
            reward: 'grateful'
        },
        {
            id: 17,
            type: 'final',
            title: '🌟 终极大冒险',
            desc: '完成最后的挑战',
            reward: 'peaceful'
        },
        // ============ 更多关卡 ============
        {
            id: 18,
            type: 'sequence_tap',
            title: '🔢 数字顺序',
            desc: '按1-10顺序点击',
            endNum: 10,
            reward: 'grateful'
        },
        {
            id: 19,
            type: 'ballance',
            title: '⚖️ 保持平衡',
            desc: '让小球保持在中间',
            reward: 'calm'
        },
        {
            id: 20,
            type: 'avoid',
            title: '🏃 躲避障碍',
            desc: '点击避开红色方块',
            reward: 'hopeful'
        },
        {
            id: 21,
            type: 'connect',
            title: '🔗 连接星星',
            desc: '按顺序连接相同星星',
            reward: 'touched'
        },
        {
            id: 22,
            type: 'sort',
            title: '📊 从小到大',
            desc: '按从小到大点击数字',
            numbers: [5, 2, 8, 1, 9],
            reward: 'grateful'
        },
        {
            id: 23,
            type: 'reflection',
            title: '🪞 镜像',
            desc: '找出镜像一样的那个',
            reward: 'nostalgic'
        },
        {
            id: 24,
            type: 'word_find',
            title: '🔤 找文字',
            desc: '找出"开心"',
            words: ['开心', '难过', '生气', '害怕'],
            target: '开心',
            reward: 'happy'
        },
        {
            id: 25,
            type: 'match_shadow',
            title: '🎭 找影子',
            desc: '找出匹配的影子',
            reward: 'surprised'
        },
        {
            id: 26,
            type: 'light_dark',
            title: '💡 开灯关灯',
            desc: '让所有灯都亮起来',
            size: 3,
            reward: 'peaceful'
        },
        {
            id: 27,
            type: 'tug_of_war',
            title: '拔河',
            desc: '把绳子拉向你这边',
            reward: 'touched'
        },
        {
            id: 28,
            type: 'trace',
            title: '✏️ 描边',
            desc: '沿虚线描出形状',
            reward: 'grateful'
        },
        {
            id: 29,
            type: 'countdown',
            title: '⏱️ 倒计时',
            desc: '在倒计时结束前完成',
            duration: 5000,
            reward: 'calm'
        },
        {
            id: 30,
            type: 'combo',
            title: '🎯 连续命中',
            desc: '连续点击3个移动的靶子',
            targets: 3,
            reward: 'hopeful'
        },
        {
            id: 31,
            type: 'pattern_repeat',
            title: '🎵 节奏大师',
            desc: '重复点击的节奏',
            pattern: [1, 2, 1, 2, 3],
            reward: 'surprised'
        },
        {
            id: 32,
            type: 'hide_seek',
            title: '捉迷藏',
            desc: '星星会躲，试试抓住它',
            reward: 'happy'
        },
        {
            id: 33,
            type: 'math_chain',
            title: '➕➖ 连续计算',
            desc: '心算这三道题',
            problems: [
                { q: '2 + 3 = ?', a: 5 },
                { q: '10 - 4 = ?', a: 6 },
                { q: '3 × 3 = ?', a: 9 }
            ],
            reward: 'peaceful'
        },
        {
            id: 34,
            type: 'color_match',
            title: '🎨 颜色配对',
            desc: '选择文字显示的颜色',
            colorName: '红色',
            colorValue: '#FF0000',
            options: ['#0000FF', '#FF0000', '#00FF00', '#FFFF00'],
            reward: 'nostalgic'
        },
        {
            id: 35,
            type: 'letter_order',
            title: '🔤 字母顺序',
            desc: '按A-B-C顺序点击',
            letters: ['C', 'A', 'B', 'D'],
            reward: 'grateful'
        },
        {
            id: 36,
            type: 'magic_box',
            title: '🎁 魔法盒子',
            desc: '点击盒子看看有什么',
            reward: 'surprised'
        },
        {
            id: 37,
            type: 'breathing',
            title: '🌬️ 呼吸练习',
            desc: '跟随节奏深呼吸',
            reward: 'calm'
        },
        {
            id: 38,
            type: 'constellation',
            title: '✨ 连星座',
            desc: '把星星连成线',
            reward: 'hopeful'
        },
        {
            id: 39,
            type: 'word_puzzle',
            title: '🧩 拼字游戏',
            desc: '把字按顺序拼好',
            word: '开心',
            chunks: ['心', '开'],
            reward: 'happy'
        },
        {
            id: 40,
            type: 'story_choice',
            title: '📖 故事选择',
            desc: '你想听什么故事？',
            options: ['勇敢', '善良', '智慧'],
            reward: 'touched'
        },
        {
            id: 41,
            type: 'final_ceremony',
            title: '🎊 毕业典礼',
            desc: '恭喜你完成所有关卡！',
            reward: 'grateful'
        },
        {
            id: 42,
            type: 'drag_pair',
            title: '🔗 拖拽配对',
            desc: '拖拽相同颜色连在一起',
            pairs: [
                { left: '🔴', right: '🔴' },
                { left: '🔵', right: '🔵' },
                { left: '🟢', right: '🟢' }
            ],
            reward: 'happy'
        },
        {
            id: 43,
            type: 'slide_puzzle',
            title: '🧩 滑动拼图',
            desc: '移动方块还原图案',
            size: 3,
            reward: 'peaceful'
        },
        {
            id: 44,
            type: 'password',
            title: '🔢 密码锁',
            desc: '输入正确密码 9527',
            answer: '9527',
            reward: 'surprised'
        },
        {
            id: 45,
            type: 'color_mix',
            title: '🎨 颜色混合',
            desc: '红色+蓝色=什么颜色？',
            options: ['紫色', '绿色', '黄色', '橙色'],
            answer: '紫色',
            reward: 'nostalgic'
        },
        {
            id: 46,
            type: 'typing',
            title: '⌨️ 打字练习',
            desc: '输入"你好"',
            target: '你好',
            reward: 'touched'
        },
        {
            id: 47,
            type: 'find_diff',
            title: '🔍 找不同',
            desc: '找出不同的那个',
            reward: 'grateful'
        },
        {
            id: 48,
            type: 'memory_card',
            title: '🃏 记忆翻牌',
            desc: '翻开相同的卡片',
            pairs: 3,
            reward: 'hopeful'
        },
        {
            id: 49,
            type: 'gravity_ball',
            title: '🎳 重力球',
            desc: '让球掉进杯子里',
            reward: 'calm'
        },
        {
            id: 50,
            type: 'final_boss',
            title: '🏆 终极挑战',
            desc: '综合测试你的智慧',
            reward: 'grateful'
        }
    ]
};

// ==================== 游戏主类 ====================
class EmotionPuzzleGame {
    constructor() {
        this.currentLevel = 1;
        this.emotionBottles = [];    // 已收集的情绪瓶
        this.unlockedStories = [];   // 已解锁的故事
        this.soundEnabled = true;    // 音效开关
        this.musicEnabled = true;    // 音乐开关
        this.bgmPlaying = false;     // BGM状态
        
        // 音频上下文
        this.audioCtx = null;
        try {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {
            console.log('音频不可用');
        }
        
        this.init();
    }
    
    // 播放音效
    playSound(type) {
        if (!this.soundEnabled || !this.audioCtx) return;
        
        const sounds = {
            tap: 440,
            success: 523,
            fail: 200,
            complete: 659,
            reward: 784,
            click: 330
        };
        
        const freq = sounds[type] || 440;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        
        osc.frequency.value = freq;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.2);
        
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.2);
    }
    
    // 播放背景音乐
    toggleBgm(enabled) {
        this.musicEnabled = enabled;
        
        if (enabled && !this.bgmPlaying) {
            this.startBgm();
        } else if (!enabled && this.bgmPlaying) {
            this.stopBgm();
        }
    }
    
    startBgm() {
        if (!this.musicEnabled || !this.audioCtx || this.bgmPlaying) return;
        
        // 创建简单的背景旋律
        const notes = [262, 294, 330, 349, 392, 330, 294, 262];
        let noteIndex = 0;
        
        const playNote = () => {
            if (!this.musicEnabled) {
                this.bgmPlaying = false;
                return;
            }
            
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            
            osc.frequency.value = notes[noteIndex];
            osc.type = 'sine';
            
            gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.4);
            
            osc.start();
            osc.stop(this.audioCtx.currentTime + 0.4);
            
            noteIndex = (noteIndex + 1) % notes.length;
            
            this.bgmTimer = setTimeout(playNote, 400);
        };
        
        this.bgmPlaying = true;
        playNote();
    }
    
    stopBgm() {
        if (this.bgmTimer) {
            clearTimeout(this.bgmTimer);
            this.bgmTimer = null;
        }
        this.bgmPlaying = false;
    }
    
    // 音效设置页面
    showSoundSettings() {
        this.clearScreen();
        
        this.createTitle('🔊 音效设置');
        this.createButton('返回', () => this.showHome());
        
        // 音效开关
        const soundRow = document.createElement('div');
        soundRow.style.cssText = 'position:absolute;top:200px;left:50px;right:50px;display:flex;justify-content:space-between;align-items:center;padding:20px;background:rgba(255,255,255,0.1);border-radius:10px;';
        soundRow.innerHTML = `
            <span style="color:#fff;font-size:18px;">🔈 游戏音效</span>
            <div style="width:60px;height:30px;background:${this.soundEnabled?'#4ECDC4':'#666'};border-radius:15px;cursor:pointer;position:relative;" onclick="game.toggleSound()">
                <div style="width:26px;height:26px;background:#fff;border-radius:50%;position:absolute;top:2px;${this.soundEnabled?'right:2px':'left:2px'};transition:all 0.3s;"></div>
            </div>
        `;
        document.getElementById('game-root').appendChild(soundRow);
        
        // 音乐开关
        const musicRow = document.createElement('div');
        musicRow.style.cssText = 'position:absolute;top:280px;left:50px;right:50px;display:flex;justify-content:space-between;align-items:center;padding:20px;background:rgba(255,255,255,0.1);border-radius:10px;';
        musicRow.innerHTML = `
            <span style="color:#fff;font-size:18px;">🎵 背景音乐</span>
            <div style="width:60px;height:30px;background:${this.musicEnabled?'#4ECDC4':'#666'};border-radius:15px;cursor:pointer;position:relative;" onclick="game.toggleBgm(!game.musicEnabled)">
                <div style="width:26px;height:26px;background:#fff;border-radius:50%;position:absolute;top:2px;${this.musicEnabled?'right:2px':'left:2px'};transition:all 0.3s;"></div>
            </div>
        `;
        document.getElementById('game-root').appendChild(musicRow);
        
        // 试听按钮
        const testBtn = document.createElement('button');
        testBtn.className = 'game-btn';
        testBtn.style.top = '400px';
        testBtn.textContent = '🔊 试听音效';
        testBtn.onclick = () => {
            this.playSound('success');
            this.showTip('音效播放中~');
        };
        document.getElementById('game-root').appendChild(testBtn);
    }
    
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        if (this.soundEnabled) {
            this.playSound('click');
        }
        this.showSoundSettings();
    }
    
    init() {
        console.log(`🎮 ${GAME_CONFIG.name} v${GAME_CONFIG.version} 启动`);
        this.loadProgress();
        this.showHome();
    }
    
    // 加载存档
    loadProgress() {
        try {
            const saved = wx.getStorageSync('emotion_progress');
            if (saved) {
                const data = JSON.parse(saved);
                this.currentLevel = data.currentLevel || 1;
                this.emotionBottles = data.emotionBottles || [];
                this.unlockedStories = data.unlockedStories || [];
            }
        } catch (e) {
            console.log('新玩家');
        }
    }
    
    // 保存存档
    saveProgress() {
        wx.setStorageSync('emotion_progress', JSON.stringify({
            currentLevel: this.currentLevel,
            emotionBottles: this.emotionBottles,
            unlockedStories: this.unlockedStories
        }));
    }
    
    // ==================== 场景管理 ====================
    
    // 显示首页
    showHome() {
        this.clearScreen();
        
        // 标题
        this.createTitle('🎭 情绪解谜馆');
        
        // 检查并显示每日任务
        this.checkDailyTasks();
        
        // 开始游戏按钮
        this.createButton('开始解谜', () => this.showLevelSelect());
        
        // 收藏馆按钮（单机版）
        this.createButton('📚 我的收藏', () => this.showCollection());
        
        // 排行榜按钮
        this.createButton('🏆 排行榜', () => this.showLeaderboard());
        
        // 每日任务按钮
        this.createButton('📋 每日任务', () => this.showDailyTasks());
        
        // 音效设置按钮
        this.createButton('🔊 音效设置', () => this.showSoundSettings());
        
        // 分享按钮
        this.createButton('📤 分享游戏', () => this.shareToFriends('情绪解谜馆'));
        
        // 背景动画（飘动的情绪瓶）
        this.createBackgroundAnimation();
    }
    
    // 每日任务数据
    getDailyTasks() {
        const today = new Date().toDateString();
        const lastDate = localStorage.getItem('dailyTaskDate');
        
        // 每天重置任务
        if (lastDate !== today) {
            localStorage.setItem('dailyTaskDate', today);
            localStorage.setItem('dailyTasks', JSON.stringify({
                tasks: [
                    { id: 1, desc: '完成3个关卡', type: 'complete', target: 3, progress: 0, reward: 'happy', done: false },
                    { id: 2, desc: '收集1个情绪瓶', type: 'collect', target: 1, progress: 0, reward: 'peaceful', done: false },
                    { id: 3, desc: '分享游戏1次', type: 'share', target: 1, progress: 0, reward: 'surprised', done: false }
                ]
            }));
        }
        
        return JSON.parse(localStorage.getItem('dailyTasks') || '{"tasks":[]}');
    }
    
    // 检查每日任务进度
    checkDailyTasks() {
        const data = this.getDailyTasks();
        
        // 更新任务进度
        data.tasks.forEach(task => {
            if (task.done) return;
            
            if (task.type === 'complete') {
                task.progress = this.currentLevel - 1;
                if (task.progress >= task.target) {
                    task.done = true;
                    this.showTip('📋 任务完成: ' + task.desc);
                }
            } else if (task.type === 'collect') {
                task.progress = this.emotionBottles.length;
                if (task.progress >= task.target) {
                    task.done = true;
                    this.showTip('📋 任务完成: ' + task.desc);
                }
            }
        });
        
        localStorage.setItem('dailyTasks', JSON.stringify(data));
    }
    
    // 显示每日任务
    showDailyTasks() {
        this.clearScreen();
        
        this.createTitle('📋 今日任务');
        this.createButton('返回', () => this.showHome());
        
        const data = this.getDailyTasks();
        const completedCount = data.tasks.filter(t => t.done).length;
        
        // 显示进度
        this.createText(`今日进度: ${completedCount}/${data.tasks.length}`, 180);
        
        const container = document.createElement('div');
        container.style.cssText = 'position:absolute;top:240px;left:50px;right:50px;bottom:150px;overflow-y:auto;';
        
        data.tasks.forEach(task => {
            const item = document.createElement('div');
            item.style.cssText = `
                padding:20px;
                background:${task.done ? 'rgba(78,205,196,0.3)' : 'rgba(255,255,255,0.1)'};
                border-radius:10px;
                margin-bottom:15px;
                border:${task.done ? '2px solid #4ECDC4' : '1px solid rgba(255,255,255,0.2)'};
            `;
            
            const emotion = GAME_CONFIG.emotionTypes.find(e => e.id === task.reward);
            const rewardText = emotion ? `${emotion.name}瓶` : '奖励';
            
            item.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:space-between;">
                    <div>
                        <div style="color:#fff;font-size:18px;">${task.desc}</div>
                        <div style="color:#aaa;font-size:14px;margin-top:5px;">
                            进度: ${task.progress}/${task.target}
                        </div>
                    </div>
                    <div style="text-align:center;">
                        <div style="font-size:24px;">${task.done ? '✅' : '⬜'}</div>
                        <div style="font-size:12px;color:#4ECDC4;">${rewardText}</div>
                    </div>
                </div>
                <div style="background:rgba(0,0,0,0.3);height:8px;border-radius:4px;margin-top:10px;">
                    <div style="background:#4ECDC4;height:100%;border-radius:4px;width:${(task.progress/task.target)*100}%;transition:width 0.3s;"></div>
                </div>
            `;
            
            container.appendChild(item);
        });
        
        document.getElementById('game-root').appendChild(container);
        
        // 领取奖励按钮
        const claimBtn = document.createElement('button');
        claimBtn.className = 'game-btn';
        claimBtn.style.top = '920px';
        claimBtn.style.background = completedCount > 0 ? '#FFD700' : '#666';
        claimBtn.textContent = completedCount > 0 ? '🎁 领取今日奖励' : '明日再来领取';
        claimBtn.disabled = completedCount === 0;
        claimBtn.onclick = () => {
            if (completedCount > 0) {
                // 发放未领取的奖励
                data.tasks.forEach(task => {
                    if (task.done && !task.rewarded) {
                        const emotion = GAME_CONFIG.emotionTypes.find(e => e.id === task.reward);
                        if (emotion && !this.emotionBottles.includes(task.reward)) {
                            this.emotionBottles.push(task.reward);
                            this.showTip(`获得${emotion.name}瓶!`);
                        }
                        task.rewarded = true;
                    }
                });
                localStorage.setItem('dailyTasks', JSON.stringify(data));
                this.saveProgress();
                this.showDailyTasks();
            }
        };
        document.getElementById('game-root').appendChild(claimBtn);
    }
    
    // 排行榜
    showLeaderboard() {
        this.clearScreen();
        
        this.createTitle('🏆 排行榜');
        this.createButton('返回', () => this.showHome());
        
        // 获取玩家数据
        const totalLevels = GAME_CONFIG.levels.length;
        const completedLevels = this.currentLevel - 1;
        const collectedBottles = this.emotionBottles.length;
        const totalBottles = GAME_CONFIG.emotionTypes.length;
        
        // 本地排行榜数据（模拟）
        const mockRankings = [
            { name: '小明的粉丝', levels: 50, bottles: 8, avatar: '👤' },
            { name: '解谜达人', levels: 45, bottles: 7, avatar: '🎮' },
            { name: '情绪收集师', levels: 38, bottles: 6, avatar: '🌟' },
            { name: '你', levels: completedLevels, bottles: collectedBottles, avatar: '🦞', isMe: true },
            { name: '新手玩家', levels: 5, bottles: 2, avatar: '🐣' },
        ].sort((a, b) => b.levels - a.levels || b.bottles - a.bottles);
        
        // 玩家排名
        const playerRank = mockRankings.findIndex(r => r.isMe) + 1;
        
        // 显示玩家排名
        this.createText(`你的排名: 第 ${playerRank} 名`, 180);
        
        // 排行榜列表
        const list = document.createElement('div');
        list.style.cssText = 'position:absolute;top:240px;left:50px;right:50px;bottom:150px;overflow-y:auto;';
        
        mockRankings.forEach((rank, idx) => {
            const item = document.createElement('div');
            item.style.cssText = `
                display:flex;align-items:center;padding:15px;
                background:${rank.isMe ? 'rgba(78,205,196,0.3)' : 'rgba(255,255,255,0.1)'};
                border-radius:10px;margin-bottom:10px;
                border:${rank.isMe ? '2px solid #4ECDC4' : 'none'};
            `;
            
            const medal = idx < 3 ? ['🥇','🥈','🥉'][idx] : `${idx + 1}`;
            
            item.innerHTML = `
                <span style="font-size:24px;width:40px;">${medal}</span>
                <span style="font-size:30px;margin:0 15px;">${rank.avatar}</span>
                <div style="flex:1;">
                    <div style="color:#fff;font-size:16px;">${rank.name}</div>
                    <div style="color:#aaa;font-size:12px;">关卡 ${rank.levels} | 情绪瓶 ${rank.bottles}</div>
                </div>
            `;
            list.appendChild(item);
        });
        
        document.getElementById('game-root').appendChild(list);
        
        // 刷新排行榜按钮
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'game-btn';
        refreshBtn.style.top = '920px';
        refreshBtn.style.background = '#07C160';
        refreshBtn.textContent = '🔄 更新排名';
        refreshBtn.onclick = () => {
            this.showTip('排行榜已刷新~');
            this.showLeaderboard();
        };
        document.getElementById('game-root').appendChild(refreshBtn);
    }
    
    // 关卡选择
    showLevelSelect() {
        this.clearScreen();
        
        this.createTitle(`第 ${this.currentLevel} 关`);
        this.createButton('返回', () => this.showHome());
        
        // 显示当前关卡
        const levelData = GAME_CONFIG.levels[this.currentLevel - 1];
        if (levelData) {
            this.showLevelGame(levelData);
        } else {
            this.createText('🎉 所有关卡已完成！', 200);
        }
    }
    
    // 展示关卡内容
    showLevelGame(levelData) {
        console.log(`📖 开始关卡: ${levelData.title}`);
        
        this.createText(levelData.title, 100);
        this.createText(levelData.desc, 160);
        
        // 根据关卡类型渲染不同玩法
        switch (levelData.type) {
            case 'tap_sequence':
                this.renderTapSequence(levelData);
                break;
            case 'find_pattern':
                this.renderFindPattern(levelData);
                break;
            case 'count':
                this.renderCount(levelData);
                break;
            case 'memory':
                this.renderMemory(levelData);
                break;
            case 'timing':
                this.renderTiming(levelData);
                break;
            case 'puzzle':
                this.renderPuzzle(levelData);
                break;
            case 'math':
                this.renderMath(levelData);
                break;
            case 'color_choice':
                this.renderColorChoice(levelData);
                break;
            case 'slider':
                this.renderSlider(levelData);
                break;
            case 'shake':
                this.renderShake(levelData);
                break;
            case 'long_press':
                this.renderLongPress(levelData);
                break;
            case 'double_tap':
                this.renderDoubleTap(levelData);
                break;
            case 'swipe':
                this.renderSwipe(levelData);
                break;
            case 'find_hidden':
                this.renderFindHidden(levelData);
                break;
            case 'bubble_pop':
                this.renderBubblePop(levelData);
                break;
            case 'gravity':
                this.renderGravity(levelData);
                break;
            case 'sequence_tap':
                this.renderSequenceTap(levelData);
                break;
            case 'ballance':
                this.renderBallance(levelData);
                break;
            case 'avoid':
                this.renderAvoid(levelData);
                break;
            case 'connect':
                this.renderConnect(levelData);
                break;
            case 'sort':
                this.renderSort(levelData);
                break;
            case 'reflection':
                this.renderReflection(levelData);
                break;
            case 'word_find':
                this.renderWordFind(levelData);
                break;
            case 'match_shadow':
                this.renderMatchShadow(levelData);
                break;
            case 'light_dark':
                this.renderLightDark(levelData);
                break;
            case 'tug_of_war':
                this.renderTugOfWar(levelData);
                break;
            case 'trace':
                this.renderTrace(levelData);
                break;
            case 'countdown':
                this.renderCountdown(levelData);
                break;
            case 'combo':
                this.renderCombo(levelData);
                break;
            case 'pattern_repeat':
                this.renderPatternRepeat(levelData);
                break;
            case 'hide_seek':
                this.renderHideSeek(levelData);
                break;
            case 'math_chain':
                this.renderMathChain(levelData);
                break;
            case 'color_match':
                this.renderColorMatch(levelData);
                break;
            case 'letter_order':
                this.renderLetterOrder(levelData);
                break;
            case 'magic_box':
                this.renderMagicBox(levelData);
                break;
            case 'breathing':
                this.renderBreathing(levelData);
                break;
            case 'constellation':
                this.renderConstellation(levelData);
                break;
            case 'word_puzzle':
                this.renderWordPuzzle(levelData);
                break;
            case 'story_choice':
                this.renderStoryChoice(levelData);
                break;
            case 'final_ceremony':
                this.renderFinalCeremony(levelData);
                break;
            case 'drag_pair':
                this.renderDragPair(levelData);
                break;
            case 'slide_puzzle':
                this.renderSlidePuzzle(levelData);
                break;
            case 'password':
                this.renderPassword(levelData);
                break;
            case 'color_mix':
                this.renderColorMix(levelData);
                break;
            case 'typing':
                this.renderTyping(levelData);
                break;
            case 'find_diff':
                this.renderFindDiff(levelData);
                break;
            case 'memory_card':
                this.renderMemoryCard(levelData);
                break;
            case 'gravity_ball':
                this.renderGravityBall(levelData);
                break;
            case 'final_boss':
                this.renderFinalBoss(levelData);
                break;
            case 'final':
                this.renderFinal(levelData);
                break;
            case 'drag_match':
                this.renderDragMatch(levelData);
                break;
        }
    }
    
    // 玩法: 心情颜色选择
    renderColorChoice(levelData) {
        const container = document.createElement('div');
        container.className = 'level-container';
        
        levelData.colors.forEach((color, idx) => {
            const btn = document.createElement('button');
            btn.className = 'color-btn';
            btn.style.background = color;
            btn.onclick = () => {
                this.completeLevel(levelData.reward);
            };
            container.appendChild(btn);
        });
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 滑块
    renderSlider(levelData) {
        this.createText('拖动滑块到中间', 250);
        
        const track = document.createElement('div');
        track.className = 'slider-track';
        
        const thumb = document.createElement('div');
        thumb.className = 'slider-thumb';
        thumb.style.left = '0%';
        
        track.appendChild(thumb);
        track.style.top = '320px';
        document.getElementById('game-root').appendChild(track);
        
        let isDragging = false;
        
        const onMove = (e) => {
            if (!isDragging) return;
            const rect = track.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
            thumb.style.left = percent + '%';
            
            if (Math.abs(percent - 50) < 10) {
                thumb.style.background = '#4ECDC4';
            } else {
                thumb.style.background = '#fff';
            }
        };
        
        const onEnd = () => {
            isDragging = false;
            const percent = parseFloat(thumb.style.left);
            if (Math.abs(percent - 50) < 10) {
                this.completeLevel(levelData.reward);
            } else {
                this.showTip('再调整一下~');
                thumb.style.left = '0%';
            }
        };
        
        thumb.onmousedown = () => { isDragging = true; };
        thumb.ontouchstart = () => { isDragging = true; };
        document.onmousemove = onMove;
        document.ontouchmove = onMove;
        document.onmouseup = onEnd;
        document.ontouchend = onEnd;
    }
    
    // 玩法: 摇一摇
    renderShake(levelData) {
        this.createText('请摇晃手机', 250);
        
        let shakeCount = 0;
        const threshold = 15;
        let lastX = 0, lastY = 0, lastZ = 0;
        
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', (event) => {
                const acc = event.accelerationIncludingGravity;
                if (!acc) return;
                
                const x = acc.x || 0;
                const y = acc.y || 0;
                const z = acc.z || 0;
                
                const delta = Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ);
                
                if (delta > threshold) {
                    shakeCount++;
                    this.showTip(`摇晃 ${shakeCount}/3`);
                    
                    if (shakeCount >= 3) {
                        this.completeLevel(levelData.reward);
                    }
                }
                
                lastX = x; lastY = y; lastZ = z;
            });
        } else {
            // 模拟模式
            const btn = document.createElement('button');
            btn.className = 'game-btn';
            btn.style.top = '350px';
            btn.textContent = '📳 摇晃 (模拟)';
            btn.onclick = () => {
                shakeCount++;
                this.showTip(`摇晃 ${shakeCount}/3`);
                if (shakeCount >= 3) {
                    this.completeLevel(levelData.reward);
                }
            };
            document.getElementById('game-root').appendChild(btn);
        }
    }
    
    // 玩法: 长按
    renderLongPress(levelData) {
        const btn = document.createElement('button');
        btn.className = 'long-press-btn';
        btn.textContent = '按住3秒';
        btn.style.top = '280px';
        
        let pressTimer;
        let progress = 0;
        
        const startPress = () => {
            pressTimer = setInterval(() => {
                progress += 10;
                btn.style.background = `linear-gradient(90deg, #667eea ${progress}%, #764ba2 ${progress}%)`;
                
                if (progress >= 100) {
                    clearInterval(pressTimer);
                    this.completeLevel(levelData.reward);
                }
            }, 300);
        };
        
        const endPress = () => {
            clearInterval(pressTimer);
            progress = 0;
            btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        };
        
        btn.onmousedown = startPress;
        btn.ontouchstart = startPress;
        btn.onmouseup = endPress;
        btn.onmouseleave = endPress;
        btn.ontouchend = endPress;
        
        document.getElementById('game-root').appendChild(btn);
    }
    
    // 玩法: 双击
    renderDoubleTap(levelData) {
        this.createText('双击屏幕', 250);
        
        let lastTap = 0;
        const now = Date.now();
        
        document.getElementById('game-root').onclick = () => {
            if (now - lastTap < 300) {
                this.completeLevel(levelData.reward);
            }
            lastTap = now;
        };
    }
    
    // 玩法: 滑动
    renderSwipe(levelData) {
        this.createText('从左向右滑动', 250);
        
        const arrow = document.createElement('div');
        arrow.className = 'swipe-arrow';
        arrow.textContent = '➡️';
        arrow.style.top = '320px';
        
        document.getElementById('game-root').appendChild(arrow);
        
        let startX = 0;
        const onMove = (e) => {
            const x = e.clientX || e.touches[0].clientX;
            if (x - startX > 150) {
                this.completeLevel(levelData.reward);
            }
        };
        
        document.getElementById('game-root').ontouchstart = (e) => {
            startX = e.touches[0].clientX;
            document.ontouchmove = onMove;
        };
    }
    
    // 玩法: 找隐藏
    renderFindHidden(levelData) {
        this.createText('仔细看，找找星星在哪', 250);
        
        // 随机位置隐藏星星
        const star = document.createElement('div');
        star.textContent = '⭐';
        star.style.position = 'absolute';
        star.style.fontSize = '30px';
        star.style.left = (Math.random() * 60 + 20) + '%';
        star.style.top = (Math.random() * 30 + 35) + '%';
        star.style.opacity = '0.3';
        star.style.cursor = 'pointer';
        
        star.onclick = () => {
            star.style.opacity = '1';
            setTimeout(() => this.completeLevel(levelData.reward), 300);
        };
        
        document.getElementById('game-root').appendChild(star);
        
        // 添加干扰项
        for (let i = 0; i < 5; i++) {
            const dummy = document.createElement('div');
            dummy.textContent = '⭐';
            dummy.style.position = 'absolute';
            dummy.style.fontSize = '30px';
            dummy.style.left = (Math.random() * 70 + 15) + '%';
            dummy.style.top = (Math.random() * 40 + 30) + '%';
            dummy.style.opacity = '0.1';
            document.getElementById('game-root').appendChild(dummy);
        }
    }
    
    // 玩法: 戳泡泡
    renderBubblePop(levelData) {
        this.createText('戳破所有泡泡！', 250);
        
        let bubblesLeft = 5;
        
        for (let i = 0; i < 5; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.textContent = '🫧';
            bubble.style.left = (Math.random() * 60 + 20) + '%';
            bubble.style.top = (Math.random() * 25 + 38) + '%';
            bubble.style.fontSize = '40px';
            
            bubble.onclick = () => {
                if (!bubble.classList.contains('popped')) {
                    bubble.classList.add('popped');
                    bubble.textContent = '💥';
                    bubblesLeft--;
                    
                    if (bubblesLeft === 0) {
                        this.completeLevel(levelData.reward);
                    }
                }
            };
            
            document.getElementById('game-root').appendChild(bubble);
        }
    }
    
    // 玩法: 重力
    renderGravity(levelData) {
        this.createText('点击让星星掉落', 250);
        
        const box = document.createElement('div');
        box.className = 'gravity-box';
        box.style.top = '450px';
        
        const star = document.createElement('div');
        star.textContent = '⭐';
        star.className = 'gravity-star';
        
        box.appendChild(star);
        document.getElementById('game-root').appendChild(box);
        
        let dropped = false;
        
        star.onclick = () => {
            if (!dropped) {
                dropped = true;
                star.classList.add('falling');
                setTimeout(() => {
                    if (star.offsetTop > 350) {
                        this.completeLevel(levelData.reward);
                    }
                }, 500);
            }
        };
    }
    
    // 玩法: 数字顺序点击
    renderSequenceTap(levelData) {
        const container = document.createElement('div');
        container.className = 'level-container';
        
        let currentNum = 1;
        const maxNum = levelData.endNum || 10;
        
        for (let i = 1; i <= maxNum; i++) {
            const btn = document.createElement('button');
            btn.className = 'math-btn';
            btn.textContent = i;
            btn.onclick = () => {
                if (i === currentNum) {
                    btn.style.background = '#4ECDC4';
                    currentNum++;
                    if (currentNum > maxNum) {
                        this.completeLevel(levelData.reward);
                    }
                }
            };
            container.appendChild(btn);
        }
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 平衡
    renderBallance(levelData) {
        this.createText('保持小球在中间', 250);
        
        const track = document.createElement('div');
        track.className = 'slider-track';
        
        const ball = document.createElement('div');
        ball.className = 'slider-thumb';
        ball.style.left = '50%';
        
        track.appendChild(ball);
        track.style.top = '320px';
        document.getElementById('game-root').appendChild(track);
        
        let pos = 50;
        const interval = setInterval(() => {
            pos += (Math.random() - 0.5) * 4;
            pos = Math.max(5, Math.min(95, pos));
            ball.style.left = pos + '%';
            
            if (Math.abs(pos - 50) < 5) {
                // 保持稳定加分
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(interval);
            if (Math.abs(pos - 50) < 15) {
                this.completeLevel(levelData.reward);
            } else {
                this.showTip('再试一次~');
                this.renderBallance(levelData);
            }
        }, 5000);
    }
    
    // 玩法: 躲避
    renderAvoid(levelData) {
        this.createText('点击绿色，避开红色！', 250);
        
        let score = 0;
        const container = document.createElement('div');
        container.className = 'level-container';
        
        const spawnEnemy = () => {
            if (score >= 5) {
                this.completeLevel(levelData.reward);
                return;
            }
            
            const isGood = Math.random() > 0.4;
            const btn = document.createElement('button');
            btn.className = 'math-btn';
            btn.textContent = isGood ? '🟢' : '🔴';
            btn.style.position = 'absolute';
            btn.style.left = (Math.random() * 60 + 20) + '%';
            btn.style.top = '300px';
            
            btn.onclick = () => {
                if (isGood) {
                    score++;
                    this.showTip(`得分: ${score}/5`);
                    btn.remove();
                    if (score >= 5) {
                        this.completeLevel(levelData.reward);
                    } else {
                        setTimeout(spawnEnemy, 500);
                    }
                } else {
                    this.showTip('错啦！');
                    btn.remove();
                }
            };
            
            document.getElementById('game-root').appendChild(btn);
            
            // 自动消失
            setTimeout(() => {
                if (btn.parentElement) {
                    btn.remove();
                    if (score < 5) spawnEnemy();
                }
            }, 1500);
        };
        
        spawnEnemy();
    }
    
    // 玩法: 连线
    renderConnect(levelData) {
        this.createText('按顺序连接相同符号', 250);
        
        const symbols = ['⭐', '⭐', '🌙', '🌙'];
        const shuffled = symbols.sort(() => Math.random() - 0.5);
        
        const container = document.createElement('div');
        container.className = 'level-container';
        
        let clicked = [];
        
        shuffled.forEach((sym, idx) => {
            const btn = document.createElement('button');
            btn.className = 'math-btn';
            btn.textContent = sym;
            btn.onclick = () => {
                clicked.push({ sym, idx });
                btn.style.background = '#4ECDC4';
                
                if (clicked.length === 2) {
                    if (clicked[0].sym === clicked[1].sym && clicked[0].idx !== clicked[1].idx) {
                        this.completeLevel(levelData.reward);
                    } else {
                        this.showTip('不对哦~');
                        setTimeout(() => {
                            clicked.forEach(c => {
                                const btns = document.querySelectorAll('.math-btn');
                                btns[c.idx].style.background = '';
                            });
                            clicked = [];
                        }, 500);
                    }
                }
            };
            container.appendChild(btn);
        });
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 排序
    renderSort(levelData) {
        const container = document.createElement('div');
        container.className = 'level-container';
        
        let currentMin = 0;
        const nums = [...levelData.numbers].sort((a, b) => a - b);
        
        levelData.numbers.forEach((num, idx) => {
            const btn = document.createElement('button');
            btn.className = 'math-btn';
            btn.textContent = num;
            btn.onclick = () => {
                if (num === nums[currentMin]) {
                    btn.style.background = '#4ECDC4';
                    currentMin++;
                    if (currentMin === nums.length) {
                        this.completeLevel(levelData.reward);
                    }
                } else {
                    this.showTip('从小到大哦~');
                }
            };
            container.appendChild(btn);
        });
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 找文字
    renderWordFind(levelData) {
        const container = document.createElement('div');
        container.className = 'level-container';
        
        const shuffled = [...levelData.words].sort(() => Math.random() - 0.5);
        
        shuffled.forEach(word => {
            const btn = document.createElement('button');
            btn.className = 'math-btn';
            btn.style.fontSize = '28px';
            btn.textContent = word;
            btn.onclick = () => {
                if (word === levelData.target) {
                    this.completeLevel(levelData.reward);
                } else {
                    this.showTip('再找找~');
                }
            };
            container.appendChild(btn);
        });
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 开灯关灯
    renderLightDark(levelData) {
        this.createText('点击让所有灯亮起来', 250);
        
        const size = levelData.size || 3;
        const container = document.createElement('div');
        container.className = 'level-container';
        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        
        let lights = [];
        
        for (let i = 0; i < size * size; i++) {
            const light = document.createElement('div');
            light.className = 'light-cell';
            light.style.width = '60px';
            light.style.height = '60px';
            light.style.background = '#333';
            light.style.borderRadius = '10px';
            light.style.cursor = 'pointer';
            light.style.margin = '5px';
            
            light.onclick = () => {
                light.style.background = light.style.background === '#FFD700' ? '#333' : '#FFD700';
                
                // 检查是否全部亮着
                if (lights.every(l => l.style.background === '#FFD700')) {
                    this.completeLevel(levelData.reward);
                }
            };
            
            lights.push(light);
            container.appendChild(light);
        }
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 连续计算
    renderMathChain(levelData) {
        let currentProblem = 0;
        
        const showProblem = () => {
            if (currentProblem >= levelData.problems.length) {
                this.completeLevel(levelData.reward);
                return;
            }
            
            const problem = levelData.problems[currentProblem];
            this.createText(problem.q, 280);
            
            const options = [problem.a, problem.a + 1, problem.a - 1, problem.a + 2];
            const shuffled = options.sort(() => Math.random() - 0.5);
            
            const container = document.createElement('div');
            container.className = 'level-container';
            
            shuffled.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'math-btn';
                btn.textContent = opt;
                btn.onclick = () => {
                    if (opt === problem.a) {
                        currentProblem++;
                        this.clearScreen();
                        this.createText(levelData.title, 100);
                        showProblem();
                    } else {
                        this.showTip('算错啦~');
                    }
                };
                container.appendChild(btn);
            });
            
            document.getElementById('game-root').appendChild(container);
        };
        
        showProblem();
    }
    
    // 玩法: 颜色配对
    renderColorMatch(levelData) {
        this.createText(`选择"${levelData.colorName}"颜色的按钮`, 220);
        
        const container = document.createElement('div');
        container.className = 'level-container';
        
        const shuffled = [...levelData.options].sort(() => Math.random() - 0.5);
        
        shuffled.forEach(color => {
            const btn = document.createElement('button');
            btn.style.width = '100px';
            btn.style.height = '60px';
            btn.style.background = color;
            btn.style.border = '3px solid white';
            btn.style.borderRadius = '10px';
            btn.style.cursor = 'pointer';
            
            btn.onclick = () => {
                if (color === levelData.colorValue) {
                    this.completeLevel(levelData.reward);
                } else {
                    this.showTip('不对哦~');
                }
            };
            
            container.appendChild(btn);
        });
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 字母顺序
    renderLetterOrder(levelData) {
        const container = document.createElement('div');
        container.className = 'level-container';
        
        const sorted = [...levelData.letters].sort();
        let currentIndex = 0;
        
        levelData.letters.forEach((letter, idx) => {
            const btn = document.createElement('button');
            btn.className = 'math-btn';
            btn.textContent = letter;
            btn.onclick = () => {
                if (letter === sorted[currentIndex]) {
                    btn.style.background = '#4ECDC4';
                    currentIndex++;
                    if (currentIndex === sorted.length) {
                        this.completeLevel(levelData.reward);
                    }
                } else {
                    this.showTip('按A-B-C顺序~');
                }
            };
            container.appendChild(btn);
        });
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 魔法盒子
    renderMagicBox(levelData) {
        const boxes = ['🎁', '📦', '🎀'];
        let opened = false;
        
        const container = document.createElement('div');
        container.className = 'level-container';
        
        boxes.forEach((box, idx) => {
            const btn = document.createElement('button');
            btn.className = 'math-btn';
            btn.style.fontSize = '50px';
            btn.textContent = box;
            btn.onclick = () => {
                if (!opened) {
                    opened = true;
                    btn.textContent = ['🌟', '🎉', '💎'][idx];
                    btn.style.animation = 'bounce 0.5s';
                    setTimeout(() => this.completeLevel(levelData.reward), 500);
                }
            };
            container.appendChild(btn);
        });
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 呼吸
    renderBreathing(levelData) {
        this.createText('深呼吸... 吸气... 呼气...', 250);
        
        const circle = document.createElement('div');
        circle.style.width = '100px';
        circle.style.height = '100px';
        circle.style.background = 'rgba(78, 205, 196, 0.5)';
        circle.style.borderRadius = '50%';
        circle.style.position = 'absolute';
        circle.style.left = '50%';
        circle.style.top = '50%';
        circle.style.transform = 'translate(-50%, -50%)';
        circle.style.transition = 'all 3s ease';
        
        document.getElementById('game-root').appendChild(circle);
        
        let breatheCount = 0;
        
        const breathe = () => {
            setTimeout(() => {
                circle.style.transform = 'translate(-50%, -50%) scale(1.5)';
                circle.style.background = 'rgba(78, 205, 196, 0.8)';
            }, 1000);
            
            setTimeout(() => {
                circle.style.transform = 'translate(-50%, -50%) scale(1)';
                circle.style.background = 'rgba(78, 205, 196, 0.3)';
                breatheCount++;
                
                if (breatheCount >= 3) {
                    this.completeLevel(levelData.reward);
                } else {
                    breathe();
                }
            }, 4000);
        };
        
        breathe();
    }
    
    // 玩法: 星座
    renderConstellation(levelData) {
        this.createText('点击点亮所有星星', 250);
        
        const positions = [
            { x: 30, y: 40 }, { x: 50, y: 35 }, { x: 70, y: 40 },
            { x: 40, y: 55 }, { x: 60, y: 55 }, { x: 50, y: 65 }
        ];
        
        let lit = 0;
        
        positions.forEach((pos, idx) => {
            const star = document.createElement('div');
            star.textContent = '⭐';
            star.style.position = 'absolute';
            star.style.left = pos.x + '%';
            star.style.top = pos.y + '%';
            star.style.fontSize = '30px';
            star.style.opacity = '0.3';
            star.style.cursor = 'pointer';
            
            star.onclick = () => {
                if (star.style.opacity === '0.3') {
                    star.style.opacity = '1';
                    star.style.textShadow = '0 0 10px #fff';
                    lit++;
                    
                    if (lit === positions.length) {
                        this.completeLevel(levelData.reward);
                    }
                }
            };
            
            document.getElementById('game-root').appendChild(star);
        });
    }
    
    // 玩法: 拼字
    renderWordPuzzle(levelData) {
        this.createText(`拼成"${levelData.word}"`, 250);
        
        const chunks = [...levelData.chunks].sort(() => Math.random() - 0.5);
        let formed = '';
        
        const container = document.createElement('div');
        container.className = 'level-container';
        
        chunks.forEach(chunk => {
            const btn = document.createElement('button');
            btn.className = 'math-btn';
            btn.style.fontSize = '36px';
            btn.textContent = chunk;
            btn.onclick = () => {
                formed += chunk;
                btn.style.background = '#4ECDC4';
                
                if (formed === levelData.word) {
                    this.completeLevel(levelData.reward);
                } else if (!levelData.word.startsWith(formed)) {
                    this.showTip('顺序错了~');
                    setTimeout(() => {
                        formed = '';
                        document.querySelectorAll('.math-btn').forEach(b => b.style.background = '');
                    }, 500);
                }
            };
            container.appendChild(btn);
        });
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 故事选择
    renderStoryChoice(levelData) {
        const container = document.createElement('div');
        container.className = 'level-container';
        
        levelData.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'game-btn';
            btn.style.position = 'relative';
            btn.style.top = (280 + levelData.options.indexOf(opt) * 80) + 'px';
            btn.textContent = opt;
            btn.onclick = () => this.completeLevel(levelData.reward);
            document.getElementById('game-root').appendChild(btn);
        });
    }
    
    // 玩法: 毕业典礼
    renderFinalCeremony(levelData) {
        this.clearScreen();
        
        this.createText('🎊', 100);
        this.createText('恭喜毕业！', 180);
        this.createText('你收集了所有情绪瓶', 250);
        this.createText('🌟 💙 🎉 💜 ❤️ 🙏 🌱 🍃', 320);
        
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.style.top = '450px';
        btn.textContent = '🏆 领取毕业证书';
        btn.onclick = () => {
            this.showTip('🎉 恭喜你！');
            this.completeLevel(levelData.reward);
        };
        document.getElementById('game-root').appendChild(btn);
    }
    
    // 玩法: 拖拽配对
    renderDragPair(levelData) {
        this.createText('拖拽相同颜色连在一起', 250);
        
        const pairs = levelData.pairs || [
            { left: '🔴', right: '🔴' },
            { left: '🔵', right: '🔵' },
            { left: '🟢', right: '🟢' }
        ];
        
        const gameArea = document.createElement('div');
        gameArea.style.cssText = 'position:absolute;top:350px;left:0;right:0;bottom:0;';
        
        const leftItems = [];
        const rightItems = [];
        let matchedCount = 0;
        
        // 左侧元素
        pairs.forEach((pair, idx) => {
            const item = document.createElement('div');
            item.textContent = pair.left;
            item.style.cssText = `
                position:absolute;
                left:50px;
                top:${100 + idx * 120}px;
                font-size:50px;
                cursor:grab;
                user-select:none;
                touch-action:none;
            `;
            
            let isDragging = false;
            let startX, startY, initialX, initialY;
            
            const onStart = (e) => {
                e.preventDefault();
                isDragging = true;
                const touch = e.touches ? e.touches[0] : e;
                startX = touch.clientX;
                startY = touch.clientY;
                initialX = item.offsetLeft;
                initialY = item.offsetTop;
                item.style.cursor = 'grabbing';
                item.style.zIndex = '100';
            };
            
            const onMove = (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const touch = e.touches ? e.touches[0] : e;
                const dx = touch.clientX - startX;
                const dy = touch.clientY - startY;
                item.style.left = (initialX + dx) + 'px';
                item.style.top = (initialY + dy) + 'px';
            };
            
            const onEnd = () => {
                if (!isDragging) return;
                isDragging = false;
                item.style.cursor = 'grab';
                item.style.zIndex = '1';
                
                // 检查是否匹配
                rightItems.forEach((rightItem, rightIdx) => {
                    if (rightItem.dataset.matched === 'true') return;
                    
                    const rect1 = item.getBoundingClientRect();
                    const rect2 = rightItem.getBoundingClientRect();
                    const distance = Math.sqrt(
                        Math.pow(rect1.x - rect2.x, 2) + 
                        Math.pow(rect1.y - rect2.y, 2)
                    );
                    
                    if (distance < 80 && leftItems[idx].textContent === rightItem.textContent) {
                        // 匹配成功
                        item.style.display = 'none';
                        rightItem.style.display = 'none';
                        rightItem.dataset.matched = 'true';
                        matchedCount++;
                        
                        if (matchedCount === pairs.length) {
                            this.showTip('🎉 配对成功！');
                            this.completeLevel(levelData.reward);
                        }
                    }
                });
                
                // 复位
                item.style.left = '50px';
                item.style.top = (100 + idx * 120) + 'px';
            };
            
            item.addEventListener('mousedown', onStart);
            item.addEventListener('touchstart', onStart, { passive: false });
            window.addEventListener('mousemove', onMove);
            window.addEventListener('touchmove', onMove, { passive: false });
            window.addEventListener('mouseup', onEnd);
            window.addEventListener('touchend', onEnd);
            
            leftItems.push(item);
            gameArea.appendChild(item);
        });
        
        // 右侧元素（目标）
        const shuffledRight = [...pairs].sort(() => Math.random() - 0.5);
        shuffledRight.forEach((pair, idx) => {
            const item = document.createElement('div');
            item.textContent = pair.right;
            item.dataset.matched = 'false';
            item.style.cssText = `
                position:absolute;
                right:50px;
                top:${100 + idx * 120}px;
                font-size:50px;
                pointer-events:none;
            `;
            rightItems.push(item);
            gameArea.appendChild(item);
        });
        
        document.getElementById('game-root').appendChild(gameArea);
    }
    
    // 玩法: 滑动拼图
    renderSlidePuzzle(levelData) {
        this.createText('滑动还原图案', 250);
        
        const size = levelData.size || 3;
        const container = document.createElement('div');
        container.style.cssText = 'position:absolute;top:320px;left:50%;transform:translateX(-50%);display:grid;grid-template-columns:repeat(3,80px);gap:5px;';
        
        let tiles = [1,2,3,4,5,6,7,8,0];
        // 随机打乱但保证可解
        for(let i=0; i<100; i++) {
            const emptyIdx = tiles.indexOf(0);
            const moves = [];
            if(emptyIdx % size > 0) moves.push(emptyIdx - 1);
            if(emptyIdx % size < size-1) moves.push(emptyIdx + 1);
            if(emptyIdx >= size) moves.push(emptyIdx - size);
            if(emptyIdx < size*(size-1)) moves.push(emptyIdx + size);
            const move = moves[Math.floor(Math.random() * moves.length)];
            [tiles[emptyIdx], tiles[move]] = [tiles[move], tiles[emptyIdx]];
        }
        
        const render = () => {
            container.innerHTML = '';
            tiles.forEach((num, idx) => {
                const tile = document.createElement('div');
                tile.style.cssText = `width:80px;height:80px;background:${num?'#4ECDC4':'transparent'};display:flex;align-items:center;justify-content:center;font-size:30px;color:#fff;border-radius:8px;cursor:pointer;`;
                tile.textContent = num || '';
                tile.onclick = () => {
                    const emptyIdx = tiles.indexOf(0);
                    const canMove = (idx === emptyIdx-1 && idx%size!==size-1) || (idx === emptyIdx+1 && idx%size!==0) || idx === emptyIdx-size || idx === emptyIdx+size;
                    if(canMove) {
                        [tiles[idx], tiles[emptyIdx]] = [tiles[emptyIdx], tiles[idx]];
                        render();
                        if(tiles.every((n,i)=>n===(i+1)%9)) {
                            this.showTip('🎉 完成！');
                            this.completeLevel(levelData.reward);
                        }
                    }
                };
                container.appendChild(tile);
            });
        };
        render();
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 密码锁
    renderPassword(levelData) {
        this.createText('输入密码: ' + levelData.answer, 220);
        
        const input = document.createElement('input');
        input.type = 'text';
        input.style.cssText = 'position:absolute;top:300px;left:50%;transform:translateX(-50%);width:200px;height:50px;font-size:24px;text-align:center;border-radius:10px;border:2px solid #4ECDC4;';
        document.getElementById('game-root').appendChild(input);
        
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.style.top = '380px';
        btn.textContent = '确认';
        btn.onclick = () => {
            if(input.value === levelData.answer) {
                this.showTip('🎉 正确！');
                this.completeLevel(levelData.reward);
            } else {
                this.showTip('密码错误~');
                input.value = '';
            }
        };
        document.getElementById('game-root').appendChild(btn);
    }
    
    // 玩法: 颜色混合
    renderColorMix(levelData) {
        this.createText(levelData.desc, 220);
        
        const container = document.createElement('div');
        container.className = 'level-container';
        
        levelData.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'math-btn';
            btn.textContent = opt;
            btn.onclick = () => {
                if(opt === levelData.answer) {
                    this.showTip('🎉 正确！');
                    this.completeLevel(levelData.reward);
                } else {
                    this.showTip('再想想~');
                }
            };
            container.appendChild(btn);
        });
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 打字练习
    renderTyping(levelData) {
        this.createText(levelData.desc, 200);
        
        const display = document.createElement('div');
        display.style.cssText = 'position:absolute;top:280px;left:0;right:0;text-align:center;font-size:40px;color:#fff;';
        display.textContent = levelData.target;
        document.getElementById('game-root').appendChild(display);
        
        const input = document.createElement('input');
        input.type = 'text';
        input.style.cssText = 'position:absolute;top:360px;left:50%;transform:translateX(-50%);width:200px;height:50px;font-size:24px;text-align:center;border-radius:10px;border:2px solid #4ECDC4;';
        document.getElementById('game-root').appendChild(input);
        
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.style.top = '440px';
        btn.textContent = '确认';
        btn.onclick = () => {
            if(input.value === levelData.target) {
                this.showTip('🎉 太棒了！');
                this.completeLevel(levelData.reward);
            } else {
                this.showTip('再试试~');
            }
        };
        document.getElementById('game-root').appendChild(btn);
    }
    
    // 玩法: 找不同
    renderFindDiff(levelData) {
        this.createText('找出不同的那个', 220);
        
        const container = document.createElement('div');
        container.className = 'level-container';
        
        const items = ['⭐','⭐','⭐','🌟','⭐'];
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        
        shuffled.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'math-btn';
            btn.style.fontSize = '40px';
            btn.textContent = item;
            btn.onclick = () => {
                if(item === '🌟') {
                    this.showTip('🎉 找到了！');
                    this.completeLevel(levelData.reward);
                } else {
                    this.showTip('不是这个~');
                }
            };
            container.appendChild(btn);
        });
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 记忆翻牌
    renderMemoryCard(levelData) {
        this.createText('翻开相同的卡片', 220);
        
        const pairs = levelData.pairs || 3;
        const symbols = ['🌸','🌺','🌻','🌷','🌹','💐'];
        const selected = symbols.slice(0, pairs);
        const cards = [...selected, ...selected].sort(() => Math.random() - 0.5);
        
        const container = document.createElement('div');
        container.style.cssText = 'position:absolute;top:300px;left:50%;transform:translateX(-50%);display:grid;grid-template-columns:repeat(3,80px);gap:10px;';
        
        let flipped = [];
        let matched = 0;
        
        cards.forEach((symbol, idx) => {
            const card = document.createElement('div');
            card.style.cssText = 'width:80px;height:80px;background:#4ECDC4;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:36px;cursor:pointer;';
            card.textContent = '?';
            card.onclick = () => {
                if(flipped.length >= 2 || card.dataset.flipped === 'true') return;
                card.textContent = symbol;
                card.dataset.flipped = 'true';
                flipped.push({idx, symbol, card});
                
                if(flipped.length === 2) {
                    if(flipped[0].symbol === flipped[1].symbol) {
                        matched++;
                        flipped = [];
                        if(matched === pairs) {
                            this.showTip('🎉 全部翻开！');
                            this.completeLevel(levelData.reward);
                        }
                    } else {
                        setTimeout(() => {
                            flipped.forEach(f => {
                                f.card.textContent = '?';
                                f.card.dataset.flipped = 'false';
                            });
                            flipped = [];
                        }, 500);
                    }
                }
            };
            container.appendChild(card);
        });
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 重力球
    renderGravityBall(levelData) {
        this.createText('点击让球掉进杯子', 220);
        
        const gameArea = document.createElement('div');
        gameArea.style.cssText = 'position:absolute;top:300px;left:0;right:0;bottom:0;';
        
        const ball = document.createElement('div');
        ball.textContent = '⚽';
        ball.style.cssText = 'position:absolute;left:50%;top:50px;font-size:40px;transition:all 0.1s;';
        gameArea.appendChild(ball);
        
        const cup = document.createElement('div');
        cup.textContent = '� cup';
        cup.style.cssText = 'position:absolute;left:50%;bottom:100px;transform:translateX(-50%);font-size:50px;';
        gameArea.appendChild(cup);
        
        let velocityY = 0;
        let isRunning = false;
        
        const startBtn = document.createElement('button');
        startBtn.className = 'game-btn';
        startBtn.style.top = '500px';
        startBtn.textContent = '开始';
        startBtn.onclick = () => {
            if(isRunning) return;
            isRunning = true;
            startBtn.style.display = 'none';
            
            const fall = () => {
                velocityY += 0.5;
                const top = parseFloat(ball.style.top) + velocityY;
                ball.style.top = top + 'px';
                
                if(top > gameArea.clientHeight - 80) {
                    const ballX = ball.offsetLeft;
                    const cupX = cup.offsetLeft;
                    if(Math.abs(ballX - cupX) < 50) {
                        this.showTip('🎉 进杯了！');
                        this.completeLevel(levelData.reward);
                    } else {
                        this.showTip('没进~再试');
                        ball.style.top = '50px';
                        velocityY = 0;
                        isRunning = false;
                        startBtn.style.display = 'block';
                    }
                } else {
                    requestAnimationFrame(fall);
                }
            };
            fall();
        };
        gameArea.appendChild(startBtn);
        
        document.getElementById('game-root').appendChild(gameArea);
    }
    
    // 玩法: 终极挑战
    renderFinalBoss(levelData) {
        this.clearScreen();
        this.createText('🏆 终极挑战', 150);
        this.createText('回答3个问题', 220);
        
        let correct = 0;
        const questions = [
            {q:'1+1=?', a:'2', opts:['1','2','3','4']},
            {q:'2+3=?', a:'5', opts:['4','5','6','7']},
            {q:'5-2=?', a:'3', opts:['2','3','4','5']}
        ];
        let current = 0;
        
        const showQ = () => {
            if(current >= questions.length) {
                if(correct >= 2) {
                    this.showTip('🎉 挑战成功！');
                    this.completeLevel(levelData.reward);
                } else {
                    this.showTip('再试试~');
                    correct = 0;
                    current = 0;
                    showQ();
                }
                return;
            }
            
            const q = questions[current];
            this.createText(q.q, 280);
            
            const container = document.createElement('div');
            container.className = 'level-container';
            
            q.opts.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'math-btn';
                btn.textContent = opt;
                btn.onclick = () => {
                    if(opt === q.a) correct++;
                    current++;
                    showQ();
                };
                container.appendChild(btn);
            });
            document.getElementById('game-root').appendChild(container);
        };
        showQ();
    }
    
    // 玩法: 镜像
    renderReflection(levelData) {
        const shapes = ['◐', '◑', '◔', '◕'];
        const target = shapes[2];
        const options = [shapes[0], shapes[2], shapes[1], shapes[3]];
        
        this.createText('找出镜像相同的', 220);
        
        const container = document.createElement('div');
        container.className = 'level-container';
        
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'math-btn';
            btn.style.fontSize = '40px';
            btn.textContent = opt;
            btn.onclick = () => {
                if (opt === target) {
                    this.completeLevel(levelData.reward);
                }
            };
            container.appendChild(btn);
        });
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 找影子
    renderMatchShadow(levelData) {
        const icons = ['⭐', '🌙', '☀️', '⭐'];
        const target = icons[0];
        
        this.createText('找出相同的图案', 220);
        
        const container = document.createElement('div');
        container.className = 'level-container';
        
        const shuffled = [...icons].sort(() => Math.random() - 0.5);
        
        shuffled.forEach(icon => {
            const btn = document.createElement('button');
            btn.className = 'math-btn';
            btn.style.fontSize = '40px';
            btn.textContent = icon;
            btn.onclick = () => {
                if (icon === target) {
                    this.completeLevel(levelData.reward);
                } else {
                    this.showTip('不对哦~');
                }
            };
            container.appendChild(btn);
        });
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 拔河
    renderTugOfWar(levelData) {
        this.createText('快速点击把绳子拉过来！', 250);
        
        const bar = document.createElement('div');
        bar.style.width = '500px';
        bar.style.height = '30px';
        bar.style.background = '#333';
        bar.style.borderRadius = '15px';
        bar.style.position = 'absolute';
        bar.style.left = '50%';
        bar.style.top = '50%';
        bar.style.transform = 'translate(-50%, -50%)';
        
        const marker = document.createElement('div');
        marker.style.width = '20px';
        marker.style.height = '40px';
        marker.style.background = '#FF6B6B';
        marker.style.borderRadius = '5px';
        marker.style.position = 'absolute';
        marker.style.left = '50%';
        marker.style.top = '50%';
        marker.style.transform = 'translate(-50%, -50%)';
        
        bar.appendChild(marker);
        document.getElementById('game-root').appendChild(bar);
        
        let pos = 50;
        
        document.getElementById('game-root').onclick = () => {
            pos -= 2;
            marker.style.left = pos + '%';
            
            if (pos < 20) {
                this.completeLevel(levelData.reward);
            }
        };
    }
    
    // 玩法: 描边
    renderTrace(levelData) {
        this.createText('沿虚线滑动', 250);
        
        const path = document.createElement('div');
        path.style.width = '300px';
        path.style.height = '200px';
        path.style.border = '3px dashed rgba(255,255,255,0.3)';
        path.style.borderRadius = '20px';
        path.style.position = 'absolute';
        path.style.left = '50%';
        path.style.top = '50%';
        path.style.transform = 'translate(-50%, -50%)';
        
        document.getElementById('game-root').appendChild(path);
        
        let traceCount = 0;
        
        path.onclick = () => {
            traceCount++;
            path.style.borderColor = 'rgba(255,255,255,0.8)';
            
            if (traceCount >= 3) {
                this.completeLevel(levelData.reward);
            }
        };
    }
    
    // 玩法: 倒计时
    renderCountdown(levelData) {
        this.createText('快完成！', 250);
        
        const timer = document.createElement('div');
        timer.style.fontSize = '60px';
        timer.style.color = '#FF6B6B';
        timer.style.position = 'absolute';
        timer.style.left = '50%';
        timer.style.top = '40%';
        timer.style.transform = 'translate(-50%, -50%)';
        document.getElementById('game-root').appendChild(timer);
        
        let timeLeft = 5;
        
        const interval = setInterval(() => {
            timeLeft--;
            timer.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(interval);
                this.showTip('时间到！');
            }
        }, 1000);
        
        // 点击完成
        document.getElementById('game-root').onclick = () => {
            clearInterval(interval);
            this.completeLevel(levelData.reward);
        };
    }
    
    // 玩法: 连续命中
    renderCombo(levelData) {
        this.createText(`连续命中 ${levelData.targets} 个！`, 250);
        
        let hits = 0;
        
        const spawnTarget = () => {
            if (hits >= levelData.targets) {
                this.completeLevel(levelData.reward);
                return;
            }
            
            const target = document.createElement('div');
            target.textContent = '🎯';
            target.style.position = 'absolute';
            target.style.left = (Math.random() * 60 + 20) + '%';
            target.style.top = (Math.random() * 30 + 35) + '%';
            target.style.fontSize = '40px';
            target.style.cursor = 'pointer';
            
            target.onclick = () => {
                hits++;
                this.showTip(`${hits}/${levelData.targets}`);
                target.remove();
                
                if (hits >= levelData.targets) {
                    this.completeLevel(levelData.reward);
                } else {
                    setTimeout(spawnTarget, 300);
                }
            };
            
            document.getElementById('game-root').appendChild(target);
            
            setTimeout(() => {
                if (target.parentElement) {
                    target.remove();
                    if (hits < levelData.targets) {
                        this.showTip('Miss!');
                        hits = 0;
                        spawnTarget();
                    }
                }
            }, 2000);
        };
        
        spawnTarget();
    }
    
    // 玩法: 节奏重复
    renderPatternRepeat(levelData) {
        this.createText('记住节奏并重复', 250);
        
        let step = 0;
        const container = document.createElement('div');
        container.className = 'level-container';
        
        for (let i = 1; i <= 4; i++) {
            const btn = document.createElement('button');
            btn.className = 'math-btn';
            btn.textContent = i;
            btn.onclick = () => {
                if (i === levelData.pattern[step]) {
                    btn.style.background = '#4ECDC4';
                    step++;
                    if (step === levelData.pattern.length) {
                        this.completeLevel(levelData.reward);
                    }
                } else {
                    this.showTip('错了~重新来');
                    step = 0;
                    document.querySelectorAll('.math-btn').forEach(b => b.style.background = '');
                }
            };
            container.appendChild(btn);
        }
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 捉迷藏
    renderHideSeek(levelData) {
        this.createText('抓住逃跑的星星！', 250);
        
        const star = document.createElement('div');
        star.textContent = '⭐';
        star.style.position = 'absolute';
        star.style.fontSize = '50px';
        star.style.left = '50%';
        star.style.top = '50%';
        star.style.transform = 'translate(-50%, -50%)';
        star.style.cursor = 'pointer';
        star.style.transition = 'all 0.3s ease';
        
        document.getElementById('game-root').appendChild(star);
        
        let clickCount = 0;
        
        const move = () => {
            star.style.left = (Math.random() * 60 + 20) + '%';
            star.style.top = (Math.random() * 30 + 35) + '%';
        };
        
        star.onclick = () => {
            clickCount++;
            if (clickCount >= 3) {
                this.completeLevel(levelData.reward);
            } else {
                this.showTip(`抓住了 ${clickCount}/3`);
                move();
            }
        };
        
        setInterval(move, 1500);
    }
    renderMath(levelData) {
        const container = document.createElement('div');
        container.className = 'level-container';
        
        const answers = [11, 13, 15, 17];
        answers.forEach((ans, idx) => {
            const btn = document.createElement('button');
            btn.className = 'math-btn';
            btn.textContent = ans;
            btn.onclick = () => {
                if (ans === levelData.answer) {
                    this.completeLevel(levelData.reward);
                } else {
                    this.showTip('再想想~');
                }
            };
            container.appendChild(btn);
        });
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法: 终极大冒险
    renderFinal(levelData) {
        this.createText('🎊 恭喜你到达最终关！', 250);
        this.createText('感谢你一路的陪伴~', 310);
        
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.style.top = '400px';
        btn.textContent = '🎁 领取奖励';
        btn.onclick = () => this.completeLevel(levelData.reward);
        document.getElementById('game-root').appendChild(btn);
    }
    
    // 玩法1: 点击序列
    renderTapSequence(levelData) {
        const container = document.createElement('div');
        container.className = 'level-container';
        
        // 创建5个星星按钮
        for (let i = 1; i <= 5; i++) {
            const btn = document.createElement('button');
            btn.className = 'star-btn';
            btn.textContent = '⭐';
            btn.onclick = () => {
                btn.classList.add('clicked');
                this.checkTapSequence(levelData, i);
            };
            container.appendChild(btn);
        }
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 检查点击序列
    checkTapSequence(levelData, currentIndex) {
        const expected = levelData.answer[currentIndex - 1];
        
        if (currentIndex === levelData.answer.length) {
            // 完成关卡
            this.completeLevel(levelData.reward);
        }
    }
    
    // 玩法2: 找规律
    renderFindPattern(levelData) {
        const container = document.createElement('div');
        container.className = 'level-container';
        
        levelData.pattern.forEach((val, idx) => {
            const btn = document.createElement('button');
            btn.className = val === 1 ? 'pattern-btn special' : 'pattern-btn';
            btn.textContent = '💎';
            btn.onclick = () => {
                if (val === 1) {
                    this.completeLevel(levelData.reward);
                } else {
                    this.showTip('再找找看？');
                }
            };
            container.appendChild(btn);
        });
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 玩法3: 拖拽配对
    renderDragMatch(levelData) {
        this.createText('拖拽功能开发中...', 300);
        this.createButton('跳过关卡', () => this.completeLevel(levelData.reward));
    }
    
    // 玩法: 数一数
    renderCount(levelData) {
        const container = document.createElement('div');
        container.className = 'level-container';
        
        // 显示5个圆形
        for (let i = 0; i < 5; i++) {
            const circle = document.createElement('div');
            circle.className = 'count-circle';
            circle.textContent = '●';
            container.appendChild(circle);
        }
        
        document.getElementById('game-root').appendChild(container);
        
        // 答案选项
        const answers = [4, 5, 6];
        const answerContainer = document.createElement('div');
        answerContainer.className = 'answer-row';
        answerContainer.style.top = '400px';
        
        answers.forEach(ans => {
            const btn = document.createElement('button');
            btn.className = 'math-btn';
            btn.textContent = ans;
            btn.onclick = () => {
                if (ans === levelData.answer) {
                    this.completeLevel(levelData.reward);
                } else {
                    this.showTip('再数数看~');
                }
            };
            answerContainer.appendChild(btn);
        });
        
        document.getElementById('game-root').appendChild(answerContainer);
    }
    
    // 玩法: 记忆大师
    renderMemory(levelData) {
        this.createText('记住这个顺序！', 250);
        
        // 显示序列（短暂）
        setTimeout(() => {
            this.showTip(levelData.sequence.join(' → '));
        }, 1000);
        
        setTimeout(() => {
            // 4个按钮让玩家选择
            const container = document.createElement('div');
            container.className = 'level-container';
            
            for (let i = 1; i <= 4; i++) {
                const btn = document.createElement('button');
                btn.className = 'memory-btn';
                btn.textContent = i;
                btn.onclick = () => this.checkMemory(levelData, i);
                container.appendChild(btn);
            }
            
            document.getElementById('game-root').appendChild(container);
        }, 2500);
        
        this.memoryInput = [];
    }
    
    checkMemory(levelData, num) {
        this.memoryInput.push(num);
        
        const expected = levelData.sequence.slice(0, this.memoryInput.length);
        
        if (this.memoryInput[this.memoryInput.length - 1] !== expected[this.memoryInput.length - 1]) {
            this.showTip('顺序错了，重新来~');
            this.memoryInput = [];
            setTimeout(() => this.showLevelGame(levelData), 1500);
        } else if (this.memoryInput.length === levelData.sequence.length) {
            this.completeLevel(levelData.reward);
        }
    }
    
    // 玩法: 等待时机
    renderTiming(levelData) {
        const indicator = document.createElement('div');
        indicator.className = 'timing-indicator';
        
        const zone = document.createElement('div');
        zone.className = 'timing-zone';
        
        const container = document.createElement('div');
        container.className = 'timing-container';
        container.appendChild(zone);
        container.appendChild(indicator);
        
        container.style.top = '300px';
        document.getElementById('game-root').appendChild(container);
        
        // 动画
        let pos = 0;
        let direction = 1;
        const interval = setInterval(() => {
            pos += direction * 3;
            if (pos > 280 || pos < 0) direction *= -1;
            indicator.style.left = pos + 'px';
        }, 16);
        
        // 点击检测
        container.onclick = () => {
            clearInterval(interval);
            const zoneLeft = zone.offsetLeft;
            const zoneRight = zoneLeft + zone.offsetWidth;
            const indicatorLeft = pos;
            
            if (indicatorLeft >= zoneLeft && indicatorLeft <= zoneRight) {
                this.completeLevel(levelData.reward);
            } else {
                this.showTip('时机不对，再试一次~');
                this.renderTiming(levelData);
            }
        };
    }
    
    // 玩法: 拼图
    renderPuzzle(levelData) {
        this.createText('点击颜色正确的方块', 250);
        
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF6B6B'];
        const container = document.createElement('div');
        container.className = 'level-container';
        
        colors.forEach((color, idx) => {
            const block = document.createElement('div');
            block.className = 'puzzle-block';
            block.style.background = color;
            block.onclick = () => {
                if (color === '#FF6B6B') {
                    this.completeLevel(levelData.reward);
                } else {
                    this.showTip('选错了哦~');
                }
            };
            container.appendChild(block);
        });
        
        document.getElementById('game-root').appendChild(container);
    }
    
    // 完成关卡
    completeLevel(rewardId) {
        // 播放完成音效
        this.playSound('complete');
        
        // 添加情绪瓶
        const emotion = GAME_CONFIG.emotionTypes.find(e => e.id === rewardId);
        if (emotion && !this.emotionBottles.includes(rewardId)) {
            this.emotionBottles.push(rewardId);
            this.unlockedStories.push(emotion.story);
            // 播放获得奖励音效
            setTimeout(() => this.playSound('reward'), 300);
        }
        
        this.saveProgress();
        
        // 显示获得奖励
        this.showRewardDialog(emotion);
    }
    
    // 奖励弹窗
    showRewardDialog(emotion) {
        const dialog = document.createElement('div');
        dialog.className = 'reward-dialog';
        dialog.innerHTML = `
            <div class="dialog-content">
                <h2>🎉 获得情绪瓶！</h2>
                <div class="bottle" style="background: ${emotion.color}">
                    ${emotion.name}
                </div>
                <p>${emotion.story}</p>
                <div style="display:flex;gap:10px;justify-content:center;margin-top:15px;">
                    <button onclick="game.shareToFriends('${emotion.name}')" style="background:#07C160;color:#fff;border:none;padding:10px 20px;border-radius:20px;font-size:14px;cursor:pointer;">
                        📤 分享给好友
                    </button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove(); game.showLevelSelect()" style="background:#4ECDC4;color:#fff;border:none;padding:10px 20px;border-radius:20px;font-size:14px;cursor:pointer;">
                        继续
                    </button>
                </div>
            </div>
        `;
        document.getElementById('game-root').appendChild(dialog);
    }
    
    // 微信分享功能
    shareToFriends(emotionName) {
        const shareContent = {
            title: `我在情绪解谜馆获得了【${emotionName}】情绪瓶！`,
            path: '/pages/index/index',
            success: () => {
                this.showTip('分享成功！');
            },
            fail: () => {
                // 非微信环境或分享失败
                this.showTip('复制成功！快去分享给朋友吧');
                // 复制到剪贴板
                const text = `我在情绪解谜馆获得了【${emotionName}】情绪瓶！快来一起玩吧~`;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text);
                }
            }
        };
        
        // 检测是否在微信环境中
        if (typeof wx !== 'undefined' && wx.shareAppMessage) {
            wx.shareAppMessage({
                title: shareContent.title,
                path: shareContent.path
            });
            shareContent.success();
        } else {
            shareContent.fail();
        }
    }
    
    // 首页添加分享按钮
    addHomeShareButton() {
        const shareBtn = document.createElement('button');
        shareBtn.textContent = '📤 分享游戏';
        shareBtn.className = 'game-btn';
        shareBtn.style.top = '900px';
        shareBtn.style.background = '#07C160';
        shareBtn.onclick = () => {
            this.shareToFriends('神秘');
        };
        document.getElementById('game-root').appendChild(shareBtn);
    }
    
    // 收藏馆
    showCollection() {
        this.clearScreen();
        
        this.createTitle('🎁 情绪收藏馆');
        this.createButton('返回', () => this.showHome());
        
        if (this.emotionBottles.length === 0) {
            this.createText('还没有收集到情绪瓶...', 200);
            this.createText('快去关卡中收集吧！', 250);
            return;
        }
        
        // 展示已收集的情绪瓶
        const container = document.createElement('div');
        container.className = 'collection-grid';
        
        this.emotionBottles.forEach(bottleId => {
            const emotion = GAME_CONFIG.emotionTypes.find(e => e.id === bottleId);
            if (emotion) {
                const bottle = document.createElement('div');
                bottle.className = 'bottle-item';
                bottle.style.background = emotion.color;
                bottle.innerHTML = `
                    <span>${emotion.name}</span>
                `;
                container.appendChild(bottle);
            }
        });
        
        document.getElementById('game-root').appendChild(container);
        
        // 解锁的故事
        this.createText('📖 已解锁故事:', 450);
        this.unlockedStories.forEach((story, idx) => {
            this.createText(`${idx + 1}. ${story}`, 490 + idx * 40);
        });
    }
    
    // ==================== 工具方法 ====================
    
    // 获取 DOM 元素的辅助函数（兼容微信小程序）
    getElement(id) {
        if (typeof document !== 'undefined' && document.getElementById) {
            return document.getElementById(id);
        }
        return null;
    }
    
    // 创建 DOM 元素的辅助函数
    createElement(tag) {
        if (typeof document !== 'undefined' && document.createElement) {
            return document.createElement(tag);
        }
        return null;
    }
    
    clearScreen() {
        const root = this.getElement('game-root');
        if (root) {
            root.innerHTML = '';
        }
    }
    
    createTitle(text) {
        this.createText(text, 60, 'title');
    }
    
    createText(text, top, className = 'normal-text') {
        const el = document.createElement('div');
        el.className = className;
        el.textContent = text;
        el.style.top = top + 'px';
        document.getElementById('game-root').appendChild(el);
    }
    
    createButton(text, onClick) {
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.textContent = text;
        btn.onclick = onClick;
        document.getElementById('game-root').appendChild(btn);
    }
    
    createTip(text) {
        this.showTip(text);
    }
    
    showTip(text) {
        const tip = document.createElement('div');
        tip.className = 'tip';
        tip.textContent = text;
        document.getElementById('game-root').appendChild(tip);
        setTimeout(() => tip.remove(), 2000);
    }
    
    createBackgroundAnimation() {
        // 飘动的情绪瓶背景
        const bg = document.createElement('div');
        bg.className = 'bg-animation';
        
        for (let i = 0; i < 10; i++) {
            const bottle = document.createElement('div');
            bottle.className = 'floating-bottle';
            bottle.style.left = Math.random() * 100 + '%';
            bottle.style.animationDelay = Math.random() * 5 + 's';
            bottle.style.background = GAME_CONFIG.emotionTypes[i % 5].color;
            bg.appendChild(bottle);
        }
        
        document.getElementById('game-root').appendChild(bg);
    }
}

// ==================== 启动游戏 ====================
// 模拟微信小游戏环境
if (typeof wx !== 'undefined') {
    wx.onShow(() => console.log('游戏显示'));
    wx.onHide(() => console.log('游戏隐藏'));
}

// 全局实例
let game;

// 页面加载完成后初始化
window.onload = () => {
    game = new EmotionPuzzleGame();
};
