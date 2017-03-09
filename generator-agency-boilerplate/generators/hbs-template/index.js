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
              value: 'components',
              name: 'component',
              checked: false
            }
            , {
              value: 'fragments',
              name: 'fragment',
              checked: false
            },
          {
            value: 'elements',
            name: 'element',
            checked: false
          }]
        }, {
            type: 'checkbox',
            name: 'withController',
            message: 'wanna have a JS-Controller?',
            choices: [
                {
                    value: true,
                    name: 'controller',
                    checked: false
                }
                , {
                    value: false,
                    name: 'no Controller',
                    checked: false
                }
            ]
        }, {
            type: 'checkbox',
            name: 'jsVersion',
            message: 'JS Version',
            choices: [
                {
                    value: 'es5',
                    name: 'es5',
                    checked: false
                }
                , {
                    value: 'es6',
                    name: 'es6',
                    checked: false
                }
            ]
        }, {
            name: 'directory',
            message: 'subfolder\'s name ?'
        }];

        this.prompt(prompts, function (props) {
            this.name = props.name;
            this.directory = getDirectoryFolder(props.directory);
            this.type = props.type[0];
            this.withController = props.withController[0];
            this.jsVersion = props.jsVersion[0];
            done();
        }.bind(this));
    },

    writing : function() {

        if(this.withController) {
            this.fs.copyTpl(
                this.templatePath('template.hbs'),
                this.destinationPath('src/tmpl/partials/' + this.type + this.directory + '/' + lowerCaseFirstLetter(this.name) + '.hbs'), {
                    name: lowerCaseFirstLetter(this.name),
                    type: lowerCaseFirstLetter(this.type),
                    directory: this.directory,
                    ctrlname: capitalizeFirstLetter(_.camelCase(this.name))
                }
            );
            console.log(this.jsVersion);
            if(this.jsVersion === 'es5') {
                this.fs.copyTpl(
                    this.templatePath('controller.js'),
                    this.destinationPath('src/js/partials/' + this.type + this.directory + '/' + capitalizeFirstLetter(_.camelCase(this.name)) + '.js'), {
                        name: lowerCaseFirstLetter(this.name),
                        type: lowerCaseFirstLetter(this.type),
                        directory: this.directory,
                        user: getGitUserInfo(),
                        creation_date: moment()
                    }
                );
            }else if(this.jsVersion === 'es6') {
                this.fs.copyTpl(
                    this.templatePath('controller-es6.js'),
                    this.destinationPath('src/js/partials/' + this.type + this.directory + '/' + capitalizeFirstLetter(_.camelCase(this.name)) + '.js'), {
                        name: lowerCaseFirstLetter(this.name),
                        type: lowerCaseFirstLetter(this.type),
                        directory: this.directory,
                        user: getGitUserInfo(),
                        creation_date: moment()
                    }
                );
            }

        } else {
            this.fs.copyTpl(
                this.templatePath('no-controller-template.hbs'),
                this.destinationPath('src/tmpl/partials/' + this.type + this.directory + '/' + lowerCaseFirstLetter(this.name) + '.hbs'), {
                    name: lowerCaseFirstLetter(this.name),
                    type: lowerCaseFirstLetter(this.type),
                    directory: this.directory
                }
            );
        }


        this.fs.copyTpl(
            this.templatePath('postcss.pcss'),
            this.destinationPath('src/pcss/partials/' + this.type + this.directory + '/' + lowerCaseFirstLetter(this.name) + '.pcss'),  {
                name: lowerCaseFirstLetter(this.name),
                directory: this.directory,
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

function getDirectoryFolder(folder) {
    if(folder != '') {
        return '/' + folder;
    }else {
        return '';
    }
}

module.exports = HbsTemplateGenerator;
