var util     = require('util');
var Sprite   = require('./sprite');

function TileSprite() {
    this.super(TileSprite, 'constructor', arguments);
}
util.inherits(TileSprite, Sprite);

TileSprite.prototype.init = function() {
    this.obj = new Phaser.TileSprite(this.game);
    this.super(TileSprite, 'init');
};

module.exports = TileSprite;