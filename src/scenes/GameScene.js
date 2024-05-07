import Phaser from "phaser";
import Player from '../sprites/Player';
import Rival from '../sprites/Rival';
import Gold from '../sprites/Gold';

export default class GameScene extends Phaser.Scene
{
    constructor()
    {
        super("GameScene");
    }
    preload()
    {
        this.load.spritesheet('spritesheet', '/images/spritesheet.png', {
            frameWidth: 32,
            frameHeight: 32,
            margin: 0,
            spacing: 0
        });

        this.load.tilemapTiledJSON('map', '/maps/default.json');

        this.load.image('retrybtn', '/images/retrybtn.png');
        this.load.image('titlebtn', '/images/titlebtn.png');

        this.load.audio('goldpickup', '/sounds/goldpickup.mp3')
        this.load.audio('maintheme', '/music/main-theme.mp3');
    }
    init() {
        console.log("GameScene");
        this.cursors = this.input.keyboard.createCursorKeys();

        this.keyW = this.input.keyboard.addKey('W');
        this.keyA = this.input.keyboard.addKey('A');
        this.keyS = this.input.keyboard.addKey('S');
        this.keyD = this.input.keyboard.addKey('D');
    }
    create()
    {
        // Add map
        this.cameras.main.setBackgroundColor("#9c5a3c");

        const map = this.add.tilemap('map');

        const tileset = map.addTilesetImage('spritesheet', 'spritesheet');

        this.layers = [];
        this.layers.push(map.createLayer('Floor', tileset));
        this.layers.push(map.createLayer('Mines', tileset));
        this.layers.push(map.createLayer('Walls', tileset));
        
        map.setCollisionByExclusion([2], true, true, this.layers[0]);
        map.setCollisionByExclusion([-1], true, true, this.layers[2]);

        this.maintheme = this.sound.add('maintheme', {volume: 0.4, loop: true});

        let isMusicOn = this.scene.get('TitleScene').data.get('isMusicOn');
        if(isMusicOn == true){
            this.maintheme.play();
        }
            

        // Add player and rival
        this.player = new Player(this);
        this.rival = new Rival(this);

        this.layers.forEach(layer => this.physics.add.collider(this.player, layer));
        this.layers.forEach(layer => this.physics.add.collider(this.rival, layer));

        this.player.setX(this.player.x + 32);
        this.rival.setX(this.rival.x - 32);

        // Ores spawning
        this.mines = [];
        map.forEachTile(tile => {
            if (tile.index > -1) this.mines.push([
                tile.x * tile.width + tile.width / 2 + tile.layer.x,
                tile.y * tile.height + tile.height / 2 + tile.layer.y
            ]);
        }, undefined, undefined, undefined, undefined, undefined, undefined, "Mines");

        this.ores = (new Array(16)).fill(undefined);

        this.oreGenerator = this.time.addEvent({
            delay: 3500, 
            callback: () => {
                for (let i = 0; i < 5; ++i) {
                    this.generateOre();
                }
            },
            loop: true
        });

        // Ores pick up
        this.playerScoreText = this.add.text((1024/2)+134, 80, 'JOHN: 0', {
            font: '32px Courier',
            stroke: '#000000',
            strokeThickness: 3
        });
        this.playerScoreText.setOrigin(0.5);

        this.rivalScoreText = this.add.text((1024/2)+125, 30, 'STEVE: 0', {
            font: '32px Courier',
            stroke: '#000000',
            strokeThickness: 3
        });
        this.rivalScoreText.setOrigin(0.5);

        this.goldpickup = this.sound.add('goldpickup', {volume: 0.25});

        this.physics.add.overlap(this.ores, this.player, ore => {
            if(this.isGameOver == false){
                this.player.score += 1;
                this.goldpickup.play();
                ore.destroy();
            }
        });

        this.physics.add.overlap(this.ores, this.rival, ore => {
            if(this.isGameOver == false){
                this.rival.score += 1;
                this.goldpickup.play();
                ore.destroy();
            }
        });

        // Add timer
        this.timeText = this.add.text(125, 30, 'Time: 0', {
            font: '32px Courier',
            stroke: '#000000',
            strokeThickness: 3
        });
        this.timeText.setOrigin(0.5);

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            repeat: 129
        });

        this.seconds = 0;
        this.minutes = 0;

        // Game over text
        this.isGameOver = false;

        this.playerWinText = this.add.text((1024/2), ((768/2)-64), 'JOHN WINS', {
            font: 'bold 128px Courier',
            stroke: '#000000',
            strokeThickness: 10
        });
        this.playerWinText.setOrigin(0.5)
        this.playerWinText.setVisible(false);

        this.rivalWinText = this.add.text((1024/2), ((768/2)-64), 'STEVE WINS', {
            font: 'bold 128px Courier',
            stroke: '#000000',
            strokeThickness: 10
        });
        this.rivalWinText.setOrigin(0.5)
        this.rivalWinText.setVisible(false);

        this.drawWinText = this.add.text((1024/2), ((768/2)-64), 'DRAW', {
            font: 'bold 128px Courier',
            stroke: '#000000',
            strokeThickness: 10
        });
        this.drawWinText.setOrigin(0.5)
        this.drawWinText.setVisible(false);

        this.retrybtn = this.add.image(((1024/2)-160), ((768/2)+310), 'retrybtn').setInteractive();
        this.retrybtn.setVisible(false);
        this.retrybtn.setOrigin(0.5)
        this.titlebtn = this.add.image(((1024/2)+160), ((768/2)+310), 'titlebtn').setInteractive();
        this.titlebtn.setVisible(false);
        this.titlebtn.setOrigin(0.5);

        this.retrybtn.on('pointerdown', () => {
            this.maintheme.stop();
            // When the button is clicked, restart the GameScene
            this.scene.start('GameScene');
        });
        this.titlebtn.on('pointerdown', () => {
            this.maintheme.stop();
            // When the button is clicked, start the TitleScene
            this.scene.start('TitleScene');
        });

    }
    update()
    {
        if (this.player.active) this.player.update();
        if (this.rival.active) this.rival.update();

        // Player movement
        if (this.cursors.left.isDown) this.player.body.velocity.x = -this.player.speed;
        else if (this.cursors.right.isDown) this.player.body.velocity.x = this.player.speed;
        else this.player.body.velocity.x = 0;
        if (this.cursors.up.isDown) this.player.body.velocity.y = -this.player.speed;
        else if (this.cursors.down.isDown) this.player.body.velocity.y = this.player.speed;
        else this.player.body.velocity.y = 0;

        // Rival movement
        if (this.keyA.isDown) this.rival.body.velocity.x = -this.rival.speed;
        else if (this.keyD.isDown) this.rival.body.velocity.x = this.rival.speed;
        else this.rival.body.velocity.x = 0;
        
        if (this.keyW.isDown) this.rival.body.velocity.y = -this.rival.speed;
        else if (this.keyS.isDown) this.rival.body.velocity.y = this.rival.speed;
        else this.rival.body.velocity.y = 0;

        // Score
        this.playerScoreText.setText("JOHN: " + this.player.score);
        this.rivalScoreText.setText("STEVE: " + this.rival.score);

        // Time convertion
        if(this.seconds == 60){
            this.minutes += 1;
            this.seconds = 0;
        }

        // Time display
        if(this.minutes == 0){
            if(this.seconds < 10) this.timeText.setText("Time: 0:0" + this.seconds);
            else this.timeText.setText("Time: 0:" + this.seconds)
        } else if(this.minutes > 0){
            if(this.seconds < 10) this.timeText.setText("Time: " + this.minutes + ":0" + this.seconds);
            else this.timeText.setText("Time: " + this.minutes + ":" + this.seconds)
        }

        // Game over
        if(this.minutes>=2){
            this.isGameOver = true;

            this.player.setVisible(false);
            this.rival.setVisible(false);

            this.player.speed = 0;
            this.rival.speed = 0;

            this.playerScoreText.setX((1024/2)-14);
            this.playerScoreText.setY(1024/2);
            this.playerScoreText.setFontSize(48);

            this.rivalScoreText.setX((1024/2)-28);
            this.rivalScoreText.setY((1024/2)-80);
            this.rivalScoreText.setFontSize(48);

            this.timeText.setVisible(false);

            this.retrybtn.setVisible(true);
            this.titlebtn.setVisible(true);

            if(this.player.score > this.rival.score){
                this.playerWinText.setVisible(true);
                this.rivalWinText.setVisible(false);
                this.drawWinText.setVisible(false);
            }
            else if (this.player.score < this.rival.score){
                this.rivalWinText.setVisible(true);
                this.playerWinText.setVisible(false);
                this.drawWinText.setVisible(false);
            }
            else{
                this.drawWinText.setVisible(true);
                this.playerWinText.setVisible(false);
                this.rivalWinText.setVisible(false);
            }
        }
    }
    generateOre()
    {
        for (let i = 0; i < this.ores.length; ++i) {
            if (this.ores[i] !== undefined && this.ores[i].active) continue;
            let [x, y] = this.mines[Math.floor(Math.random()*this.mines.length)];
            this.ores[i] = new Gold(this, x, y);

            this.layers.forEach(layer => this.physics.add.collider(this.ores[i], layer));

            return;
        }
        console.log('ORES POOL IS FULL!');
    }
    updateTimer() {
        this.seconds += 1;
    }
}