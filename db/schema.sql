DROP DATABASE IF EXISTS company_db;
create DATABASE company_db;
use company_db;

create table department (
    id INT not null AUTO_INCREMENT ,
    name varchar(20) not null,
    primary key(id)

);

create table roles (
    id INT not null AUTO_INCREMENT,
    title varchar(20) not null,
    salary decimal not null,
    department_id INT,
    primary key(id),
   foreign key(department_id) references department(id) on delete set null
);

create table employee (
    id INT not null AUTO_INCREMENT primary key,
    first_name varchar(20) not null,
    last_name varchar(20) not null,
    manager_id Int,
    roles_id Int,
    foreign key(roles_id) references roles(id) on delete set null
);