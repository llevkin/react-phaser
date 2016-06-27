var util = require('util');
var Node = require('./node');

function Sprite() {
    this.super('constructor', arguments);
}
util.inherits(Sprite, Node);

Sprite.prototype.init = function() {
    this.obj = new Phaser.Sprite(this.game, this.props.x, this.props.y, this.props.texture, this.props.frame || 0);
    this.group.addChild(this.obj);
    this.super('init');
};

Sprite.prototype.clear = function() {
    if (!this.obj)
        return;
    this.obj.destroy();
    this.obj = null;
};

module.exports = Sprite;