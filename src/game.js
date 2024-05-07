import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';
import TutorialScene from './scenes/TutorialScene';
import CreditsScene from './scenes/CreditsScene';

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            //debug: true
        }
    },
    scene: [TitleScene, GameScene, TutorialScene, CreditsScene],
    title: 'Batty Buddies',
    audio: {
        noAudio: false
    }
});