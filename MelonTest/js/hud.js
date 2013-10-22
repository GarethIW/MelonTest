
/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

    init: function () {
        // call the constructor
        this.parent();

        // persistent across level change
        this.isPersistent = true;

        // non collidable
        this.collidable = false;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object at position
        this.addChild(new game.HUD.JacksItem(10, 10));
        this.addChild(new me.SpriteObject(20, 20, me.loader.getImage("jack"), 30, 32));

        this.alwaysUpdate = true;
    }
});


/** 
 * a basic HUD item to display score
 */
game.HUD.JacksItem = me.Renderable.extend({
    /** 
	 * constructor
	 */
    init: function (x, y) {

        // call the parent constructor 
        // (size does not matter here)
        this.parent(new me.Vector2d(x, y), 10, 10);



        // create a font
        this.font = new me.BitmapFont("font", { x: 32 });
        this.font.alignText = "bottom";
        this.font.set("left", 1);

        // local copy of the global score
        this.jacks = 0;

        // make sure we use screen coordinates
        this.floating = true;
    },

    /**
	 * update function
	 */
    update: function () {
        // we don't draw anything fancy here, so just
        // return true if the score has been updated
        if (this.jacks !== game.data.jacks) {
            this.jacks = game.data.jacks;
            return true;
        }
        return false;
    },

    /**
	 * draw the score
	 */
    draw: function (context) {
        this.font.draw(context, game.data.jacks, this.pos.x, this.pos.y);
    }

});