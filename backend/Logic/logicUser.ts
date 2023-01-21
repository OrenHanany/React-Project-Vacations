import dal from "../Utils/dal_mysql"
import  User  from "../Models/UserModel"
import { OkPacket } from "mysql";
const bcrypt = require("bcrypt");

const getSingleuser = async (id:number): Promise <User> => {
    const sql=`SELECT * FROM vacation.user WHERE id=${id}`;
    const user = await dal.execute(sql);
    delete user.user_password;
    return user;
}

const getAllUser =async (): Promise<User[]> => {
    const sql=`SELECT * FROM vacation.user;`
    const user = await dal.execute(sql);
    return user;
}

const addUser = async (user:User) => {
    const hashedPassword = await bcrypt.hash(user.user_password, 10);
    const sql=`
    INSERT INTO vacation.user (user_name, user_lastname, user_nickname, user_password) VALUES
    ('${user.user_name}', '${user.user_lastname}', '${user.user_nickname}', '${hashedPassword}');
    `
    const response: OkPacket= await dal.execute(sql);
    user.id=response.insertId;
}
const checkPassword =async (user:User) =>{
    const storedUser = await getPassword(user)
    if(storedUser==='invalid username or password'){
        return 'invalid username or password'
    }
    const storedHash = storedUser.user_password;
    const match = await bcrypt.compare(user.user_password, storedHash);
    if (match){
        console.log("correct password")
        delete storedUser.user_password;
        return storedUser;
    }
    else{ 
        console.log('invalid username or password');
        return 'invalid username or password'
    }
}

const getPassword =async (user:User): Promise<any> => {
const sql=`SELECT * FROM vacation.user WHERE vacation.user.user_nickname="${user.user_nickname}"`;
const response= await dal.execute(sql);
if(response.length>0){
    return response[0];
}
return "invalid username or password";
}

const deleteUser = async (id: number): Promise<void> => {
    const sql = `
    DELETE FROM user WHERE id=${id}`
    const response = await dal.execute(sql);
}


export default{
    getSingleuser,
    getAllUser,
    checkPassword,
    addUser,
    deleteUser
};
