const mysql = require("mysql");
const inquirer = require("inquirer");

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
    connection.end();
});

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
                    employeeSearch();
                    break;
                case "Add employee":
                    employeeAdd();
                    break;
                case "Update employee role":
                    employeeRole();
                    break;
                case "View all departments":
                    departmentSearch();
                    break;
                case "Add department":
                    departmentAdd();
                    break;
                case "View all roles":
                    roleSearch();
                    break;
                case "Add role":
                    roleAdd();
                    break;
            }
        })
};