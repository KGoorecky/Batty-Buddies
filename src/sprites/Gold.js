import Phaser from 'phaser'
import Ore from '../sprites/Ore';

export default class Gold extends Ore
{
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene, x, y)
    {
        super(
            scene,
            x,
            y,
            'spritesheet',
            '7'
        );

        this.body.setSize(24,21);
    }
}