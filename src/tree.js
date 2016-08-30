var tree        = { root: null, nodes: {}, byname: {} },
    nodes       = require('./impl'),
    treeImpl    = {
        components: {
            mount: function (id, tag, props, parent) {
                var node = new (tag in nodes ? nodes[tag] : nodes.node)({ id: id, tag: tag, props: props, parent: parent && parent.id, tree: tree });
                if (parent) {
                    parent.children.push(id);
                } else {
                    tree.root = node;
                }
                tree.nodes[id] = node;
                if (props.name) {
                    tree.byname[props.name] = node;
                }
                node.mount && node.mount();
                return node;
            },
            childrenMount: function (node) {
                node.childrenMount && node.childrenMount();
            },
            unmount: function (node) {
                node.unmount && node.unmount();
                delete tree.nodes[node.id];
                if (node.parent) {
                    var parent = tree.nodes[node.parent];
                    parent.children.splice(parent.children.indexOf(node.id), 1);
                }
                delete tree.nodes[node.id];
                if (node === tree.root) {
                    tree.root = null;
                }

                if (node.props.name) {
                    delete tree.byname[node.props.name];
                }
            },
            update: function (node, nextProps, prevProps) {
                node.props = nextProps;
                try {
                    node.update && node.update(prevProps);
                } catch (e) {}
                if (nextProps.name !== prevProps.name) {
                    if (prevProps.name) {
                        delete tree.byname[prevProps.name];
                    }
                    if (nextProps.name) {
                        tree.byname[nextProps.name] = node;
                    }
                }
            }
        },
        transaction: {
            initialize: function () {
            },
            close: function () {
            }
        }
    };

module.exports.impl = treeImpl;
module.exports.tree = tree;
