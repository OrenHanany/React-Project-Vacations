export const createuser = `CREATE TABLE IF NOT EXISTS vacation.user 
                        (id INT NOT NULL AUTO_INCREMENT,
                        user_name VARCHAR(45) NULL,
                        user_lastname VARCHAR(45) NULL,
                        user_nickname VARCHAR(45) NULL,
                        user_password VARCHAR(100) NULL,
                        PRIMARY KEY (id))`;
export const createvacation = `CREATE TABLE IF NOT EXISTS vacation.vacation 
                        (id INT NOT NULL AUTO_INCREMENT,
                        description VARCHAR(250) NULL,
                        destination VARCHAR(45) NULL,
                        start_date DATETIME NULL,
                        end_date DATETIME NULL,
                        cost INT NULL,
                        image_name VARCHAR(200) NULL,
                        follow INT NULL,
                        PRIMARY KEY (id))`;
export const createlike = `CREATE TABLE IF NOT EXISTS vacation.like 
                        (id INT NOT NULL AUTO_INCREMENT,
                        user_id INT NULL,
                        vacation_id INT NULL,
                        PRIMARY KEY (id))`;
                            
export const exitsafemode = `SET SQL_SAFE_UPDATES = 0`;