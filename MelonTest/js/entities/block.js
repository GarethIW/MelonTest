/// <reference path="../../lib/melonJS-0.9.9.js" />

/*----------------
 Sweets entity
------------------------ */
game.BlockEntity = me.ObjectEntity.extend({

    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function (x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

        this.updateColRect(28, 8, 0, 75);

        this.collidable = true;
    },


    update: function () {
        this.parent();


        return true;
    },

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function (res, obj) {
      
        if (res.y < 0) {
            //var sweet = me.entityPool.newInstanceOf("SweetEntity", this.pos.x, this.pos.y-64, { image: "sweets", spritewidth: 48, width: 64, height: 64, name: "SweetEntity", z: 6 });
            var sweet = new game.SweetEntity(this.pos.x, this.pos.y, { image: "sweets", spritewidth: 48, spriteheight: 48, z: 0 });
            sweet.z = 3;
            me.game.add(sweet);
            
            //me.game.sort();

            var tween = new me.Tween(sweet.pos).to({ y: this.pos.y - 56 }, 500).onComplete((function () { sweet.z = 3;}).bind(sweet));
            tween.easing(me.Tween.Easing.Quadratic.Out);
            tween.start();

            me.game.remove(this);
        }
    },


});
