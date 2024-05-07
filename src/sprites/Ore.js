import Phaser from 'phaser'
import Player from '../sprites/Player';

export default class Ore extends Phaser.Physics.Arcade.Sprite
{
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);
    }
}
