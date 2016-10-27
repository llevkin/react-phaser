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
    if (this.parentNode.obj.input)
        this.parentNode.obj.input.priorityID = this.props.priorityID || 0;
    if (this.parentNode.obj.events) {
        if (prevProps)
            this.parentNode.obj.events[this.props.name].remove(prevProps.callback);
        this.parentNode.obj.events[this.props.name].add(this.props.callback);
    }
    if (this.parentNode.obj[this.props.name]) {
        if (prevProps)
            this.parentNode.obj[this.props.name].remove(prevProps.callback);
        this.parentNode.obj[this.props.name].add(this.props.callback);
    }
};

module.exports = Events;