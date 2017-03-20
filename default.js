const reporter = require('./utils/report');
const getVersion = () => {
	const fs = require('fs');
	fs.readFile('./package.json', (err, file) => {
		const package = JSON.parse(file.toString());
		reporter.info(package.version, '');
	});
}
const getHelp = () => {
	reporter.info(`
Available Commands:
init : Creates a git-compose.json
install [-f | --filePath] [-h | --hooksPath] : Installs hooks from git-compose.json to hooks
port [-y | --yamlPath] [-j | --jsonPath] : Port yaml to json`, ' Info ');
}
const getList = () => {
  const fs = require('fs');
  fs.readdir('./.git/hooks', (err, hooks) => {
    if (err) {
      throw err;
    } else {
      reporter.info(hooks.join('\n'), 'Hooks: \n');
    }
	});
}
module.exports = (options={}) => {
	options.version && getVersion();
	options.help && getHelp();
	options.list && getList();
}
module.exports.options = {
	v: {
		alias: 'version'
	},
	version: {
		expecting: 0,
		default: false
	},
	l: {
		alias: 'list'
	},
	list: {
		expecting: 0,
		default: false
	},
	h: {
		alias: 'help'
	},
	help: {
		expecting: 0,
		default: false
	}
}