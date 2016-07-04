var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var moment = require('moment');
var shelljs = require('shelljs');
var _ = require('lodash');

var Package =  yeoman.Base.extend({
  prompting: function() {
      var done = this.async();
      this.log(yosay(
          'Creating a agency-boilerplate Package!'
      ));

      var prompts = [{
          name: 'name',
          message: 'package\'s name ?'
      },{
          name: 'type',
          message: 'package\'s type ?'
      }];

      this.prompt(prompts, function (props) {
          this.name = props.name;
          this.type = props.type;
          done();
      }.bind(this));
  },
  end: function () {
      if(this.repo !== '') {
          this.spawnCommand('git', ['add', '--all']);
      }


      this.log(yosay(
          'It\'s all done! Package build.'
      ));
  }
});

module.exports = Package;
