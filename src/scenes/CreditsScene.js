import Phaser from "phaser";

export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super("CreditsScene");
    }
    preload() {
        this.load.image("bg", "/images/titlebg.png");
        this.load.image("backbtn", "/images/backbtn.png");

        this.load.audio('maintheme', '/music/main-theme.mp3');
    }
    init() {
        console.log("CreditsScene");
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

        let creditsText = this.add.text((1024/2), 50, 'CREDITS', textStyle96);
        creditsText.setOrigin(0.5)

        let creator = this.add.text((1024/2), 140, 'CREATOR', textStyle52);
        creator.setOrigin(0.5)
        let creatorName = this.add.text((1024/2), 180, 'Kacper Górecki', textStyle36);
        creatorName.setOrigin(0.5)

        let programming = this.add.text((1024/2), 240, 'PROGRAMMING', textStyle52);
        programming.setOrigin(0.5)
        let programmingName = this.add.text((1024/2), 280, 'Kacper Górecki', textStyle36);
        programmingName.setOrigin(0.5)

        let art = this.add.text((1024/2), 340, 'ART/TEXTURES/SPRITES', textStyle52);
        art.setOrigin(0.5)
        let artName = this.add.text((1024/2), 380, 'Kacper Górecki', textStyle36);
        artName.setOrigin(0.5)

        let sound = this.add.text((1024/2), 440, 'SOUND', textStyle52);
        sound.setOrigin(0.5)
        let soundName = this.add.text((1024/2), 480, 'Kacper Górecki', textStyle36);
        soundName.setOrigin(0.5)

        let music = this.add.text((1024/2), 540, 'MUSIC', textStyle52);
        music.setOrigin(0.5)
        let musicName = this.add.text((1024/2), 580, 'Kacper Górecki', textStyle36);
        musicName.setOrigin(0.5)

        let engine = this.add.text((1024/2), 640, 'MADE WITH', textStyle52);
        engine.setOrigin(0.5)
        let engineName = this.add.text((1024/2), 680, 'Phaser 3.70.0', textStyle36);
        engineName.setOrigin(0.5)
    }
}