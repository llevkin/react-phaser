var util = require('util');
var Node = require('./../node');

function Events() {
    this.super(Events, 'constructor', arguments);
}
util.inherits(Events, Node);

Events.prototype.init = function() {
    this.update();
};

Events.prototype.update = function(prevProps) {
    this.super(Events, 'update');
    if (!this.parentNode.obj)
        return;
    if (!this.parentNode.obj.inputEnabled)
        this.parentNode.obj.inputEnabled = true;
    this.parentNode.obj.input.priorityID = this.props.priorityID || 0;
    if (prevProps)
        this.parentNode.obj.events[this.props.name].remove(prevProps.callback);
    this.parentNode.obj.events[this.props.name].add(this.props.callback);
};

module.exports = Events;