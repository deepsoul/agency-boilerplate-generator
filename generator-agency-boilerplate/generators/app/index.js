'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var AgencyBoilerplateGenerator = yeoman.Base.extend({



  prompting: function() {
    var done = this.async();
    this.log(yosay(
        'Welcome to the agency-boilerplate generator!'
    ));

    var prompts = [{
      name: 'name',
      message: 'What is your app\'s name ?'
    },
      {
        name: 'destination',
        message: 'What is your app\'s destination ?'
      }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.destination = props.destination;
      done();
    }.bind(this));

  },
  writing: {
    //Copy the configuration files
    config: function () {
      this.fs.copyTpl(
          this.templatePath('_package.json'),
          this.destinationPath('package.json'), {
            name: this.name
          }
      );
      this.fs.copyTpl(
          this.templatePath('.editorconfig'),
          this.destinationPath('.editorconfig'), {
            name: this.name
          }
      );
      this.fs.copyTpl(
          this.templatePath('gulpfile.js'),
          this.destinationPath('gulpfile.js'), {
            name: this.name
          }
      );
      this.fs.copyTpl(
          this.templatePath('.jshintrc'),
          this.destinationPath('.jshintrc'), {
            name: this.name
          }
      );
      this.fs.copyTpl(
          this.templatePath('.modernizrrc'),
          this.destinationPath('.modernizrrc'), {
            name: this.name
          }
      );
      this.fs.copyTpl(
          this.templatePath('.travis.yml'),
          this.destinationPath('.travis.yml'), {
            name: this.name
          }
      );
      this.fs.copyTpl(
          this.templatePath('app.json'),
          this.destinationPath('app.json'), {
            name: this.name
          }
      );
      this.fs.copyTpl(
          this.templatePath('appveyor.yml'),
          this.destinationPath('appveyor.yml'), {
            name: this.name
          }
      );
      this.fs.copyTpl(
          this.templatePath('gulpfile.js'),
          this.destinationPath('Procfile'), {
            name: this.name
          }
      );
      this.fs.copyTpl(
          this.templatePath('README.md'),
          this.destinationPath('README.md'), {
            name: this.name
          }
      );

    },
    //Copy the enviroment files
    enviroment : function() {
      this.directory(this.templatePath('_env'),this.destinationPath('env'), {destination: this.destination});
    },
    routes : function() {
      this.directory(this.templatePath('_routes'),this.destinationPath('routes'));
    },
    //Copy the src files
    src : function() {

      this.directory(this.templatePath('_src'),this.destinationPath('src'));
    }
  },
  install: function() {
    this.installDependencies();
  },
  end: function () {
    this.log(yosay(
        'It\'s all done!'
    ));
  }

  });

module.exports = AgencyBoilerplateGenerator;
