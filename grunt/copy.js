/**
 * https://github.com/gruntjs/grunt-contrib-copy
 */

module.exports = function (grunt, options) {
	return {
		deploy: {
			files: [{
				src: ['**'],
				dest: 'dist/',
				filter: function (filepath) {
					var unixifyPath = function (filepath) {

						var isWindows = process.platform === 'win32';
						if (isWindows) {
							return filepath.replace(/\\/g, '/');
						} else {
							return filepath;
						}
					};
					filepath = unixifyPath(filepath);
					var exclude = grunt.file.read('.distignore');
					var cwd = grunt.file.read('.distignore').split(/\r|\n/);
					cwd = cwd.filter(function (e) {
						return e
					});
					for (index in cwd) {
						var file = cwd[index];
						if (filepath.indexOf(file) === 0) {
							return false;
						}
					}
					return true;
				}
			}]
		}
	};
};