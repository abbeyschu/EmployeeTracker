const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employeeTracker_db',
});

connection.connect((err) => {
    if (err) throw err;
    prompts();
});

// Options given and what function to run when they are selected
const prompts = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
          'View all employees',
          'View all roles',
          'View all departments',
          'Add a new employee',
          'Add a new role',
          'Add a new department',
          'Update an employee\'s role',
          'Delete an employee'
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'View all employees':
            viewEmployees();
            break;
  
          case 'View all roles':
            viewRoles();
            break;
  
          case 'View all departments':
            viewDepts();
            break;
  
          case 'Add a new employee':
            addEmployee();
            break;
  
          case 'Add a new role':
            addRole();
            break;

          case 'Add a new department':
            addDept();
            break;

          case 'Update an employee\'s role':
            updateEmployee();
            break;

          case 'Delete an employee':
            deleteEmployee();
            break;
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
};
  
const viewEmployees = () => {
    const query =
        'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        console.table(res);
        prompts();
    });
};

const viewRoles = () => {
    const query =
        'SELECT * FROM position';
    connection.query(query, (err, res) => {
        console.table(res);
        prompts();
    });
};

const viewDepts = () => {
    const query =
        'SELECT * FROM department';
    connection.query(query, (err, res) => {
        console.table(res);
        prompts();
    });
};

const addEmployee = () => {
    inquirer
      .prompt([
        {
          name: 'firstName',
          type: 'input',
          message: 'Enter the employee\'s first name: ',
        },
        {
          name: 'lastName',
          type: 'input',
          message: 'Enter the employee\'s last name: ',
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'What is the employee\'s role ID?:',
        },
        {
            name: 'manager_id',
            type: 'input',
            message: "What is the ID of the employee's manager?",
        }
      ])
      .then((answer) => {
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.role_id}, ${answer.manager_id})`;

        connection.query(query,(err, res) => {
            console.log("New employee has been added!");
            prompts();
      });
  })};

  const addRole = () => {
    inquirer
      .prompt([
        {
          name: 'roleName',
          type: 'input',
          message: 'Enter the name of the new role: ',
        },
        {
          name: 'salary',
          type: 'input',
          message: 'Enter the salary of the new role: ',
        },
        {
            name: 'deptId',
            type: 'input',
            message: 'What is the department ID of the new role?:',
        }
      ])
      .then((answer) => {
        const query = `INSERT INTO position (title, salary, department_id) VALUES ('${answer.roleName}', ${answer.salary}, ${answer.deptId})`;

        connection.query(query,(err, res) => {
            console.log("New role has been added!");
            prompts();
      });
  })};

  const addDept = () => {
    inquirer
      .prompt([
        {
          name: 'deptName',
          type: 'input',
          message: 'Enter the name of the new department: ',
        }
      ])
      .then((answer) => {
        const query = `INSERT INTO department (deptName) VALUES ('${answer.deptName}')`;

        connection.query(query,(err, res) => {
            console.log("New department has been added!");
            prompts();
      });
  })};

const updateEmployee = () => {
    inquirer
    .prompt([
      {
        name: 'employeeID',
        type: 'input',
        message: 'What is the ID of the employee you would like to update?',
      },
      {
          name: 'roleID',
          type:'input',
          message: 'What is the ID of the employee\'s new role?',
      }
    ])
    .then((answer) => {
      const query = `UPDATE employee SET role_id = ${answer.roleID} WHERE id = ${answer.employeeID}`;

      connection.query(query,(err, res) => {
          console.log("The employee has been updated!");
          prompts();
    });
})};

const deleteEmployee = () => {
    inquirer
    .prompt([
      {
        name: 'employeeID',
        type: 'input',
        message: 'What is the ID of the employee you would like to delete?',
      }
    ])
    .then((answer) => {
      const query = `DELETE FROM employee WHERE id = ${answer.employeeID}`;

      connection.query(query,(err, res) => {
          console.log("The employee has been deleted!");
          prompts();
    });
})};