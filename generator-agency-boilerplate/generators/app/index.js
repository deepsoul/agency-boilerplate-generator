'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var extract = require('extract-zip');

var AgencyBoilerplateGenerator = yeoman.Base.extend({


  prompting: function() {
    var done = this.async();
    this.log(yosay(
        'Welcome to the agency-boilerplate generator!'
    ));

    var prompts = [{
      name: 'name',
      message: 'What is your app\'s name ?'
    }, {
      type: 'confirm',
      name: 'git',
      message: 'Would you like to init an empty git repo?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.git = props.git;
      done();
    }.bind(this));

  },
  writing: {

    init: function() {
    var done = this.async();
      if(this.git) {
        this.spawnCommand('git', ['init']);
        this.log(
            chalk.magenta( 'git repo succesfully initialized' )
        );
        done();

      }
    },

    src : function() {
      var self = this;
      var done = this.async();
      this.fetch('https://github.com/StephanGerbeth/agency-boilerplate/archive/master.zip',
          this.templatePath('git-zip'),
          function() {
            extract(self.templatePath('git-zip/master.zip'), {dir: self.templatePath('git-zip/unzipped')}, function (err) {
              // extraction is complete. make sure to handle the err
              if(err) {
                self.log(yosay(
                    'Oooops - there was an error!'
                ));
              }else {
                self.directory(self.templatePath('git-zip/unzipped/agency-boilerplate-master/src'),self.destinationPath('src'));
                done();
              }
            })
          });
    },
    //Copy the configuration files
    config: function () {
      this.fs.copyTpl(
          this.templatePath('git-zip/unzipped/agency-boilerplate-master/package.json'),
          this.destinationPath('package.json'), {
            name: this.name
          }
      );
      this.fs.copy(
          this.templatePath('git-zip/unzipped/agency-boilerplate-master/.editorconfig'),
          this.destinationPath('.editorconfig')
      );
      this.fs.copy(
          this.templatePath('git-zip/unzipped/agency-boilerplate-master/.gitignore'),
          this.destinationPath('.gitignore')
      );
      this.fs.copy(
          this.templatePath('git-zip/unzipped/agency-boilerplate-master/gulpfile.js'),
          this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
          this.templatePath('git-zip/unzipped/agency-boilerplate-master/.jshintrc'),
          this.destinationPath('.jshintrc')
      );
      this.fs.copy(
          this.templatePath('git-zip/unzipped/agency-boilerplate-master/.modernizrrc'),
          this.destinationPath('.modernizrrc')
      );
      this.fs.copy(
          this.templatePath('git-zip/unzipped/agency-boilerplate-master/.travis.yml'),
          this.destinationPath('.travis.yml')
      );
      this.fs.copy(
          this.templatePath('git-zip/unzipped/agency-boilerplate-master/app.json'),
          this.destinationPath('app.json')
      );
      this.fs.copy(
          this.templatePath('git-zip/unzipped/agency-boilerplate-master/appveyor.yml'),
          this.destinationPath('appveyor.yml')
      );
      this.fs.copy(
          this.templatePath('git-zip/unzipped/agency-boilerplate-master/Procfile'),
          this.destinationPath('Procfile')
      );
      this.fs.copy(
          this.templatePath('git-zip/unzipped/agency-boilerplate-master/README.md'),
          this.destinationPath('README.md')
      );

    },
    //Copy the enviroment files
    enviroment : function() {
      //this.directory(this.templatePath('_env'),this.destinationPath('env'), {destination: this.destination});
        this.fs.copy(
            this.templatePath('git-zip/unzipped/agency-boilerplate-master/env/config/local.json'),
            this.destinationPath('env/config/local.json')
        );
        this.fs.copy(
            this.templatePath('git-zip/unzipped/agency-boilerplate-master/env/config/tasks.json'),
            this.destinationPath('env/config/tasks.json'), {
                name: this.name
            }
        );
    },
    routes : function() {
      this.directory(this.templatePath('git-zip/unzipped/agency-boilerplate-master/env/routes'),this.destinationPath('env/routes'));
    },

  },
  install: function() {

    this.log(
        chalk.magenta( 'Install npm packages - Takes a bit ;-) ')
    );
    this.npmInstall();
  },
  end: function () {
    this.log(yosay(
        'It\'s all done! Happy Coding'
    ));
  }

  });

module.exports = AgencyBoilerplateGenerator;
