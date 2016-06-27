var util = require('util');
var Node = require('./node');

function State() {
    this.super(State, 'constructor', arguments);
}
util.inherits(State, Node);

State.prototype.mount = function() {
    var that = this;
    this.obj = this.game.state.add(this.props.name, {
        init: function() {
        },
        preload: function() {
            that.preload();
        },
        create: function() {
            that.forEach(function(item) {
                item.invoke('init');
            });
        },
        update: function() {
        }
    });
};

State.prototype._clear = function(node) {
    var item, that = this;
    if (!node)
        node = this;
    node.forEach(function(item) {
        item.invoke('clear');
        that._clear(item);
    });
};

State.prototype._init = function(node) {
    var item, that = this;
    if (!node)
        node = this;
    node.forEach(function(item) {
        item.invoke('init');
        that._init(item);
    });
};

module.exports = State;