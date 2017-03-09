# yeoman agency-boilerplate-generator
> this yeoman-generator is a very easy way to install the agency-boilerplate.

https://github.com/StephanGerbeth/agency-boilerplate

### Version
0.2.0

### Updates Version 0.0.8
Generation of subfolders

### Updates Version 0.0.9
Generating of a package blueprint

### Updates Version 0.1.0
Generating of a package boilerplate

### Updates Version 0.1.1
Generating of a hbs package template

### Updates Version 0.1.2
README 

### Updates Version 0.1.3
Possibility to create a template without a JS-Controller 

### Updates Version 0.1.5
removed controller class in templates

### Updates Version 0.1.7
Possibility to create ES6-Controller<br> 
removed Boilerplate 2.0/2.1<br>
added new image optimizer task

### Issues
when generating subfolders, the pathes in the generated JS-Controller must be edited to match.
<br>(only with hbs-template, this issue is fixed with hbs-package-template)

### Installation

You need yeoman installed globally:

```bash
$ npm i -g yo
$ npm i -g generator-agency-boilerplate
```


### Usage
download the core boilerplate
```bash
$ yo agency-boilerplate
```

create a hbs-template
```bash
$ yo agency-boilerplate:hbs-template
```

create a hbs-package-template
```bash
$ yo agency-boilerplate:hbs-package-template
```

create a package
```bash
$ yo agency-boilerplate:package
```

optimize images (JPG/PNG) with quality steps
```bash
$ yo agency-boilerplate:image-opt
```
