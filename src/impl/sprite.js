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
    if (!this.obj || !this.obj.game) /* bug with clear here */
        return;
    this.obj.loadTexture(this.props.texture, this.props.frame || this.obj.frame);
    'width' in this.props && (this.obj.width = DisplayObject._relative(this, 'width', 'width'));
    'height' in this.props && (this.obj.height = DisplayObject._relative(this, 'height', 'height'));
    'visible' in this.props && (this.obj.visible = this.props.visible);
    'inputEnabled' in this.props && (this.obj.inputEnabled = this.props.inputEnabled);
    'priorityID' in this.props && (this.obj.input.priorityID = this.props.priorityID);
    if ('stop-propagation' in this.props) {
        this.obj.inputEnabled = true;
        this.obj.events[this.props['stop-propagation']].add(function() {});
    }
    this.super(Sprite, 'update');
};

module.exports = Sprite;