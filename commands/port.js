const yaml = require('yamljs');
const path = require('path');
const fs = require('fs');

const nameMap = {
	PreCommit: 'pre-commit',
	PostCommit: 'post-commit',
	PostCheckout: 'post-checkout',
	ApplypatchMsg:'applypatch-msg',
	PreApplypatch:'pre-applypatch',
	PostApplypatch: 'post-apply-path',
	PrepareCommitMsg:'prepare-commit-msg',
	CommitMsg:'commit-msg',
	PreRebase:'pre-rebase',
	PostMerge:'post-merge',
	PreReceive: 'pre-receive',
	Update: 'update',
	PostReceive: 'post-receive',
	PostUpdate:'post-update',
	PreAutoGc: 'pre-auto-gc',
	PostRewrite: 'post-rewrite',
	PrePush: 'pre-push'
}

const retroHookDir = path.resolve(__dirname, 'retroHooks');
module.exports = ({yamlPath='./.overcommit.yml', jsonPath='./git-compose.json'}) => {
	let options = JSON.parse(fs.readFileSync(jsonPath).toString());
	let yamlOptions = yaml.load(yamlPath);
	for (let i in yamlOptions) {
		if (i === 'gemfile') {
			//stub
		} else if (i === 'concurrency') {
			// stub
		} else if (i === 'quiet') {

		} else if (i === 'verify_signatures') {

		} else if (i === 'plugin_directory') {

		} else {
			//i is type of hook
			let realHookName = nameMap[i];
			let retroHooks = fs.readdirSync(path.resolve(retroHookDir, realHookName))
			.filter(x => !x.startsWith('.'))
			//convert to relative path
			.map(fileName => './' + path.relative('', path.resolve(retroHookDir, fileName)));
			options.hooks[realHookName].hooks = options.hooks[realHookName].hooks.concat(retroHooks);
		}
	}
	console.log(JSON.stringify(options, null, 2));
}
module.exports.options = {
	y: {
		alias: 'yamlPath'
	},
	j: {
		alias: 'jsonPath'
	},
	yamlPath: {
    expecting: 1,
    default: () => path.resolve(__dirname, './.overcommit.yaml'),
    singular: true
  },
  jsonPath: {
    expecting: 1,
    default: () => path.resolve(__dirname, './git-compose.json'),
    singular: true
  }
}
