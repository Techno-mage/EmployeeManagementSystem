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
async function addEmployee(){

    res1 = await orm.selectAll("role")
    res2 = await orm.selectAll("employee")

    //console.log(res1)
    //console.log(res2)
    var roleOptions = res1.map((re)=>{return re.title})

    var managerOptions = res2.map((r) => {return r.first_name + " "+ r.last_name})
    managerOptions.push("none")


    console.log(roleOptions)
    console.log(managerOptions)
    
    var questions = [
        {type:"input", message:"What is the employee's first name?", name:"first"},
        {type:"input", message:"What is the employee's last name?", name:"last"},
        {type:"list", message:"what is the employee's role?", choices:roleOptions, name:"role"},
        {type:"list", message:"Does the empoyee have a manager?", choices:managerOptions, name: "manager"}
    ]
    res3 = await inquirer.prompt(questions)
    var role;
    var manager;

    console.log(res3)
    for (item of res1){
        if (item.title === res3.role){
            role = item.id;
        }
    }
    if(res3.manager == "none"){
        manager = null;
    }
    for (item of res2){
        //console.log(item.first_name+" "+item.last_name)
        //console.log(res3.manager)
        if ((item.first_name+" "+item.last_name) === res3.manager){
            console.log("triggered")
            manager = item.id;
        }
    }
    //console.log(role)
    //console.log(manager)

    var res4 = await orm.create("employee", ["first_name","last_name","role_id","manager_id"],[res3.first, res3.last, role, manager])
    console.table(res4)


}

//update employee roles
//UPDATE employee SET role_id WHERE id = ?
addEmployee()
//addRole();
//addDepartment();
//viewEmployees();
//viewDepartments();
//viewRoles();

//orm.connection.end()