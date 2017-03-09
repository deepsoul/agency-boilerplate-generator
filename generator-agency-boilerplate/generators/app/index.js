'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var extract = require('extract-zip');
var gitData = [
     {
        "url": "https://github.com/StephanGerbeth/agency-boilerplate/archive/master.zip",
        "zip": "master.zip",
        "unzipped": "agency-boilerplate-master"
    },
    {
        "url": "https://github.com/agency-framework/agency-boilerplate/archive/generator/blueprint.zip",
        "zip": "blueprint.zip",
        "unzipped": "agency-boilerplate-generator-blueprint"
    },
    {
        "url": "https://github.com/StephanGerbeth/agency-boilerplate/archive/feature/webpack-2-beta.zip",
        "zip": "webpack-2-beta.zip",
        "unzipped": "agency-boilerplate-feature-webpack-2-beta"
    }


];

var repo = {};

var AgencyBoilerplateGenerator = yeoman.Base.extend({


    prompting: function () {
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
        },
            {
                type: 'checkbox',
                name: 'gitRepo',
                message: 'What Git-Repo you would to clone?',
                choices: [
                    {
                        value: 'master',
                        name: 'https://github.com/StephanGerbeth/agency-boilerplate/archive/master.zip',
                        checked: false
                    }, {
                        value: 'package-blueprint',
                        name: 'https://github.com/agency-framework/agency-boilerplate/archive/generator/blueprint.zip',
                        checked: false
                    }, {
                        value: 'webpack-2-beta',
                        name: 'https://github.com/StephanGerbeth/agency-boilerplate/archive/feature/webpack-2-beta.zip',
                        checked: false
                    }

                ]
            }];

        this.prompt(prompts, function (props) {
            this.name = props.name;
            this.git = props.git;
            this.gitRepo = props.gitRepo;
            done();
        }.bind(this));

    },
    writing: {

        init: function () {
            var done = this.async();
            if (this.git) {
                this.spawnCommand('git', ['init']);

                this.log(
                    chalk.magenta('git repo succesfully initialized')
                );
                done();

            } else {
                done();
            }
        },

        src: function () {
            var self = this;
            var done = this.async();
            self.repo = {};
            this.log(
                chalk.magenta('checking out... ', self.gitRepo)
            );



            if (self.gitRepo == 'master') {
                self.repo = gitData[0];
            }
            else if (self.gitRepo == 'package-blueprint') {
                self.repo = gitData[1];
            }
            else if (self.gitRepo == 'webpack-2-beta') {
                self.repo = gitData[2];
            }
            this.log(
                chalk.magenta('Clone...' + self.repo.url)
            );
            this.fetch(self.repo.url,
                this.templatePath('git-zip'),
                function () {
                    extract(self.templatePath('git-zip/' + self.repo.zip), {dir: self.templatePath('git-zip/unzipped')}, function (err) {
                        // extraction is complete. make sure to handle the err
                        if (err) {
                            self.log(yosay(
                                'Oooops - there was an error!'
                            ));
                        } else {
                            self.directory(self.templatePath('git-zip/unzipped/' + self.repo.unzipped + '/src'), self.destinationPath('src'));
                            done();
                        }
                    })
                });
        },
        //Copy the configuration files
        config: function () {
            var self = this;


                this.fs.copyTpl(
                    this.templatePath('git-zip/unzipped/' + self.repo.unzipped + '/package.json'),
                    this.destinationPath('package.json'), {
                        pkgName: this.name
                    }
                );
                this.fs.copy(
                    this.templatePath('git-zip/unzipped/' + self.repo.unzipped + '/.editorconfig'),
                    this.destinationPath('.editorconfig')
                );
                this.fs.copy(
                    this.templatePath('git-zip/unzipped/' + self.repo.unzipped + '/.gitignore'),
                    this.destinationPath('.gitignore')
                );
                this.fs.copy(
                    this.templatePath('git-zip/unzipped/' + self.repo.unzipped + '/gulpfile.js'),
                    this.destinationPath('gulpfile.js')
                );
                this.fs.copy(
                    this.templatePath('git-zip/unzipped/' + self.repo.unzipped + '/.jshintrc'),
                    this.destinationPath('.jshintrc')
                );
            if (self.gitRepo != 'webpack-2-beta') {
                this.fs.copy(
                    this.templatePath('git-zip/unzipped/' + self.repo.unzipped + '/.modernizrrc'),
                    this.destinationPath('.modernizrrc')
                );
            }

                this.fs.copy(
                    this.templatePath('git-zip/unzipped/' + self.repo.unzipped + '/.travis.yml'),
                    this.destinationPath('.travis.yml')
                );
                this.fs.copy(
                    this.templatePath('git-zip/unzipped/' + self.repo.unzipped + '/app.json'),
                    this.destinationPath('app.json')
                );
                this.fs.copy(
                    this.templatePath('git-zip/unzipped/' + self.repo.unzipped + '/appveyor.yml'),
                    this.destinationPath('appveyor.yml')
                );
                this.fs.copy(
                    this.templatePath('git-zip/unzipped/' + self.repo.unzipped + '/Procfile'),
                    this.destinationPath('Procfile')
                );
                this.fs.copy(
                    this.templatePath('git-zip/unzipped/' + self.repo.unzipped + '/README.md'),
                    this.destinationPath('README.md')
                );



        },
        //Copy the enviroment files
        enviroment: function () {


            var self = this;

            this.fs.copy(
                this.templatePath(this.templatePath('git-zip/unzipped/' + self.repo.unzipped + '/env/config')),
                this.destinationPath('env/config')
            );


        },
        routes: function () {
            var self = this;
            this.directory(this.templatePath('git-zip/unzipped/' + self.repo.unzipped + '/env/routes'), this.destinationPath('env/routes'));
        },

    },
    install: function () {

        this.log(
            chalk.magenta('Install npm packages - Takes a bit ;-) ' + this.gitRepo)
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
