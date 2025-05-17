class loseGame extends Phaser.Scene {
    constructor() {
        super({ key: 'loseGame' });
    }

    init(data) {
        this.bananasCollected = data.bananasCollected || 0;
    }

    create() {
        this.loseBackground = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'winBg').setOrigin(0, 0);

        this.add.text(69, 200, `💀 You Lost! Banan's Collected: ${this.bananasCollected}`, {
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
        this.loseBackground.tilePositionY -= 0.2;
    }
}
