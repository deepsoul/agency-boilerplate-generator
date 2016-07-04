"use strict";

var handlebars = require('handlebars/dist/handlebars');
var Controller = require('agency-pkg-base/Controller');
var DomModel = require('agency-pkg-base/DomModel');
var dataTypeDefinition = require('agency-pkg-base/dataTypeDefinition');
var Enum = require('enum');
var Vector = require('agency-pkg-base/Vector');
var viewport = require('agency-pkg-services/viewport');

module.exports = Controller.extend({

    ACTIONS: new Enum(['MOVE_LEFT', 'MOVE_RIGHT']),
    blockTemplates: {},
    currentPosition: [0, 0],


    mapSize: [10, 18],

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

        document.documentElement.classList.add('falling-blocks-active');


        this.blockTemplates.i = handlebars.compile(this.el.querySelector('#falling-blocks-block-i').innerHTML);
        var block = this.blockTemplates.i();

        this.blockEl = this.el.querySelector('[data-partial="fragments/blocks"]');
        this.blockEl.innerHTML += block;


        this.currentBlock = this.blockEl.childNodes[this.blockEl.childElementCount];
        this.gameTimer = setInterval(function() {

            this.currentPosition[1]++;

            if (this.currentPosition[1] >= this.mapSize[1]) {
                this.currentPosition[1] = 0;
            }

            render(this);
        }.bind(this), 1000);

        setupControls(this);

    }

});


function render(scope) {

    scope.currentBlock.style.left = scope.currentPosition[0] * 10 + '%';
    scope.currentBlock.style.top = scope.currentPosition[1] * ((1 / 18) * 100) + '%';
    // scope.currentBlock.style.left = '-10%';

}

// Controls

function setupControls(scope) {

    document.addEventListener('keydown', function(e) {
        switch (e.key) {
            case 'ArrowLeft':
                action(this, this.ACTIONS.MOVE_LEFT);
                break;
            case 'ArrowRight':
                action(this, this.ACTIONS.MOVE_RIGHT);
                break;
            default:

            case 'ArrowTop':
            case 'ArrowDown':
                break;
        }
        render(this);
    }.bind(scope));

}

function action(scope, action) {

    var x, y;

    switch (action) {
        case scope.ACTIONS.MOVE_LEFT:
            x = Math.min(Math.max(scope.currentPosition[0] - 1, -1); scope.currentPosition[0] = Math.min(Math.max(scope.currentPosition[0] - 1, -1), scope.mapSize[0]);
                break;
                case scope.ACTIONS.MOVE_RIGHT:
                    scope.currentPosition[0] = Math.min(Math.max(scope.currentPosition[0] + 1, -1), scope.mapSize[0]);
                    break;
                default:

            }

            if (intersect(scope, x, scope.currentPosition[1]) &&
                intersect(scope, x, scope.currentPosition[1] + 1) &&
                intersect(scope, x, scope.currentPosition[1] + 2)) {

            }

    }

    function intersect(scope, x, y) {

    }
