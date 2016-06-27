var React           = require('react');
var ReactMultiChild = require('react/lib/ReactMultiChild');

function createComponent(name) {

    var ReactGibbonComponent = function(props) {
        this.node = null;
        this.subscriptions = null;
        this._mountImage = null;
        this._renderedChildren = null;
    };

    ReactGibbonComponent.displayName = name;

    for (var i = 1, l = arguments.length; i < l; i++)
        Object.assign(ReactGibbonComponent.prototype, arguments[i]);

    return ReactGibbonComponent;
}

var EventTypes = ['onClick', 'onMouseDown', 'onMouseUp'];

var NodeMixin = {

    putEventListener: function(type, listener) {
        var subscriptions = this.subscriptions || (this.subscriptions = {});
        this.node[type] = listener;
        subscriptions[type] = listener;
    },

    handelEvent: function(e) {},
    destroyEventListeners: function(e) {},
    applyNodeProps: function(oldProps, newProps) {
        var node = this.node;
        for (var prop in newProps) {
            if (EventTypes.indexOf(prop) !== -1)
                node[prop] = newProps[prop];
        }
        EventTypes.forEach(function(event) {
            this.putEventListener(event, newProps[event])
        });
    },

};

var ContainerMixin = Object.assign({}, ReactMultiChild.Mixin, {

    moveChild: function() {},
    createChild: function() {},
    removeChild: function() {},
    updateChildrenAtRoot: function() {},
    mountAndInjectChildren: function(children, transaction, context) {
        var mountImages = this.mountChildren(children, transaction, context);
        var i = 0;
        for (var key in this._renderedChildren) {
            if (this._renderedChildren.hasOwnProperty(key)) {
                var child = this._renderedChildren[key];
                child._mountImage = mountImages[i];
                this.node.children.push(mountImages[i]);
                i++;
            }
        }
    }

});

var Widget = createComponent('Widget', NodeMixin, ContainerMixin);
console.log(Widget.prototype);
