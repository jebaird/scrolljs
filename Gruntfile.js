module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		qunit: {
			all: ['tests/*.html']
		},
		watch: {
			scripts: {
				files: ['tests/*.js', 'tests/*.html', 'scroll.js'],
				tasks: ['qunit'],
				options: {
					debounceDelay: 250
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).

	grunt.registerTask('default', [ 'qunit']);

};
