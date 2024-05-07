import Phaser from 'phaser'

export default class Rival extends Phaser.Physics.Arcade.Sprite
{
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene)
    {
        super(
            scene,
            (scene.cameras.main.width / 2) - 32,
            scene.cameras.main.height / 2,
            'spritesheet',
            '6'
        );
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.score = 0;

        this.body.setSize(28,28);
        
        this.speed = 100;

        this.walkingAnim = scene.tweens.add({
            targets: this,
            rotation: { from: -0.1, to: 0.1 },
            duration: 350,
            repeat: -1,
            yoyo: true
        });
    }

    update(cursors)
    {
        // if (cursors.left.isDown) this.body.velocity.x = -this.speed;
        // else if (cursors.right.isDown) this.body.velocity.x = this.speed;
        // else this.body.velocity.x = 0;
        // if (cursors.up.isDown) this.body.velocity.y = -this.speed;
        // else if (cursors.down.isDown) this.body.velocity.y = this.speed;
        // else this.body.velocity.y = 0;

        if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
            this.walkingAnim.pause();
        } else {
            this.walkingAnim.resume();
        }
    }
}