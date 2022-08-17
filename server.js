const mysql = require("mysql2");
var inquirer = require("inquirer");
const consTable = require("console.table");

//creating mysql connection
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    database: "company_db",
    password: "Sudheer@123",
  },
  console.log(`conected to database`)
);

db.connect((err) => {
    
  if (err) throw err;
  console.log(`------------------
    
    ---------------------------------`);
    runEmployee();
});
const runEmployee = () => {
  inquirer
  .prompt({
    name: 'options',
    type: 'list',
    message: 'What Would You like to do?',
    choices: ['view All Employees',
    'View all Departments', 
     'view all roles', 
     'add department', 
     'Update employee role', 
     'Add Role', 
     'Add Department', 
     'Exit']
  })
  .then((Choice) => {
    // console.log("You chose : ", Choice);
    switch (Choice.options) {
      case 'view All Employees':
        //Add all case options
        viewAllEmployees()
        break
      case 'View all Departments':
        viewDepartments()
        break
      case 'view all roles':
        viewRoles()
        break
      case 'add department':
        addDepartment()
        break
      case 'Update employee role':
        updateEmployeeRole_Data_func()
        break
      case 'Add Role':
        addRole()
        break
      case 'Add Department':
        addDepartment_func()
        break
      case 'Exit':
        console.log('Bye Bye');
        connection.end();
        break
      default:
        console.log(`error`);
    }
    
  })
}
//view employees
const viewAllEmployees=() =>{
  console.log('view All Employees data');
  db.query(`select concat(first_name,last_name) AS FullName from employee `, (err, res) =>
  {
      if(err) throw err;

      console.table(res);

      console.log(`
      ----------------------------------------------------
      ----------------------------------------------------
      `);

      runEmployee();
  });  
}
//view departmnet
const viewDepartments=() =>{
  console.log('view all deparments');
  db.query(`select *from department`, (err,res)=>
  {
    if(err) throw err;
    console.table(res);
    console.log(`
      ----------------------------------------------------
      ----------------------------------------------------
      `);
      runEmployee();
  });
}
//view roles
const viewRoles=() =>{
  console.log('view all roles');
  db.query(`select roles.id, roles.title AS title, department.name AS department, roles.salary FROM roles INNER JOIN department on roles.department_id=department.id`, (err,res)=>
  {
    if(err) throw err;
    console.table(res);
    console.log(`
      ----------------------------------------------------
      ----------------------------------------------------
      `);
      runEmployee();
  });
}
// Add department

const addDepartment=() =>{
  console.log('add department');
  inquirer
  .prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What is the new department name ?",
    },
  ])
  .then((answer) => {
    db.query(
      `INSERT INTO department (name) VALUES (?)`,
      [answer.newDepartment],
      function (err, results) {
        if (err) {
          console.log(err);
        }
        console.table(results);
        console.log(`Added ${answer.newDepartment} to the database`);
      runEmployee();
    
  });
});
}




