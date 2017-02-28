/**
 * Created by <%= user.name %>  (<%= user.email %>)
 * on <%= creation_date %>.
 */

"use strict";


var Controller = require('agency-pkg-base/Controller');
var DomModel = require('agency-pkg-base//DomModel');



module.exports = Controller.extend({

    modelConstructor: DomModel.extend({

    }),

    initialize: function() {
        Controller.prototype.initialize.apply(this, arguments);
    }
});
