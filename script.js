class RussianRoulette {
    constructor() {
        this.chamber = 0;
        this.currentPosition = 0;
        this.shotCount = 0;
        this.maxShots = 6;
        this.cheatMode = false;
        this.clickCount = 0;
        
        this.spinButton = document.getElementById('spin');
        this.shootButton = document.getElementById('shoot');
        this.message = document.getElementById('message');
        this.gunImage = document.getElementById('gun');
        
        this.spinButton.addEventListener('click', () => this.spin());
        this.shootButton.addEventListener('click', () => this.shoot());
        
        const secretTrigger = document.getElementById('secret-trigger');
        secretTrigger.addEventListener('click', () => this.activateCheat());
        
        this.shootButton.disabled = true;
        this.updateStats();
        
        this.gunshotSound = document.getElementById('gunshot');
        this.emptyClickSound = document.getElementById('empty-click');
        this.spinSound = document.getElementById('spin-sound');
    }
    
    activateCheat() {
        this.clickCount++;
        if (this.clickCount === 3) {
            this.cheatMode = true;
            this.clickCount = 0;
            const trigger = document.getElementById('secret-trigger');
            trigger.style.opacity = '0.5';
            setTimeout(() => {
                trigger.style.opacity = '1';
            }, 200);
        }
    }
    
    spin() {
        if (this.cheatMode) {
            this.chamber = 5;
        } else {
            this.chamber = Math.floor(Math.random() * 6);
        }
        
        this.currentPosition = 0;
        this.shotCount = 0;
        this.message.textContent = '转轮已转动，准备开始！';
        this.shootButton.disabled = false;
        this.spinButton.disabled = true;
        
        this.spinSound.currentTime = 0;
        this.spinSound.play();
        
        this.gunImage.classList.add('spin');
        setTimeout(() => {
            this.gunImage.classList.remove('spin');
        }, 1000);
        
        this.updateStats();
    }
    
    shoot() {
        this.shotCount++;
        this.gunImage.classList.add('shake');
        
        setTimeout(() => {
            this.gunImage.classList.remove('shake');
        }, 500);
        
        if (this.cheatMode) {
            if (this.shotCount === 6) {
                this.triggerShot(true);
            } else {
                this.triggerShot(false);
            }
        } else {
            this.triggerShot(this.currentPosition === this.chamber);
        }
        
        this.updateStats();
    }
    
    triggerShot(isHit) {
        if (isHit) {
            this.gunshotSound.currentTime = 0;
            this.gunshotSound.play();
            
            this.message.textContent = '砰！你死了！';
            this.shootButton.disabled = true;
            this.spinButton.disabled = false;
            this.cheatMode = false;
            document.getElementById('secret-trigger').style.opacity = '1';
        } else {
            this.emptyClickSound.currentTime = 0;
            this.emptyClickSound.play();
            
            this.message.textContent = '咔！你活下来了！';
            this.currentPosition++;
            
            if (this.currentPosition >= 6) {
                this.shootButton.disabled = true;
                this.spinButton.disabled = false;
                this.message.textContent = '弹夹已空，请重新装填！';
                this.cheatMode = false;
                document.getElementById('secret-trigger').style.opacity = '1';
            }
        }
    }
    
    updateStats() {
        document.getElementById('shot-count').textContent = `${this.shotCount}/${this.maxShots}`;
    }
}

// 初始化游戏
const game = new RussianRoulette(); 