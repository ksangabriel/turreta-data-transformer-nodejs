module.exports = function(grunt)
{
		grunt.loadNpmTasks('grunt-ts');
		
		grunt.initConfig({
			ts: {
			  main : {
					tsconfig: './tsconfig.json',
					src:['typescript/**/*.ts'],
					dest:'dist/',
				},
			}
		  });
		  grunt.registerTask("default", ["ts"]);
}