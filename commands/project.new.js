const chalk = require('chalk');
const scaffolding = require('../scaffolding-templates/project.new');
const installPackages = require('npm-install-package');
const ora = require('ora');

module.exports = function (options) {
  console.log(chalk.gray('[npm]'), chalk.white('Scaffolding new project: ' + options.projectName));

  const { dependencies, basePath } = scaffolding(options);

  const spinner = ora({
    text: chalk.gray('[npm]') + ' ' + chalk.white('Installing dependencies'),
    spinner: 'moon'
  }).start();

  process.chdir(basePath);

  installPackages(dependencies, { deps: true, silent: true }, function (err) {
    if (err) {
      spinner.stopAndPersist({
        symbol: '×',
        text: chalk.gray('[npm]') + ' ' + chalk.red('Failed to install dependencies: ' + err)
      });
      console.log(chalk.gray('[xet]'), chalk.red('Unable to complete scaffolding for project: ' + options.projectName));
    } else {
      spinner.stopAndPersist({
        symbol: '✓',
        text: chalk.gray('[npm]') + ' ' + chalk.white('Finished installing dependencies')
      });
      console.log(chalk.gray('[xet]'), chalk.white('Finished scaffolding project: ' + options.projectName));
    }
  });
}
