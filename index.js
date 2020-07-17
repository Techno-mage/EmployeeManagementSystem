//var mysql = require("mysql");
const inquirer = require("inquirer");
//const cTable = require('console.table');
//const orm = require("./config/orm")
const employee = require("./model/employee")
/*
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
*/
var choices = ["View departments", "View Roles", "View Employees", "Quit"];

function formatOutput(data){
  console.log("\n\n")
  console.table(data)
  console.log("\n\n\n")

}
async function intit(){
  try {

    do {
      var selection = await inquirer.prompt(
        { type: "list", message: "What would you like to do?", choices: choices, name: "option" }
      );
      switch (selection.option) {
        case "View departments":

          
          await employee.viewDepartments()
          //.then(res => {console.log("done")})
          

          
          /*
          orm.selectAll("department")
          .then(results => formatOutput(results))
          */
          break;
        case "View Roles":
          
          await employee.viewRoles();
          
          /*
          orm.selectAll("role")
          .then(results => formatOutput(results))
          */
          break;
        case "View Employees":
          
          await employee.viewEmployees();
          
          /*
          orm.selectAll("employee")
          .then(results => formatOutput(results))
          */
      }

    } while (selection.option !== "Quit")
  } catch (err) {console.log(err)}

  employee.endConnection();

}

intit();

/*
async function getPrompt() {
  try {
   var choices = ["View departments", "View Roles", "View Employees", "Quit"];
    var  selection = await inquirer.prompt(
      { type: "list", message: "What would you like to do?", choices: choices, name: "option" }
    );
    return selection.option;
  } catch (err) { console.log(err) }

}
//var choices = ["View departments", "View Roles", "View Employees", "Quit"];
do {
  //var selection = await inquirer.prompt(
  //  { type: "list", message: "What would you like to do?", choices: choices, name: "option" }
  // );
  var selection = getPrompt();
  //console.log("\n\n\n");
  switch (selection) {
    case "View departments":
      console.table(orm.selectAll("department"));
      break;
    case "View Roles":
      console.table(orm.selectAll("role"));
      break;
    case "View Employees":
      console.table(orm.selectAll("employee"));
  }

} while (selection !== "Quit")

/*
connection.connect(async function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    try{
        var choices = ["View departments", "View Roles", "View Employees","Quit"];
        do{
            var selection = await inquirer.prompt(
                {type:"list",message:"What would you like to do?", choices:choices, name:"option"}
            );
              //console.log("\n\n\n");
            switch(selection.option){
              case "View departments":
                await viewContent("department");
                break;
              case "View Roles":
                await viewContent("role");
                break;
              case "View Employees":
                await viewContent("employee");
            }

        }while(selection.option !== "Quit")

    }catch (err){
        console.log(err);
    }

    //afterConnection();
    connection.end();
});

async function viewContent(type) {
  connection.query(`SELECT * FROM ${type}`,  function(err, res) {
    if (err) throw err;
    //console.log("function triggers.")
    console.log("\n")
    console.table(res);
    console.log("\n\n\n");

  });
}
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
  }*/