import mysql from 'mysql2/promise';
import {config} from 'dotenv';
config();
// Inicialización de las variables de entorno

const db = await mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password : process.env.DB_PASS,
    database :process.env.DB_NAME
});

// await db.query(
//     `create database crud;

//     create table users(
//     user_id int auto_increment primary key,
//     email VARCHAR(250) unique,
//     password varchar(250),
//     role enum('usuario', 'admin'),
//     name varchar(250)
//     );
    
//     create table products(
//     product_id varchar(250),
//     thumbnail varchar(250),
//     price float,
//     category varchar(250),
//     description varchar(250),
    
//     primary key (product_id)
//     );
    
//     create table carts (
//     user_id int unique primary key,
//     products json 
//     );`
// )

export default db;