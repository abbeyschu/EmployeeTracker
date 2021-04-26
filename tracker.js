const mysql = require('mysql');
const inquirer = require('inquirer');


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
          'Update an employee'
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

          case 'Update an employee':
            updateEmployee();
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
    let roleOptions = [];
    for (i = 0; i < roles.length; i++) {
      roleOptions.push(Object(roles[i]));
    };
    let managerOptions = [];
    for (i = 0; i < managers.length; i++) {
      managerOptions.push(Object(managers[i]));
    };
    inquirer
      .prompt([
        {
          name: 'firstName',
          type: 'input',
          message: 'Enter the employees first name: ',
        },
        {
          name: 'lastName',
          type: 'input',
          message: 'Enter the employees last name: ',
        },
        {
            name: 'role_id',
            type: 'list',
            message: 'What is the employee\'s role?:',
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < roleOptions.length; i++) {
                  choiceArray.push(roleOptions[i].title)
                }
                return choiceArray;
              }
          },
          {
            name: 'manager_id',
            type: 'list',
            message: "Who is the employee's manager?",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < managerOptions.length; i++) {
                choiceArray.push(managerOptions[i].managers)
              }
              return choiceArray;
            }
          }
      ])
      .then((answer) => {
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${role_id}, ${manager_id})`;

        connection.query(query,(err, res) => {
            console.table(res);
            prompts();
      });
  })};

