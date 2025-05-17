class myGame extends Phaser.Scene {
    constructor() {
        super({ key: 'myGame' });
    }

    create() {
        this.score = 0;
        this.jumpCount = 0;
        this.maxJump = 2;
        this.gameOver = false;
        this.colors = [0xff0000, 0xffa500, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0xee82ee];
        this.tintIndex = 0;
        this.bananaCount = 0;

        this.gameBackground = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'gameBg').setOrigin(0, 0);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 585, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 425, 'ground');
        this.platforms.create(50, 310, 'ground');
        this.platforms.create(750, 250, 'ground');

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 10 }),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('playerRun', { start: 0, end: 10 }),
            frameRate: 24,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('playerJump', { start: 0, end: 0 }),
            frameRate: 1
        });

        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('playerFall', { start: 0, end: 0 }),
            frameRate: 1
        });

        this.anims.create({
            key: 'prize',
            frames: this.anims.generateFrameNumbers('prizeFruit', { start: 0, end: 16 }),
            frameRate: 32,
            repeat: -1
        });

        this.player = this.physics.add.sprite(100, 350, 'playerIdle');
        this.player.play('idle');
        this.player.setCollideWorldBounds(true);
        
        this.bananaBundle = this.physics.add.group({
            key: 'prizeFruit',
            repeat: 19,
            setXY: { x: 50, y: 0, stepX: 40 }
        });

        this.bananaBundle.children.iterate((prize) => {
            prize.play('prize');
            prize.setBounce(Phaser.Math.FloatBetween(0.3, 0.8));
            prize.setCollideWorldBounds(true);
            prize.body.setAllowGravity(true);
            prize.y = Phaser.Math.Between(0, 200);
        });

        this.physics.add.collider(this.player, this.platforms, () => {
            this.jumpCount = 0;
        });

        this.physics.add.collider(this.bananaBundle, this.platforms);

        this.countText = this.add.text(this.scale.width - 250, 12, 'Banans Collected: 0', {
            fontSize: '20px',
            fill: '#ffffff'
        });

        this.spkBall = this.physics.add.group();
        this.physics.add.collider(this.spkBall, this.platforms);
        this.physics.add.collider(this.player, this.spkBall, this.hitBall, null, this);

        this.physics.add.overlap(this.player, this.bananaBundle, (player, prize) => {
            prize.disableBody(true, true);

            this.bananaCount++;
            this.countText.setText('Banans Collected: ' + this.bananaCount);
            
            if (this.bananaCount > 0) {
                this.player.setTint(this.colors[this.tintIndex]);
                this.tintIndex = (this.tintIndex + 1) % this.colors.length;
            }
            
            console.log(
                `After Update - Index: ${this.tintIndex}, ` +
                `Color: #${this.colors[this.tintIndex].toString(16).padStart(6, '0')}`
            );

            if (this.bananaCount % 5 === 0) {
                this.player.setScale(this.player.scaleX * 1.1, this.player.scaleY * 1.1);

                const ball = this.spkBall.create(
                Phaser.Math.Between(0, this.scale.width),
                16,
                'spikedBall'
            );
            ball.setBounce(1);
            ball.setCollideWorldBounds(true);
            ball.setVelocity(Phaser.Math.Between(-200, 200), 20);
            ball.body.setAllowGravity(true);
            }

            const newBanana = this.bananaBundle.create(
                Phaser.Math.Between(50, this.scale.width - 50),
                Phaser.Math.Between(0, 200), 'prizeFruit'
            );

            newBanana.play('prize');
            newBanana.setBounce(Phaser.Math.FloatBetween(0.3, 0.8));
            newBanana.setCollideWorldBounds(true);
            newBanana.body.setAllowGravity(true);

            if (this.score >= 1200 && !this.gameOver) {
                this.gameOver = true;
                this.scene.start('winGame', { finalScore: this.score });
            }
        }, null, this);
    }

    hitBall(player, ball) {
        this.physics.pause();
        player.anims.stop();
        this.gameOver = true;

        this.scene.start('loseGame', { bananasCollected: this.bananaCount});
    }

    update() {
        this.gameBackground.tilePositionY -= 0.3;
        if (this.gameOver) return;

        this.player.setVelocityX(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.flipX = true;
            this.player.anims.play('run', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.flipX = false;
            this.player.anims.play('run', true);
        } else {
            this.player.anims.play('idle', true);
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.jumpCount < this.maxJump) {
            this.player.setVelocityY(-450);
            this.jumpCount++;
        }

        if (this.player.body.velocity.y < 0) {
            this.player.anims.play('jump', true);
                } else if (this.player.body.velocity.y > 0) {
            this.player.anims.play('fall', true);
        }
    }
}
