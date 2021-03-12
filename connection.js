// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const util = require('util');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Aubreyb27",
    database: "employee_tracker_db"
});


connection.connect(err => {
    if (err) throw err;
    console.log(`We connected! Connected as thread id ${connection.threadId}`);
});
connection.queryPromise = util.promisify(connection.query);

// Initial Questions Prompt
function startSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "Add employee",
                "Update employee role",
                "View all departments",
                "Add department",
                "View all roles",
                "Add role"
            ]
        }).then(function(answer) {
            switch (answer.action) {
                case "View all employees":
                    employeeView();
                    break;
                case "Add employee":
                    employeeAdd();
                    break;
                case "Update employee role":
                    employeeRole();
                    break;
                case "View all departments":
                    departmentView();
                    break;
                case "Add department":
                    departmentAdd();
                    break;
                case "View all roles":
                    roleView();
                    break;
                case "Add role":
                    roleAdd();
                    break;
            }
        })
};

startSearch();

// View all employees
function employeeView() {
    const query = "SELECT employee.first_name, employee.last_name, role.title, employee.manager_id FROM employee INNER JOIN role ON role.id=employee.role_id";
    connection.query(query, function(err, res) {
        if (err) throw err
        console.table(res);
        startSearch();
    });
};

// View all departments
function departmentView() {
    const query = "SELECT department.id, department.name FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err
        console.table(res);
        startSearch();
    });
};

// View all roles
function roleView() {
    const query = "SELECT role.id, role.title, role.salary, department.name FROM role INNER JOIN department ON department.id=role.department_id";
    connection.query(query, function(err, res) {
        if (err) throw err
        console.table(res);
        startSearch();
    });
};


// Add Employees
async function employeeAdd() {

    let roles = await connection.queryPromise('SELECT id, title FROM role');
    roles = roles.map(role => {
        return {
            value: role.id,
            name: role.title
        }
    });

    let managers = await connection.queryPromise('SELECT id, first_name, last_name FROM employee');
    managers = managers.map(manager => {
        return {
            value: manager.id,
            name: manager.first_name + ' ' + manager.last_name
        }
    });

    const answer = await inquirer
        .prompt([
            {
            name: "firstname",
            type: "input",
            message: "What is the employee's first name?",
            },
            {
            name: "lastname",
            type: "input",
            message: "What is the employee's last name?",
            },
            {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: roles
            },
            {
            name: "manager",
            type: "list",
            message: "Who is the employee's manager?",
            choices: managers
            }
        ])

        console.log(answer.role);
        console.log(answer.manager);

        await connection.queryPromise('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.firstname, answer.lastname, answer.role, answer.manager])

        startSearch();
};

// Add Departments
async function departmentAdd() {

    let departments = await connection.queryPromise('SELECT name FROM department');
    departments = departments.map(department => {
        return {
            name: department.name
        }
    });

    const answer = await inquirer
        .prompt([
            {
            name: "name",
            type: "input",
            message: "What is the departments name?",
            }
        ])

        console.log(answer.name);

        await connection.queryPromise('INSERT INTO department (name) VALUES (?)', answer.name)

        startSearch();
};

// Add Roles
async function roleAdd() {

    let roles = await connection.queryPromise('SELECT title, salary, department_id FROM role');
    roles = roles.map(role => {
        return {
            name: role.title,
            name: role.salary,
            name: role.department_id
        }
    });

    const answer = await inquirer
        .prompt([
            {
            name: "role",
            type: "input",
            message: "What is the role you would like to add?",
            },
            {
            name: "salary",
            type: "input",
            message: "What is your role's salary?",
            },
            {
            name: "id",
            type: "input",
            message: "What is the role's department id?",
            }
        ])

        console.log(answer.name);

        await connection.queryPromise('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answer.role, answer.salary, answer.id])

        startSearch();
};

// Update Employee Role
async function employeeRole() {
    let roles = await connection.queryPromise('SELECT id, title FROM role');
    roles = roles.map(role => {
        return {
            value: role.id,
            name: role.title
        }
    });

    let employees = await connection.queryPromise('SELECT id, first_name, last_name FROM employee');
    employees = employees.map(employee => {
        return {
            value: employee.id,
            name: employee.first_name + ' ' + employee.last_name
        }
    });
    const answer = await inquirer
        .prompt([
            {
            name: "employee",
            type: "list",
            message: "Which employee would you like to update?",
            choices: employees
            },
            {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: roles
            }
        ])

        console.log(answer.role);
        console.log(answer.employee);
        // NOT DONE WITH UPDATE PORTION
        await connection.queryPromise('UPDATE employee.first_name, employee.last_name ')
}