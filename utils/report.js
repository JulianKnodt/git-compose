const chalk = require('chalk');
module.exports = {
	success: (msg, tag='✓') => {
		console.log(chalk.green(tag), chalk.green.inverse(msg.toLowerCase()));
	},
	error: (msg, tag='✕') => {
		console.log(chalk.red(tag), chalk.red.inverse(msg.toLowerCase()));
		process.exitCode = 1;
	},
	warning: (msg, tag='!') => {
		console.log(chalk.yellow(tag), chalk.yellow.inverse(msg.toLowerCase()));
	},
	warn: (msg, tag='!') => {
		console.log(chalk.yellow(tag), chalk.yellow.inverse(msg.toLowerCase()));
	},
	info: (msg, tag='?') => {
		console.log(chalk.blue.inverse(tag), chalk.blue(msg.toLowerCase()));
	},
	debug: (msg, tag='DEV') => {
		console.log(chalk.grey(tag), chalk.grey.inverse(msg.toLowerCase()));
	}
};