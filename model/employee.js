const orm = require("../config/orm.js")
const inquirer = require("inquirer")
const util = require("util")

//inquirer.prompt() = util.promisify(inquirer.prompt())
//view employee's
//SELECT first_name, last_name, title, salary, name FROM employee 
//LEFT JOIN role on employee.role_id = role.id
//LEFT JOIN department on role.department_id = department.id;
function viewEmployees(){
    orm.leftJoin(["first_name","last_name","title"], "employee", "role", "role_id", "id")
    .then(results => console.table(results));
}

//view department
//Select name FROM Department
function viewDepartments(){
    orm.select(["name"], "department")
    .then(results => console.table(results));
}


//view Role
//SELECT title, salary, name, FROM role 
//LEFT JOIN department on role.department_id = department.id
function viewRoles(){
    orm.leftJoin(["title", "salary", "name"], "role", "department", "department_id", "id")
    .then(results => console.table(results));
}

//add department
//INSERT INTO department(name) values (?)
//inquirer "Enter department name"
function addDepartment(){
    inquirer.prompt({type:"input", message:"What is the department called?", name:"dept"})
    .then(results => {
        orm.create("department", ["name"],[results.dept])
    })
    .then(results => {
        console.table(results)
    })
}

//add role
//INSERT INTO (title, salary, department_id) values (?, ?, ?)
//inquirer List: list department role belongs to
//:name role
function addRole(){
    orm.selectAll("department")
    .then(results => {
        const res = results;
        var options = [];
        results.forEach((item)=> options.push(item));

        var questions = [
            {type:"input", message:"What is the name of this role?", name:"role"},
            {type:"input", message:"what is this role's salary?", name:"salary"},
            {type:"list", message:"what department does this role belong to?", choices:options, name: "dept"}
        ]
        inquirer.prompt(questions)
        .then(results => {
            console.log(results)
            for (item of res){
                if (item.name === results.dept){
                    console.log(results.id)
                    orm.create("role", ["title", "salary", "department_id"],[results.role, parseInt(results.salary), parseInt(item.id)])
                }
            }
            
            //orm.create("role", ["title", "salary", "department_id"],[results.role, results.salary, dep])
        })
        .then(results => console.log( results))
    })
    /*   
    .then(results => {
        console.log(results)
        //orm.create("role", ["title", "salary", "department_id"],[])
    })*/

}
//add Employee
//INSERT INTO employee(first_name, Last_name, role_id, manager_id) values (?, ?, ?, ?)
//Inquirer List: employee's role,
//: Enter employee's first name, then Last name


//update employee roles
//UPDATE employee SET role_id WHERE id = ?

addRole();
//addDepartment();
//viewEmployees();
//viewDepartments();
//viewRoles();

//orm.connection.end()