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
            that.props.onFileComplete && this.game.load.onFileComplete.add(that.props.onFileComplete);
            that.props.onFileError && this.game.load.onFileError.add(that.props.onFileError);
        },
        preload: function() {
            that.preload();
        },
        create: function() {
            that.forEach(function(item) {
                item.invoke('init');
            });
            that.props.onCreate && that.props.onCreate(that.tree.root.obj, function(name) { return that.tree.byname[name]; });
            that.props.bounds && this.game.world.setBounds.apply(this.game.world, that.props.bounds);
        },
        render: function(game) {
            that.props.onRender && that.props.onRender(game);
        },
        update: function(game) {
            that.props.onUpdate && that.props.onUpdate(game);
        }
    });
};

State.prototype._clear = function(node) {
    var that = this;
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

Object.defineProperties(State.prototype, {

    x: {
        get: function() {
            return 0;
        }
    },

    y: {
        get: function() {
            return 0;
        }
    },

    width: {
        get: function() {
            return this.obj.game.width;
        }
    },

    height: {
        get: function() {
            return this.obj.game.height;
        }
    },

});

module.exports = State;