import Phaser from "phaser";

export default class TutorialScene extends Phaser.Scene {
    constructor() {
        super("TutorialScene");
    }
    preload() {
        this.load.image("bg", "/images/titlebg.png");
        this.load.image("backbtn", "/images/backbtn.png");

        this.load.spritesheet('spritesheet', '/images/spritesheet.png', {
            frameWidth: 32,
            frameHeight: 32,
            margin: 0,
            spacing: 0
        });

        this.load.audio('maintheme', '/music/main-theme.mp3');
    }
    init() {
        console.log("TutorialScene");
    }
    create() {
        this.cameras.main.setBounds(0, 0, 1200, 900);

        this.maintheme = this.sound.add('maintheme', {volume: 0.4, loop: true});

        let isMusicOn = this.scene.get('TitleScene').data.get('isMusicOn');
        if(isMusicOn == true){
            this.maintheme.play();
        }

        // Add background image
        var background = this.add.sprite(1024/2, 768/2, 'bg');
        background.setOrigin(0.5, 0.5);

        let backButton = this.add.image(150, 708, 'backbtn').setInteractive();

        backButton.on('pointerdown', () => {
            this.maintheme.stop();
            // When the button is clicked, start the TitleScene
            this.scene.start('TitleScene');
        });

        //let rival = this.textures.get('myspritesheet').get(6);
        let player = this.add.sprite((1024/2)+200, 450, 'spritesheet', 5);
        player.setOrigin(0.5);
        player.setScale(3);
        let rival = this.add.sprite((1024/2)-200, 450, 'spritesheet', 6);
        rival.setOrigin(0.5);
        rival.setScale(3);

        var textStyle96 = {
            font: 'bold 96px Courier',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 10
        };

        var textStyle52 = {
            font: 'bold 52px Courier',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5
        };

        var textStyle36 = {
            font: 'bold 36px Courier',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        };

        let creditsText = this.add.text((1024/2), 50, 'TUTORIAL', textStyle96);
        creditsText.setOrigin(0.5)

        let wlecome = this.add.text((1024/2), 140, 'Welcome to Batty Buddies!', textStyle52);
        wlecome.setOrigin(0.5)
        let info = this.add.text((1024/2), 280, 'You play as two bat friends (Steve&John).\nDespite being buddies they are also rivals\nwho compete against each other to find out\nwho can grab the most gold in given time.', textStyle36);
        info.setOrigin(0.5)

        let rivalName = this.add.text((1024/2)-200, 530, 'STEVE', textStyle52);
        rivalName.setOrigin(0.5)
        let rivalControls = this.add.text((1024/2)-200, 580, 'W,A,S,D', textStyle36);
        rivalControls.setOrigin(0.5)

        let playerName = this.add.text((1024/2)+200, 530, 'JOHN', textStyle52);
        playerName.setOrigin(0.5)
        let playerControls = this.add.text((1024/2)+200, 580, 'ARROW KEYS', textStyle36);
        playerControls.setOrigin(0.5)
    }
}
