var util            = require('util');
var DisplayObject   = require('./displayObject');

function Graphics() {
    this.super(Graphics, 'constructor', arguments);
}
util.inherits(Graphics, DisplayObject);

Graphics.prototype.init = function() {
    this.obj = new Phaser.Graphics(this.game);
    this.super(Graphics, 'init');
};

Graphics.prototype.update = function() {
    if (!this.obj)
        return;
    this.super(Graphics, 'update');
    this.obj.clear();
    for (var i = 0, l = this.children.length; i < l; i++)
        this._draw(this.nodes[this.children[i]]);
};

Graphics.prototype._draw = function(item) {
    var fillColor, fillAlpha, lineColor, lineAlpha, lineWidth, fill, line;
    fill = typeof item.props.fill !== 'undefined';
    line = typeof item.props.stroke !== 'undefined' ||
        typeof item.props.strokeWidth !== 'undefined' ||
        typeof item.props.strokeAlpha !== 'undefined';
    if (fill) {
        fillColor = typeof item.props.fill !== 'undefined' ? item.props.fill : 0x000000;
        fillAlpha = typeof item.props.fillAlpha === 'number' ? item.props.fillAlpha : 1;
        this.obj.beginFill(fillColor, fillAlpha);
    }
    if (line) {
        lineColor = typeof item.props.stroke !== 'undefined' ? item.props.stroke : 0x000000;
        lineAlpha = typeof item.props.strokeAlpha === 'number' ? item.props.strokeAlpha : 1;
        lineWidth = typeof item.props.strokeWidth === 'number' ? item.props.strokeWidth : 1;
        this.obj.lineStyle(lineWidth, lineColor, lineAlpha);
    }
    else {
        this.obj.lineStyle(0);
    }
    if (this.factory[item.tag])
        this.factory[item.tag].call(this, item.props);
    if (fill)
        this.obj.endFill();
};

Graphics.prototype.factory = {

    rect: function(props) {
        this.obj.drawRect(
            props.x || 0,
            props.y || 0,
            props.width  || 0,
            props.height || 0
        );
    },

    roundedrect: function (props) {
        this.obj.drawRoundedRect(
            props.x || 0,
            props.y || 0,
            props.width  || 0,
            props.height || 0,
            props.radius || 0
        );
    },

    circle: function (props) {
        this.obj.drawCircle(
            props.x || 0,
            props.y || 0,
            props.diameter || 0
        );
    },

    ellipse: function (props) {
        this.obj.drawEllipse(
            props.x || 0,
            props.y || 0,
            props.width  || 0,
            props.height || 0
        );
    },

    line: function (props) {
        this.obj.moveTo(
            props.x1 || 0,
            props.y1 || 0
        );
        this.obj.lineTo(
            props.x2 || 0,
            props.y2 || 0
        );
    },

    lineto: function (props) {
        this.obj.lineTo(
            props.x || 0,
            props.y || 0
        );
    },

    quadraticcurveto: function (props) {
        this.obj.quadraticCurveTo(
            props.cpx,
            props.cpy,
            props.x,
            props.y
        );
    },

    beziercurveto: function (props) {
        this.obj.quadraticCurveTo(
            props.cpx,
            props.cpy,
            props.cpx2,
            props.cpy2,
            props.x,
            props.y
        );
    },

};

module.exports = Graphics;