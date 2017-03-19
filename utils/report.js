const chalk = require('chalk');
module.exports = {
	success: (msg) => {
		console.log(chalk.green.inverse('✓', msg.toLowerCase()));
	},
	error: (msg) => {
		console.log(chalk.red.inverse('✕', msg.toLowerCase()));
		process.exitCode = 1;
	},
	warning: (msg) => {
		console.log(chalk.yellow.inverse('!', msg.toLowerCase()));
	}
};

console.log(chalk);