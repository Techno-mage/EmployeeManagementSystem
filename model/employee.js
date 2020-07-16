
//view employee's
//SELECT first_name, last_name, title, salary, name FROM employee 
//LEFT JOIN role on employee.role_id = role.id
//LEFT JOIN department on role.department_id = department.id;


//view department
//Select name FROM Department

//view Role
//SELECT title, salary, name, FROM role 
//LEFT JOIN department on role.department_id = department.id

//add department
//INSERT INTO department(name) values (?)


//add role
//INSERT INTO (title, salary, department_id) values (?, ?, ?)

//add Employee
//INSERT INTO employee(first_name, Last_name, role_id, manager_id) values (?, ?, ?, ?)

//update employee roles
//UPDATE employee SET role_id WHERE id = ?