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
          default: 'agency-pkg'
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

    }
  },

  writing: function () {



    this.fs.copyTpl(
      this.templatePath('blueprint/**'),
      this.destinationPath('src/packages/' + this.prefix +'-pkg-' + this.name),
      {  globOptions: { dot: true } }
    );

    // init: function() {
    // var done = this.async();
    //   if(this.git) {
    //     this.spawnCommand('git', ['init']);
    //     this.log(
    //         chalk.magenta( 'git repo succesfully initialized' )
    //     );
    //     done();
    //
    //   }
    // },
    // src:function() {
    //
    //
    //   done();
    // }

  },
  end: function () {
      if(this.git) {
          this.spawnCommand('git', ['init']);
          this.spawnCommand('git', ['add', '--all']);
      }


      this.log(yosay(
          'It\'s all done! Package build.'
      ));
  }
});

module.exports = Package;
