/// <reference path="../../lib/melonJS-0.9.8.js" />


/*------------------- 
a player entity
-------------------------------- */
game.PlayerEntity = me.ObjectEntity.extend({

    /* -----
 
    constructor
 
    ------ */

    init: function (x, y, settings) {
        // call the constructor
        settings.spritewidth = 220;

        this.parent(x, y, settings);

        this.renderable.anim = {};
        this.renderable.addAnimation("walk", [0, 1, 2, 3, 4, 5]);
        this.renderable.addAnimation("attack", [6, 7, 8]);
        this.renderable.setCurrentAnimation("walk");
        
        this.setVelocity(0.5, 1);
        this.setFriction(0.25, 0);
        this.setMaxVelocity(5, 15);
        
        this.gravity = 0.5;
      
        this.updateColRect(85, 60, 5, 52);

        this.attacking = false;

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

    },

    /* -----
 
    update the player pos
 
    ------ */
    update: function () {

        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            //this.vel.x = 0;
        }
        if (me.input.isKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!this.jumping && !this.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.vel.y = -this.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.jumping = true;
            }

        }
        if (me.input.isKeyPressed("attack")) {
            if (!this.attacking) {
                this.attacking = true;
                this.renderable.setCurrentAnimation("attack", (function(){
                    this.renderable.setCurrentAnimation("walk");
                    this.attacking = false;
                }).bind(this));
                this.renderable.setAnimationFrame(0);
            }
        }

        

        // check & update player movement
        this.updateMovement();

        if (this.attacking) {
            this.updateColRect(30, 160, 5, 52);
        }

        var res = me.game.collide(this);

        this.updateColRect(85, 60, 5, 52);

        if (res) {
            //if (res.obj.type == me.game.COLLECTABLE_OBJECT) {

            //}
        }

        // update animation if necessary
        if (this.vel.x != 0 || this.vel.y != 0 || this.attacking) {
            // update object animation
            this.parent();
            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }

});