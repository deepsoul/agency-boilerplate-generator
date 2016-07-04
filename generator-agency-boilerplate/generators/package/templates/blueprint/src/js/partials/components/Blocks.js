"use strict";

var Controller = require('../../base/Controller');
var DomModel = require('../../base/DomModel');
var dataTypeDefinition = require('../../base/dataTypeDefinition');
var Enum = require('enum');
var Vector = require('../../base/Vector');
var viewport = require('../../services/viewport');

module.exports = Controller.extend({

    blocks: null,


    modelConstructor: DomModel.extend(dataTypeDefinition, {
        session: {
            extendedRange: {
                type: 'boolean',
                required: true,
                default: function() {
                    return false;
                }
            }
        }
    }),


    events: {},

    initialize: function() {
        Controller.prototype.initialize.apply(this, arguments);

        document.documentElement.classList.add('blocks-active');

        this.wrapper = this.el.querySelector('.canvas-wrapper');
        this.blocks = new Blocks(this.wrapper);

        viewport.on(viewport.EVENT_TYPES.INIT, function() {
            this.blocks.render();
        }.bind(this));
        viewport.on(viewport.EVENT_TYPES.RESIZE, function() {
            this.blocks.render();
        }.bind(this));

        this.blocks.render();

    }

});

var Blocks = function(wrapper) {
    this.wrapper = wrapper;
    this.shapeTemplates = {};
    this.shapes = {};

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.setAttribute('width', this.mapSize[0] * this.blockSize[0] + this.padding * 2);
    this.canvas.setAttribute('height', this.mapSize[1] * this.blockSize[1] + this.padding * 2);
    this.wrapper.appendChild(this.canvas);

    registerShapes(this);
    setImageSmoothing(this.context, false);

    this.intersectionMap = [];
    for (var x = 0; x < this.mapSize[0]; x++) {
        this.intersectionMap[x] = [];
        for (var y = 0; y < this.mapSize[1]; y++) {
            this.intersectionMap[x][y] = false;
        }
    }

    this.currentPosition = [0, 0];
    this.currentShape = this.SHAPE_TYPES.L;
    this.nextShape = null;

    setupControls(this);

    this.render();
    this.gameTimer = setInterval(function() {

        this.currentPosition[1]++;

        if (this.currentPosition[1] >= this.mapSize[1]) {
            this.currentPosition[1] = 0;
        }

        this.render();
    }.bind(this), 1000);
    // clearInterval(this.gameTimer);
    // registerShapes(this);

    // this.canvas = canvas;
};
Blocks.prototype.mapSize = [10, 18];
Blocks.prototype.blockSize = [16, 16];
Blocks.prototype.padding = 4;
Blocks.prototype.SHAPE_TYPES = new Enum(['O', 'I', 'S', 'Z', 'L', 'J', 'T']);
Blocks.prototype.ACTIONS = new Enum(['MOVE_LEFT', 'MOVE_RIGHT']);


Blocks.prototype.render = function() {

    global.animationFrame.add(function() {
        clearCanvas(this);
        renderGrid(this);
        renderShape(this, this.currentShape, this.currentPosition);
    }.bind(this));

};
Blocks.prototype.registerShape = function(type, shapeMap) {
    var map = [];
    for (var i = 0; i < shapeMap.length; i++) {
        for (var j = 0; j < shapeMap[i].length; j++) {
            if (shapeMap[i][j]) {
                map.push([j, i]);
            }

        }
    }
    var side = Math.sqrt(map.length);

    var rotate = function(d, i) {
        return [Math.abs(i % side - side + 1), Math.floor(i / side)];
    };
console.log(map);
    map = map.map(rotate);


    this.shapes[type] = {
        type: type,
        drawMap: map,
        map: shapeMap,
        size: [shapeMap.length, shapeMap[0].length]
    };
};


// Controls

