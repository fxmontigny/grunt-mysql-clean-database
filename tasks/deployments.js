'use strict';

var shell = require('shelljs');

module.exports = function (grunt) {

    grunt.registerMultiTask('db_clean', 'Clean database', function () {
        // Options
        var task_options = this.options({});

        db_execute_file(task_options);
        grunt.log.ok("Database cleaned");
    });


    /**
     * Execute into the DB provided
     */
    function db_execute_file(config) {
        var cmd;

        // 1) Create cmd string from Lo-Dash template
        var tpl_mysql = grunt.template.process(tpls.mysql, {
            data: {
                host: config.host,
                user: config.user,
                pass: config.pass,
                database: config.database
            }
        });

        var script = null;
        if (config.hasOwnProperty('prefix')) {
            script = grunt.template.process(tpls.sql_drop_tables_filter_by_table_prefix, {
                data: {
                    prefix: config.prefix,
                    database: config.database
                }
            });
        } else {
            script = grunt.template.process(tpls.sql_drop_tables, {
                data: {
                    database: config.database
                }
            });
        }

        cmd = tpl_mysql + " -e \"" + script + "\"";
        shell.exec(cmd);
    }

    var tpls = {
        sql_drop_tables: "SET FOREIGN_KEY_CHECKS = 0; " +
        "SET @tables = NULL; " +
        "SELECT GROUP_CONCAT(table_schema, '.', table_name) INTO @tables FROM information_schema.tables WHERE table_schema = '<%= database %>'; " +
        "SET @tables = CONCAT('DROP TABLE ', @tables); " +
        "SELECT IF(STRCMP('DROP TABLE ',@tables),@tables,'SELECT \\\"They are no tables\\\" as \\\"Warning\\\"') INTO @tables; " +
        "PREPARE stmt FROM @tables; " +
        "EXECUTE stmt; " +
        "DEALLOCATE PREPARE stmt; " +
        "SET FOREIGN_KEY_CHECKS = 1;",
        sql_drop_tables_filter_by_table_prefix: "SET FOREIGN_KEY_CHECKS = 0; " +
        "SET @tables = NULL; " +
        "SELECT GROUP_CONCAT(table_schema, '.', table_name) INTO @tables FROM information_schema.tables WHERE table_schema = '<%= database %>' AND table_name LIKE '<%= prefix %>%'; " +
        "SET @tables = CONCAT('DROP TABLE ', @tables); " +
        "SELECT IF(STRCMP('DROP TABLE ',@tables),@tables,'SELECT \\\"No tables found\\\" as \\\"Warning\\\"') INTO @tables; " +
        "PREPARE stmt FROM @tables; " +
        "EXECUTE stmt; " +
        "DEALLOCATE PREPARE stmt; " +
        "SET FOREIGN_KEY_CHECKS = 1;",
        mysql: "mysql --host=\"<%= host %>\" --user=\"<%= user %>\" --password=\"<%= pass %>\" \"<%= database %>\""
    };
};


