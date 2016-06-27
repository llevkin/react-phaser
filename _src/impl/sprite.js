var util            = require('util');
var DisplayObject   = require('./displayObject');

function Sprite() {
    this.super(Sprite, 'constructor', arguments);
}
util.inherits(Sprite, DisplayObject);

Sprite.prototype.init = function() {
    this.obj = new Phaser.Sprite(this.game);
    this.super(Sprite, 'init');
};

Sprite.prototype.update = function() {
    if (!this.obj)
        return;
    this.obj.loadTexture(this.props.texture, this.props.frame || this.obj.frame);
    this.super(Sprite, 'update');
};

module.exports = Sprite;