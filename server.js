const mysql = require("mysql2");
var inquirer = require("inquirer");
const consTable = require("console.table");

//creating mysql connection
const db = mysql.createConnection(
  {
    host: "localsost",
    user: "root",
    database: "company_db",
    password: "Sudheer@123",
  },
  console.log(`conected to database`)
);

db.connect((err) => {
  if (err) throw err;
  console.log(`------------------
    ERROR
    ---------------------------------`);
    runEmployees();
});
const runEmployees = () => {
  inquirer
  .prompt({
    name: 'options',
    type: 'list',
    message: 'What Would You like to do?',
    choices: ['See All Employees', 'View all titles By Department', 'Add employee', 'Remove employee', 'Update employee role', 'Add Role', 'Add Department', 'Exit']
  })
  .then((Choice) => {
    // console.log("You chose : ", Choice);
    switch (Choice.options) {
      case 'See All Employees':
        //Add all case options
        readEmployee_Data_func()
        break
      case 'View all titles By Department':
        View_by_department()
        break
      case 'Add employee':
        addEmployee()
        break
      case 'Remove employee':
        deleteEmployee_Data_func()
        break
      case 'Update employee role':
        updateEmployee_Data_func()
        break
      case 'Add Role':
        addRole()
        break
      case 'Add Department':
        addDepartment_func()
        break
      case 'Exit':
        console.log('Thanks for playing');
        connection.end();
        break
      default:
        console.log('We have run into major issues');
    }
  })
}