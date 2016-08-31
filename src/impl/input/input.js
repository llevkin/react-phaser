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

module.exports = Input;