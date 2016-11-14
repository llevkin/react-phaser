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
            that.forEach(function(item) {
                if (item.props.force)
                    item.invoke('init');
            });
        },
        create: function() {
            that.forEach(function(item) {
                item.invoke('init');
            });
            that._setBounds();
            if (that.props.focus) {
                this.game.camera.x = that.props.focus[0];
                this.game.camera.y = that.props.focus[1];
            }
            that.props.onCreate && that.props.onCreate(that.tree.root.obj, function(name) { return that.tree.byname[name]; });
        },
        render: function(game) {
            that.props.onRender && that.props.onRender(game);
        },
        update: function(game) {
            that.props.onUpdate && that.props.onUpdate(game);
        },
        shutdown: function(game) {
            that.props.onShutdown && that.props.onShutdown(game);
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
    var that = this;
    if (!node)
        node = this;
    node.forEach(function(item) {
        item.invoke('init');
        that._init(item);
    });
};

State.prototype._setBounds = function() {
    if (!this.props.bounds)
        return;
    if (Array.isArray(this.props.bounds))
        this.game.world.setBounds.apply(this.game.world, this.props.bounds);
    else
        this.game.world.setBounds.apply(this.game.world, [this.props.bounds.x, this.props.bounds.y, this.props.bounds.width, this.props.bounds.height]);
};

State.prototype.update = function(prevState) {
    this.preload();
    this._setBounds();
    this.super(State, 'update', arguments);
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