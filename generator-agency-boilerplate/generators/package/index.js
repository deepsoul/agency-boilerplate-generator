var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var moment = require('moment');
var shelljs = require('shelljs');
var _ = require('lodash');
var extract = require('extract-zip');

var Package =  yeoman.Base.extend({

  prompting: function() {
      var done = this.async();
      this.log(yosay(
          'Creating a agency-boilerplate Package!'
      ));

      var prompts = [{
          name: 'name',
          message: 'package\'s name ?'
      },
      {
          name: 'prefix',
          message: 'package\'s prefix ?',
          default: 'agency'
      },{
        type: 'confirm',
        name: 'git',
        message: 'Would you like to init an empty git repo?',
        default: true
      }];

      this.prompt(prompts, function (props) {
          this.name = props.name;
          this.type = props.type;
          this.prefix = props.prefix;
          this.git = props.git;
          done();
      }.bind(this));
  },

  init: function() {
  var done = this.async();
    if(this.git) {
      this.spawnCommand('git', ['init']);
      this.log(
          chalk.magenta( 'git repo succesfully initialized' )
      );
      done();

    }else {
      done();
    }
  },

  writing: function () {

    this.fs.copyTpl(
      this.templatePath('blueprint/**'),
      this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name),
      {  globOptions: { dot: true } }
    );



  },

  install: function() {

    this.log(
        chalk.magenta( 'Install npm packages for package ' + this.prefix +'-pkg-' + this.name + ' - Takes a bit ;-) ')
    );
    this.destinationRoot('src/packages/' + this.prefix +'-pkg-' + this.name);
    this.npmInstall();
  },
  end: function () {
      if(this.git) {
          this.spawnCommand('git', ['add', '--all']);
      }

      this.log(yosay(
          'It\'s all done! package build.'
      ));
  }
});

module.exports = Package;
