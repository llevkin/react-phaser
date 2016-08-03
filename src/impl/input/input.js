var util = require('util');
var Node = require('./../node');

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

module.exports = Input;