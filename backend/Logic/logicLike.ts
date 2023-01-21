import dal from "../Utils/dal_mysql"
import { OkPacket } from "mysql";
import Like from "../Models/LikeModel";

const getAllLikes =async (): Promise<Like[]> => {
    const sql=`SELECT * FROM vacation.like;`
    const likes = await dal.execute(sql);
    return likes;
}

const getAllLikesByUserId = async (id:number): Promise<number[]> => {
    if(!Number.isNaN(id)){
    const sql= `SELECT vacation_id FROM vacation.like WHERE user_id=${id}`
    const likes= await dal.execute(sql);
    let vacation_ids: number[] = [];
    for (const row of likes) {
        vacation_ids.push(row.vacation_id);
    }
    console.log(vacation_ids);
    return vacation_ids;
    }
}

const addLike = async (user_id:number,vacation_id:number): Promise<void> => {
    const sql1=`
    INSERT INTO vacation.like (user_id, vacation_id) VALUES
     ('${user_id}', '${vacation_id}');`
    const sql2=` UPDATE vacation.vacation
      SET follow = (SELECT SUM(1) FROM vacation.like WHERE vacation.like.vacation_id = vacation.vacation.id);
    `
    const response: OkPacket= await dal.execute(sql1);
    const result: OkPacket= await dal.execute(sql2);

}    

//delete student
const deleteLike = async (user_id: number,vacation_id:number): Promise<void> => {
    const sql = `
    DELETE FROM vacation.like WHERE (user_id=${user_id} AND vacation_id=${vacation_id}) AND (id is not null);`
    const response = await dal.execute(sql);
    const sql2=` UPDATE vacation.vacation
      SET follow = (SELECT SUM(1) FROM vacation.like WHERE vacation.like.vacation_id = vacation.vacation.id);
    `
    const result = await dal.execute(sql2);
}

export default{
    getAllLikesByUserId,
    getAllLikes,
    addLike,
    deleteLike
};