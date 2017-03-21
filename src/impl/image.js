var util            = require('util');
var DisplayObject   = require('./displayObject');

function Image() {
    this.super(Image, 'constructor', arguments);
}
util.inherits(Image, DisplayObject);

Image.prototype.init = function() {
    this.obj = new Phaser.Image(this.game);
    this.super(Image, 'init');
};

Image.prototype.update = function() {
    if (!this.obj || !this.obj.game) /* bug with clear here */
        return;
    this.obj.loadTexture(this.props.texture, this.props.frame || this.obj.frame);
    'width' in this.props && (this.obj.width = DisplayObject._relative(this, 'width', 'width'));
    'height' in this.props && (this.obj.height = DisplayObject._relative(this, 'height', 'height'));
    'visible' in this.props && (this.obj.visible = this.props.visible);
    this.super(Image, 'update');
};

module.exports = Image;