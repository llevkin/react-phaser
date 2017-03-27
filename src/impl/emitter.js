var util            = require('util');
var DisplayObject   = require('./displayObject');

function Emitter() {
    this.super(Emitter, 'constructor', arguments);
}
util.inherits(Emitter, DisplayObject);

Emitter.prototype.init = function() {
    this.obj = this.game.add.emitter(0, 0, this.props.maxParticles || 50);
    this.super(Emitter, 'init');
};

Emitter.prototype.update = function() {
    if (!this.obj || !this.obj.game) /* bug with clear here */
        return;
    this.obj.makeParticles(this.props.texture, this.props.frame);
    'rotation' in this.props && this.obj.setRotation.apply(this.obj, this.props.rotation);
    'alpha' in this.props && this.obj.setAlpha.apply(this.obj, this.props.alpha);
    'scale' in this.props && this.obj.setScale.apply(this.obj, this.props.scale);
    'gravity' in this.props && (this.obj.gravity = this.props.gravity);
    this.obj.start(false, this.props.lifespan, this.props.frequency);
    this.obj.onDestroy.addOnce(() => this.obj.__destroyed = true);
    this.super(Emitter, 'update');
};

Emitter.prototype.clear = function() {
    if (!this.obj)
        return;
    if (!this.obj.__destroyed)
        this.obj.destroy();
};

module.exports = Emitter;