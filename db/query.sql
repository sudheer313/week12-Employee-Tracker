use company_db;
 select * from department;
 select * from roles;
 select * from employee;
--quer to inser employee
insert into employee(first_name,last_name) values ('naveen',' kandula');
--query to view Roles, Departmnet, Salary
 select roles.id,roles.title as title, 
 department.name as department, roles.salary 
 from roles inner join department 
 on roles.department_id=department.id;
--query to view name and depatment title
select first_name,last_name,department_id,
roles.title from employee left join roles on employee.id=roles.id;
--query to view all employess and all details
select employee.id, employee.first_name, employee.last_name,roles.id,roles.salary as salary,
department.name as department,
concat (manager.first_name,'',manager.last_name) as manager
from employee
left join roles on employee.id=roles.id
left join department on employee.id=department.id
left join employee manager on manager.id=employee.manager_id;

---query to add department
insert into  department(name) values ('education');