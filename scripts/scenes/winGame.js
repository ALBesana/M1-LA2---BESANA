class winGame extends Phaser.Scene {
    constructor() {
        super({ key: 'winGame' });
    }

    init(data) {
        this.finalScore = data.finalScore || 0;
    }

    create() {
        this.winBackground = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'winBg').setOrigin(0, 0);

        this.add.text(130, 100, `🎉 You Win! Final Score: ${this.finalScore}`, {
            fontSize: '32px',
            fill: '#ff0'
        });

        this.add.image(330, 313, 'retryBtn');
        const retryButton = this.add.text(350, 300, 'RETRY', { fontSize: '28px', fill: '#fff' }).setInteractive();

        this.add.image(295, 373, 'backBtn').setScale(1.5);
        const menuButton = this.add.text(315, 360, 'MAIN MENU', { fontSize: '28px', fill: '#f00' }).setInteractive();

        retryButton.on('pointerdown', () => this.scene.start('myGame'));
        menuButton.on('pointerdown', () => this.scene.start('mainMenu'));
    }

    update() {
        this.winBackground.tilePositionY -= 0.2;
    }
}
