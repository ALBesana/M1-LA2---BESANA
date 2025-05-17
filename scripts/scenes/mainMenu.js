class mainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainMenu' });
    }

    create() {
        this.menuBackground = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'menuBg').setOrigin(0, 0);
        this.add.image(380, 350, 'banan').setScale(1.2);
        this.add.text(170, 100, 'Catch the Banan!', { fontSize: '48px', fill: '#fff' });

        this.add.image(330, 214, 'playBtn');
        const playButton = this.add.text(350, 200, 'PLAY', { fontSize: '32px', fill: '#fff' }).setInteractive();

        this.add.image(300, 274, 'creditBtn');
        const creditsButton = this.add.text(320, 260, 'CREDITS', { fontSize: '32px', fill: '#fff' }).setInteractive();

        this.add.image(330, 336, 'closeBtn').setScale(1.5);
        const quitButton = this.add.text(350, 320, 'QUIT', { fontSize: '32px', fill: '#f00' }).setInteractive();

        playButton.on('pointerdown', () => this.scene.start('myGame'));
        creditsButton.on('pointerdown', () => this.scene.start('myCredits'));
        quitButton.on('pointerdown', () => {
            alert('You have quit the game.');
            
            this.add.rectangle(400, 300, 800, 600, 0x000000, 0.8);
            this.add.text(250, 280, 'Game Quit', { fontSize: '48px', fill: '#fff' });

            this.sys.game.loop.stop();
        });
    }

    update() {
        this.menuBackground.tilePositionY -= 0.2;
    }
}
