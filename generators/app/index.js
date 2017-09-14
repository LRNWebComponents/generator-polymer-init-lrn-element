'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
      type: 'list',
      choices: ['element', 'application'],
      name: 'componentType',
      message: 'What would you like to build?'
    },
    {
      type: 'input',
      name: 'name',
      message: 'What would you like to name this component?',
      default: this.appname.replace(' ', '-')
    }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      props = Object.assign(props, { underscoreName: props.name.replace('-', '_') });
      this.props = props;
    });
  }

  writing() {
    var templatePath = this.templatePath() + '/' + this.props.componentType;

    // copy over all files but the dynamic ones
    this.fs.copyTpl(
      `${templatePath}/**/!(_)*`,
      this.destinationPath(),
      this.props
    );

    if (this.props.componentType === 'element') {
      this.fs.copyTpl(
        `${templatePath}/_component-name.html`,
        this.destinationPath(`${this.props.name}.html`),
        this.props
      );
      this.fs.copyTpl(
        `${templatePath}/test/_component-name-test.html`,
        this.destinationPath(`test/${this.props.name}.html`),
        this.props
      );
    }
    else if (this.props.componentType === 'application') {
      this.fs.copyTpl(
        `${templatePath}/_name.php`,
        this.destinationPath(`${this.props.name}.php`),
        this.props
      );
      this.fs.copyTpl(
        `${templatePath}/src/_name/_name.html`,
        this.destinationPath(`src/${this.props.name}/${this.props.name}.html`),
        this.props
      );
    }
  }

  install() {
    this.installDependencies();
  }
};
