var util = require('util');
var Node = require('./../node');

var prevX, prevY;
function callback(pointer) {
    if (!prevX || !prevY) {
        prevX = pointer.x;
        prevY = pointer.y;
        return;
    }
    pointer.cX = pointer.game.camera.x + pointer.x;
    pointer.cY = pointer.game.camera.y + pointer.y;
    pointer.dX = prevX - pointer.x;
    pointer.dY = prevY - pointer.y;
    prevX = pointer.x;
    prevY = pointer.y;
}

function onUp(pointer) {
    prevX = prevY = 0;
    // pointer.cX = 0;
    // pointer.cY = 0;
    // pointer.dX = 0;
    // pointer.dY = 0;
}

// function onDown(pointer) {
//     prevX = prevY = 0;
    // pointer.cX = 0;
    // pointer.cY = 0;
    // pointer.dX = 0;
    // pointer.dY = 0;
// }

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
        this.root.obj.input.onInputUp.remove(onUp);
        // this.root.obj.input.onInputDown.remove(onDown);
        this.root.obj.input.onInputUp.add(onUp);
    }
    else if ('onUp' in this.root.obj.input) {
        this.root.obj.input.onUp.remove(onUp);
        // this.root.obj.input.onDown.remove(onDown);
        this.root.obj.input.onUp.add(onUp);
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

module.exports = Input;