module.exports = {
	success: (msg) => {
		console.log('✓', msg);
	},
	error: (msg) => {
		console.log('✕', msg);
		process.exitCode = 1;
	},
	warning: (msg) => {
		console.log('!', msg);
	}
};
