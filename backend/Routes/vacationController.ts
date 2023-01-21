import express, {NextFunction, Request, Response} from 'express';
import path from 'path';
import logicvacation from "../Logic/logicVacation";
import Vacation from '../Models/VacationModel';



const routervacation = express.Router();


routervacation.get("/all", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json( await logicvacation.getAllVacation())
 })

routervacation.post("/add", async (request: Request, response: Response, next: NextFunction) => {  
        request.body.image = request.files?.image;
        console.log(request.files?.image)
        const vacation = new Vacation(request.body);
        response.status(201).json( await logicvacation.addVacation(vacation))
 })

 routervacation.get("/uploadPictures/:id/:image_name", async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        const image_name = request.params.image_name;
        const fullpath = path.join(__dirname,"..","uploadPictures", id, image_name) 
        response.sendFile(fullpath)
 })

routervacation.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    response.status(204).json( await logicvacation.deleteVacation(id))
 })

routervacation.put("/update/:id", async (request: Request, response: Response, next: NextFunction) => {
    try{
      const newVacation = request.body;
      newVacation.id= request.params.id
      const file : any = request.files?.image;
      if (file) {
        newVacation.image = request.files.image;
        const result = await logicvacation.updateVacation(newVacation)
        response.status(201).json(result);
        
      } if(!file) {
        const result = await logicvacation.updateVacation(newVacation)
        response.status(201).json(result);
      }
    } catch (err) {
      console.log(err);
    }
  })

  
  export default routervacation;