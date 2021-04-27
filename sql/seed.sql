INSERT INTO department (deptName) VALUES ("Human Resources");
INSERT INTO department (deptName) VALUES ("Accounting");
INSERT INTO department (deptName) VALUES ("Engineering");
INSERT INTO department (deptName) VALUES ("IT");

INSERT INTO position (title,salary,department_id) VALUES ("HR Manager",70000,1);
INSERT INTO position (title,salary,department_id) VALUES ("Accountant",60000,2);
INSERT INTO position (title,salary,department_id) VALUES ("Engineer",75000,3);
INSERT INTO position (title,salary,department_id) VALUES ("IT Specialist",70000,4);
INSERT INTO position (title,salary,department_id) VALUES ("HR Specialist",50000,1);

INSERT INTO employee (first_name,last_name,role_id) VALUES ("Bob","Smith",1);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("Jane","Doe",5,1)