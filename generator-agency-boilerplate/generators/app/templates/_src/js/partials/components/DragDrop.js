"use strict";

var TweenMax = require('gsap');

//console.log("SAME: ", global === GreenSockGlobals); // true

var Draggable = require('gsap/src/uncompressed/utils/Draggable');

//console.log(Draggable);

var Controller = require('../../base/Controller');
var DomModel = require('../../base/DomModel');

var tmpl = require('../../../tmpl/partials/components/external-data.hbs');


module.exports = Controller.extend({

    events :  {
        'click' : onHandleClick
    },

    modelConstructor: DomModel.extend({
        session: {
            ajax : {
                type: 'string',
                default: '#'
            }
        }
    }),

    initialize: function() {
        Controller.prototype.initialize.apply(this, arguments);

        Draggable.create("#knob", {type: "rotation", throwProps: false});
        console.log(this.model.ajax);

    },
    onInit : function() {
        console.log("INIT DragDrop");
    },
});


function onHandleClick(e) {
    //LOAD EXTERNAL data-controller
    var result = {
        list:  [
            1,2,3,4,5
        ]
    }
    this.el.querySelector('nav').innerHTML = tmpl(result);
    console.log(result);

}
