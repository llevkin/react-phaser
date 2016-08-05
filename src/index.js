var createReactAnything  = require('react-anything/src/native');
var phaserImplementation = require('./tree');
var ReactPhaser          = createReactAnything(phaserImplementation.impl);
var React                = ReactPhaser.React;
React.render             = ReactPhaser.render;
module.exports           = React;