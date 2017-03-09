/**
 * Created by <%= user.name %>  (<%= user.email %>)
 * on <%= creation_date %>.
 */

"use strict";


import Controller from 'agency-pkg-base/Controller';
import DomModel from 'agency-pkg-base/DomModel';

module.exports = Controller.extend({

    modelConstructor: DomModel.extend({

    }),

    initialize: function() {
        Controller.prototype.initialize.apply(this, arguments);
    }
});
