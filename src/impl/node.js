function Node(data) {
    this.id          = data.id;
    this.tag         = data.tag;
    this.props       = data.props;
    this.parent      = data.parent;
    this.children    = [];
    this.obj         = null;
    this.tree        = data.tree;
}

Node.prototype.init = function() {
    this.forEach(function(item) { item.invoke('init'); });
};

Node.prototype.clear = function() {
    this.obj = null;
};

Node.prototype.mount = function() {
    try {
        this.init();
    } catch (e) {
    }
};

Node.prototype.childrenMount = function() {
};

Node.prototype.unmount = function() {
    this.forEach(function (item) { item.invoke('clear'); });
    this.clear();
};

Node.prototype.update = function() {
};

Node.prototype.forEach = function(callback) {
    if (this.children)
        for (var i = 0, l = this.children.length; i < l; i++)
            callback.call(this, this.nodes[this.children[i]]);
};

Object.defineProperties(Node.prototype, {

    game: {
        get: function() {
            return this.root.obj;
        }
    },

    root: {
        get: function() {
            return this.tree.root;
        }
    },

    nodes: {
        get: function() {
            return this.tree.nodes;
        }
    },

    parentNode: {
        get: function() {
            return this.nodes[this.parent];
        }
    },

    isRoot: {
        get: function() {
            return this.root === this;
        }
    },

    group: {
        get: function() {
            var item, node = this;
            while (node = node.parent) {
                item = this.nodes[node];
                if (item.obj && item.obj.addChild)
                    return item.obj;
            }
            return this.game.world;
        }
    },

    super: {
        value: function(Class, name, args) {
            return Class.super_.prototype[name].apply(this, args);
        }
    },

    preload: {
         value: function(assets) {
             var keys, assets = this.props.assets || assets;
             if (!assets)
                 return;
             keys = Object.keys(assets);
             keys.forEach(function (key, i) {
                 var asset = assets[key];
                 if (this.game.cache.checkImageKey(key))
                     return void this.game.load.onFileComplete.dispatch(Math.floor(keys.length / i));
                 switch (asset.type) {
                     case 'image':
                         this.game.load.image(key, asset.src);
                         break;
                     case 'spritesheet':
                         this.game.load.spritesheet(key, asset.src, asset.width, asset.height);
                         break;
                     case 'atlas':
                         this.game.load.atlas(key, asset.src, asset.json, null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
                         break;
                 }
             }.bind(this));
         }
    },

    invoke: {
        value: function(name) {
            var args;
            if (!(name in this))
                return;
            args = [];
            for (var i = 1, l = arguments.length; i < l; i++)
                args.push(arguments[i]);
            this[name].apply(this, args);
        }
    }

});

Object.defineProperties(Node.prototype, {

    x: {
        get: function() {
            console.warn('"x" getter called in '+this.constructor.name);
            return 0;
        }
    },

    y: {
        get: function() {
            console.warn('"y" getter called in '+this.constructor.name);
            return 0;
        }
    },

    width: {
        get: function() {
            console.warn('"width" getter called in '+this.constructor.name);
            return 0;
        }
    },

    height: {
        get: function() {
            console.warn('"height" getter called in '+this.constructor.name);
            return 0;
        }
    },

});

module.exports = Node;