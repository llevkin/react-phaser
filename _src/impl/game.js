var util = require('util');
var Node = require('./node');

function Game() {
    this.super('constructor', arguments);
}
util.inherits(Game, Node);

Game.prototype.mount = function() {
    var that = this;
    this.obj = new Phaser.Game(this.props.width, this.props.height, this.props.mode || Phaser.AUTO, this.props.container, {
        init: function() {
        },
        preload: function() {
            that.preload();
        },
        create: function() {
            that.props.state && that.game.state.start(that.props.state);
        },
        update: function() {
        }
    });
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
    this.tree.byname[this.props.state]._init();
};

module.exports = Game;