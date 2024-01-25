-- Create the database 'quiz'
CREATE DATABASE quiz;

-- Connect to the database
\c quiz;

-- Create the 'test' table
CREATE TABLE IF NOT EXISTS test (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number CHAR(20),
    subject VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL,
    date_create TIMESTAMP NOT NULL
);
