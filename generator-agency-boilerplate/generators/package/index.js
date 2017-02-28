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
          'Creating a agency-boilerplate package (blueprint)!'
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
      this.templatePath('blueprint/!**'),
      this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name),
      { name: this.prefix +'-pkg-' + this.name,
        user: getGitUserInfo(),
        globOptions: { dot: true } }
    );

    this.fs.copy(
        this.templatePath('blueprint/.editorconfig'),
        this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/.editorconfig')
    );
    this.fs.copy(
        this.templatePath('blueprint/.gitignore'),
        this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/.gitignore')
    );
      this.fs.copy(
          this.templatePath('blueprint/.jshintrc'),
          this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/.jshintrc')
      );
      this.fs.copy(
          this.templatePath('blueprint/.modernizrrc'),
          this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/.modernizrrc')
      );
      this.fs.copy(
          this.templatePath('blueprint/.node-version'),
          this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/.node-version')
      );
      this.fs.copy(
          this.templatePath('blueprint/.npmignore'),
          this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/.npmignore')
      );
      this.fs.copy(
          this.templatePath('blueprint/gulpfile.js'),
          this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/gulpfile.js')
      );
      this.fs.copy(
          this.templatePath('blueprint/install.js'),
          this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/install.js')
      );
      this.fs.copy(
          this.templatePath('blueprint/LICENSE'),
          this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/LICENSE')
      );
      this.fs.copy(
          this.templatePath('blueprint/package.json'),
          this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/package.json')
      );

      this.fs.copyTpl(
          this.templatePath('blueprint/package.json'),
          this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/package.json'),  {
              pkgName: this.prefix +'-pkg-' + this.name,
              user: getGitUserInfo()
          }
      );

      this.fs.copy(
          this.templatePath('blueprint/Procfile'),
          this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/Procfile')
      );




      this.fs.copyTpl(
          this.templatePath('blueprint/README.md'),
          this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/README.md'),  {
              pkgName: this.prefix +'-pkg-' + this.name,
              user: getGitUserInfo()
          }
      );
      this.directory(this.templatePath('blueprint/src'),
      this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/src'));


      this.fs.copy(
          this.templatePath('blueprint/env/config/agency/tasks.json'),
          this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/env/config/agency/tasks.json'), {
              name: this.name
          }
      );

      this.directory(this.templatePath('blueprint/test'),
      this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name + '/test'));


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
          'It\'s all done! package blueprint ('+ this.prefix +'-pkg-' + this.name +') is ready to use.'
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

module.exports = Package;
