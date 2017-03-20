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
    if ('colors' in this.props) {
        this.obj.clearColors();
        if ('fill' in this.props.colors)
            for (var color of this.props.colors.fill)
                this.obj.addColor(...color);
        if ('stroke' in this.props.colors)
            for (var color of this.props.colors.stroke)
                this.obj.addStrokeColor(...color);
    }
    this.super(Text, 'update');
};

module.exports = Text;