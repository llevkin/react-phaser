var util = require('util');
var Node = require('./node');

function Animation() {
    this.super('constructor', arguments);
}
util.inherits(Animation, Node);

Animation.prototype._frame = function(frame) {
    var start, finish;

    if (Array.isArray(frame))
        return frame;

    if (!frame)
        return [0];

    return frame.split(',').reduce((memo, item) => {
        if (!~item.indexOf('-'))
            memo.push(parseInt(item, 10));
        else {
            [start, finish] = item.split('-');
            memo.push.apply(memo, _.range(start | 0, (finish | 0) + 1));
        }
        return memo;
    }, []);
};

Animation.prototype.init = function() {
    this.update();
};

Animation.prototype.update = function() {
    var current;
    if (this.parentNode.obj.animations.currentAnim)
        current = this.parentNode.obj.animations.currentAnim;
    this.obj = this.parentNode.obj.animations.add(this.props.id, this._frame(this.props.frames), this.props.fps, this.props.loop);
    if (this.props.play)
        this.obj.play();
    else if (current)
        current.play();
};

module.exports = Animation;