const orm = require("../config/orm.js")
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
function viewRole(){
    orm.leftJoin(["title", "salary", "name"], "role", "department", "department_id", "id")
    .then(results => console.table(results));
}

//add department
//INSERT INTO department(name) values (?)


//add role
//INSERT INTO (title, salary, department_id) values (?, ?, ?)

//add Employee
//INSERT INTO employee(first_name, Last_name, role_id, manager_id) values (?, ?, ?, ?)

//update employee roles
//UPDATE employee SET role_id WHERE id = ?

viewEmployees();
viewDepartments();
viewRole();