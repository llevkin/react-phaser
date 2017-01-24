var util            = require('util');
var DisplayObject   = require('./displayObject');

function Text() {
    this.super(Text, 'constructor', arguments);
}
util.inherits(Text, DisplayObject);

Text.prototype.init = function() {
    this.obj = new Phaser.Text(this.game);
    this.super(Text, 'init');
};

Text.prototype.update = function() {
    if (!this.obj)
        return;
    this.obj.text = String(this.props.text);
    this.obj.setStyle(this.props.style || {});
    if ('lineSpacing' in this.props)
        this.obj.lineSpacing = this.props.lineSpacing;
    this.super(Text, 'update');
};

module.exports = Text;