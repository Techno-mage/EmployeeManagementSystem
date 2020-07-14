DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department(name) VALUES ("HR");
INSERT INTO department(name) VALUES ("Development");
INSERT INTO department(name) VALUES ("Sales");

INSERT INTO role(title, salary, department_id) VALUES ("Hiring Manager", 50000, 1);
INSERT INTO role(title, salary, department_id) VALUES ("Lead Developer",120000,2);
INSERT INTO role(title, salary, department_id) VALUES ("Developrer",75000, 2);
INSERT INTO role(title, salary, department_id) VALUES ("Jr Developrer",50000, 2);
INSERT INTO role(title, salary, department_id) VALUES ("Sales Representative",60000, 3);
INSERT INTO role(title, salary, department_id) VALUES ("Sales Manager",80000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Erik", "Schaal",2,NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Kira", "Harro",4,1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Jimmy", "Reigner",6,NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Sara", "Harthstone",5,3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Trinity", "Lionheart",1,NULL);