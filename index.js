//var mysql = require("mysql");
const inquirer = require("inquirer");
//const cTable = require('console.table');
//const orm = require("./config/orm")
const employee = require("./model/employee")

var choices = ["View departments", "View Roles", "View Employees","add department","add Role","add employee","update employee role", "Quit"];

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
          
          break;
        case "View Roles":
          
          await employee.viewRoles();
          
          break;
        case "View Employees":
          
          await employee.viewEmployees();
          break;
        case "add Role":
          await employee.addRole()
          break;
        case "add department":
          await employee.addDepartment()
          break;
        case "add employee":
          await employee.addEmployee();
          break;
        case "update employee role":
          await employee.updateEmployeeRole();
          break;
      }

    } while (selection.option !== "Quit")
  } catch (err) {console.log(err)}

  employee.endConnection();

}

intit();

