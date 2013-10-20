
game.EnemyFurball = me.ObjectEntity.extend({
    init: function (x, y, settings) {
        // define this here instead of tiled
        settings.image = "furball";
        settings.spritewidth = 110;

        // call the parent constructor
        this.parent(x, y, settings);

        this.renderable.anim = {};
        this.renderable.addAnimation("walk", [0, 1, 2, 3, 4]);
        this.renderable.addAnimation("die", [5, 6, 7, 8, 9, 10, 11, 12]);
        this.renderable.setCurrentAnimation("walk");

        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite

        // make him start from the right
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;

        this.updateColRect(20, 70, 5, 70);

        // walking & jumping speed
        this.setVelocity(2, 6);

        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;

        this.health = 2;
        this.dying = false;

        this.alwaysUpdate = true;

    },

    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function (res, obj) {

        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && obj.attacking && !this.renderable.isFlickering() && !this.dying) {
            this.health--;
            if (this.health > 0) {
                this.renderable.flicker(45);
            }
            else {
                this.die();
            }
        }
    },

    // manage the enemy movement
    update: function () {
        // do nothing if not in viewport
        //if (!this.inViewport)
          //  return false;

        if (this.alive && !this.dying) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;

        } else {
            this.vel.x = 0;
        }

        // check and update movement
        this.updateMovement();

        if (this.dying && this.renderable.anim["die"].idx == 7) {
            this.renderable.animationpause = true;
            this.renderable.alpha -= 0.01;
            if (this.renderable.alpha <= 0.01) me.game.remove(this);
        }

        // update animation if necessary
        if (this.vel.x != 0 || this.vel.y != 0 || this.dying) {
            // update object animation
            this.parent();
            return true;
        }

        

        return false;
    },

    die: function () {
        this.dying = true;
        this.renderable.setCurrentAnimation("die");
    }
});
