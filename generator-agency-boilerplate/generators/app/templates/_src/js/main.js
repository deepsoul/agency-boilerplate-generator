/**
 * Created by boris.horn on 04.02.16.
 */
"use strict";

var js = require('./services/parser/js');

(function(){
    $(function() {
        js.parse();
    });
})();