import express, {NextFunction, Request, Response} from 'express';
import like from '../Logic/logicLike';

const routerlike = express.Router();

routerlike.get("/userlikes/:id", async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    response.status(200).json( await like.getAllLikesByUserId(id));
})

routerlike.get("/all", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json( await like.getAllLikes())
 })

routerlike.post("/add/:user_id/:vacation_id", async (request: Request, response: Response, next: NextFunction) => {
    const user_id = +request.params.user_id;
    const vacation_id=+request.params.vacation_id;
    response.status(201).json( await like.addLike(user_id,vacation_id))
 })

routerlike.delete("/:user_id/:vacation_id", async (request: Request, response: Response, next: NextFunction) => {
    const user_id = +request.params.user_id;
    const vacation_id=+request.params.vacation_id;
    response.status(204).json( await like.deleteLike(user_id,vacation_id))
 })


 export default routerlike;
