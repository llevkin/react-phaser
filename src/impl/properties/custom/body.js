'use strict';

var extend = require('extend'),
    utils = require('../utils');

module.exports = extend(
    {},
    utils.generatePrefixedBasicPropMap('body', ['immovable', 'collideWorldBounds']),
    utils.generatePrefixedPointPropMap('body', ['bounce', 'gravity']),
    {
        bodyPhysics: function (nodes, node, value, isNew) {
            if (isNew && value) {
                var physics = nodes.game().physics,
                    system = value !== true ? value : physics.system;

                nodes.game().physics.enable(node.obj, system);
            }
        }
    }
);
