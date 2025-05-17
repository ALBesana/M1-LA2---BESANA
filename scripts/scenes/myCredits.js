class myCredits extends Phaser.Scene {
    constructor() {
        super({ key: 'myCredits' });
    }

    create() {
        this.gameBackground = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'gameBg').setOrigin(0, 0);
        this.add.text(300, 100, 'CREDITS', { fontSize: '48px', fill: '#fff' });

        this.add.text(210, 180, 'Name:    A.L. Schatz A. Besana \nSection: A224 \nProgram: BSEMC', {
            fontSize: '24px',
            fill: '#fff'
        });

        this.add.image(317, 314, 'backBtn').setScale(1.5);
        const backButton = this.add.text(340, 300, 'BACK', { fontSize: '32px', fill: '#f00' }).setInteractive();
        backButton.on('pointerdown', () => this.scene.start('mainMenu'));
    }

    update() {
        this.gameBackground.tilePositionY -= 0.2;
    }
}
