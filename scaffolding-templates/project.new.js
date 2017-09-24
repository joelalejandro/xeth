const chalk = require('chalk');
const scaffold = require('sane-scaffold')
const stringUtils = require('ember-cli-string-utils');

const dependenciesList = ['xethya-flavor-vanilla@^0.0.1'];

const packageJson = function (options) {
  const keywords = (options.keywords || '').split(',').map(function (k) { return k.trim(); });
  const dependenciesHash = {};

  dependenciesList.forEach(function (dependency) {
    const { name, version } = dependency.split('@');
    dependenciesHash[name] = version;
  });

  return {
    "name": options.projectName,
    "version": "0.0.1",
    "description": "A CLI for Xethya projects.",
    "main": "src/game.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "repository": {
      "type": "git",
      "url": "git+" + options.repositoryUrl + ".git"
    },
    "keywords": ["xethya"].concat(keywords || []),
    "author": options.author,
    "license": "MIT",
    "bugs": {
      "url": options.issuesUrl || (options.repositoryUrl + "/issues")
    },
    "homepage": options.homepage || (options.repositoryUrl + "#readme"),
    "dependencies": dependenciesHash
  }
};

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
        .file('.gitignore', 'node_modules')
        .file('.eslintrc.json', eslintrcJson)
        .directory('src/', function (srcDir) {
          srcDir.file('game.js');
        })
        .directory('test/', function (testDir) {
          testDir.file('game.spec.js')
            .file('.eslintrc.json', eslintrcTestsJson);
        })
        .directory('assets/');
    });

  return { dependencies: dependenciesList, basePath: basePath };
};
