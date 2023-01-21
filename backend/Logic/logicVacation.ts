import { OkPacket } from "mysql";
import Vacation from "../Models/VacationModel";
import {v4 as uuid} from "uuid"
import { unlink, unlinkSync } from "fs"
import dal from "../Utils/dal_mysql"
import fs from "fs"

const getSingleVacation= async (id:number): Promise<Vacation> => {
    const sql =`SELECT * FROM vacation.vacation WHERE id=${id}`;
    const vacation= await dal.execute(sql);
    return vacation;
}

const getAllVacation = async (): Promise<Vacation[]> => {
    const sql=`SELECT * FROM vacation.vacation order by start_date ASC;`;
    const vacation = await dal.execute(sql);
          return vacation;
    }

const addVacation = async (vacation:Vacation): Promise<Vacation> => {
    const extension = vacation.image?.name.split(".")[1]
    const imageName = uuid()+"."+ extension ;
    vacation.image_name = imageName;
    
    const sql=`
    INSERT INTO vacation.vacation (description, destination, start_date, end_date, cost, image_name) VALUES
     ('${vacation.description}', '${vacation.destination}', '${vacation.start_date}', '${vacation.end_date}', '${vacation.cost}', '${vacation.image_name}');
    `
    const response: OkPacket= await dal.execute(sql);
    vacation.id=response.insertId;
    fs.mkdir(`./uploadPictures/${vacation.id}`, (err) => {
        if (err) throw err;
        console.log('Folder created');
      });
    await vacation.image.mv(`./uploadPictures/${vacation.id}/`+imageName);
    delete vacation.image
    return vacation;
}    

const deleteVacation = async (id: number): Promise<void> => {
    fs.readdir(`./uploadPictures/${id}`, async (err, files) => {
        if (err) throw err;
           fs.unlink(`./uploadPictures/${id}/${files[0]}`, (err) => {
            if (err) throw err;
          });
      });
    const sql = `
    DELETE FROM vacation WHERE id=${id}`
    const response = await dal.execute(sql);
    fs.rmdir(`./uploadPictures/${id}`, (err) => {
        if (err) throw err;
        console.log('Folder deleted');
      });
}

const updateVacation = async (vacation: Vacation): Promise<Vacation> => {
    let sql =``;
    if(vacation.image){
        fs.readdir(`./uploadPictures/${vacation.id}`, (err, files) => {
            if (err) throw err;
              fs.unlink(`./uploadPictures/${vacation.id}/${files[0]}`, (err) => {
                if (err) throw err;
              });
          });
        const extension = vacation.image?.name.split(".")[1]
        const imageName = uuid() + "." + extension;
        vacation.image_name = imageName;
        vacation.image.mv(`./uploadPictures/${vacation.id}/`+imageName);
        sql = `
            UPDATE vacation.vacation
            SET
            description = '${vacation.description}',
            destination = '${vacation.destination}',
            start_date = '${vacation.start_date}',
            end_date = '${vacation.end_date}',
            cost = '${vacation.cost}',
            image_name = '${vacation.image_name}'
            WHERE id = ${vacation.id}
        `;    
        
    } if(!vacation.image) {
        sql = `
            UPDATE vacation.vacation
            SET
            description = '${vacation.description}',
            destination = '${vacation.destination}',
            start_date = '${vacation.start_date}',
            end_date = '${vacation.end_date}',
            cost = '${vacation.cost}'
            WHERE id = ${vacation.id}
        `;
    }
    const result :OkPacket = await dal.execute(sql);
    delete vacation.image
    return vacation;
}

export default{
    getSingleVacation,
    getAllVacation,
    addVacation,
    deleteVacation,
    updateVacation
};