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
      name: "options",
      type: "list",
      message: "What Would You like to do?",
      choices: [
        "view All Employees",
        "View all Departments",
        "view all roles",
        "add department",
        "Add Role",
        "add employee",
        "updateEmployeeRole",
        "Exit",
      ],
    })
    .then((Choice) => {
      // console.log("You chose : ", Choice);
      switch (Choice.options) {
        case "view All Employees":
          viewAllEmployees();
          break;
        case "View all Departments":
          viewDepartments();
          break;
        case "view all roles":
          viewRoles();
          break;
        case "add department":
          addDepartment();
          break;
        case "add employee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Department":
          addDepartment_func();
          break;
        case "updateEmployeeRole":
          updateEmployee_role();
          break;
        case "Exit":
          console.log("Bye Bye");
          connection.end();
          break;
        default:
          console.log(`error`);
      }
    });
};
//view All employees
const viewAllEmployees = () => {
  console.log("view All Employees data");
  db.query(
    `select employee.id, employee.first_name, employee.last_name,roles.id,roles.salary as salary,
    department.name as department,
    concat (manager.first_name,'',manager.last_name) as manager
    from employee
    left join roles on employee.id=roles.id
    left join department on employee.id=department.id
    left join employee manager on manager.id=employee.manager_id `,
    (err, res) => {
      if (err) throw err;

      console.table(res);

      console.log(`
      ----------------------------------------------------
      ----------------------------------------------------
      `);

      runEmployee();
    }
  );
};
//view departmnet
const viewDepartments = () => {
  console.log("view all deparments");
  db.query(`select *from department`, (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log(`
      ----------------------------------------------------
      ----------------------------------------------------
      `);
    runEmployee();
  });
};
//view roles
const viewRoles = () => {
  console.log("view all roles");
  db.query(`select roles.id,roles.title as title, 
  department.name as department, roles.salary 
  from roles inner join department 
  on roles.department_id=department.id `, (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log(`
      ----------------------------------------------------
      ----------------------------------------------------
      `);
    runEmployee();
  });
};
// Add department

const addDepartment = () => {
  console.log("add department");
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
        }
      );
    });
};
//add Employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter employee's last name?",
      },
      {
        type: "list",
        name: "role",
        message: "Please choose employee's role?",
        choices: selectRole(),
      },
      {
        type: "list",
        name: "manager",
        message: "Who is employees manager?",
        choices: selectManager(),
      },
    ])
    .then((answers) => {
      let roleId = answers.role;
      let managerId = answers.manager;
      db.query(
        `INSERT INTO employee_db.employees SET ?`,
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err, results) {
          if (err) {
            console.log(err);
          }
          console.table(results);
          console.log(
            `Successfully added new employee ${answers.first_name} ${answers.last_name} to the database`
          );
          runEmployee();
        }
      );
    });
};

let roleArr = [];
function selectRole() {
  db.query(`SELECT * FROM roles`, function (err, results) {
    if (err) {
      console.log(err);
    }
    for (let i = 0; i < results.length; i++) {
      let data = {
        name: results[i].title,
        value: results[i].id,
      };
      roleArr.push(data);
    }
  });
  return roleArr;
}

//add role

const addRole=()=>{
  const dep_Array=[];
  db.query(
    `select department.id, department.name as department from department`,
    function(err,results){
      if(err){
        console.log(err);
      }
      results.forEach(function(i){
        const department={
          name:i.department,
          value:i.id,

        };
        dep_Array.push(department);
      });
      console.table(dep_Array);
      role();
    }
  );
const role=()=>{
  inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role ?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role ?",
        },
        {
          type: "list",
          name: "departmentArrayList",
          message: "Which department does the role belongs to ?",
          choices: dep_Array,
        },
      ])
      .then((answer) => {
        db.query(
          `INSERT INTO company_db.roles (title ,salary,department_id) VALUES (? , ? , ?)`,
          [answer.title, answer.salary, answer.dep_Array],
          function (err, results) {
            if (err) {
              console.log(err);
            }
            console.table(results);
            console.log(
              `New Role ${answer.title} is successfully added to the database`
            );
            runEmployee();
          }
        );
      });
}
}

//function to select manager()

let managerArray = [];
function selectManager() {
  db.query(`SELECT * FROM employee`, function (err, managerList) {
    if (err) {
      console.log(err);
    }
    for (let i = 0; i < managerList.length; i++) {
      let manager = {
        name: managerList[i].first_name + " " + managerList[i].last_name,
        value: managerList[i].id,
      };
      managerArray.push(manager);
    }
  });
  return managerArray;
}

//update employee Role
const updateEmployee_role = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "id",
        message: "Which employee role you want to update ?",
        choices: employeeArr,
      },
      {
        name: "role",
        type: "list",
        message: "Please assign role to the selected employee?",
        choices: selectRole(),
      },
    ])
    .then((answers) => {
      let new_roleId = answers.role;

      db.query(
        `UPDATE employee SET roles_id = ? WHERE id = ?`,
        [new_roleId, answers.id],
        function (err, results) {
          if (err) {
            console.log(err);
          }

          console.log("Succcessfully updated employee role to the database");
          runEmployee();
        }
      );
    });
};

var employeeArr = [];
function employeeArray() {
  db.query(`SELECT * FROM employee`, function (err, emp_Results) {
    if (err) {
      console.log(err);
    }
    for (let i = 0; i < emp_Results.length; i++) {
      var data = {
        name: emp_Results[i].first_name + " " + emp_Results[i].last_name,
        value: emp_Results[i].id,
      };
      employeeArr.push(data);
    }
  });
  return employeeArr;
}
employeeArray();
