var util = require('util');
var Node = require('./../node');

function Key() {
    this.super(Key, 'constructor', arguments);
}
util.inherits(Key, Node);

Key.prototype.init = function() {
    this.update();
};

Key.prototype.update = function(prevProps) {
    if (this.props.name === 'onDownCallback') {
        this.game.input.keyboard.onDownCallback = this.props.callback;
    }
    else {
        if (prevProps)
            this.game.input.keyboard.removeKey(this.props.keyName);
        this.game.input.keyboard.addKey(this.props.keyName)[this.props.name].add(this.props.callback);
        if (!this.props.capture)
            this.game.input.keyboard.removeKeyCapture(this.props.keyName);
    }
};

Key.prototype.clear = function(prevProps) {
    this.game.input.keyboard.removeKey(this.props.keyName);
    this.game.input.keyboard.removeKeyCapture(this.props.keyName);
    this.super(Key, 'clear', arguments);
};

module.exports = Key;