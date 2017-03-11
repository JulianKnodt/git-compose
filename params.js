module.exports = {
	"-v": {
		expecting: 0,
		execute: () => {
			const fs = require('fs');
			fs.readFile('./package.json', (err, file) => {
				const package = JSON.parse(file.toString());
				console.log(package.version);
			});
		}
	},
	"-l": {
		expecting: 0,
		execute: () => {
        const fs = require('fs');
	      fs.readdir('./.git/hooks', (err, hooks) => {
	        if (err) {
	          throw err;
	        } else {
	          console.log(hooks.join('\n'))
	        }
      });
		}
	},
	"-t": {
		expecting: 0,
		execute: () => {

		}
	},
	"-f": {
		expecting: 1,
    expectingMessage: "1 file path",
		execute: (filePath) => {
			const YAML = require('yamljs');
      let options = YAML.load(filePath);
		}
	}
}