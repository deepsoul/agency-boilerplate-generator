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
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      done();
    }.bind(this));

  },
  writing: {
    //Copy the configuration files
    config: function () {
      this.fs.copyTpl(
          this.templatePath('package.json'),
          this.destinationPath('package.json'), {
            name: this.name
          }
      );
      this.fs.copy(
          this.templatePath('.editorconfig'),
          this.destinationPath('.editorconfig')
      );
      this.fs.copy(
          this.templatePath('gulpfile.js'),
          this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
          this.templatePath('.jshintrc'),
          this.destinationPath('.jshintrc')
      );
      this.fs.copy(
          this.templatePath('.modernizrrc'),
          this.destinationPath('.modernizrrc')
      );
      this.fs.copy(
          this.templatePath('.travis.yml'),
          this.destinationPath('.travis.yml')
      );
      this.fs.copy(
          this.templatePath('app.json'),
          this.destinationPath('app.json')
      );
      this.fs.copy(
          this.templatePath('appveyor.yml'),
          this.destinationPath('appveyor.yml')
      );
      this.fs.copy(
          this.templatePath('Procfile'),
          this.destinationPath('Procfile')
      );
      this.fs.copy(
          this.templatePath('README.md'),
          this.destinationPath('README.md')
      );

    },
    //Copy the enviroment files
    enviroment : function() {
      //this.directory(this.templatePath('_env'),this.destinationPath('env'), {destination: this.destination});
        this.fs.copy(
            this.templatePath('env/config/local.json'),
            this.destinationPath('env/config/local.json'), {
                name: this.name
            }
        );
        this.fs.copy(
            this.templatePath('env/config/tasks.json'),
            this.destinationPath('env/config/tasks.json'), {
                name: this.name
            }
        );
    },
    routes : function() {
      this.directory(this.templatePath('env/routes'),this.destinationPath('env/routes'));
    },
    //Copy the src files
    src : function() {

      this.directory(this.templatePath('src'),this.destinationPath('src'));
    }
  },
  install: function() {
    this.npmInstall();
  },
  end: function () {
    this.log(yosay(
        'It\'s all done!'
    ));
  }

  });

module.exports = AgencyBoilerplateGenerator;
