var util = require('util');
var Node = require('./node');

function Game() {
    this.super(Game, 'constructor', arguments);
}
util.inherits(Game, Node);

Game.prototype.mount = function() {
    var that = this;
    this.obj = new Phaser.Game(this.props.width, this.props.height, this.props.mode || Phaser.AUTO, this.props.container, {
        init: function() {
            that.props.onFileComplete && this.game.load.onFileComplete.add(that.props.onFileComplete);
            that.props.onFileError && this.game.load.onFileError.add(that.props.onFileError);
        },
        preload: function() {
            that.preload();
        },
        create: function() {
            that.props.state && that.game.state.start(that.props.state);
            that.props.onCreate && that.props.onCreate(that.tree.root.obj, function(name) { return that.tree.byname[name]; });
        },
        update: function() {
        }
    });
};

Game.prototype.unmount = function() {
    this.obj.destroy();
};

Game.prototype.update = function() {
    var item;
    for (var i = 0, l = this.children.length; i < l; i++) {
        item = this.nodes[this.children[i]];
        if (item.tag !== 'state')
            continue;
        item._clear();
    }
    this.game.state.start(this.props.state);
    if (this.tree.byname[this.props.state])
        this.tree.byname[this.props.state]._init();
};

Object.defineProperties(Game.prototype, {

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
            return this.obj.width;
        }
    },

    height: {
        get: function() {
            return this.obj.height;
        }
    },

});

module.exports = Game;