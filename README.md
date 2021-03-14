# Employee Tracker

## Summary
A solution for managing a company's employees using node, inquirer, and MySQL. A command-line application that allows the user to 
  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

  * Delete employee

The following is the database schema containing three tables:

![Database Schema](Assets/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
  
## Initialization

Open up terminal. Download all dependencies --npm install--. Run --npm start-- to initialize the application.

### Employee Tracker Demo

![Employee Tracker](Assets/employee-tracker.gif)


- - -
© 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
