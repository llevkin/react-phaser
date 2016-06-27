var util = require('util');
var Node = require('./node');

function DisplayObject() {
    this.super(DisplayObject, 'constructor', arguments);
}
util.inherits(DisplayObject, Node);

DisplayObject.prototype.init = function() {
    this.group.addChild(this.obj);
    this.update();
    this.super(DisplayObject, 'init');
};

DisplayObject.prototype.update = function() {
    this.obj.x = this.props.x || 0; //TODO:
    this.obj.y = this.props.y || 0; //TODO:
    this.obj.x += this.props.offset ? this.props.offset.x : 0;
    this.obj.y += this.props.offset ? this.props.offset.y : 0;
    this.super(DisplayObject, 'update');
};

DisplayObject.prototype.clear = function() {
    if (!this.obj)
        return;
    this.obj.destroy();
    this.obj = null;
    this.super(DisplayObject, 'clear');
};

module.exports = DisplayObject;