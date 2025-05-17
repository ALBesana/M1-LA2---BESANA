class preloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'preloadScene' });
    }

    preload() {
        this.load.image('banan', 'assets/images/items/Fruits/banan.png');
        this.load.image('ground', 'assets/images/platforms/ground.png');
        this.load.image('spikedBall', 'assets/images/traps/Spiked Ball.png');
        
        this.load.image('menuBg', 'assets/images/backgrounds/Green.png');
        this.load.image('gameBg', 'assets/images/backgrounds/Brown.png');
        this.load.image('winBg', 'assets/images/backgrounds/Pink.png');

        this.load.image('playBtn', 'assets/images/buttons/Play.png');
        this.load.image('creditBtn', 'assets/images/buttons/Credits.png');
        this.load.image('closeBtn', 'assets/images/buttons/Close.png');
        this.load.image('retryBtn', 'assets/images/buttons/Restart.png');
        this.load.image('backBtn', 'assets/images/buttons/Back.png');
        
        this.load.spritesheet('playerIdle', 'assets/images/players/Ninja Frog/Idle (32x32).png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('playerRun', 'assets/images/players/Ninja Frog/Run (32x32).png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('playerJump', 'assets/images/players/Ninja Frog/Jump (32x32).png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('playerFall', 'assets/images/players/Ninja Frog/Fall (32x32).png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('prizeFruit', 'assets/images/items/Fruits/Bananas.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        this.scene.start('mainMenu');
    }
}
