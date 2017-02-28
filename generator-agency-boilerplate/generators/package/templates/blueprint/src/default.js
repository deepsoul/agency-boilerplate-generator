"use strict";

var Controller = require('agency-pkg-base/Controller');

module.exports = Controller.extend({

    initialize: function() {
        Controller.prototype.initialize.apply(this, arguments);
        this.queryByHook('message').innerHTML = 'initialized !';
    }

});
