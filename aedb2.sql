/* create database first */
CREATE DATABASE aedb2;

/* use that database */
USE aedb2;

/* Create the users table */
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    google_id VARCHAR(255)
);

/* Create the events table */
CREATE TABLE events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    event_name VARCHAR(255),
    start_time DATETIME,
    end_time DATETIME,
    location VARCHAR(255),
    description TEXT,
    category VARCHAR(50),
    banner_image_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
