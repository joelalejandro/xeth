#!/usr/bin/env node
const chalk = require('chalk');
const packageJson = require('./package.json');

console.log(chalk.yellow(`

                                     /
                                   #/
                             #     ##
                            ##     ##
                            ##     ##
 /##    ###       /##     ######## ##  /##
/ ###  #### /    / ###   ########  ## / ###
   ### /###/    /   ###     ##     ##/   ###
    ##/  ##    ##    ###    ##     ##     ##
     /##       ########     ##     ##     ##
    / ###      #######      ##     ##     ##
   /   ###     ##           ##     ##     ##
  /     ###    ####    /    ##     ##     ##
 /       ### /  ######/     ##     ##     ##
/         ##/    #####       ##     ##    ##
                                          /
      The CLI for Xethya                 /
                                        /
                                       /
`));

require('yargs')
.locale('en')
.demandCommand(1, 'Usage: xeth <command> <args>')
.command(
  'project:new',
  'Creates a new Xethya project',
  {
    projectName: {
      describe: 'The name of the project to build'
    },
    keywords: {
      describe: 'A list of keywords to include in the package manifest'
    },
    repositoryUrl: {
      describe: 'Git or GitHub URL for the repo'
    },
    author: {
      describe: 'Your name'
    }
  },
  require('./commands/project.new')
)
.demandOption('projectName')
.command(
  'extension:new',
  'Creates a new Xethya extension',
  {
    projectName: {
      describe: 'The name of the extension to build'
    },
    keywords: {
      describe: 'A list of keywords to include in the package manifest'
    },
    repositoryUrl: {
      describe: 'Git or GitHub URL for the repo'
    },
    author: {
      describe: 'Your name'
    }
  },
  require('./commands/extension.new')
)
.demandOption('projectName')
.help()
.argv;
