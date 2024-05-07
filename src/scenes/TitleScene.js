import Phaser from "phaser";

export default class TtileScene extends Phaser.Scene {
    constructor() {
        super("TitleScene");
    }
    preload() {
        this.load.image("bg", "/images/titlebg.png");
        this.load.image('logo', '/images/logo.png');
        this.load.image('startbtn', '/images/startbtn.png');
        this.load.image('tutorialbtn', '/images/tutorialbtn.png');
        this.load.image('creditsbtn', '/images/creditsbtn.png');
        this.load.image('musicon', '/images/musicon.png');
        this.load.image('musicoff', '/images/musicoff.png');

        this.load.audio('maintheme', '/music/main-theme.mp3');
    }
    init() {
        console.log("TitleScene");
    }
    create() {
        this.cameras.main.setBounds(0, 0, 1024, 768);

        this.maintheme = this.sound.add('maintheme', {volume: 0.4, loop: true});

        this.maintheme.play();

        // Add background image
        var background = this.add.sprite(1024/2, 768/2, 'bg');
        background.setOrigin(0.5, 0.5);

        // Add logo and buttons
        let logo = this.add.image(1024/2, 130, 'logo');
        logo.setScale(1.25,1.5);

        let gameButton = this.add.image(175, 518, 'startbtn').setInteractive();
        let tutorialButton = this.add.image(150, 618, 'tutorialbtn').setInteractive();
        let creditsButton = this.add.image(150, 708, 'creditsbtn').setInteractive();
        let musicbtn = this.add.image(1024-60, 708, 'musicon').setInteractive();
        //let musicoff = this.add.image(1000, 708, 'musicoff').setInteractive();

        this.isMusicOn = true;

        gameButton.on('pointerdown', () => {
            this.maintheme.stop();
            // When the button is clicked, start the GameScene
            this.scene.start('GameScene');
        });
        tutorialButton.on('pointerdown', () => {
            this.maintheme.stop();
            // When the button is clicked, start the TutorialScene
            this.scene.start('TutorialScene');
        });
        creditsButton.on('pointerdown', () => {
            this.maintheme.stop();
            // When the button is clicked, start the CreditsScene
            this.scene.start('CreditsScene');
        });
        musicbtn.on('pointerdown', () => {
            if(this.isMusicOn==true){
                this.isMusicOn = false;
                musicbtn.setTexture('musicoff');
            }
            else{
                this.isMusicOn = true;
                musicbtn.setTexture('musicon');
            }
            console.log(this.isMusicOn);
        });
        
    }
    update(){
        this.data.set('isMusicOn', this.isMusicOn);

        if(this.isMusicOn==false){
            this.maintheme.setVolume(0);
        } else{
            this.maintheme.setVolume(0.4);
        }
    }
}