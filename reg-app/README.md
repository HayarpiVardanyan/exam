**DataBase POSTGRESQL** sudo su postgresql

CREATE USER reg_app WITH PASSWORD '123';
ALTER USER reg_app createdb;

psql -U reg_app -h localhost -d registration

CREATE TABLES users (id SERIAL PRIMARY KEY,username VARCHAR(20),password VARCHAR(20),day VARCHAR(2),month VARCHAR(10), year VARCHAR(4),gender VARCHAR(10));

**CLIENT** npm start

**SERVER** nodejs server.js
