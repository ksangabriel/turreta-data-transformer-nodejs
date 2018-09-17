module.exports = function(grunt)
{
		grunt.loadNpmTasks('grunt-ts');
		
		grunt.initConfig({
			ts: {
				main: {
					src:['typescript/**/*.ts'],
					dest:'dist/'
				}
			},
		});
		
		
		grunt.registerTask('default', ['ts']);
}