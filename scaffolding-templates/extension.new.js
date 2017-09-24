const chalk = require('chalk');
const scaffold = require('sane-scaffold')
const stringUtils = require('ember-cli-string-utils');

const devDependenciesList = ['xethya-extension-base@^0.0.1'];

const packageJson = function (options) {
  const keywords = (options.keywords || '').split(',').map(function (k) { return k.trim(); });
  const devDependenciesHash = {};

  devDependenciesList.forEach(function (dependency) {
    const { name, version } = dependency.split('@');
    devDependenciesHash[name] = version;
  });

  const projectName = stringUtils.dasherize(options.projectName);

  return {
    "name": projectName,
    "version": "0.0.1",
    "description": "A CLI for Xethya projects.",
    "main": "dist/" + projectName + ".umd.js",
    "jsnext:main": "dist/" + projectName + ".es.js",
    "repository": {
      "type": "git",
      "url": "git+" + options.repositoryUrl + ".git"
    },
    "keywords": ["xethya", "xethya-extension"].concat(keywords || []),
    "author": options.author,
    "license": "MIT",
    "bugs": {
      "url": options.issuesUrl || (options.repositoryUrl + "/issues")
    },
    "homepage": options.homepage || (options.repositoryUrl + "#readme"),
    "devDependencies": devDependenciesHash,
    "xethya": {
      "extensionName": options.namespace
    },
    "scripts": {
      "build": "gulp extension:build",
      "test": "gulp extension:test",
      "docs": "gulp extension:docs"
    }
  }
};

const gulpFile = `
require('xethya-extension-base/tasks/build');
require('xethya-extension-base/tasks/test');
require('xethya-extension-base/tasks/docs');
`;

const eslintrcJson = `
{
  "extends": "xethya"
}
`;

const eslintrcTestsJson = `
{
  "env": {
    "mocha": true
  }
}
`;

module.exports = function (options) {
  const folderName = stringUtils.dasherize(options.projectName);
  const basePath = process.cwd() + '/' + folderName;

  console.info(chalk.gray('[xet] Will write to ' + basePath))

  const base = scaffold.start(process.cwd());

  base
    .directory(folderName, function (projectDir) {
      projectDir
        .file('package.json', JSON.stringify(packageJson(options)))
        .file('gulpfile.js', gulpFile)
        .file('.eslintrc.json', eslintrcJson)
        .file('.gitignore', 'node_modules')
        .directory('src/', function (srcDir) {
          srcDir.file('extension.js');
        })
        .directory('test/', function (testDir) {
          testDir.file('extension.spec.js')
            .file('.eslintrc.json', eslintrcTestsJson);
        })
    });

  return { dependencies: devDependenciesList, basePath: basePath };
};
