var mysql = require("mysql");
var config = require("../config/config.json");
var connection = mysql.createConnection({
    host: config.rdb.host,
    user: config.rdb.user,
    password: config.rdb.password,
    database: config.rdb.database
});

connection.connect();

module.exports = connection;