# Grunt (MYSQL) Database cleaning

**IMPORTANT NOTE**: the authors of this Plugin assume **no responsibility** for any actions which result from the usage of this script. You use it entirely *at your own risk*. It is *strongly* recommended that you test the script in a non-critical environment prior to rolling out for production use. *Always* manually backup your local and remote databases before using the script for the first time. No support can be provided for critical situations.

## Getting Started
This plugin requires Grunt `>=0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mysql-clean-database --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mysql-clean-database');
```

## Documentation

### Overview
In your project's Gruntfile, add a section named `db_clean` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  db_clean: {
    dev1: {
        host: "",
        user: "",
        pass: "",
        database: ""
    },
    dev2: {
        host: "",
        user: "",
        pass: "",
        database: "",
        prefix: "" <- table prefix
    },
    prod1: {
        //etc
    },
    // etc
  }
});

grunt.loadNpmTasks('grunt-mysql-clean-database');

grunt.registerTask('default', ['db_clean:dev1']);
```