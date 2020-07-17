const orm = require("../config/orm.js")
const inquirer = require("inquirer")
const util = require("util")

//inquirer.prompt() = util.promisify(inquirer.prompt())
//view employee's
//SELECT first_name, last_name, title, salary, name FROM employee 
//LEFT JOIN role on employee.role_id = role.id
//LEFT JOIN department on role.department_id = department.id;
class Employee {


    async viewEmployees() {
        await orm.leftJoin(["first_name", "last_name", "title"], "employee", "role", "role_id", "id")
            .then(results => console.table(results));
    }

    //view department
    //Select name FROM Department
    async viewDepartments() {
        await orm.select(["name"], "department")
            .then(results => console.table(results));
    }


    //view Role
    //SELECT title, salary, name, FROM role 
    //LEFT JOIN department on role.department_id = department.id
    async viewRoles() {
        await orm.leftJoin(["title", "salary", "name"], "role", "department", "department_id", "id")
            .then(results => console.table(results));
    }

    //add department
    //INSERT INTO department(name) values (?)
    //inquirer "Enter department name"
    async addDepartment() {
        var res1 = await inquirer.prompt({ type: "input", message: "What is the department called?", name: "dept" })

        await orm.create("department", ["name"], [res1.dept])
            .then(res2 => {
                
                if (res2.affectedRows ===0){
                    console.log("error in handling add request")
                } else (
                    console.log("department added.")
                )
                //console.table(res2)
            })


    }

    //add role
    //INSERT INTO (title, salary, department_id) values (?, ?, ?)
    //inquirer List: list department role belongs to
    //:name role
    async addRole() {
        var results = await orm.selectAll("department")

        const res = results;
        var options = [];
        results.forEach((item) => options.push(item));

        var questions = [
            { type: "input", message: "What is the name of this role?", name: "role" },
            { type: "input", message: "what is this role's salary?", name: "salary" },
            { type: "list", message: "what department does this role belong to?", choices: options, name: "dept" }
        ]
        var res2 = await inquirer.prompt(questions)
        var department;

        //console.log(res2)
        //console.log(res)
        for (let item of res) {
            if (item.name === res2.dept) {
                //console.log(results.id)
                department = item.id;
                //orm.create("role", ["title", "salary", "department_id"], [results.role, parseInt(results.salary), parseInt(item.id)])
            }
        }

        //orm.create("role", ["title", "salary", "department_id"],[results.role, results.salary, dep])
        await orm.create("role", ["title", "salary", "department_id"], [res2.role, parseInt(res2.salary), parseInt(department)])
            .then(results => {
                if (results.affectedRows === 0) {
                    console.log("error in handling add request")
                } else (
                    console.log("role added.")
                )
                //console.log(results)
            })



    }
    //add Employee
    //INSERT INTO employee(first_name, Last_name, role_id, manager_id) values (?, ?, ?, ?)
    //Inquirer List: employee's role,
    //: Enter employee's first name, then Last name
    async addEmployee() {

        var res1 = await orm.selectAll("role")
        var res2 = await orm.selectAll("employee")

        //console.log(res1)
        //console.log(res2)
        var roleOptions = res1.map((re) => { return re.title })

        var managerOptions = res2.map((r) => { return r.first_name + " " + r.last_name })
        managerOptions.push("none")


        //console.log(roleOptions)
        //console.log(managerOptions)

        var questions = [
            { type: "input", message: "What is the employee's first name?", name: "first" },
            { type: "input", message: "What is the employee's last name?", name: "last" },
            { type: "list", message: "what is the employee's role?", choices: roleOptions, name: "role" },
            { type: "list", message: "Does the empoyee have a manager?", choices: managerOptions, name: "manager" }
        ]
        var res3 = await inquirer.prompt(questions)
        var role;
        var manager;

        console.log(res3)
        for (const item of res1) {
            if (item.title === res3.role) {
                role = item.id;
            }
        }
        if (res3.manager == "none") {
            manager = null;
        }
        for (const item of res2) {
            //console.log(item.first_name+" "+item.last_name)
            //console.log(res3.manager)
            if ((item.first_name + " " + item.last_name) === res3.manager) {
                //console.log("triggered")
                manager = item.id;
            }
        }
        //console.log(role)
        //console.log(manager)

        var res4 = await orm.create("employee", ["first_name", "last_name", "role_id", "manager_id"], [res3.first, res3.last, role, manager])
        if (res4.affectedRows === 0) {
            console.log("error in handling add request")
        } else (
            console.log("employee added.")
        )
        //console.table(res4)


    }

    //update employee roles
    //UPDATE employee SET role_id WHERE id = ?
    async updateEmployeeRole() {
        var res1 = await orm.selectAll("role")
        var res2 = await orm.selectAll("employee")

        var roleOptions = res1.map((re) => { return re.title })

        var employeeOptions = res2.map((r) => { return r.first_name + " " + r.last_name })

        var questions = [
            { type: "list", message: "what employee do you want to update?", choices: employeeOptions, name: "employee" },
            { type: "list", message: "what is the employee's new role?", choices: roleOptions, name: "role" }
        ]
        var res3 = await inquirer.prompt(questions);

        var role;
        var employee;

        for (const item of res1) {
            if (item.title === res3.role) {
                role = item.id;
            }
        }
        for (const item of res2) {
            //console.log(item.first_name+" "+item.last_name)
            //console.log(res3.manager)
            if ((item.first_name + " " + item.last_name) === res3.employee) {
                //console.log("triggered")
                employee = item.id;
            }
        }

        await orm.update("employee", "role_id", role, "id", employee)
            .then(results => {
                if (results.affectedRows === 0) {
                    console.log("error in handling add request")
                } else (
                    console.log("employee updated")
                )
                //console.table(results)
            })



    }
    endConnection() {
        orm.connection.end()
    }

}

module.exports = new Employee()
