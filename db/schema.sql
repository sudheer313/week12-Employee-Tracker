DROP DATABASE IF EXISTS company_db;
create DATABASE company_db;
use company_db;

create table department (
    id INT not null AUTO_INCREMENT primary key(id),
    name varchar(20) not null
);

create table roles (
    id INT not null AUTO_INCREMENT primary key(id),
    title varchar(20) not null,
    salary decimal not null,
    department_id INT,
   foreign key(department_id),
    on delete set null


);

create table employe (
    id INT not null AUTO_INCREMENT primary key,
    first_name varchar(20) not null,
    last_name varchar(20) not null,
    manager_id Int,
    roles_id Int,
    foreign key(roles_id) on delete set null
);