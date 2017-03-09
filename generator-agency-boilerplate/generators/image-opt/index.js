/**
 * Created by boris.horn on 08.03.17.
 */
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var moment = require('moment');
var shelljs = require('shelljs');
var _ = require('lodash');
var imagemin = require('imagemin');
var imageminMozjpeg = require('imagemin-mozjpeg');
var imageminPngquant = require('imagemin-pngquant');

var ImageOpt =  yeoman.Base.extend({

prompting: function() {
    var done = this.async();
    this.log(yosay(
        'Optimizing images for agency-boilerplate'
    ));

    var prompts = [{
        name: 'quality',
        message: 'image quality (1-10) ?'

    }];

    this.prompt(prompts, function (props) {
        this.quality = props.quality;
        done();
    }.bind(this));
},
optimizing: function () {
    var done = this.async();
    this.log(yosay(
        'Choosen image quality ' + this.quality
    ));

    var quality = '0';
    switch(parseInt(this.quality)) {
        case 0:
        quality = '0';
        break;
        case 1:
            quality = '0';
            break;
        case 2:
            quality = '10-20';
            break;
        case 3:
            quality = '20-30';
            break;
        case 4:
            quality = '30-40';
            break;
        case 5:
            quality = '40-50';
            break;
        case 6:
            quality = '50-60';
            break;
        case 7:
            quality = '60-70';
            break;
        case 8:
            quality = '70-80';
            break;
        case 9:
            quality = '80-90';
            break;
        case 10:
            quality = '100';
            break;
    }

    this.log(yosay(
        'PNG image quality ' + quality + '\n' +' JPG image quality ' + this.quality
    ));

    imagemin(['src/assets/img/**/*.{jpg,png}'], 'build/images-quality-default', {
        plugins: [
            imageminMozjpeg({targa: false, quality:50}),
            imageminPngquant({quality: '50-60'})
        ]
    }).then(function(files) {
        console.log("default")
        console.log( files);

    });

    imagemin(['src/assets/img/**/*.{jpg,png}'], 'build/images-quality-'+ this.quality, {
        plugins: [
            imageminMozjpeg({targa: false, quality:this.quality * 10}),
            imageminPngquant({quality: quality})
        ]
    }).then(function(files) {
        console.log(files);
        done();
});
}  ,
    end: function() {
        this.log(yosay(
            'It\'s all done! Images are compressed. Check folder: ' + 'build/images-quality-'+ this.quality
        ));
    }


});

module.exports = ImageOpt;