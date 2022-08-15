insert into department(name)
values
('legal'),
('finance'),
('sales'),
('engineering');

insert into roles(title,salary,department_id)
values

('lawyer',1000,1),
('leagal aid',500,1),
('Charted_account ',2000,2),
('accountant',1500,2),
('sales manager',2500,3),
('sales lead',2000,3),
('engineering head',2500,4),
('electrical engineer',2000,4);

insert into employee(first_name,last_name,roles_id,manager_id)
values
('narender','kandula',4,null),
('Adilaxmi','kandula',5,null),
('sudheer','kandula',1,null),
('nihar','kandula',4,null),
('vasanthi','kandula',4,null),
('aaradya','kandula',3,null);
