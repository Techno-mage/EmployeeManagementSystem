var mysql = require("mysql");
const inquirer = require("inquirer");

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

connection.connect(async function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    try{
        var choices = ["Quit"];
        do{
            var selection = await inquirer.prompt(
                {type:"list",message:"What would you like to do?", choices:choices, name:"option"}
            );

        }while(selection.option !== "Quit")

    }catch (err){
        console.log(err);
    }

    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      console.table(res);
      
    });
    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err;
      console.table(res);
        
    });
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      console.table(res);
        
    });
    
    connection.end();
  }