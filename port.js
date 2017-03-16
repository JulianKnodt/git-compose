const yaml = require('yamljs');

let data = yaml.load('./spec/testOvercommit.yml');
console.log(data);
const hookMap = {
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

module.exports = {
	command: {
		expecting: 1,
		execute: ({yamlPath='./overcommit.yml', jsonPath='./overcommit.json'}) => {
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
						
					}
				}
		}
	}
}