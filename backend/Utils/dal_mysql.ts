// import mysql from "mysql";
const mysql2 = require('mysql2');
import config from "./config";

const connection = mysql2.createPool({
    host: config.mySQLhost,
    port: config.mySQLport,
    user: config.mySQLUser,
    password: config.mySQLPassword,
    database: config.mySQLdb,
    
});

console.log("we are connected to the DB");

const execute = (sql: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => { //to Promisify an asynchronous function
        //execute the sql on mysql server
        console.log(sql);
        connection.query(sql, (err, result) => {
            //if we got an error, exit with reject and return
            if (err) {
                reject(err);
                return;
            }
            //return the result....
            resolve(result);
        })
    });
}

export default { execute }