function setupControls(scope) {

    document.addEventListener('keydown', function(e) {
        switch (e.key) {
            case 'ArrowLeft':
                this.action(this.ACTIONS.MOVE_LEFT);
                break;
            case 'ArrowRight':
                this.action(this.ACTIONS.MOVE_RIGHT);
                break;
            default:

            case 'ArrowTop':
            case 'ArrowDown':
                break;
        }
        this.render();
    }.bind(scope));

}

Blocks.prototype.action = function(action) {

    switch (action) {
        case this.ACTIONS.MOVE_LEFT:
            this.currentPosition[0] = Math.min(Math.max(this.currentPosition[0] - 1, 0), this.mapSize[0]);
            break;
        case this.ACTIONS.MOVE_RIGHT:
            this.currentPosition[0] = Math.min(Math.max(this.currentPosition[0] + 1, 0), this.mapSize[0]);
            break;
        default:

    }

};

/* ######### */

function registerShapes(scope) {

    scope.registerShape(scope.SHAPE_TYPES.O, [
        [true, true],
        [true, true]
    ]);
    scope.registerShape(scope.SHAPE_TYPES.I, [true, true, true, true]);
    scope.registerShape(scope.SHAPE_TYPES.S, [
        [false, true, true],
        [true, true, false]
    ]);
    scope.registerShape(scope.SHAPE_TYPES.Z, [
        [true, true, false],
        [false, true, true]
    ]);
    scope.registerShape(scope.SHAPE_TYPES.L, [
        [false, true, false,
            false, true, false,
            false, true, true]
    ]);
    scope.registerShape(scope.SHAPE_TYPES.J, [
        [false, true, false],
        [false, true, false],
        [true, true, false]
    ]);
    scope.registerShape(scope.SHAPE_TYPES.T, [
        [true, true, true],
        [false, true, false]
    ]);

}

function renderGrid(scope) {
    var context = scope.context;
    scope.context.strokeStyle = '#666666';
    for (var x = 0; x < scope.mapSize[0] + 1; x++) {
        context.beginPath();
        context.moveTo(x * scope.blockSize[0] + scope.padding, scope.padding);
        context.lineTo(x * scope.blockSize[0] + scope.padding, scope.mapSize[1] * scope.blockSize[0] + scope.padding);
        context.stroke();
    }
    for (var y = 0; y < scope.mapSize[1] + 1; y++) {
        context.beginPath();
        context.moveTo(scope.padding, y * scope.blockSize[1] + scope.padding);
        context.lineTo(scope.mapSize[0] * scope.blockSize[1] + scope.padding, y * scope.blockSize[1] + scope.padding);
        context.stroke();
    }
}

function renderShape(scope, type, position) {

    var shape = scope.shapes[type];

    shape.drawMap.forEach(function(pos) {
        scope.context.fillRect((position[0] + pos[0]) * scope.blockSize[0] + scope.padding, (position[1] + pos[1]) * scope.blockSize[1] + scope.padding, scope.blockSize[0], scope.blockSize[1]);
    });

    scope.context.fillStyle = '#8ED6FF';
    scope.context.fill();

    // for (var i = 0; i < shape.map.length; i++) {
    //     for (var j = 0; j < shape.map[i].length; j++) {
    //         // var position = shape.map[i][j];
    //         // shape.map[i][j]
    //     }
    //
    //     // shape[i]
    // }

}

function clearCanvas(scope) {
    scope.context.clearRect(0, 0, scope.canvas.width, scope.canvas.height);
}

function setImageSmoothing(context, imageSmoothing) {
    context.imageSmoothingEnabled = imageSmoothing; /* standard */
    context.mozImageSmoothingEnabled = imageSmoothing; /* Firefox */
    context.oImageSmoothingEnabled = imageSmoothing; /* Opera */
    context.webkitImageSmoothingEnabled = imageSmoothing; /* Safari */
    context.msImageSmoothingEnabled = imageSmoothing; /* IE */
}
