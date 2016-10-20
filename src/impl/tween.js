var util    = require('util');
var Node    = require('./node');

var events  = ["onComplete", "onLoop", "onRepeat", "onStart"];

function Tween() {
    this.super(Tween, 'constructor', arguments);
}
util.inherits(Tween, Node);

Tween.prototype.init = function() {
    this.update();
};

Tween.prototype.update = function(prevProps) {
    this.super(Tween, 'update');

    if (!this.parentNode.obj)
        return;

    if (this.obj)
        this.obj.stop();

    this.obj = this.game.add
        .tween(this.parentNode.obj)
        .to(this.props.props, this.props.time, this.props.easing);

    if (this.props.onUpdate)
        this.obj.onUpdateCallback(this.props.onUpdate);

    if (this.props.repeatAll)
        this.obj.repeatAll(this.props.repeatAll);

    for (var i = events.length; i--;)
        if (this.props[events[i]])
            this.obj[events[i]].add(this.props[events[i]]);

    this.obj.start();
};

module.exports = Tween;