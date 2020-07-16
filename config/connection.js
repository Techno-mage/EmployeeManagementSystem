var mysql = require("mysql");
const util = require('util');
//const inquirer = require("inquirer");
//const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Sch@@123",
    database: "employee_db"
});

// Make connection.
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
  
  connection.query = util.promisify(connection.query);
  
  // Export connection for our ORM to use.
  module.exports = connection;
  