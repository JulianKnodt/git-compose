const chalk = require('chalk');
module.exports = {
	success: (msg) => {
		console.log(chalk.green('✓'), chalk.green.inverse(msg.toLowerCase()));
	},
	error: (msg) => {
		console.log(chalk.red('✕'), chalk.red.inverse(msg.toLowerCase()));
		process.exitCode = 1;
	},
	warning: (msg) => {
		console.log(chalk.yellow('!'), chalk.yellow.inverse(msg.toLowerCase()));
	},
	warn: (msg) => {
		console.log(chalk.yellow('!'), chalk.yellow.inverse(msg.toLowerCase()));
	}
};
