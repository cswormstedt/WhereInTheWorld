-- psql -a -f migration.sql

CREATE DATABASE whereApp;

\c whereApp;

CREATE TABLE users (id SERIAL PRIMARY KEY, username varchar(255), password_digest varchar(255));

CREATE TABLE places (id SERIAL PRIMARY KEY, latitude varchar(255), longitude varchar(255), user_id INT references users(id));