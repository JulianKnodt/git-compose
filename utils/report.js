module.exports = {
	success: (msg) => {
		console.log('✓', msg.toLowerCase());
	},
	error: (msg) => {
		console.log('✕', msg.toLowerCase());
		process.exitCode = 1;
	},
	warning: (msg) => {
		console.log('!', msg.toLowerCase());
	}
};
