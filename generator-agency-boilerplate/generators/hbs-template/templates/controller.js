/**
 * Created by boris.horn on 05.02.16.
 */
"use strict";


var Controller = require('../../base/Controller');
var DomModel = require('../../base/DomModel');



module.exports = Controller.extend({



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

        console.log(this.model.ajax);

    },
    onInit : function() {
        console.log("init");
    },
});



