var util = require('util');
var Node = require('./../node');

var prevX, prevY;
function callback(pointer) {
    if (!prevX || !prevY) {
        prevX = pointer.x;
        prevY = pointer.y;
        return;
    }
    pointer.dX = prevX - pointer.x;
    pointer.dY = prevY - pointer.y;
    prevX = pointer.x;
    prevY = pointer.y;
}

function clearPrev() {
    prevX = prevY = null;
}

function Input() {
    this.super(Input, 'constructor', arguments);
}
util.inherits(Input, Node);

Input.prototype.init = function() {
    this.update();
};

Input.prototype.update = function(prevProps) {
    this.super(Input, 'update');
    if (!this.root.obj)
        return;
    this.root.obj.input.deleteMoveCallback(callback);
    this.root.obj.input.addMoveCallback(callback);
    if ('onInputUp' in this.root.obj.input) {
        this.root.obj.input.onInputUp.remove(clearPrev);
        this.root.obj.input.onInputUp.add(clearPrev);
    }
    else if ('onUp' in this.root.obj.input) {
        this.root.obj.input.onUp.remove(clearPrev);
        this.root.obj.input.onUp.add(clearPrev);
    }
    if (this.props.name === 'moveCallback') {
        if (prevProps)
            this.root.obj.input.deleteMoveCallback(prevProps.callback);
        this.root.obj.input.addMoveCallback(this.props.callback);
    }
    else {
        if (prevProps)
            this.root.obj.input[this.props.name].remove(prevProps.callback);
        this.root.obj.input[this.props.name].add(this.props.callback);
    }
};

Input.prototype.clear = function() {
    this.super(Input, 'clear');
    this.root.obj.input.deleteMoveCallback(callback);
};

Object.defineProperty(Phaser.Pointer.prototype, 'cX', {
    get: function() {
        return this.game.camera.x + this.x;
    }
});

Object.defineProperty(Phaser.Pointer.prototype, 'cY', {
    get: function() {
        return this.game.camera.y + this.y;
    }
});

module.exports = Input;