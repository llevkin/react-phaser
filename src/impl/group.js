var util            = require('util');
var DisplayObject   = require('./displayObject');

var events = ['onChildInputDown', 'onChildInputOut', 'onChildInputOver', 'onChildInputUp'];

function Group() {
    this.super(Group, 'constructor', arguments);
}
util.inherits(Group, DisplayObject);

Group.prototype.init = function() {
    this.obj = new Phaser.Group(this.game);
    this.super(Group, 'init');
};

Group.prototype.update = function(prevProps) {
    var event;
    if (!this.obj)
        return;
    if ('inputEnableChildren' in this.props)
        this.obj.inputEnableChildren = this.props.inputEnableChildren;
    'visible' in this.props && (this.obj.visible = this.props.visible);
    for (var i = 0; i < events.length; i++) {
        event = events[i];
        if (event in this.props) {
            if (event in prevProps)
                this.obj[event].remove(prevProps[event]);
            this.obj[event].add(this.props[event]);
        }
    }
    this.super(Group, 'update');
};

Object.defineProperties(Group.prototype, {

    x: {
        get: function() {
            var percent;
            if (!this.obj)
                return 0;
            if (!('x' in this.props))
                return this.parentNode.x;
            if (!~String(this.props.x).indexOf('%'))
                return parseInt(this.props.x, 10);
            percent = parseInt(this.props.x, 10);
            return this.parentNode.x * percent / 100;
        }
    },

    y: {
        get: function() {
            var percent;
            if (!this.obj)
                return 0;
            if (!('y' in this.props))
                return this.parentNode.y;
            if (!~String(this.props.y).indexOf('%'))
                return parseInt(this.props.y, 10);
            percent = parseInt(this.props.y, 10);
            return this.parentNode.y * percent / 100;
        }
    },

    width: {
        get: function() {
            var percent;
            if (!this.obj)
                return 0;
            if (!('width' in this.props))
                return this.parentNode.width;
            if (!~String(this.props.width).indexOf('%'))
                return parseInt(this.props.width, 10);
            percent = parseInt(this.props.width, 10);
            return this.parentNode.width * percent / 100;
        }
    },

    height: {
        get: function() {
            var percent;
            if (!this.obj)
                return 0;
            if (!('height' in this.props))
                return this.parentNode.height;
            if (!~String(this.props.height).indexOf('%'))
                return parseInt(this.props.height, 10);
            percent = parseInt(this.props.height, 10);
            return this.parentNode.height * percent / 100;
        }
    },

});

module.exports = Group;