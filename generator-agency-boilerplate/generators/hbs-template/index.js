/**
 * Created by boris.horn on 05.02.16.
 */
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var HbsTemplateGenerator = yeoman.Base.extend({
    prompting: function() {
        var done = this.async();
        this.log(yosay(
            'Creating a agency-handlebars-template!'
        ));

        var prompts = [{
            name: 'name',
            message: 'template\'s name ?'
        }];

        this.prompt(prompts, function (props) {
            this.name = props.name;
            done();
        }.bind(this));
    },

    writing : function() {
        this.fs.copy(
            this.templatePath('template.hbs'),
            this.destinationPath('src/tmpl/partials/components/' + this.name + '.hbs')
        );
    },

    end: function () {
        this.log(yosay(
            'It\'s all done! Template build.'
        ));
    }

});

module.exports = HbsTemplateGenerator;