/**
 * Created by <%= user.name %>  (<%= user.email %>)
 * on <%= creation_date %>.
 */

"use strict";


var Controller = require('../../base/Controller');
var DomModel = require('../../base/DomModel');



module.exports = Controller.extend({

    modelConstructor: DomModel.extend({

    }),

    initialize: function() {
        Controller.prototype.initialize.apply(this, arguments);
    }
});



