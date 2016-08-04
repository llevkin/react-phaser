var util = require('util');
var Node = require('./node');

function DisplayObject() {
    this.super(DisplayObject, 'constructor', arguments);
}
util.inherits(DisplayObject, Node);

DisplayObject._relative = function(object, prop, parentProp) {
    if (!object.props[prop])
        return 0;
    if (!~String(object.props[prop]).indexOf('%'))
        return parseInt(object.props[prop], 10);
    return parseInt(object.props[prop], 10) * object.parentNode[parentProp] / 100;
};

DisplayObject.prototype.init = function() {
    this.group.addChild(this.obj);
    this.update();
    this.super(DisplayObject, 'init');
};

DisplayObject.prototype.update = function() {
    this.obj.x = DisplayObject._relative(this, 'x', 'width');
    this.obj.y = DisplayObject._relative(this, 'y', 'height');
    if (this.props.offset) {
        this.obj.x += this.props.offset.x || 0;
        this.obj.y += this.props.offset.y || 0;
    }
    'width' in this.props   && DisplayObject._relative(this, 'width', 'width');
    'height' in this.props  && DisplayObject._relative(this, 'height', 'height');
    this.props.alignIn && this.obj.alignIn(
        this.group.getBounds(),
        'pos' in this.props.alignIn ? this.props.alignIn.pos : Phaser.TOP_LEFT,
        this.props.alignIn.offset ? this.props.alignIn.offset.x || 0 : 0,
        this.props.alignIn.offset ? this.props.alignIn.offset.y || 0 : 0
    );
    if (this.props.anchor) {
        this.obj.anchor.x = this.props.anchor.x || 0;
        this.obj.anchor.y = this.props.anchor.y || 0;
    }
    if (this.props.scale) {
        this.obj.scale.x = 'x' in this.props.scale ? this.props.scale.x : 1;
        this.obj.scale.y = 'y' in this.props.scale ? this.props.scale.y : 1;
    }
    if (this.props.fixedToCamera) {
        this.obj.fixedToCamera = this.props.fixedToCamera;
    }
    this.super(DisplayObject, 'update');
};

DisplayObject.prototype.clear = function() {
    if (!this.obj)
        return;
    this.obj.destroy();
    this.obj = null;
    this.super(DisplayObject, 'clear');
};

Object.defineProperties(DisplayObject.prototype, {

    x: {
        get: function() {
            return this.obj.x;
        }
    },

    y: {
        get: function() {
            return this.obj.y;
        }
    },

    width: {
        get: function() {
            return this.obj.width;
        }
    },

    height: {
        get: function() {
            return this.obj.height;
        }
    },

});

module.exports = DisplayObject;