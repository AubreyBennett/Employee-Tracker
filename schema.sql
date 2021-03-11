-- Creating and Using Database
DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

-- Creating Department Table --
CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

-- Creating Role Table --
CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
);

-- Creating Employee Table --
CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

-- Department seeds --
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

-- Role seeds --
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Person", 80000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 6);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 7);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 8);

-- Employee seeds --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Amanda", "Smith", 2, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Bennett", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Stacy", "Camino", 7, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Trent", "Tucker", 4, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tiffany", "Judici", 5, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Hanker", 2, 1);

-- Select Tables --
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;