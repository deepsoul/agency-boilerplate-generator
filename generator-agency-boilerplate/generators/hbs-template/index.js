/**
 * Created by boris.horn on 05.02.16.
 */
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var moment = require('moment');
var shelljs = require('shelljs');
var _ = require('lodash');

var HbsTemplateGenerator = yeoman.Base.extend({
    prompting: function() {
        var done = this.async();
        this.log(yosay(
            'Creating a agency-handlebars-template!'
        ));

        var prompts = [{
            name: 'name',
            message: 'template\'s name ?'
        },{
          type: 'checkbox',
          name: 'type',
          message: 'package\'s type ?',
          choices: [
            {
              value: 'component',
              name: 'components',
              checked: false
            }
            , {
              value: 'fragment',
              name: 'fragments',
              checked: false
            },
          {
            value: 'element',
            name: 'elements',
            checked: false
          }]
        }];

        this.prompt(prompts, function (props) {
            this.name = props.name;
            this.type = props.type;
            done();
        }.bind(this));
    },

    writing : function() {
        this.fs.copyTpl(
            this.templatePath('template.hbs'),
            this.destinationPath('src/tmpl/partials/' + this.type +'/' + lowerCaseFirstLetter(this.name) + '.hbs'),  {
                name: lowerCaseFirstLetter(this.name),
                type: lowerCaseFirstLetter(this.type),
                ctrlname: capitalizeFirstLetter(_.camelCase(this.name))
            }
        );

        this.fs.copyTpl(
            this.templatePath('controller.js'),
            this.destinationPath('src/js/partials/' + this.type +'/' + capitalizeFirstLetter(_.camelCase(this.name)) + '.js'),  {
                name: lowerCaseFirstLetter(this.name),
                type: lowerCaseFirstLetter(this.type),
                user: getGitUserInfo(),
                creation_date: moment()
            }
        );

        this.fs.copyTpl(
            this.templatePath('postcss.pcss'),
            this.destinationPath('src/pcss/partials/' + this.type + '/' + lowerCaseFirstLetter(this.name) + '.pcss'),  {
                name: lowerCaseFirstLetter(this.name),
                type: lowerCaseFirstLetter(this.type)
            }
        );
    },

    end: function () {
        if(this.repo !== '') {
            this.spawnCommand('git', ['add', '--all']);
        }


        this.log(yosay(
            'It\'s all done! Template build.'
        ));
    }

});

function getGitUserInfo() {
    // Get user info from .gitconfig if available
    return info = {
        name: shelljs.exec('git config user.name', {silent: true}).output.replace(/\n/g, ''),
        email: shelljs.exec('git config user.email', {silent: true}).output.replace(/\n/g, ''),
        github: shelljs.exec('git config github.user', {silent: true}).output.replace(/\n/g, ''),
    };
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseFirstLetter(string) {
    return string.charAt(0).toLocaleLowerCase() + string.slice(1);
}

module.exports = HbsTemplateGenerator;
